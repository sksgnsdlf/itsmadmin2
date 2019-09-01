import { Routes } from '@angular/router';
import { ChildGuard } from '../../child.guard';
import { MyListComponent } from './my-list/list.component';
import { AddMenualComponent } from './add-menual/add-menual.component';
import { SearchMenualComponent } from './search-menual/search-menual.component';
import { DutyComponent } from './duty/duty.component';
import { TurnReportComponent } from './turn-report/turn-report.component';
import { OnestopListComponent } from './list/list.component';
import { UrbanComponent } from './urban/urban.component';
import { MyTurnReportComponent } from './my-turn-report/turn-report.component';

export const OnestopRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'menual/add',
        component: AddMenualComponent,
        data: {
          title: '당직 매뉴얼 관리',
          urls: [{ title: '바로응답' }, { title: '당직 매뉴얼 관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'menual',
        component: SearchMenualComponent,
        data: {
          title: '당직 매뉴얼 검색',
          urls: [{ title: '바로응답' }, { title: '당직 매뉴얼 검색' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'duty',
        component: DutyComponent,
        data: {
          title: '당직근무자',
          urls: [{ title: '바로응답' }, { title: '당직근무자' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'report',
        component: TurnReportComponent,
        data: {
          title: '바로응답접수',
          urls: [{ title: '바로응답' }, { title: '바로응답접수' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'list',
        component: OnestopListComponent,
        data: {
          title: '바로응답접수목록',
          urls: [{ title: '바로응답' }, { title: '바로응답접수목록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'urban',
        component: UrbanComponent,
        data: {
          title: '도시재생참여목록',
          urls: [{ title: '바로응답' }, { title: '도시재생참여목록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'mylist',
        component: MyListComponent,
        data: {
          title: '불편신고처리',
          urls: [{ title: '바로응답' }, { title: '불편신고처리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'myreport',
        component: MyTurnReportComponent,
        data: {
          title: '불편신고처리',
          urls: [{ title: '바로응답' }, { title: '불편신고처리' }]
        }
        ,canActivate: [ ChildGuard ]
      }
    ]
  }
];
// import { Routes } from '@angular/router';
// import { ChildGuard } from '../../child.guard';
// import { MyListComponent } from './my-list/list.component';
// import { AddMenualComponent } from './add-menual/add-menual.component';
// import { SearchMenualComponent } from './search-menual/search-menual.component';
// import { DutyComponent } from './duty/duty.component';
// import { TurnReportComponent } from './turn-report/turn-report.component';
// import { OnestopListComponent } from './list/list.component';
// import { UrbanComponent } from './urban/urban.component';
// import { MyTurnReportComponent } from './my-turn-report/turn-report.component';
// import { TestComponent } from './test/test.component';
// import { Test2Component } from './test2/test2.component';
// import { Test3Component } from './test3/test3.component';
// import { Test4Component } from './test4/test4.component';
// import { Test5Component } from './test5/test5.component';
// import { Test6Component } from './test6/test6.component';

// export const OnestopRoutes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: 'menual/add',
//         // 임시로 바꿔서 테스트중
//         // component: AddMenualComponent,
//         component: TestComponent, 
//         data: {
//           // 임시로 바꿔서 테스트중
//           // title: '당직 매뉴얼 관리',
//           title: '분류관리', 
//           urls: [{ title: '바로응답' }, { title: '당직 매뉴얼 관리' }]
//         }
//         ,canActivate: [ ChildGuard ]
//       },
//       {
//         path: 'menual',
//         // 임시로 바꿔서 테스트중
//         // component: SearchMenualComponent,
//         component: Test2Component, 
//         data: {
//           // 임시로 바꿔서 테스트중
//           // title: '당직 매뉴얼 검색',
//           title: '장소관리',  
//           urls: [{ title: '바로응답' }, { title: '당직 매뉴얼 검색' }]
//         }
//         ,canActivate: [ ChildGuard ]
//       },
//       {
//         path: 'duty',
//         // 임시로 바꿔서 테스트중
//         // component: DutyComponent,
//         component: Test3Component, 
//         data: {
//           // 임시로 바꿔서 테스트중
//           // title: '당직근무자',
//           title: '장소등록', 
//           urls: [{ title: '바로응답' }, { title: '당직근무자' }]
//         }
//         ,canActivate: [ ChildGuard ]
//       },
//       {
//         path: 'report',
//         component: TurnReportComponent,
//         data: {
//           title: '바로응답접수',
//           urls: [{ title: '바로응답' }, { title: '바로응답접수' }]
//         }
//         ,canActivate: [ ChildGuard ]
//       },
//       {
//         path: 'list',
//         // 임시로 바꿔서 테스트중
//         // component: OnestopListComponent,
//         component: Test4Component,
//         data: {
//           // 임시로 바꿔서 테스트중
//           // title: '바로응답접수목록', 
//           title: '연계데이터관리',
//           urls: [{ title: '바로응답' }, { title: '바로응답접수목록' }]
//         }
//         ,canActivate: [ ChildGuard ]
//       },
//       {
//         path: 'urban',
//         // 임시로 바꿔서 테스트중
//         // component: UrbanComponent,
//         component: Test5Component,
//         data: {
//           // title: '도시재생참여목록',
//           title: '테마지도관리',
//           urls: [{ title: '바로응답' }, { title: '도시재생참여목록' }]
//         }
//         ,canActivate: [ ChildGuard ]
//       },
//       {
//         path: 'mylist',
//         component: Test6Component,
//         // component: MyListComponent,
//         data: {
//           title: '테마지도등록',
//           // title: '불편신고처리',
//           urls: [{ title: '바로응답' }, { title: '불편신고처리' }]
//         }
//         ,canActivate: [ ChildGuard ]
//       },
//       {
//         path: 'test',
//         // 임시로 바꿔서 테스트중
//         // component: AddMenualComponent,
//         component: TestComponent, 
//         data: {
//           // 임시로 바꿔서 테스트중
//           // title: '당직 매뉴얼 관리',
//           title: 'ㄷㄷㄷ', 
//           urls: [{ title: 'ㄷㄷㄷㄷㄷ' }, { title: 'ㄷㄷㄷㄷㄷㄷ' }]
//         }
//         ,canActivate: [ ChildGuard ]
//       }
//     ]
//   }
// ];
