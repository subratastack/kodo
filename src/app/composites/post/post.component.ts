import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IData } from 'src/app/interfaces/app.store.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {

  @Input() post: IData = {};

  constructor() { }

  ngOnInit(): void {
  }

}
