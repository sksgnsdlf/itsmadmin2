/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, IterableDiffers } from '@angular/core';
/**
 * ***************Examples*******************
 *
 * <itsm-multi-select [(src)]="src" [(dest)]="dest" [header]="header" title="테스트 멀티 셀렉터">
 * <div filter="src">
 * 필터 테스트
 * </div>
 * <ngb-pagination class="d-flex justify-content-center" [collectionSize]="70" [(page)]="destPage" aria-label="Default pagination" pagination="dest"></ngb-pagination>
 * <ngb-pagination class="d-flex justify-content-center" [collectionSize]="70" [(page)]="srcPage" aria-label="Default pagination" pagination="src"></ngb-pagination>
 * </itsm-multi-select>
 *
 */
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(_iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.title = '';
        this.header = [];
        this.impure = false;
        this.src = [];
        this.srcChange = new EventEmitter();
        this.dest = [];
        this.destChange = new EventEmitter();
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    }
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ sourceChanges = this.iterableDiffer.diff(this.src);
        if (sourceChanges) {
            this.srcChange.emit(this.src);
        }
        var /** @type {?} */ destChanges = this.iterableDiffer.diff(this.dest);
        if (destChanges) {
            this.destChange.emit(this.dest);
        }
    };
    /**
     * @param {?} list
     * @param {?} b
     * @return {?}
     */
    MultiSelectComponent.prototype.selectAll = /**
     * @param {?} list
     * @param {?} b
     * @return {?}
     */
    function (list, b) {
        list.forEach(function (element) {
            element.selected = b;
        });
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.add = /**
     * @return {?}
     */
    function () {
        if (this.impure) {
            (_a = this.dest).push.apply(_a, tslib_1.__spread(this.src.filter(function (_) { return _.selected; }).map(function (_) {
                return tslib_1.__assign({}, _);
            })));
            this.src = this.src.filter(function (_) { return !_.selected; });
        }
        else {
            (_b = this.dest).push.apply(_b, tslib_1.__spread(this.src.filter(function (_) { return _.selected; }).map(function (_) {
                return tslib_1.__assign({}, _);
            })));
        }
        var _a, _b;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.remove = /**
     * @return {?}
     */
    function () {
        if (this.impure) {
            (_a = this.src).push.apply(_a, tslib_1.__spread(this.dest.filter(function (_) { return _.selected; }).map(function (_) {
                return tslib_1.__assign({}, _);
            })));
            this.dest = this.dest.filter(function (_) { return !_.selected; });
        }
        else {
            this.dest = this.dest.filter(function (_) { return !_.selected; }).map(function (_) {
                return tslib_1.__assign({}, _);
            });
        }
        var _a;
    };
    MultiSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'itsm-multi-select',
                    template: "\n<div class=\"row\">\n  <div class=\"col\">\n    <!-- Card -->\n    <div class=\"card\">\n      <div class=\"card-body\">\n          <h4 class=\"card-title\" *ngIf=\"title\">{{title}}</h4>\n          <div class=\"card-text\">\n            <ng-content select=\"[filter=dest]\"></ng-content>\n            <table class=\"table\">\n              <thead>\n                <th><input type=\"checkbox\" (change)=\"selectAll(dest, $event.target.checked)\"></th>\n                <th *ngFor=\"let item of header\">{{item.name}}</th>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let item of dest\">\n                  <td><input type=\"checkbox\" [(ngModel)]=\"item.selected\"></td>\n                  <td *ngFor=\"let _ of header\">{{item[_.key]}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <ng-content select=\"ngb-pagination[pagination=dest]\"></ng-content>\n          </div>\n      </div>\n    </div>\n    <!-- Card -->\n  </div>\n  <div class=\"col shrink\">\n    <img (click)=\"add()\" src=\"assets/images/arr_left_btn.gif\" alt=\"\">\n    <img (click)=\"remove()\" src=\"assets/images/arr_right_btn.gif\" alt=\"\">\n  </div>\n  <div class=\"col\">\n    <!-- Card -->\n    <div class=\"card\">\n        <div class=\"card-body\">\n            <div class=\"card-text\">\n              <ng-content select=\"[filter=src]\"></ng-content>\n              <table class=\"table\">\n                <thead>\n                  <th><input type=\"checkbox\" (change)=\"selectAll(src, $event.target.checked)\"></th>\n                  <th *ngFor=\"let item of header\">{{item.name}}</th>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let item of src\">\n                    <td><input type=\"checkbox\" [(ngModel)]=\"item.selected\"></td>\n                    <td *ngFor=\"let _ of header\">{{item[_.key]}}</td>\n                  </tr>\n                </tbody>\n              </table>\n              <ng-content select=\"ngb-pagination[pagination=src]\"></ng-content>\n            </div>\n        </div>\n      </div>\n      <!-- Card -->\n  </div>\n</div>",
                    styles: [".col{display:flex;align-items:stretch}.col .card{width:100%}.shrink{flex-grow:0;display:flex;justify-content:center;flex-flow:column}.shrink img{margin-bottom:5px}thead{background:#f4f4f4}thead th:first-of-type{width:1%}"]
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: IterableDiffers }
    ]; };
    MultiSelectComponent.propDecorators = {
        title: [{ type: Input }],
        header: [{ type: Input }],
        impure: [{ type: Input }],
        src: [{ type: Input }],
        srcChange: [{ type: Output }],
        dest: [{ type: Input }],
        destChange: [{ type: Output }]
    };
    return MultiSelectComponent;
}());
export { MultiSelectComponent };
function MultiSelectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MultiSelectComponent.prototype.title;
    /** @type {?} */
    MultiSelectComponent.prototype.header;
    /** @type {?} */
    MultiSelectComponent.prototype.impure;
    /** @type {?} */
    MultiSelectComponent.prototype.src;
    /** @type {?} */
    MultiSelectComponent.prototype.srcChange;
    /** @type {?} */
    MultiSelectComponent.prototype.dest;
    /** @type {?} */
    MultiSelectComponent.prototype.destChange;
    /** @type {?} */
    MultiSelectComponent.prototype.iterableDiffer;
    /** @type {?} */
    MultiSelectComponent.prototype._iterableDiffers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2l0c20tdWkvIiwic291cmNlcyI6WyJsaWIvbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUFzRjlGLDhCQUFvQixnQkFBaUM7UUFBakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtxQkFacEMsRUFBRTtzQkFDRCxFQUFFO3NCQUNGLEtBQUs7bUJBRVIsRUFBRTt5QkFDSyxJQUFJLFlBQVksRUFBRTtvQkFFeEIsRUFBRTswQkFDSyxJQUFJLFlBQVksRUFBRTtRQUt2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25FOzs7O0lBRUQsdUNBQVE7OztJQUFSO0tBRUM7Ozs7SUFFRCx3Q0FBUzs7O0lBQVQ7UUFDRSxxQkFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QscUJBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztLQUNGOzs7Ozs7SUFFRCx3Q0FBUzs7Ozs7SUFBVCxVQUFVLElBQUksRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDbEIsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxrQ0FBRzs7O0lBQUg7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixDQUFBLEtBQUEsSUFBSSxDQUFDLElBQUksQ0FBQSxDQUFDLElBQUksNEJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7Z0JBQ3BELE1BQU0sc0JBQU0sQ0FBQyxFQUFHO2FBQ2pCLENBQUMsR0FBRTtZQUNKLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQVgsQ0FBVyxDQUFDLENBQUE7U0FDM0M7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLENBQUEsS0FBQSxJQUFJLENBQUMsSUFBSSxDQUFBLENBQUMsSUFBSSw0QkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztnQkFDcEQsTUFBTSxzQkFBTSxDQUFDLEVBQUc7YUFDakIsQ0FBQyxHQUFFO1NBQ0w7O0tBQ0Y7Ozs7SUFFRCxxQ0FBTTs7O0lBQU47UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixDQUFBLEtBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQSxDQUFDLElBQUksNEJBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7Z0JBQ3BELE1BQU0sc0JBQU0sQ0FBQyxFQUFHO2FBQ2pCLENBQUMsR0FBRTtZQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQVgsQ0FBVyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQVgsQ0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztnQkFDaEQsTUFBTSxzQkFBTSxDQUFDLEVBQUc7YUFDakIsQ0FBQyxDQUFDO1NBQ0o7O0tBQ0Y7O2dCQTVIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDRtRUF1REw7b0JBQ0wsTUFBTSxFQUFFLENBQUMsOE5BQThOLENBQUM7aUJBQ3pPOzs7O2dCQXhFd0QsZUFBZTs7O3dCQTBFckUsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7c0JBRUwsS0FBSzs0QkFDTCxNQUFNO3VCQUVOLEtBQUs7NkJBQ0wsTUFBTTs7K0JBbEZUOztTQXlFYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJdGVyYWJsZURpZmZlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqKioqKioqKioqKioqKioqKkV4YW1wbGVzKioqKioqKioqKioqKioqKioqKiBcbiAqIFxuPGl0c20tbXVsdGktc2VsZWN0IFsoc3JjKV09XCJzcmNcIiBbKGRlc3QpXT1cImRlc3RcIiBbaGVhZGVyXT1cImhlYWRlclwiIHRpdGxlPVwi7YWM7Iqk7Yq4IOupgO2LsCDshYDroInthLBcIj5cbiAgPGRpdiBmaWx0ZXI9XCJzcmNcIj5cbiAgICDtlYTthLAg7YWM7Iqk7Yq4XG4gIDwvZGl2PlxuICA8bmdiLXBhZ2luYXRpb24gY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclwiIFtjb2xsZWN0aW9uU2l6ZV09XCI3MFwiIFsocGFnZSldPVwiZGVzdFBhZ2VcIiBhcmlhLWxhYmVsPVwiRGVmYXVsdCBwYWdpbmF0aW9uXCIgcGFnaW5hdGlvbj1cImRlc3RcIj48L25nYi1wYWdpbmF0aW9uPlxuICA8bmdiLXBhZ2luYXRpb24gY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclwiIFtjb2xsZWN0aW9uU2l6ZV09XCI3MFwiIFsocGFnZSldPVwic3JjUGFnZVwiIGFyaWEtbGFiZWw9XCJEZWZhdWx0IHBhZ2luYXRpb25cIiBwYWdpbmF0aW9uPVwic3JjXCI+PC9uZ2ItcGFnaW5hdGlvbj5cbjwvaXRzbS1tdWx0aS1zZWxlY3Q+XG4gKiBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRzbS1tdWx0aS1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgPCEtLSBDYXJkIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiICpuZ0lmPVwidGl0bGVcIj57e3RpdGxlfX08L2g0PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRleHRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltmaWx0ZXI9ZGVzdF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRoPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAoY2hhbmdlKT1cInNlbGVjdEFsbChkZXN0LCAkZXZlbnQudGFyZ2V0LmNoZWNrZWQpXCI+PC90aD5cbiAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGl0ZW0gb2YgaGVhZGVyXCI+e3tpdGVtLm5hbWV9fTwvdGg+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGVzdFwiPlxuICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cIml0ZW0uc2VsZWN0ZWRcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBfIG9mIGhlYWRlclwiPnt7aXRlbVtfLmtleV19fTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZ2ItcGFnaW5hdGlvbltwYWdpbmF0aW9uPWRlc3RdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBDYXJkIC0tPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbCBzaHJpbmtcIj5cbiAgICA8aW1nIChjbGljayk9XCJhZGQoKVwiIHNyYz1cImFzc2V0cy9pbWFnZXMvYXJyX2xlZnRfYnRuLmdpZlwiIGFsdD1cIlwiPlxuICAgIDxpbWcgKGNsaWNrKT1cInJlbW92ZSgpXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9hcnJfcmlnaHRfYnRuLmdpZlwiIGFsdD1cIlwiPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgIDwhLS0gQ2FyZCAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10ZXh0XCI+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltmaWx0ZXI9c3JjXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dGg+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIChjaGFuZ2UpPVwic2VsZWN0QWxsKHNyYywgJGV2ZW50LnRhcmdldC5jaGVja2VkKVwiPjwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGl0ZW0gb2YgaGVhZGVyXCI+e3tpdGVtLm5hbWV9fTwvdGg+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3JjXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJpdGVtLnNlbGVjdGVkXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBfIG9mIGhlYWRlclwiPnt7aXRlbVtfLmtleV19fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5nYi1wYWdpbmF0aW9uW3BhZ2luYXRpb249c3JjXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSBDYXJkIC0tPlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AuY29se2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpzdHJldGNofS5jb2wgLmNhcmR7d2lkdGg6MTAwJX0uc2hyaW5re2ZsZXgtZ3JvdzowO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZsZXgtZmxvdzpjb2x1bW59LnNocmluayBpbWd7bWFyZ2luLWJvdHRvbTo1cHh9dGhlYWR7YmFja2dyb3VuZDojZjRmNGY0fXRoZWFkIHRoOmZpcnN0LW9mLXR5cGV7d2lkdGg6MSV9YF1cbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB0aXRsZSA9ICcnO1xuICBASW5wdXQoKSBoZWFkZXIgPSBbXTtcbiAgQElucHV0KCkgaW1wdXJlID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc3JjID0gW107XG4gIEBPdXRwdXQoKSBzcmNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIFxuICBASW5wdXQoKSBkZXN0ID0gW107XG4gIEBPdXRwdXQoKSBkZXN0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGl0ZXJhYmxlRGlmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzKSB7XG4gICAgdGhpcy5pdGVyYWJsZURpZmZlciA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBsZXQgc291cmNlQ2hhbmdlcyA9IHRoaXMuaXRlcmFibGVEaWZmZXIuZGlmZih0aGlzLnNyYyk7XG4gICAgaWYgKHNvdXJjZUNoYW5nZXMpIHtcbiAgICAgIHRoaXMuc3JjQ2hhbmdlLmVtaXQodGhpcy5zcmMpO1xuICAgIH1cbiAgICBsZXQgZGVzdENoYW5nZXMgPSB0aGlzLml0ZXJhYmxlRGlmZmVyLmRpZmYodGhpcy5kZXN0KTtcbiAgICBpZiAoZGVzdENoYW5nZXMpIHtcbiAgICAgIHRoaXMuZGVzdENoYW5nZS5lbWl0KHRoaXMuZGVzdCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0QWxsKGxpc3QsIGIpIHtcbiAgICBsaXN0LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBlbGVtZW50LnNlbGVjdGVkID0gYjtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZCgpIHtcbiAgICBpZiAodGhpcy5pbXB1cmUpIHtcbiAgICAgIHRoaXMuZGVzdC5wdXNoKC4uLnRoaXMuc3JjLmZpbHRlcihfPT5fLnNlbGVjdGVkKS5tYXAoXz0+e1xuICAgICAgICByZXR1cm4geyAuLi5fIH07XG4gICAgICB9KSk7XG4gICAgICB0aGlzLnNyYyA9IHRoaXMuc3JjLmZpbHRlcihfPT4hXy5zZWxlY3RlZClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc3QucHVzaCguLi50aGlzLnNyYy5maWx0ZXIoXz0+Xy5zZWxlY3RlZCkubWFwKF89PntcbiAgICAgICAgcmV0dXJuIHsgLi4uXyB9O1xuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5pbXB1cmUpIHtcbiAgICAgIHRoaXMuc3JjLnB1c2goLi4udGhpcy5kZXN0LmZpbHRlcihfPT5fLnNlbGVjdGVkKS5tYXAoXz0+e1xuICAgICAgICByZXR1cm4geyAuLi5fIH07XG4gICAgICB9KSk7XG4gICAgICB0aGlzLmRlc3QgPSB0aGlzLmRlc3QuZmlsdGVyKF89PiFfLnNlbGVjdGVkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc3QgPSB0aGlzLmRlc3QuZmlsdGVyKF89PiFfLnNlbGVjdGVkKS5tYXAoXz0+e1xuICAgICAgICByZXR1cm4geyAuLi5fIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==