import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SEARCH_SERVICE_DI_TOKEN } from 'src/app/di-token/search.service.token';
import { SORTING_SERVICE_DI_TOKEN } from 'src/app/di-token/sorting.service.token';
import { AppStoreToken } from 'src/app/di-token/store.token';
import { IAppStore, IData } from 'src/app/interfaces/app.store.interface';
import { ISortBy } from 'src/app/interfaces/sorting.interface';
import { SearchService } from 'src/app/services/search.service';
import { SortingService } from 'src/app/services/sorting.service';
import { AppStore } from 'src/app/store/store';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    @Inject(AppStoreToken) private appStore: AppStore<IAppStore>,
    @Inject(SEARCH_SERVICE_DI_TOKEN) private readonly searchService: SearchService<IData>,
    @Inject(SORTING_SERVICE_DI_TOKEN) private readonly sortingService: SortingService<IData>,
  ) { }

  ngOnInit(): void {
    this.subscribeToRouterStream();
  }

  private subscribeToRouterStream(): void {
    this.activatedRoute.queryParams.pipe().subscribe(params => {
      this.filterViewData(params);
    });
  }

  private filterViewData(routeParams: any): void {
    console.log(routeParams);
    if (routeParams?.searchTerm || routeParams?.sort) {
      const SEARCH_TERM: string = routeParams?.searchTerm ? routeParams.searchTerm : null;
      const SORT_OBJECT: ISortBy = routeParams?.sort ? JSON.parse(routeParams.sort) : null;

      let data: Array<IData> | undefined = this.appStore.getStateSnapshot().data;

      if (SEARCH_TERM) {
        data = this.searchService
          .collection(this.appStore.getStateSnapshot().originalData)
          .searchProperties(['name', 'description'])
          .searchTerm(SEARCH_TERM)
          .search();
      }

      if (SORT_OBJECT) {
        data = this.sortingService
          .collection(data)
          .sortBy([SORT_OBJECT])
          .sort()
      }

      this.appStore.setState((prevState: IAppStore) => {
        return {
          ...prevState,
          data,
        }
      })
    }
  }

}
