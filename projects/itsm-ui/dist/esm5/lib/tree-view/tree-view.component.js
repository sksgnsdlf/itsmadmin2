/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var TreeViewComponent = /** @class */ (function () {
    function TreeViewComponent() {
        this.title = null;
        this.checkbox = false;
        this.data = [];
        this.OnClick = new EventEmitter();
        this.OrgChanged = new EventEmitter();
        this.fillterd = [];
    }
    /**
     * @return {?}
     */
    TreeViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} li
     * @return {?}
     */
    TreeViewComponent.prototype.toggleFolder = /**
     * @param {?} li
     * @return {?}
     */
    function (li) {
        if (li.sub && li.sub.length)
            li.expanded = !li.expanded;
        this.OnClick.emit(li);
    };
    /**
     * @return {?}
     */
    TreeViewComponent.prototype.getSelection = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ tmp = [];
        try {
            for (var _a = tslib_1.__values(this.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                var level1 = _b.value;
                if (level1.selected) {
                    tmp.push(level1);
                    continue;
                }
                try {
                    for (var _c = tslib_1.__values(level1.sub), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var level2 = _d.value;
                        if (level2.selected) {
                            tmp.push(level2);
                            continue;
                        }
                        try {
                            for (var _e = tslib_1.__values(level2.sub), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var level3 = _f.value;
                                if (level3.selected) {
                                    tmp.push(level3);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_g = _e.return)) _g.call(_e);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_j = _a.return)) _j.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return tmp;
        var e_3, _j, e_2, _h, e_1, _g;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    TreeViewComponent.prototype.search = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (!text)
            return;
        var /** @type {?} */ tmp = [];
        try {
            for (var _a = tslib_1.__values(this.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                var level1 = _b.value;
                if (level1.name.includes(text)) {
                    tmp.push(level1);
                    continue;
                }
                try {
                    for (var _c = tslib_1.__values(level1.sub), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var level2 = _d.value;
                        if (level2.name.includes(text)) {
                            tmp.push(level2);
                            continue;
                        }
                        try {
                            for (var _e = tslib_1.__values(level2.sub), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var level3 = _f.value;
                                if (level3.name.includes(text)) {
                                    tmp.push(level3);
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_g = _e.return)) _g.call(_e);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_j = _a.return)) _j.call(_a);
            }
            finally { if (e_6) throw e_6.error; }
        }
        this.fillterd = tmp;
        var e_6, _j, e_5, _h, e_4, _g;
    };
    TreeViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'itsm-tree-view',
                    template: "  <!-- Card -->\n  <div class=\"card\">\n      <div class=\"card-body\">\n          <h4 class=\"card-title\" *ngIf=\"title\">{{title}}</h4>\n          <div class=\"card-text\">\n            <ng-content></ng-content>\n            <input class=\"form-control search\" type=\"text\" placeholder=\"\uAC80\uC0C9\" [(ngModel)]=\"q\" (keyup)=\"search(q);\">\n            <ul class=\"level1\" [hidden]=\"q\">\n              <li *ngFor=\"let level1 of data\" [ngClass]=\"{ sub: level1.sub?.length, on: level1.expanded, off: !level1.expanded }\">\n                <input *ngIf=\"checkbox&&!level1.sub?.length\" type=\"checkbox\" [(ngModel)]=\"level1.selected\">\n                <a (click)=\"toggleFolder(level1)\">{{level1.name}}</a>\n                <ul class=\"level2\" *ngIf=\"level1.expanded&&level1.sub?.length\">\n                  <li *ngFor=\"let level2 of level1.sub\" [ngClass]=\"{ sub: level2.sub?.length, on: level2.expanded, off: !level2.expanded }\">\n                    <input *ngIf=\"checkbox&&!level2.sub?.length\" type=\"checkbox\" [(ngModel)]=\"level2.selected\">\t\n                    <a (click)=\"toggleFolder(level2)\">{{level2.name}}</a>\n                    <ul class=\"level3\" *ngIf=\"level2.expanded&&level2.sub?.length\">\n                      <li *ngFor=\"let level3 of level2.sub\">\n                        <input *ngIf=\"checkbox\" type=\"checkbox\" [(ngModel)]=\"level3.selected\">\n                        <a (click)=\"toggleFolder(level3)\">{{level3.name}}</a>\n                      </li>\n                    </ul>\n                  </li>\n                </ul>\n              </li>\n            </ul>\n            <ul class=\"dep1\" *ngIf=\"q && fillterd\">\n              <li *ngFor=\"let item of fillterd\"><a (click)=\"OnClick.emit(item)\">{{item.name}}</a></li>\n            </ul>\n          </div>\n      </div>\n  </div>\n  <!-- Card -->",
                    styles: [".card{width:100%;font-size:1em}.card input.search{margin-bottom:20px}.card ul{padding-left:10px;list-style:none}.card ul.level1{max-height:500px;overflow-y:auto}.card ul ul{margin-top:5px}.card ul li{cursor:pointer;padding:2px 0;color:gray}.card ul li:hover{color:#53a3ff}.card ul li.sub{padding-left:20px;background:url(../../../assets/images/folder_off.png) 3px 6px no-repeat}.card ul li.on{background:url(../../../assets/images/folder_on.png) 3px 6px no-repeat}.card ul li input{margin-right:5px}"]
                },] },
    ];
    /** @nocollapse */
    TreeViewComponent.ctorParameters = function () { return []; };
    TreeViewComponent.propDecorators = {
        title: [{ type: Input }],
        checkbox: [{ type: Input }],
        data: [{ type: Input }],
        OnClick: [{ type: Output }],
        OrgChanged: [{ type: Output }]
    };
    return TreeViewComponent;
}());
export { TreeViewComponent };
function TreeViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TreeViewComponent.prototype.title;
    /** @type {?} */
    TreeViewComponent.prototype.checkbox;
    /** @type {?} */
    TreeViewComponent.prototype.data;
    /** @type {?} */
    TreeViewComponent.prototype.OnClick;
    /** @type {?} */
    TreeViewComponent.prototype.OrgChanged;
    /** @type {?} */
    TreeViewComponent.prototype.q;
    /** @type {?} */
    TreeViewComponent.prototype.fillterd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2l0c20tdWkvIiwic291cmNlcyI6WyJsaWIvdHJlZS12aWV3L3RyZWUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQWdEN0U7cUJBVHlCLElBQUk7d0JBQ1QsS0FBSztvQkFDRixFQUFFO3VCQUNjLElBQUksWUFBWSxFQUFPOzBCQUNwQixJQUFJLFlBQVksRUFBTzt3QkFHdEQsRUFBRTtLQUVJOzs7O0lBRWpCLG9DQUFROzs7SUFBUjtLQUNDOzs7OztJQUVELHdDQUFZOzs7O0lBQVosVUFBYSxFQUFFO1FBQ2IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUMxQixFQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUU3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN2Qjs7OztJQUVELHdDQUFZOzs7SUFBWjtRQUNFLHFCQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7O1lBQ2IsR0FBRyxDQUFDLENBQWUsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxJQUFJLENBQUEsZ0JBQUE7Z0JBQXZCLElBQUksTUFBTSxXQUFBO2dCQUNiLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqQixRQUFRLENBQUM7aUJBQ1Y7O29CQUNELEdBQUcsQ0FBQyxDQUFlLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsR0FBRyxDQUFBLGdCQUFBO3dCQUF4QixJQUFJLE1BQU0sV0FBQTt3QkFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDakIsUUFBUSxDQUFDO3lCQUNWOzs0QkFDRCxHQUFHLENBQUMsQ0FBZSxJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQSxnQkFBQTtnQ0FBeEIsSUFBSSxNQUFNLFdBQUE7Z0NBQ2IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0NBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUNBQ2xCOzZCQUNGOzs7Ozs7Ozs7cUJBQ0Y7Ozs7Ozs7OzthQUNGOzs7Ozs7Ozs7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDOztLQUNaOzs7OztJQUVELGtDQUFNOzs7O0lBQU4sVUFBTyxJQUFJO1FBQ1QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDUixNQUFNLENBQUM7UUFFVCxxQkFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDOztZQUNiLEdBQUcsQ0FBQyxDQUFlLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFBLGdCQUFBO2dCQUF2QixJQUFJLE1BQU0sV0FBQTtnQkFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pCLFFBQVEsQ0FBQztpQkFDVjs7b0JBQ0QsR0FBRyxDQUFDLENBQWUsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUEsZ0JBQUE7d0JBQXhCLElBQUksTUFBTSxXQUFBO3dCQUNiLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDakIsUUFBUSxDQUFDO3lCQUNWOzs0QkFDRCxHQUFHLENBQUMsQ0FBZSxJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQSxnQkFBQTtnQ0FBeEIsSUFBSSxNQUFNLFdBQUE7Z0NBQ2IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lDQUNsQjs2QkFDRjs7Ozs7Ozs7O3FCQUNGOzs7Ozs7Ozs7YUFDRjs7Ozs7Ozs7O1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7O0tBQ3JCOztnQkF6R0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxzMURBK0JJO29CQUNkLE1BQU0sRUFBRSxDQUFDLHFmQUFxZixDQUFDO2lCQUNoZ0I7Ozs7O3dCQUVFLEtBQUs7MkJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLE1BQU07NkJBQ04sTUFBTTs7NEJBM0NUOztTQXNDYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0c20tdHJlZS12aWV3JyxcbiAgdGVtcGxhdGU6IGAgIDwhLS0gQ2FyZCAtLT5cbiAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICA8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCIgKm5nSWY9XCJ0aXRsZVwiPnt7dGl0bGV9fTwvaDQ+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGV4dFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIHNlYXJjaFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCLqsoDsg4lcIiBbKG5nTW9kZWwpXT1cInFcIiAoa2V5dXApPVwic2VhcmNoKHEpO1wiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibGV2ZWwxXCIgW2hpZGRlbl09XCJxXCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGV2ZWwxIG9mIGRhdGFcIiBbbmdDbGFzc109XCJ7IHN1YjogbGV2ZWwxLnN1Yj8ubGVuZ3RoLCBvbjogbGV2ZWwxLmV4cGFuZGVkLCBvZmY6ICFsZXZlbDEuZXhwYW5kZWQgfVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImNoZWNrYm94JiYhbGV2ZWwxLnN1Yj8ubGVuZ3RoXCIgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJsZXZlbDEuc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwidG9nZ2xlRm9sZGVyKGxldmVsMSlcIj57e2xldmVsMS5uYW1lfX08L2E+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibGV2ZWwyXCIgKm5nSWY9XCJsZXZlbDEuZXhwYW5kZWQmJmxldmVsMS5zdWI/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsZXZlbDIgb2YgbGV2ZWwxLnN1YlwiIFtuZ0NsYXNzXT1cInsgc3ViOiBsZXZlbDIuc3ViPy5sZW5ndGgsIG9uOiBsZXZlbDIuZXhwYW5kZWQsIG9mZjogIWxldmVsMi5leHBhbmRlZCB9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImNoZWNrYm94JiYhbGV2ZWwyLnN1Yj8ubGVuZ3RoXCIgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJsZXZlbDIuc2VsZWN0ZWRcIj5cdFxuICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwidG9nZ2xlRm9sZGVyKGxldmVsMilcIj57e2xldmVsMi5uYW1lfX08L2E+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImxldmVsM1wiICpuZ0lmPVwibGV2ZWwyLmV4cGFuZGVkJiZsZXZlbDIuc3ViPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGxldmVsMyBvZiBsZXZlbDIuc3ViXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJjaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwibGV2ZWwzLnNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwidG9nZ2xlRm9sZGVyKGxldmVsMylcIj57e2xldmVsMy5uYW1lfX08L2E+XG4gICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJkZXAxXCIgKm5nSWY9XCJxICYmIGZpbGx0ZXJkXCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmaWxsdGVyZFwiPjxhIChjbGljayk9XCJPbkNsaWNrLmVtaXQoaXRlbSlcIj57e2l0ZW0ubmFtZX19PC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8IS0tIENhcmQgLS0+YCxcbiAgc3R5bGVzOiBbYC5jYXJke3dpZHRoOjEwMCU7Zm9udC1zaXplOjFlbX0uY2FyZCBpbnB1dC5zZWFyY2h7bWFyZ2luLWJvdHRvbToyMHB4fS5jYXJkIHVse3BhZGRpbmctbGVmdDoxMHB4O2xpc3Qtc3R5bGU6bm9uZX0uY2FyZCB1bC5sZXZlbDF7bWF4LWhlaWdodDo1MDBweDtvdmVyZmxvdy15OmF1dG99LmNhcmQgdWwgdWx7bWFyZ2luLXRvcDo1cHh9LmNhcmQgdWwgbGl7Y3Vyc29yOnBvaW50ZXI7cGFkZGluZzoycHggMDtjb2xvcjpncmF5fS5jYXJkIHVsIGxpOmhvdmVye2NvbG9yOiM1M2EzZmZ9LmNhcmQgdWwgbGkuc3Vie3BhZGRpbmctbGVmdDoyMHB4O2JhY2tncm91bmQ6dXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvZm9sZGVyX29mZi5wbmcpIDNweCA2cHggbm8tcmVwZWF0fS5jYXJkIHVsIGxpLm9ue2JhY2tncm91bmQ6dXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvZm9sZGVyX29uLnBuZykgM3B4IDZweCBuby1yZXBlYXR9LmNhcmQgdWwgbGkgaW5wdXR7bWFyZ2luLXJpZ2h0OjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoKSBjaGVja2JveCA9IGZhbHNlO1xuICBASW5wdXQoKSBkYXRhOiBhbnlbXSA9IFtdO1xuICBAT3V0cHV0KCkgT25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIE9yZ0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcTtcbiAgZmlsbHRlcmQgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgdG9nZ2xlRm9sZGVyKGxpKSB7XG4gICAgaWYgKGxpLnN1YiAmJiBsaS5zdWIubGVuZ3RoKVxuICAgICAgbGkuZXhwYW5kZWQgPSAhbGkuZXhwYW5kZWQ7XG5cbiAgICB0aGlzLk9uQ2xpY2suZW1pdChsaSk7XG4gIH1cblxuICBnZXRTZWxlY3Rpb24oKSB7XG4gICAgbGV0IHRtcCA9IFtdO1xuICAgIGZvciAobGV0IGxldmVsMSBvZiB0aGlzLmRhdGEpIHtcbiAgICAgIGlmIChsZXZlbDEuc2VsZWN0ZWQpIHtcbiAgICAgICAgdG1wLnB1c2gobGV2ZWwxKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBsZXZlbDIgb2YgbGV2ZWwxLnN1Yikge1xuICAgICAgICBpZiAobGV2ZWwyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdG1wLnB1c2gobGV2ZWwyKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBsZXZlbDMgb2YgbGV2ZWwyLnN1Yikge1xuICAgICAgICAgIGlmIChsZXZlbDMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRtcC5wdXNoKGxldmVsMyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRtcDtcbiAgfVxuXG4gIHNlYXJjaCh0ZXh0KSB7XG4gICAgaWYgKCF0ZXh0KVxuICAgICAgcmV0dXJuO1xuICAgIFxuICAgIGxldCB0bXAgPSBbXTtcbiAgICBmb3IgKGxldCBsZXZlbDEgb2YgdGhpcy5kYXRhKSB7XG4gICAgICBpZiAobGV2ZWwxLm5hbWUuaW5jbHVkZXModGV4dCkpIHtcbiAgICAgICAgdG1wLnB1c2gobGV2ZWwxKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBsZXZlbDIgb2YgbGV2ZWwxLnN1Yikge1xuICAgICAgICBpZiAobGV2ZWwyLm5hbWUuaW5jbHVkZXModGV4dCkpIHtcbiAgICAgICAgICB0bXAucHVzaChsZXZlbDIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGxldmVsMyBvZiBsZXZlbDIuc3ViKSB7XG4gICAgICAgICAgaWYgKGxldmVsMy5uYW1lLmluY2x1ZGVzKHRleHQpKSB7XG4gICAgICAgICAgICB0bXAucHVzaChsZXZlbDMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZmlsbHRlcmQgPSB0bXA7XG4gIH1cbn1cbiJdfQ==