import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClsComponent } from './cls/cls.component';
import { RouterModule } from '@angular/router';
import { MapRoutes } from './map.routing';
import { ItsmUiModule } from '../../itsm-ui/public_api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PlaceComponent } from './place/place.component';
import { DataComponent } from './data/data.component';
import { ThemeComponent } from './theme/theme.component';
import { NoticeComponent } from './notice/notice.component';
import { SuggestComponent } from './suggest/suggest.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ThemeenrollmentComponent } from './themeenrollment/themeenrollment.component';

@NgModule({
  declarations: [ClsComponent, PlaceComponent, DataComponent, ThemeComponent, NoticeComponent, SuggestComponent, EnrollmentComponent, ThemeenrollmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MapRoutes),
    ItsmUiModule,
    NgbModule,
    FormsModule,
  ]
})
export class MapModule { }
