import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InfoComponent } from './info/info.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { MessageComponent } from './message/message.component';

import { GroupRoutes } from './group.routing';
import { SocietyProvider } from '../../providers/society';
import { PushProvider } from '../../providers/push';
import { ItsmUiModule } from '../../itsm-ui/public_api';
import { CommonProvider } from '../../providers/common';
import { DragDropDirectiveModule} from "angular4-drag-drop";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ItsmUiModule,
    DragDropDirectiveModule,
    RouterModule.forChild(GroupRoutes)
  ],
  declarations: [InfoComponent, GroupUsersComponent, MessageComponent],
  providers: [CommonProvider, PushProvider, SocietyProvider]
})
export class GroupModule { }
