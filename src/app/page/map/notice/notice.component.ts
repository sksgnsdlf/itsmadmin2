import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'itsm-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goback() {
    this.router.navigate(['onestop/mylist'])
  }
}
