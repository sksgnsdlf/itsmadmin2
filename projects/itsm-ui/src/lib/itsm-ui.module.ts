import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TreeViewComponent } from './tree-view/tree-view.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { CKEditorComponent } from './ckeditor/ckeditor.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [TreeViewComponent, MultiSelectComponent, CKEditorComponent],
  exports: [TreeViewComponent, MultiSelectComponent, CKEditorComponent]
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
