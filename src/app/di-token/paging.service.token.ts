import { InjectionToken } from "@angular/core";
import { PagingService } from "../services/paging.service";

export const PAGING_SERVICE_DI_TOKEN = new InjectionToken<PagingService>('PAGING_SERVICE_DI_TOKEN');
export const PAGING_OFFSET_DEFAULT_VALUE = new InjectionToken<number>('PAGING_OFFSET_DEFAULT_VALUE');
