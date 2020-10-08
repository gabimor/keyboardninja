import { OSs } from "@src/types/OSs.enum";
import { App } from "@src/types/schemas/App.schema";
import { AppCategory } from "@src/types/schemas/AppCategory.schema";
import { JwtUser } from "@src/types/User.type";
import { action, makeObservable, observable } from "mobx";

export class Store {
  app: Partial<App>;
  appCategories: AppCategory[];
  os: OSs;
  user: JwtUser;

  constructor({ app, os, appCategories, user }: Partial<Store>) {
    this.app = app;
    this.os = os;
    this.appCategories = appCategories;
    this.user = user;

    makeObservable(this, {
      app: observable,
      os: observable,
      appCategories: observable,
      user: observable,
      setOs: action,
      toggleStar: action,
    });
  }

  setOs(os: OSs) {
    this.os = os;
  }

  toggleStar(shortcutId: string) {
    const shortcut = this.app.shortcuts.find(
      (e) => e._id.toString() === shortcutId.toString()
    );

    shortcut.isStarred = !shortcut.isStarred;
  }
}
