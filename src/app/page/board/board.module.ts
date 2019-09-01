import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ApplicationComponent } from './application/application.component';
import { InplaceComponent } from './inplace/inplace.component';
import { BillComponent } from './bill/bill.component';
import { AttendComponent } from './attend/attend.component';
import { SurveyComponent } from './survey/survey.component';
import { QnaComponent } from './qna/qna.component';
import { ListRecruitComponent } from './list/recruit/recruit.component';
import { ListEventComponent } from './list/event/event.component';
import { ListCommonComponent } from './list/common/common.component';
import { ListLectureComponent } from './list/lecture/lecture.component';
import { ListSpaceComponent } from './list/space/space.component';
import { ListProdComponent } from './list/prod/prod.component';
import { ListSurveyComponent } from './list/survey/survey.component';

import { BoardRoutes } from './board.routing';
import { ItsmUiModule } from '../../itsm-ui/public_api';
import { ApplDetailComponent } from './application/appl-detail/appl-detail.component';
import { SurveyResultComponent } from './survey/survey-result/survey-result.component';
import { TagInputModule } from 'ngx-chips';
import { BillDetailComponent } from './bill/bill-detail/bill-detail.component';
import { MomentModule } from 'angular2-moment';
import { AttendDetailComponent } from './attend/attend-detail/attend-detail.component';
import { QnaDetailComponent } from './qna/qna-detail/qna-detail.component';
import { CSComponent } from './cs/cs.component';
import { CSDetailComponent } from './cs/cs-detail/cs-detail.component';
import { BoardComponent } from '../group/board/board.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ItsmUiModule,
    MomentModule,
    RouterModule.forChild(BoardRoutes),
    TagInputModule,
  ],
  declarations: [BoardComponent, ListComponent, ApplicationComponent, InplaceComponent, BillComponent, AttendComponent, SurveyComponent, QnaComponent, ApplDetailComponent, ApplDetailComponent, SurveyResultComponent, ListEventComponent, ListCommonComponent, ListRecruitComponent, ListLectureComponent, ListSpaceComponent, ListProdComponent, ListSurveyComponent, BillDetailComponent, AttendDetailComponent, QnaDetailComponent,
  CSComponent, CSDetailComponent]
})
export class BoardModule { }
