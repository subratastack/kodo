import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SORTING_SERVICE_DEFAULT_SORTING_KEY, SORTING_SERVICE_DI_TOKEN } from './di-token/sorting.service.token';
import { SearchComponent } from './composites/search/search.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './features/header/header.component';
import { SEARCH_SERVICE_DI_TOKEN } from './di-token/search.service.token';
import { SearchService } from './services/search.service';
import { SortingService } from './services/sorting.service';
import { appStoreFactory, AppStoreToken } from './di-token/store.token';
import { AppInitService } from './services/app-init.service';
import { BodyComponent } from './features/body/body.component';
import { PostComponent } from './composites/post/post.component';
import { PostHeaderComponent } from './composites/post-header/post-header.component';
import { PostBodyComponent } from './composites/post-body/post-body.component';
import { SortComponent } from './composites/sort/sort.component';

export function initialApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    BodyComponent,
    PostComponent,
    PostHeaderComponent,
    PostBodyComponent,
    SortComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: SORTING_SERVICE_DEFAULT_SORTING_KEY,
      useValue: [
        {
          key: 'name',
          direction: 1,
          text: 'Name',
        },
        {
          key: 'dateLastEdited',
          direction: 1,
          text: 'Last Edited',
        }
      ]
    },
    {
      provide: SEARCH_SERVICE_DI_TOKEN,
      useClass: SearchService
    },
    {
      provide: SORTING_SERVICE_DI_TOKEN,
      useClass: SortingService
    },
    {
      provide: AppStoreToken,
      useFactory: appStoreFactory
    },
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initialApp,
      deps: [AppInitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
