import { IAppStore } from "../interfaces/app.store.interface";
import { AppStore } from "../store/store";

export function appStoreFactory(): AppStore {
  return new AppStoreToken({});
}

export class AppStoreToken extends AppStore<IAppStore> {

  constructor(initialState: IAppStore) {
    super(initialState);
  }
}