import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() eventOnSearchChange: EventEmitter<string> = new EventEmitter<string>();

  public searchForm = new FormGroup({
    searchPhrase: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get searchPhraseValue(): string {
    return this.searchForm.get('searchPhrase')?.value;
  }

  public onSearchSubmit(): void {
    this.eventOnSearchChange.emit(this.searchPhraseValue);
  }

}
