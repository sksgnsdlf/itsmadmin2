import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { ORGAN_ROUTES } from './organ-menu-items';

import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticatedHttpService } from '../../services/auth.http.service';
import { LoginSession } from '../../services/login.session';
import * as _ from 'lodash';
import { Location } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }
  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private auth: LoginSession, public location: Location) { }
  // End open close
  ngOnInit() {
    this.menuAdjust();
    // this.sidebarnavItems = ROUTES;
  }
  menuAdjust() {
    let full_url = location.href;
    let organ_path = _.map(ORGAN_ROUTES.filter(_ => _), 'path');

    this.sidebarnavItems = _.cloneDeep(ROUTES.filter(sidebarnavItem => sidebarnavItem)); // 이 부분이 사이드바 출력시켜주는듯
    let menu_up_links: any = this.auth.profile.menu_up_links;
    let menu_down_links: any = this.auth.profile.menu_down_links;
    let path_up_links = _.map(menu_up_links, 'path');
    let path_down_links = _.map(menu_down_links, 'path');
    this.sidebarnavItems = this.sidebarnavItems.filter(_ => path_up_links.includes(_.path));
    for (let element of this.sidebarnavItems) {
      let matched = menu_up_links.find(x => x.path == element.path)
      element.title = matched.menu_nm;
      element.linkpath = matched.linkpath;
      element.submenu = element.submenu.filter(_ => path_down_links.includes(_.path));
      // if (full_url.includes('localhost')) {
      if (full_url.includes('/admin')) {
        element.submenu = element.submenu.filter(_ => organ_path.includes(_.path));
      }
      for (let subelement of element.submenu) {
        subelement.title = menu_down_links.find(x => x.path == subelement.path).menu_nm;
      }
    }
  }
}
