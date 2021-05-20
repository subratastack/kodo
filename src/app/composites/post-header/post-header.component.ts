import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostHeaderComponent implements OnInit {

  @Input() image: string | undefined = '';

  constructor() { }

  ngOnInit(): void {
  }

}
