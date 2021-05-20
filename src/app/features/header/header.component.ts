import { Component, Inject, OnInit } from '@angular/core';
import { SEARCH_SERVICE_DI_TOKEN } from 'src/app/di-token/search.service.token';
import { SORTING_SERVICE_DI_TOKEN } from 'src/app/di-token/sorting.service.token';
import { AppStoreToken } from 'src/app/di-token/store.token';
import { IAppStore, IData } from 'src/app/interfaces/app.store.interface';
import { ISortBy } from 'src/app/interfaces/sorting.interface';
import { SearchService } from 'src/app/services/search.service';
import { SortingService } from 'src/app/services/sorting.service';
import { AppStore } from 'src/app/store/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    @Inject(AppStoreToken) private appStore: AppStore<IAppStore>,
    @Inject(SEARCH_SERVICE_DI_TOKEN) private searchService: SearchService<IData>,
    @Inject(SORTING_SERVICE_DI_TOKEN) private sortingService: SortingService<IData>,
  ) { }

  ngOnInit(): void {
  }

  public eventOnSearchChange(event: string): void {
    try {
      this.appStore.setState((prevState: IAppStore) => {
        return {
          ...prevState,
          data: this.searchService
            .collection(this.appStore.getStateSnapshot().originalData)
            .searchProperties(['name', 'description'])
            .searchTerm(event)
            .search()
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  public eventOnSortChange(event: ISortBy): void {
    try {
      this.appStore.setState((prevState: IAppStore) => {
        return {
          ...prevState,
          data: this.sortingService
            .collection(this.appStore.getStateSnapshot().originalData)
            .sortBy([event])
            .sort()
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

}
