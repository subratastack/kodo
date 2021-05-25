export interface IAppStore {
  data?: Array<IData>;
  originalData?: Array<IData>;
  pagingConfig?: IPagingConfig;
}

export interface IData {
  name?: string;
  image?: string;
  description?: string;
  dateLastEdited?: string;
}

export interface IPagingConfig {
  pageNo?: number;
  offset?: number;
}