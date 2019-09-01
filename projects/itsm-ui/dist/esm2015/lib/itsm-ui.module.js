/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { CKEditorComponent } from './ckeditor/ckeditor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
export class ItsmUiModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: ItsmUiModule,
            providers: [
                { provide: 'config', useValue: config }
            ]
        };
    }
}
ItsmUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    NgbModule
                ],
                declarations: [TreeViewComponent, MultiSelectComponent, CKEditorComponent],
                exports: [TreeViewComponent, MultiSelectComponent, CKEditorComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRzbS11aS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pdHNtLXVpLyIsInNvdXJjZXMiOlsibGliL2l0c20tdWkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVd2RCxNQUFNOzs7OztJQUNHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTTtRQUMxQixNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7YUFDeEM7U0FDRixDQUFDOzs7O1lBaEJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLFNBQVM7aUJBQ1Y7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUM7Z0JBQzFFLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixDQUFDO2FBQ3RFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgVHJlZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtdmlldy90cmVlLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE11bHRpU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDS0VkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vY2tlZGl0b3IvY2tlZGl0b3IuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE5nYk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtUcmVlVmlld0NvbXBvbmVudCwgTXVsdGlTZWxlY3RDb21wb25lbnQsIENLRWRpdG9yQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1RyZWVWaWV3Q29tcG9uZW50LCBNdWx0aVNlbGVjdENvbXBvbmVudCwgQ0tFZGl0b3JDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEl0c21VaU1vZHVsZSB7IFxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBJdHNtVWlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZyB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19