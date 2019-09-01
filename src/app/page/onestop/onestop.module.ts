import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItsmUiModule } from '../../itsm-ui/public_api';
import { SafeHtmlPipeModule } from '../../pipe/safe-html/safe-html.module';
import { MomentModule, DateFormatPipe } from 'angular2-moment';

import { OnestopRoutes } from './onestop.routing';

import { MyListComponent } from './my-list/list.component';
import { AddMenualComponent } from './add-menual/add-menual.component';
import { SearchMenualComponent } from './search-menual/search-menual.component';
import { DutyComponent } from './duty/duty.component';
import { TurnReportComponent } from './turn-report/turn-report.component';
import { OnestopListComponent } from './list/list.component';
import { UrbanComponent } from './urban/urban.component';
import { EndConsultComponent } from './end-consult/end-consult.component';
import { MyTurnReportComponent } from './my-turn-report/turn-report.component';
import { ReceiptComponent } from './receipt/receipt.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ItsmUiModule,
    SafeHtmlPipeModule, 
    MomentModule, 
    RouterModule.forChild(OnestopRoutes)
  ],
  declarations: [MyListComponent, AddMenualComponent, SearchMenualComponent, DutyComponent, TurnReportComponent, OnestopListComponent, UrbanComponent, 
                EndConsultComponent, MyTurnReportComponent, ReceiptComponent],
  providers: [ DateFormatPipe ]
})
export class OnestopModule { }

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { SafeHtmlPipeModule } from '../../pipe/safe-html/safe-html.module';
// import { MomentModule, DateFormatPipe } from 'angular2-moment';
// import { ItsmUiModule } from '../../itsm-ui/public_api';

// import { OnestopRoutes } from './onestop.routing';
// import { MyListComponent } from './my-list/list.component';
// import { AddMenualComponent } from './add-menual/add-menual.component';
// import { SearchMenualComponent } from './search-menual/search-menual.component';
// import { DutyComponent } from './duty/duty.component';
// import { TurnReportComponent } from './turn-report/turn-report.component';
// import { OnestopListComponent } from './list/list.component';
// import { UrbanComponent } from './urban/urban.component';
// import { EndConsultComponent } from './end-consult/end-consult.component';
// import { MyTurnReportComponent } from './my-turn-report/turn-report.component';
// import { ReceiptComponent } from './receipt/receipt.component';

// import { TestComponent } from './test/test.component'
// import { Test2Component } from './test2/test2.component';
// import { Test3Component } from './test3/test3.component';
// import { Test4Component } from './test4/test4.component';
// import { Test5Component } from './test5/test5.component';
// import { Test6Component } from './test6/test6.component';
// @NgModule({
//   imports: [
//     CommonModule,
//     NgbModule,
//     FormsModule,
//     ItsmUiModule,
//     SafeHtmlPipeModule, 
//     MomentModule, 
//     RouterModule.forChild(OnestopRoutes)
//   ],
//   declarations: [MyListComponent, AddMenualComponent, SearchMenualComponent, DutyComponent, TurnReportComponent, OnestopListComponent, UrbanComponent, 
//                 EndConsultComponent, MyTurnReportComponent, ReceiptComponent, TestComponent, Test2Component, Test3Component, Test4Component, Test5Component, Test6Component],
//   providers: [ DateFormatPipe ]
// })
// export class OnestopModule { }
