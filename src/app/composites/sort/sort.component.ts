import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SORTING_SERVICE_DEFAULT_SORTING_KEY } from 'src/app/di-token/sorting.service.token';
import { ISortBy } from 'src/app/interfaces/sorting.interface';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Output() eventOnSortChange: EventEmitter<ISortBy> = new EventEmitter<ISortBy>();

  public sortingKeys: Array<ISortBy> = [];

  public sortForm = new FormGroup({
    sortBy: new FormControl([''])
  });

  constructor(
    @Inject(SORTING_SERVICE_DEFAULT_SORTING_KEY) private DEFAULT_KEYS: Array<ISortBy>,
  ) {
    this.sortingKeys = DEFAULT_KEYS;
  }

  ngOnInit(): void {
  }

  public onChangeSortBy(event: any): void {
    this.sortForm.get('sortBy')?.setValue(event?.target?.value, { onlySelf: true });
    const INDEX = this.sortingKeys.findIndex((item: ISortBy) => item.key === this.sortByValue);
    if (INDEX !== -1) {
      this.eventOnSortChange.emit(this.sortingKeys[INDEX]);
    }
  }

  get sortByValue(): string {
    return this.sortForm.get('sortBy')?.value;
  }

}
