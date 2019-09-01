import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MessageRoutes } from './message.routing';

import { SendComponent } from './send/send.component';
import { LogComponent } from './log/log.component';
import { GroupComponent } from './group/group.component';

import { ItsmUiModule } from '../../itsm-ui/public_api';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ItsmUiModule,
    RouterModule.forChild(MessageRoutes)
  ],
  declarations: [SendComponent, LogComponent, GroupComponent]
})
export class MessageModule { }
