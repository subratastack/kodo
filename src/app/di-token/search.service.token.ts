import { InjectionToken } from "@angular/core";
import { SearchService } from "../services/search.service";

export const SEARCH_SERVICE_DI_TOKEN = new InjectionToken<SearchService>('SEARCH_SERVICE_DI_TOKEN');