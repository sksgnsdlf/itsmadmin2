import { Routes } from '@angular/router';
import { ChildGuard } from '../../child.guard';

import { ClsComponent } from './cls/cls.component';
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
        // 임시로 바꿔서 테스트중
        // component: AddMenualComponent,
        component: ClsComponent, 
        data: {
          // 임시로 바꿔서 테스트중
          // title: '당직 매뉴얼 관리',
          title: '분류관리', 
          urls: [{ title: '스마트지도' }, { title: '분류관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'place',
        // 임시로 바꿔서 테스트중
        // component: AddMenualComponent,
        component: PlaceComponent, 
        data: {
          // 임시로 바꿔서 테스트중
          // title: '당직 매뉴얼 관리',
          title: '장소관리', 
          urls: [{ title: '스마트지도' }, { title: '장소관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'data',
        // 임시로 바꿔서 테스트중
        // component: AddMenualComponent,
        component: DataComponent, 
        data: {
          // 임시로 바꿔서 테스트중
          // title: '당직 매뉴얼 관리',
          title: '연계데이터관리', 
          urls: [{ title: '스마트지도' }, { title: '연계데이터관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'theme',
        // 임시로 바꿔서 테스트중
        // component: AddMenualComponent,
        component: ThemeComponent, 
        data: {
          // 임시로 바꿔서 테스트중
          // title: '당직 매뉴얼 관리',
          title: '테마지도관리', 
          urls: [{ title: '스마트지도' }, { title: '테마지도관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'notice',
        // 임시로 바꿔서 테스트중
        // component: AddMenualComponent,
        component: NoticeComponent, 
        data: {
          // 임시로 바꿔서 테스트중
          // title: '당직 매뉴얼 관리',
          title: '공지사항관리', 
          urls: [{ title: '스마트지도' }, { title: '공지사항관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'suggest',
        // 임시로 바꿔서 테스트중
        // component: AddMenualComponent,
        component: SuggestComponent, 
        data: {
          // 임시로 바꿔서 테스트중
          // title: '당직 매뉴얼 관리',
          title: '사용자의견관리', 
          urls: [{ title: '스마트지도' }, { title: '사용자의견관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'enrollment',
        component: EnrollmentComponent, 
        data: {
          // title: '당직 매뉴얼 관리',
          title: '장소 등록 / 수정창', 
          urls: [{ title: '스마트지도' }, { title: '장소 등록 / 수정창' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'themeenrollment',
        component: ThemeenrollmentComponent, 
        data: {
          // title: '당직 매뉴얼 관리',
          title: '테마지도등록창', 
          urls: [{ title: '스마트지도' }, { title: '테마지도등록창' }]
        }
        ,canActivate: [ ChildGuard ]
      }
    ]
  }
];
