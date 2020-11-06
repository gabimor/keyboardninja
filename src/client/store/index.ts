import * as api from "@client/api";
import { OSs } from "@defs/OSs.enum";
import { App } from "@defs/schemas/App.schema";
import { AppCategory } from "@defs/schemas/AppCategory.schema";
import { JwtUser } from "@defs/User.type";
import { action, makeObservable, observable } from "mobx";
import { setSelectedOS } from "@client/helpers/osSelect";

export enum LoginModalState {
  None,
  Login,
  Signup,
}

export class Store {
  app: Partial<App>;
  appCategories: AppCategory[];
  os: OSs;
  user: JwtUser;
  loginModalState: LoginModalState;

  constructor({ app, os, appCategories, user }: Partial<Store>) {
    this.app = app;
    this.os = os;
    this.appCategories = appCategories;
    this.user = user;
    this.loginModalState = LoginModalState.None;

    makeObservable(this, {
      app: observable,
      os: observable,
      appCategories: observable,
      user: observable,
      loginModalState: observable,
      setOs: action,
      setLoginModalState: action,
      toggleStar: action,
    });
  }

  setOs(os: OSs) {
    this.os = os;
    setSelectedOS(os);
  }

  setLoginModalState(state: LoginModalState) {
    this.loginModalState = state;
  }

  async toggleStar(shortcutId: string) {
    const shortcut = this.app.shortcuts.find(
      (e) => e._id.toString() === shortcutId.toString()
    );

    shortcut.stars += shortcut.isStarred ? -1 : 1;

    shortcut.isStarred = !shortcut.isStarred;

    await api.toggleStar(this.app._id, shortcutId);
  }
}
