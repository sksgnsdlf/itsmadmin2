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
var ItsmUiModule = /** @class */ (function () {
    function ItsmUiModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    ItsmUiModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: ItsmUiModule,
            providers: [
                { provide: 'config', useValue: config }
            ]
        };
    };
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
    return ItsmUiModule;
}());
export { ItsmUiModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRzbS11aS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pdHNtLXVpLyIsInNvdXJjZXMiOlsibGliL2l0c20tdWkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7Ozs7SUFZdkMsb0JBQU87Ozs7Y0FBQyxNQUFNO1FBQzFCLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUN4QztTQUNGLENBQUM7OztnQkFoQkwsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsU0FBUztxQkFDVjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsQ0FBQztvQkFDMUUsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLENBQUM7aUJBQ3RFOzt1QkFsQkQ7O1NBbUJhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBUcmVlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdHJlZS12aWV3L3RyZWUtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IENLRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9ja2VkaXRvci9ja2VkaXRvci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTmdiTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RyZWVWaWV3Q29tcG9uZW50LCBNdWx0aVNlbGVjdENvbXBvbmVudCwgQ0tFZGl0b3JDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVHJlZVZpZXdDb21wb25lbnQsIE11bHRpU2VsZWN0Q29tcG9uZW50LCBDS0VkaXRvckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSXRzbVVpTW9kdWxlIHsgXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEl0c21VaU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogY29uZmlnIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=