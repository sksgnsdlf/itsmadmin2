import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TreeViewComponent } from './tree-view/tree-view.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { CKEditorComponent } from './ckeditor/ckeditor.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormInflaterComponent } from './form-inflater/form-inflater.component';
import { KeysPipe } from './pipes/keys.pipe';
import { HelperService } from './services/helper.service';
import { FIBaseControlComponent } from './form-inflater/fi-control.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarSplitComponent } from './calendarSplit/calendarSplit.component';
import { TableComponent } from './table/table.component';
import { SocietySelectComponent } from './society-select/society-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [HelperService],
  declarations: [KeysPipe, TreeViewComponent, MultiSelectComponent, CKEditorComponent, FormInflaterComponent, FIBaseControlComponent, CalendarComponent, CalendarSplitComponent, TableComponent, SocietySelectComponent],
  exports: [TreeViewComponent, MultiSelectComponent, CKEditorComponent, FormInflaterComponent, CalendarComponent, CalendarSplitComponent, KeysPipe, TableComponent, SocietySelectComponent]
})
export class ItsmUiModule {
  public static forRoot(config): ModuleWithProviders {
    return {
      ngModule: ItsmUiModule,
      providers: [
        { provide: 'config', useValue: config }
      ]
    };
  }
}
