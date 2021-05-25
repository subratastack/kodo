export interface IPaging<T = any> {
  collection?: Array<T> | undefined;
  meta?: IPagingMeta;
}

export interface IPagingMeta {
  pageNo?: number;
  offset?: number;
  startRecord?: number;
  endRecord?: number;
  totalRecord?: number;
}