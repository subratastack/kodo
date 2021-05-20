import { Injectable } from '@angular/core';

@Injectable()
export class SearchService<T = any> {

  private _searchTerm: string;
  private _collection: Array<T> | undefined;
  private _searchProperties: Array<string>;

  constructor() {
    this._searchTerm = '';
    this._collection = [];
    this._searchProperties = [];
  }

  public searchTerm(value: string): SearchService {
    this._searchTerm = value;
    return this;
  }

  public collection(value: Array<T> | undefined): SearchService {
    this._collection = value;
    return this;
  }

  public searchProperties(value: Array<string>): SearchService {
    this._searchProperties = value;
    return this;
  }

  public search(): Array<T> {
    try {
      const EXACT_MATCH_SEARCH: boolean = this._searchTerm.startsWith('"') && this._searchTerm.endsWith('"');
      const PATTERN: RegExp | null = EXACT_MATCH_SEARCH ? null : new RegExp('(?=.*' + this._searchTerm.split(/\,|\s/).join(')(?=.*') + ')', 'gi');
      return this._collection!.filter((item: any) => {
        let isMatch: boolean = false;
        if (PATTERN) {
          this._searchProperties.forEach((prop: any) => {
            isMatch = !isMatch ? PATTERN.test(item[prop].toLowerCase()) ? true : false : true;
          });
        } else {
          this._searchProperties.forEach((prop: any) => {
            const SEARCH_TERM = this._searchTerm.replace(/['"]+/g, '');
            isMatch = !isMatch ? item[prop].toLowerCase().match(SEARCH_TERM.toLowerCase()) !== null ? true : false : true;
          });
        }
        return isMatch;
      });
    } catch (error) {
      return error;
    }
  }
}
