import { Inject, Injectable } from '@angular/core';
import { PAGING_OFFSET_DEFAULT_VALUE } from '../di-token/paging.service.token';
import { IPaging } from '../interfaces/paging.interface';

@Injectable()
export class PagingService<T = any> {

  private _collection: Array<T> | undefined;
  private _pageNo: number;
  private _offset: number;

  constructor(
    @Inject(PAGING_OFFSET_DEFAULT_VALUE) private readonly pagingOffsetDefault: number
  ) {
    this._collection = [];
    this._pageNo = 0;
    this._offset = this.pagingOffsetDefault
  }

  public collection(value: Array<T> | undefined): PagingService {
    this._collection = value;
    return this;
  }

  public pageNo(value: number): PagingService {
    this._pageNo = value;
    return this;
  }

  public offset(value: number): PagingService {
    this._offset = value;
    return this;
  }

  public paging(): IPaging<T> {
    try {
      return {
        collection: this._collection!.slice((this._pageNo - 1) * this._offset, this._pageNo * this._offset),
        meta: {
          pageNo: this._pageNo,
          offset: this._offset,
          startRecord: ((this._pageNo - 1) * this._offset) + 1,
          endRecord: (this._pageNo * this._offset) >= this._collection!.length ? this._collection?.length : (this._pageNo * this._offset),
          totalRecord: this._collection!.length
        }
      };
    } catch (error) {
      return error;
    }
  }
}
