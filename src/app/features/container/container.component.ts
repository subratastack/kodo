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
    const SEARCH_TERM: string = routeParams?.searchTerm ? routeParams.searchTerm : null;
    const SORT_OBJECT: ISortBy = routeParams?.sort ? JSON.parse(routeParams.sort) : null;

    data = SEARCH_TERM ? this.delegateToSearchService(data, SEARCH_TERM) : data;

    data = SORT_OBJECT ? this.delegateToSortingService(data, SORT_OBJECT) : data;

    const PAGINATED_DATA: IPaging = this.delegateToPagingService(data, Number(PAGING));

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

  private delegateToSortingService(data: Array<IData> | undefined, sortObject: ISortBy): Array<IData> {
    try {
      return this.sortingService
      .collection(data)
      .sortBy([sortObject])
      .sort()
    } catch (error) {
      return error;
    }
  }
  
  private delegateToSearchService(data: Array<IData> | undefined, searchTerm: string): Array<IData> {
    try {
      return this.searchService
      .collection(this.appStore.getStateSnapshot().originalData)
      .searchProperties(['name', 'description'])
      .searchTerm(searchTerm)
      .search();
    } catch (error) {
      return error;
    }
  }

  private delegateToPagingService(data: Array<IData> | undefined, pageNo: number): IPaging {
    try {
      return this.pagingService
      .collection(data)
      .pageNo(pageNo)
      .paging();
    } catch (error) {
      return error;
    }
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
