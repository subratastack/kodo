import { Inject, Injectable } from '@angular/core';
import { SORTING_SERVICE_DEFAULT_SORTING_KEY } from '../di-token/sorting.service.token';
import { ISortBy } from '../interfaces/sorting.interface';

@Injectable()
export class SortingService<T = any> {

  private _collection: Array<T> | undefined;
  private _sortBy: Array<ISortBy>;

  constructor(
    @Inject(SORTING_SERVICE_DEFAULT_SORTING_KEY) private readonly DEFAULT_SORTING_KEY: Array<ISortBy>
  ) {
    this._collection = [];
    this._sortBy = DEFAULT_SORTING_KEY;
  }

  public collection(value: Array<T> | undefined): SortingService {
    try {
      this._collection = value;
      return this;
    } catch (error) {
      throw new Error(error);
    }
  }

  public sortBy(value: Array<ISortBy>): SortingService {
    try {
      this._sortBy = value;
      return this;
    } catch (error) {
      throw new Error(error);
    }
  }

  public sort(): Array<T> {
    try {
      this._collection!.sort((a: any, b: any): number => {
        let i: number = 0, result: number = 0;
        while (i < this._sortBy.length && result === 0) {
          const DATE: Date = new Date(a[this._sortBy[i]?.key!]);
          const TYPE: string = DATE instanceof Date && !isNaN(DATE.getTime()) ? 'date' : 'string';
          result = this.getSort(TYPE, a, b, i);
          i++;
        }
        return result;
      });
      return this._collection!;
    } catch (error) {
      throw new Error(error);
    }
  }

  private getSort(type: string, a: any, b: any, i: number): number {
    switch (type) {
      case 'string':
        return this._sortBy[i]?.direction! * (a[this._sortBy[i]?.key!].toString() < b[this._sortBy[i]?.key!].toString() ? -1 : (a[this._sortBy[i]?.key!].toString() > b[this._sortBy[i]?.key!].toString() ? 1 : 0));
      case 'date':
        return this._sortBy[i]?.direction! * (Date.parse(a[this._sortBy[i]?.key!]) - Date.parse(b[this._sortBy[i]?.key!]) ? -1 : (Date.parse(a[this._sortBy[i]?.key!]) - Date.parse(b[this._sortBy[i]?.key!]) ? 1 : 0));
      default:
        return 0;
    }
  }
}
