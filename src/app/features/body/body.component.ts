import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppStoreToken } from 'src/app/di-token/store.token';
import { IAppStore, IData } from 'src/app/interfaces/app.store.interface';
import { AppStore } from 'src/app/store/store';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public listOfPost: Array<IData> | undefined = [];

  constructor(
    @Inject(AppStoreToken) private appStore: AppStore<IAppStore>
  ) { }

  ngOnInit(): void {
    this.subscribeToStore();
  }

  private subscribeToStore(): void {
    this.appStore.getState()
      .subscribe((store) => {
        this.listOfPost = store?.data;
      })
  }

}
