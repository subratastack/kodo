import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PAGING_SERVICE_DI_TOKEN } from 'src/app/di-token/paging.service.token';
import { SEARCH_SERVICE_DI_TOKEN } from 'src/app/di-token/search.service.token';
import { SORTING_SERVICE_DI_TOKEN } from 'src/app/di-token/sorting.service.token';
import { AppStoreToken } from 'src/app/di-token/store.token';
import { IAppStore, IData } from 'src/app/interfaces/app.store.interface';
import { IPaging, IPagingMeta } from 'src/app/interfaces/paging.interface';
import { ISortBy } from 'src/app/interfaces/sorting.interface';
import { PagingService } from 'src/app/services/paging.service';
import { SearchService } from 'src/app/services/search.service';
import { SortingService } from 'src/app/services/sorting.service';
import { AppStore } from 'src/app/store/store';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  public paginationMeta: IPagingMeta | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    @Inject(AppStoreToken) private appStore: AppStore<IAppStore>,
    @Inject(SEARCH_SERVICE_DI_TOKEN) private readonly searchService: SearchService<IData>,
    @Inject(SORTING_SERVICE_DI_TOKEN) private readonly sortingService: SortingService<IData>,
    @Inject(PAGING_SERVICE_DI_TOKEN) private readonly pagingService: PagingService<IData>,
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

    let data: Array<IData> | undefined = this.appStore.getStateSnapshot().originalData;
    const PAGING: number | string = routeParams?.page ? routeParams.page : 1;

    if (routeParams?.searchTerm || routeParams?.sort) {
      const SEARCH_TERM: string = routeParams?.searchTerm ? routeParams.searchTerm : null;
      const SORT_OBJECT: ISortBy = routeParams?.sort ? JSON.parse(routeParams.sort) : null;

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
    }

    const PAGINATED_DATA: IPaging = this.pagingService
      .collection(data)
      .pageNo(Number(PAGING))
      .paging();

    this.paginationMeta = { ...PAGINATED_DATA?.meta };

    this.appStore.setState((prevState: IAppStore) => {
      return {
        ...prevState,
        data: PAGINATED_DATA?.collection,
        pagingConfig: {
          ...prevState.pagingConfig,
          pageNo: PAGINATED_DATA?.meta?.pageNo,
          offset: PAGINATED_DATA?.meta?.offset
        }
      }
    })
  }

  public onPrevClick(): void {
    const PAGING: number = this.paginationMeta!.pageNo! > 1 ? --this.paginationMeta!.pageNo! : 1;
    try {
      this.routeUrl(PAGING);
    } catch (error) {
      throw new Error(error);
    }
  }

  public onNextClick(): void {
    try {
      if (this.paginationMeta!.pageNo! * this.paginationMeta!.offset! < this.paginationMeta!.totalRecord! && this.paginationMeta!.totalRecord!) {
        const PAGING: number = ++this.paginationMeta!.pageNo!;
        this.routeUrl(PAGING);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  private routeUrl(page: number): void {
    const QUERY_PARAMS: Params = { page }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: QUERY_PARAMS,
      queryParamsHandling: 'merge',
    });
  }

}
