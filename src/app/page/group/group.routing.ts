import { Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { MessageComponent } from './message/message.component';
import { ChildGuard } from '../../child.guard';

export const GroupRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info',
        component: InfoComponent,
        data: {
          title: '단체 정보',
          urls: [{ title: '단체관리' }, { title: '단체 정보' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'users',
        component: GroupUsersComponent,
        data: {
          title: '회원 관리',
          urls: [{ title: '단체관리' }, { title: '회원 관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'message',
        component: MessageComponent,
        data: {
          title: '푸시발송이력',
          urls: [{ title: '단체관리' }, { title: '푸시발송이력' }]
        }
        ,canActivate: [ ChildGuard ]
      },
    ]
  }
];
