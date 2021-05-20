export interface IAppStore {
  data?: Array<IData>;
  originalData?: Array<IData>;
}

export interface IData {
  name?: string;
  image?: string;
  description?: string;
  dateLastEdited?: string;
}