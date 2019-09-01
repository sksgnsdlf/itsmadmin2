import { Routes } from '@angular/router';
import { CodeComponent } from './code/code.component';
import { OrganComponent } from './organ/organ.component';
import { FacilityComponent } from './facility/facility.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { BannerComponent } from './banner/banner.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { BeaconComponent } from './beacon/beacon.component';
import { UsersComponent } from './users/users.component';
import { OfficialComponent } from './official/official.component';
import { CoopComponent } from './coop/coop.component';
import { PropComponent } from './prop/prop.component';
import { CategoryComponent } from './category/category.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupStatComponent } from './group-stat/group-stat.component';
import { GroupListReviseComponent } from './group-list-revise/group-list-revise.component';
import { ChildGuard } from '../../child.guard';
import { DeptClsComponent } from './dept-cls/dept-cls.component';
import { ChnlPostComponent } from './chnl-post/chnl-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { OfficialDetailComponent } from './official-detail/official-detail.component';
import { AuthComponent } from './auth/auth.component';
// import { AdminGuard } from '../../admin.guard'; => 아직 쓸곳이 없는듯.. 

export const CommonRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'code',
        component: CodeComponent,
        data: {
          title: '공통코드관리',
          urls: [{ title: '시스템관리' }, { title: '공통코드관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'organ',
        component: OrganComponent,
        data: {
          title: '기관관리',
          urls: [{ title: '시스템관리' }, { title: '기관관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'facility',
        component: FacilityComponent,
        data: {
          title: '시설관리',
          urls: [{ title: '시스템관리' }, { title: '시설관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'appmenu',
        component: AppmenuComponent,
        data: {
          title: '앱메뉴 관리',
          urls: [{ title: '시스템관리' }, { title: '앱메뉴 관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'banner',
        component: BannerComponent,
        data: {
          title: '배너관리',
          urls: [{ title: '시스템관리' }, { title: '배너관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'mqtt',
        component: MqttComponent,
        data: {
          title: 'MQTT 모니터링',
          urls: [{ title: '시스템관리' }, { title: 'MQTT 모니터링' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'beacon',
        component: BeaconComponent,
        data: {
          title: '비콘단말기 등록',
          urls: [{ title: '시스템관리' }, { title: '비콘단말기 등록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'category/complaint',
        component: CategoryComponent,
        data: {
          title: '시민의소리 분류관리',
          urls: [{ title: '시스템관리' }, { title: '시민의소리 분류관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'group/list',
        component: GroupListComponent,
        data: {
          title: '단체 목록',
          urls: [{ title: '시스템관리' }, { title: '단체 목록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'group/list/revise',
        component: GroupListReviseComponent,
        data: {
          title: '단체 목록 추가 / 수정',
          urls: [{ title: '시스템관리' }, { title: '단체 목록', url: '/common/group/list' },  { title: '단체 목록 추가 / 수정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'group/stat',
        component: GroupStatComponent,
        data: {
          title: '단체 현황',
          urls: [{ title: '시스템관리' }, { title: '단체 현황' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: '통합회원 목록',
          urls: [{ title: '시스템관리' }, { title: '통합회원 목록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'users/detail/:id',
        component: UsersDetailComponent,
        data: {
          title: '일반회원상세',
          urls: [{ title: '시스템관리' }, { title: '통합회원 목록' }, { title: '일반회원상세' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'official',
        component: OfficialComponent,
        data: {
          title: '공무원 목록',
          urls: [{ title: '시스템관리' }, { title: '공무원 목록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'official/detail/:id',
        component: OfficialDetailComponent,
        data: {
          title: '공무원회원상세',
          urls: [{ title: '시스템관리' }, { title: '공무원 목록' }, { title: '공무원회원상세' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'coop',
        component: CoopComponent,
        data: {
          title: '협력업체 목록',
          urls: [{ title: '시스템관리' }, { title: '협력업체 목록' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'prop',
        component: PropComponent,
        data: {
          title: '회원속성 관리',
          urls: [{ title: '시스템관리' }, { title: '회원속성 관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'auth',
        component: AuthComponent,
        data: {
          title: '사용자 권한관리',
          urls: [{ title: '시스템관리' }, { title: '사용자 권한관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'deptcls',
        component: DeptClsComponent,
        data: {
          title: '단체별 부서배정',
          urls: [{ title: '시스템관리' }, { title: '단체별 부서배정' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'chnlpost',
        component: ChnlPostComponent,
        data: {
          title: '채널 및 게시물분야',
          urls: [{ title: '시스템관리' }, { title: '채널 및 게시물분야' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // data: {
        //   title: '대시보드',
        //   urls: [{ title: '시스템관리' }, { title: '대시보드' }]
        // }
      }
    ]
  }
];
