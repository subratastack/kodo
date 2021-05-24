import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  public eventOnSearchChange(event: string): void {
    try {
      const QUERY_PARAMS: Params = { searchTerm: event };
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: QUERY_PARAMS,
        queryParamsHandling: 'merge',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public eventOnSortChange(event: ISortBy): void {
    try {
      const QUERY_PARAMS: Params = { sort: JSON.stringify(event) };
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: QUERY_PARAMS,
        queryParamsHandling: 'merge',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

}
