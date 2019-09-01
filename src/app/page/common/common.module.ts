import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule as NgCommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonRoutes } from './common.routing';
import { CodeComponent } from './code/code.component';
import { OrganComponent } from './organ/organ.component';
import { FacilityComponent } from './facility/facility.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { BannerComponent } from './banner/banner.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { BeaconComponent } from './beacon/beacon.component';
import { CategoryComponent } from './category/category.component';
import { UsersComponent } from './users/users.component';
import { OfficialComponent } from './official/official.component';
import { CoopComponent } from './coop/coop.component';
import { PropComponent } from './prop/prop.component';
import { AuthComponent } from './auth/auth.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupStatComponent } from './group-stat/group-stat.component';
import { GroupListReviseComponent } from './group-list-revise/group-list-revise.component';
import { ItsmUiModule } from '../../itsm-ui/public_api';
import { MomentModule, DateFormatPipe } from 'angular2-moment';
import { ChartsModule } from 'ng2-charts';
import { DeptClsComponent } from './dept-cls/dept-cls.component';
import { ChnlPostComponent } from './chnl-post/chnl-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfficialDetailComponent } from './official-detail/official-detail.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';

@NgModule({
  imports: [
    NgCommonModule,
    NgbModule,
    FormsModule,
    ItsmUiModule,
    MomentModule,
    ChartsModule,
    RouterModule.forChild(CommonRoutes)
  ],
  declarations: [
    CodeComponent, OrganComponent, FacilityComponent, AppmenuComponent, 
    BannerComponent, MqttComponent, BeaconComponent, CategoryComponent, UsersComponent, 
    OfficialComponent, CoopComponent, PropComponent, AuthComponent, GroupListComponent, 
    GroupStatComponent, GroupListReviseComponent, DeptClsComponent,
    ChnlPostComponent, DashboardComponent, UsersDetailComponent, OfficialDetailComponent ],
  providers: [ DateFormatPipe ]
})
export class CommonModule { }
