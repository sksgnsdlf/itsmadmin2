import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ApplicationComponent } from './application/application.component';
import { InplaceComponent } from './inplace/inplace.component';
import { BillComponent } from './bill/bill.component';
import { AttendComponent } from './attend/attend.component';
import { SurveyComponent } from './survey/survey.component';
import { QnaComponent } from './qna/qna.component';
import { ListCommonComponent } from './list/common/common.component';
import { ListEventComponent } from './list/event/event.component';
import { ListRecruitComponent } from './list/recruit/recruit.component';
import { ListLectureComponent } from './list/lecture/lecture.component';
import { ListSpaceComponent } from './list/space/space.component';
import { ListProdComponent } from './list/prod/prod.component';
import { ListSurveyComponent } from './list/survey/survey.component';
import { ApplDetailComponent } from './application/appl-detail/appl-detail.component';
import { SurveyResultComponent } from './survey/survey-result/survey-result.component';
import { BillDetailComponent } from './bill/bill-detail/bill-detail.component';
import { AttendDetailComponent } from './attend/attend-detail/attend-detail.component';
import { QnaDetailComponent } from './qna/qna-detail/qna-detail.component';
import { ChildGuard } from '../../child.guard';
import { CSComponent } from './cs/cs.component';
import { CSDetailComponent } from './cs/cs-detail/cs-detail.component';
import { BoardComponent } from '../group/board/board.component';

export const BoardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'board',
        component: BoardComponent,
        data: {
          title: '게시판 생성',
          urls: [{ title: '단체관리' }, { title: '게시판 생성' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: '게시물 목록',
          urls: [{ title: '게시물관리' }, { title: '게시물 목록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list/common',
        component: ListCommonComponent,
        data: {
          title: '게시물 추가 / 수정 (공지)',
          urls: [{ title: '게시물관리' }, { title: '게시물 목록' , url: '/board/list'} ,{ title: '게시물 추가 / 수정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list/recruit',
        component: ListRecruitComponent,
        data: {
          title: '게시물 추가 / 수정 (모집)',
          urls: [{ title: '게시물관리' }, { title: '게시물 목록' , url: '/board/list'} , { title: '게시물 추가 / 수정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list/event',
        component: ListEventComponent,
        data: {
          title: '게시물 추가 / 수정 (행사안내)',
          urls: [{ title: '게시물관리' }, { title: '게시물 목록' , url: '/board/list'} , { title: '게시물 추가 / 수정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list/lecture',
        component: ListLectureComponent,
        data: {
          title: '게시물 추가 / 수정 (교육강좌)',
          urls: [{ title: '게시물관리' }, { title: '게시물 목록' , url: '/board/list'} , { title: '게시물 추가 / 수정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list/space',
        component: ListSpaceComponent,
        data: {
          title: '게시물 추가 / 수정 (시설공간안내)',
          urls: [{ title: '게시물관리' }, { title: '게시물 목록' , url: '/board/list'} , { title: '게시물 추가 / 수정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list/prod',
        component: ListProdComponent,
        data: {
          title: '게시물 추가 / 수정 (상품안내)',
          urls: [{ title: '게시물관리' }, { title: '게시물 목록' , url: '/board/list'} , { title: '게시물 추가 / 수정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list/survey',
        component: ListSurveyComponent,
        data: {
          title: '게시물 추가 / 수정 (설문조사)',
          urls: [{ title: '게시물관리' }, { title: '게시물 목록' , url: '/board/list'} , { title: '게시물 추가 / 수정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'application',
        component: ApplicationComponent,
        data: {
          title: '신청·접수 내역',
          urls: [{ title: '게시물관리' }, { title: '신청·접수 내역' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'application/detail',
        component: ApplDetailComponent,
        data: {
          title: '신청·접수자 명단',
          urls: [{ title: '게시물관리' }, { title: '신청·접수 내역', url: '/board/application' }, { title: '신청·접수자 명단' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'inplace',
        component: InplaceComponent,
        data: {
          title: '시설·공간 예약내역',
          urls: [{ title: '게시물관리' }, { title: '시설·공간 예약내역' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'bill',
        component: BillComponent,
        data: {
          title: '결제내역',
          urls: [{ title: '게시물관리' }, { title: '결제내역' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'bill/detail',
        component: BillDetailComponent,
        data: {
          title: '결제자 목록',
          urls: [{ title: '게시물관리' }, { title: '결제내역', url: '/board/bill'  }, { title: '결제자 목록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'attend',
        component: AttendComponent,
        data: {
          title: '참여·출결 관리',
          urls: [{ title: '게시물관리' }, { title: '참여·출결 관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'attend/detail',
        component: AttendDetailComponent,
        data: {
          title: '참여내역',
          urls: [{ title: '게시물관리' }, { title: '참여·출결 관리', url: '/board/attend'  }, { title: '참여내역' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'survey',
        component: SurveyComponent,
        data: {
          title: '설문내역',
          urls: [{ title: '게시물관리' }, { title: '설문내역' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'survey/result',
        component: SurveyResultComponent,
        data: {
          title: '설문결과',
          urls: [{ title: '게시물관리' }, { title: '설문내역' , url: '/board/survey' }, { title: '설문결과' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'qna',
        component: QnaComponent,
        data: {
          title: '묻고답하기',
          urls: [{ title: '게시물관리' }, { title: '묻고답하기' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'qna/detail',
        component: QnaDetailComponent,
        data: {
          title: '질문내역',
          urls: [{ title: '게시물관리' }, { title: '묻고답하기'  , url: '/board/qna' }, { title: '질문내역'}]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'cs',
        component: CSComponent,
        data: {
          title: '만족도내역',
          urls: [{ title: '게시물관리' }, { title: '만족도내역' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'cs/detail',
        component: CSDetailComponent,
        data: {
          title: '만족도내역',
          urls: [{ title: '게시물관리' }, { title: '만족도내역'  , url: '/board/cs' }, { title: '만족도내역'}]
        }
        ,canActivate: [ ChildGuard ]
      }
    ]
  }
];
