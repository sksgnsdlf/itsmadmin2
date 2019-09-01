import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'itsm-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goback() {
    this.router.navigate(['map/themeenrollment'])
  }
}
