import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Model } from "mongoose";
import { App, AppSchema } from "../../types/schemas/App.schema";
import {
  AppCategory,
  AppCategorySchema,
} from "../../types/schemas/AppCategory.schema";
import { UserApps, UserAppsSchema } from "../../types/schemas/UserApps.schema";
import { AppService } from "./app.service";
import { ObjectId } from "mongodb";
import { User, UserSchema } from "../../types/schemas/User.schema";
import { BadRequestException } from "@nestjs/common";

describe("app service", () => {
  let mongod: MongoMemoryServer;
  let userAppsModel: Model<UserApps>;
  let appModel: Model<App>;
  let userModel: Model<User>;
  let appService: AppService;

  const userId1 = new ObjectId();
  const appId1 = new ObjectId();
  const userId2 = new ObjectId();
  const appId2 = new ObjectId();
  const app1ShortcutId1 = new ObjectId();
  const app1ShortcutId2 = new ObjectId();
  const app2ShortcutId1 = new ObjectId();
  const app2ShortcutId2 = new ObjectId();

  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: AppCategory.name, schema: AppCategorySchema },
          { name: UserApps.name, schema: UserAppsSchema },
          { name: App.name, schema: AppSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [AppService],
    }).compile();

    userAppsModel = module.get<Model<UserApps>>(getModelToken(UserApps.name));
    appModel = module.get<Model<App>>(getModelToken(App.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
    appService = module.get<AppService>(AppService);
  });

  beforeEach(async () => {
    await userAppsModel.db.dropDatabase();

    await appModel.create({
      _id: appId1,
      name: "TestApp 1",
      icon: "icon",
      oss: [],
      sections: [],
      url: "",
      shortcuts: [
        { _id: app1ShortcutId1, stars: 0 },
        { _id: app1ShortcutId2, stars: 0 },
      ],
    });

    await appModel.create({
      _id: appId2,
      name: "TestApp 2",
      icon: "icon",
      oss: [],
      sections: [],
      url: "",
      shortcuts: [
        { _id: app2ShortcutId1, stars: 0 },
        { _id: app2ShortcutId2, stars: 0 },
      ],
    });

    await userModel.create({
      _id: userId1,
      email: "email1@gmail.com",
    });
    await userModel.create({
      _id: userId2,
      email: "email2@gmail.com",
    });
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it("should add a shortcut to a non-existing user app", async () => {
    const userApp = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId1
    );

    const stars = await getStars(appId1, app1ShortcutId1);

    expect(userApp.userId).toEqual(userId1);
    expect(userApp.appId).toEqual(appId1);
    expect(userApp.shortcutIds).toHaveLength(1);
    expect(userApp.shortcutIds).toContainEqual(app1ShortcutId1);
    expect(stars).toEqual(1);
  });

  it("should toggle the same shortcut when running twice", async () => {
    let userApp = await appService.toggleStar(userId1, appId1, app1ShortcutId1);

    let stars = await getStars(appId1, app1ShortcutId1);

    expect(userApp.userId).toEqual(userId1);
    expect(userApp.appId).toEqual(appId1);
    expect(userApp.shortcutIds).toHaveLength(1);
    expect(userApp.shortcutIds).toContainEqual(app1ShortcutId1);
    expect(stars).toEqual(1);

    userApp = await appService.toggleStar(userId1, appId1, app1ShortcutId1);
    stars = await getStars(appId1, app1ShortcutId1);

    expect(userApp.shortcutIds).toHaveLength(0);
    expect(stars).toEqual(0);
  });

  it("should toggle multiple users, apps and shortcuts", async () => {
    // user1 & app1
    let user1App = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId1
    );
    user1App = await appService.toggleStar(userId1, appId1, app1ShortcutId2);

    let user1Stars1 = await getStars(appId1, app1ShortcutId1);
    let user1Stars2 = await getStars(appId1, app1ShortcutId2);

    // user2 & app2
    let user2App = await appService.toggleStar(
      userId2,
      appId2,
      app2ShortcutId1
    );
    user2App = await appService.toggleStar(userId2, appId2, app2ShortcutId2);

    let user2Stars1 = await getStars(appId2, app2ShortcutId1);
    let user2Stars2 = await getStars(appId2, app2ShortcutId2);

    expect(user1App.userId).toEqual(userId1);
    expect(user1App.appId).toEqual(appId1);
    expect(user1App.shortcutIds).toHaveLength(2);
    expect(user1App.shortcutIds).toContainEqual(app1ShortcutId1);
    expect(user1App.shortcutIds).toContainEqual(app1ShortcutId2);
    expect(user1Stars1).toEqual(1);
    expect(user1Stars2).toEqual(1);

    expect(user2App.userId).toEqual(userId2);
    expect(user2App.appId).toEqual(appId2);
    expect(user2App.shortcutIds).toHaveLength(2);
    expect(user2App.shortcutIds).toContainEqual(app2ShortcutId1);
    expect(user2App.shortcutIds).toContainEqual(app2ShortcutId2);
    expect(user2Stars1).toEqual(1);
    expect(user2Stars2).toEqual(1);

    // userApp = await appService.toggleStar(userId1, appId1, app1ShortcutId1);
    // stars = await getStars(appId1, app1ShortcutId1);

    // expect(userApp.shortcutIds).toHaveLength(0);
    // expect(stars).toEqual(0);
  });

  it("should add a shortcut to an existing user apps", async () => {
    let userApp = await appService.toggleStar(userId1, appId1, app1ShortcutId1);
    userApp = await appService.toggleStar(userId1, appId1, app1ShortcutId2);
    const stars1 = await getStars(appId1, app1ShortcutId1);
    const stars2 = await getStars(appId1, app1ShortcutId1);

    expect(userApp.userId).toEqual(userId1);
    expect(userApp.appId).toEqual(appId1);
    expect(userApp.shortcutIds).toHaveLength(2);
    expect(userApp.shortcutIds).toContainEqual(app1ShortcutId1);
    expect(userApp.shortcutIds).toContainEqual(app1ShortcutId2);
    expect(stars1).toEqual(1);
    expect(stars2).toEqual(1);
  });
  it("should throw for toggling for non existing shortcut from existing app and user", async () => {
    await expect(
      appService.toggleStar(userId1, appId1, new ObjectId())
    ).rejects.toThrow();
  });

  it("should throw for toggling with a non existing user", async () => {
    await expect(
      appService.toggleStar(new ObjectId(), appId1, app1ShortcutId1)
    ).rejects.toThrow();
  });

  it("should throw if a no app with appId", async () => {
    await expect(
      appService.toggleStar(userId1, new ObjectId(), app1ShortcutId1)
    ).rejects.toThrow();
  });

  async function getStars(appId: ObjectId, shortcutId: ObjectId) {
    const app = await appModel.findOne(
      {
        _id: appId,
        "shortcuts._id": shortcutId,
      },
      { "shortcuts.$": 1 }
    );

    return app.shortcuts[0].stars;
  }
});
