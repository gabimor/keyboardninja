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
    const { isStarred, stars } = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId1
    );

    const userApp = await userAppsModel.findOne({
      userId: userId1,
      appId: appId1,
    });

    expect(userApp.userId).toEqual(userId1);
    expect(userApp.appId).toEqual(appId1);
    expect(userApp.shortcutIds).toHaveLength(1);
    expect(userApp.shortcutIds).toContainEqual(app1ShortcutId1);
    expect(stars).toEqual(1);
    expect(isStarred).toEqual(true);
  });

  it("should toggle the same shortcut when running twice", async () => {
    const { stars, isStarred } = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId1
    );

    let userApp = await userAppsModel.findOne({
      userId: userId1,
      appId: appId1,
    });

    expect(userApp.userId).toEqual(userId1);
    expect(userApp.appId).toEqual(appId1);
    expect(userApp.shortcutIds).toHaveLength(1);
    expect(userApp.shortcutIds).toContainEqual(app1ShortcutId1);
    expect(stars).toEqual(1);
    expect(isStarred).toEqual(true);

    const result2 = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId1
    );
    userApp = await userAppsModel.findOne({
      userId: userId1,
      appId: appId1,
    });

    expect(userApp.shortcutIds).toHaveLength(0);
    expect(result2.isStarred).toEqual(false);
    expect(result2.stars).toEqual(0);
  });

  it("should toggle multiple users, apps and shortcuts", async () => {
    // user1 & app1
    const user1Shortcut1Result = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId1
    );
    const user1Shortcut2Result = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId2
    );

    // user2 & app2
    const user2Shortcut1Result = await appService.toggleStar(
      userId2,
      appId2,
      app2ShortcutId1
    );
    const user2Shortcut2Result = await appService.toggleStar(
      userId2,
      appId2,
      app2ShortcutId2
    );

    const user1App = await userAppsModel.findOne({
      userId: userId1,
      appId: appId1,
    });

    const user2App = await userAppsModel.findOne({
      userId: userId2,
      appId: appId2,
    });

    expect(user1App.userId).toEqual(userId1);
    expect(user1App.appId).toEqual(appId1);
    expect(user1App.shortcutIds).toHaveLength(2);
    expect(user1App.shortcutIds).toContainEqual(app1ShortcutId1);
    expect(user1App.shortcutIds).toContainEqual(app1ShortcutId2);
    expect(user1Shortcut1Result.stars).toEqual(1);
    expect(user1Shortcut2Result.stars).toEqual(1);

    expect(user2App.userId).toEqual(userId2);
    expect(user2App.appId).toEqual(appId2);
    expect(user2App.shortcutIds).toHaveLength(2);
    expect(user2App.shortcutIds).toContainEqual(app2ShortcutId1);
    expect(user2App.shortcutIds).toContainEqual(app2ShortcutId2);
    expect(user2Shortcut1Result.stars).toEqual(1);
    expect(user2Shortcut1Result.isStarred).toEqual(true);
    expect(user2Shortcut1Result.stars).toEqual(1);
    expect(user2Shortcut1Result.isStarred).toEqual(true);
  });

  it("should add a shortcut to an existing user apps", async () => {
    const result1 = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId1
    );
    const result2 = await appService.toggleStar(
      userId1,
      appId1,
      app1ShortcutId2
    );

    const userApp = await userAppsModel.findOne({
      userId: userId1,
      appId: appId1,
    });

    expect(userApp.userId).toEqual(userId1);
    expect(userApp.appId).toEqual(appId1);
    expect(userApp.shortcutIds).toHaveLength(2);
    expect(userApp.shortcutIds).toContainEqual(app1ShortcutId1);
    expect(userApp.shortcutIds).toContainEqual(app1ShortcutId2);
    expect(result1.stars).toEqual(1);
    expect(result1.isStarred).toEqual(true);
    expect(result2.stars).toEqual(1);
    expect(result2.isStarred).toEqual(true);
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
});
