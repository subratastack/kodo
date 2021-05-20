import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppStoreToken } from '../di-token/store.token';
import { IAppStore, IData } from '../interfaces/app.store.interface';
import { AppStore } from '../store/store';

@Injectable()
export class AppInitService {

  constructor(
    private Http: HttpClient,
    @Inject(AppStoreToken) private appStore: AppStore
  ) { }

  public async init(): Promise<any> {
    return this.Http.get('assets/mock_data.json')
      .toPromise()
      .then((data) => {
        this.appStore.setState((prevState: IAppStore) => {
          return {
            ...prevState,
            data,
            originalData: data
          }
        });
      });
  }
}
