import { Routes } from '@angular/router';
import { ChildGuard } from '../../child.guard';

import { ClsComponent } from './cls/cls.component';
import { ReportComponent } from './report/report.component';
import { PlaceComponent } from './place/place.component';
import { DataComponent } from './data/data.component';
import { ThemeComponent } from './theme/theme.component';
import { NoticeComponent } from './notice/notice.component';
import { SuggestComponent } from './suggest/suggest.component';
import { EnrollmentComponent} from './enrollment/enrollment.component';
import { ThemeenrollmentComponent } from './themeenrollment/themeenrollment.component';

export const MapRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cls',
        component: ClsComponent, 
        data: {
          title: '분류관리', 
          urls: [{ title: '스마트지도' }, { title: '분류관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'report',
        component: ReportComponent, 
        data: {
          title: '오류신고 항목관리', 
          urls: [{ title: '스마트지도' }, { title: '오류신고 항목관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'place',
        component: PlaceComponent, 
        data: {
          title: '장소관리', 
          urls: [{ title: '스마트지도' }, { title: '장소관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'data',
        component: DataComponent, 
        data: {
          title: '연계데이터관리', 
          urls: [{ title: '스마트지도' }, { title: '연계데이터관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'theme',
        component: ThemeComponent, 
        data: {
          title: '테마지도관리', 
          urls: [{ title: '스마트지도' }, { title: '테마지도관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'notice',
        component: NoticeComponent, 
        data: {
          title: '공지사항관리', 
          urls: [{ title: '스마트지도' }, { title: '공지사항관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'suggest',
        component: SuggestComponent, 
        data: {
          title: '사용자의견관리', 
          urls: [{ title: '스마트지도' }, { title: '사용자의견관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'enrollment',
        component: EnrollmentComponent, 
        data: {
          title: '장소 등록 / 수정창', 
          urls: [{ title: '스마트지도' }, { title: '장소 등록 / 수정창' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'themeenrollment',
        component: ThemeenrollmentComponent, 
        data: {
          title: '테마지도등록창', 
          urls: [{ title: '스마트지도' }, { title: '테마지도등록창' }]
        }
        ,canActivate: [ ChildGuard ]
      }
    ]
  }
];
