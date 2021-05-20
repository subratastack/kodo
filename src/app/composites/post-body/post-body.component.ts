import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IPostBody } from 'src/app/interfaces/post-body.interface';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostBodyComponent implements OnInit {

  @Input() content: IPostBody = {};

  constructor() { }

  ngOnInit(): void {
  }

}
