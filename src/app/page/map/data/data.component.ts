import { Component, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges, DoCheck, Input, Renderer, ViewChild , ElementRef } from '@angular/core';

declare let naver: any;
declare let daum: any;
@Component({
  selector: 'itsm-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
