import { Routes } from '@angular/router';
import { SendComponent } from './send/send.component';
import { LogComponent } from './log/log.component';
import { GroupComponent } from './group/group.component';
import { ChildGuard } from '../../child.guard';

export const MessageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'send',
        component: SendComponent,
        data: {
          title: '푸시 발송',
          urls: [{ title: '메시지센터' }, { title: '푸시 발송' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'log',
        component: LogComponent,
        data: {
          title: '푸시 발송 이력',
          urls: [{ title: '메시지센터' }, { title: '푸시 발송 이력' }]
        }
        ,canActivate: [ ChildGuard ]
      },
      {
        path: 'group',
        component: GroupComponent,
        data: {
          title: '푸시 그룹 관리',
          urls: [{ title: '메시지센터' }, { title: '푸시 그룹 관리' }]
        }
        ,canActivate: [ ChildGuard ]
      },
    ]
  }
];
