import { InjectionToken } from "@angular/core";
import { ISortBy } from "../interfaces/sorting.interface";
import { SortingService } from "../services/sorting.service";

export const SORTING_SERVICE_DI_TOKEN = new InjectionToken<SortingService>('SORTING_SERVICE_DI_TOKEN');
export const SORTING_SERVICE_DEFAULT_SORTING_KEY = new InjectionToken<Array<ISortBy>>('SORTING_SERVICE_DEFAULT_SORTING_KEY');