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

describe.only("app service", () => {
  let mongod: MongoMemoryServer;
  let userAppsModel: Model<UserApps>;
  let appService: AppService;

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
        ]),
      ],
      providers: [AppService],
    }).compile();

    userAppsModel = module.get<Model<UserApps>>(getModelToken(UserApps.name));
    appService = module.get<AppService>(AppService);
  });

  beforeEach(async () => {
    await userAppsModel.db.dropDatabase();
  });

  afterAll(async () => {
    await mongod.stop();
  });

  it("should add a shortcut to a non-existing user apps", async () => {
    const userId = new ObjectId();
    const appId = new ObjectId();
    const shortcutId1 = new ObjectId();
    const shortcutId2 = new ObjectId();

    await appService.starShortcut(userId, appId, shortcutId1);
    await appService.starShortcut(userId, appId, shortcutId2);
    await appService.starShortcut(userId, appId, shortcutId2);

    const userApps = await userAppsModel.find({}).lean();

    expect(userApps).toHaveLength(1);
    expect(userApps[0]._id).toEqual(userId);
    expect(userApps[0].apps).toHaveLength(1);
    expect(userApps[0].apps[0]._id).toEqual(appId);
    expect(userApps[0].apps[0].shortcutIds).toHaveLength(2);
    expect(userApps[0].apps[0].shortcutIds).toContainEqual(shortcutId1);
    expect(userApps[0].apps[0].shortcutIds).toContainEqual(shortcutId2);
  });

  it("should add a shortcut to an existing user apps", async () => {
    const userId = new ObjectId();
    const appId = new ObjectId();
    const shortcutId1 = new ObjectId();
    const shortcutId2 = new ObjectId();

    await userAppsModel.create({
      _id: userId,
      apps: [
        {
          _id: appId,
          shortcutIds: [shortcutId1],
        },
      ],
    });

    await appService.starShortcut(userId, appId, shortcutId1);
    await appService.starShortcut(userId, appId, shortcutId2);

    const userApps = await userAppsModel.find({}).lean();

    expect(userApps).toHaveLength(1);
    expect(userApps[0]._id).toEqual(userId);
    expect(userApps[0].apps).toHaveLength(1);
    expect(userApps[0].apps[0]._id).toEqual(appId);
    expect(userApps[0].apps[0].shortcutIds).toHaveLength(2);
    expect(userApps[0].apps[0].shortcutIds).toContainEqual(shortcutId1);
    expect(userApps[0].apps[0].shortcutIds).toContainEqual(shortcutId2);
  });

  it.todo("should delete an existing shortcut from a userApps");

  it.todo("should delete an existing shortcut from a userApps only once");

  it.todo("should ignore deleting a non existin shortcut from existing app");

  it.todo("should ignore deleting from a non existing user");

  it.todo("should ignore deleting a non existing shortcut from existing app");

  it.todo("should throw if a no user with userId");
  it.todo("should throw if a no app with appId");
  it.todo("should throw if a no shortcut with shortcutId");
});
