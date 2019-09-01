/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class MultiSelectComponent {
    /**
     * @param {?} _iterableDiffers
     */
    constructor(_iterableDiffers) {
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        let /** @type {?} */ sourceChanges = this.iterableDiffer.diff(this.src);
        if (sourceChanges) {
            this.srcChange.emit(this.src);
        }
        let /** @type {?} */ destChanges = this.iterableDiffer.diff(this.dest);
        if (destChanges) {
            this.destChange.emit(this.dest);
        }
    }
    /**
     * @param {?} list
     * @param {?} b
     * @return {?}
     */
    selectAll(list, b) {
        list.forEach(element => {
            element.selected = b;
        });
    }
    /**
     * @return {?}
     */
    add() {
        if (this.impure) {
            this.dest.push(...this.src.filter(_ => _.selected).map(_ => {
                return Object.assign({}, _);
            }));
            this.src = this.src.filter(_ => !_.selected);
        }
        else {
            this.dest.push(...this.src.filter(_ => _.selected).map(_ => {
                return Object.assign({}, _);
            }));
        }
    }
    /**
     * @return {?}
     */
    remove() {
        if (this.impure) {
            this.src.push(...this.dest.filter(_ => _.selected).map(_ => {
                return Object.assign({}, _);
            }));
            this.dest = this.dest.filter(_ => !_.selected);
        }
        else {
            this.dest = this.dest.filter(_ => !_.selected).map(_ => {
                return Object.assign({}, _);
            });
        }
    }
}
MultiSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'itsm-multi-select',
                template: `
<div class="row">
  <div class="col">
    <!-- Card -->
    <div class="card">
      <div class="card-body">
          <h4 class="card-title" *ngIf="title">{{title}}</h4>
          <div class="card-text">
            <ng-content select="[filter=dest]"></ng-content>
            <table class="table">
              <thead>
                <th><input type="checkbox" (change)="selectAll(dest, $event.target.checked)"></th>
                <th *ngFor="let item of header">{{item.name}}</th>
              </thead>
              <tbody>
                <tr *ngFor="let item of dest">
                  <td><input type="checkbox" [(ngModel)]="item.selected"></td>
                  <td *ngFor="let _ of header">{{item[_.key]}}</td>
                </tr>
              </tbody>
            </table>
            <ng-content select="ngb-pagination[pagination=dest]"></ng-content>
          </div>
      </div>
    </div>
    <!-- Card -->
  </div>
  <div class="col shrink">
    <img (click)="add()" src="assets/images/arr_left_btn.gif" alt="">
    <img (click)="remove()" src="assets/images/arr_right_btn.gif" alt="">
  </div>
  <div class="col">
    <!-- Card -->
    <div class="card">
        <div class="card-body">
            <div class="card-text">
              <ng-content select="[filter=src]"></ng-content>
              <table class="table">
                <thead>
                  <th><input type="checkbox" (change)="selectAll(src, $event.target.checked)"></th>
                  <th *ngFor="let item of header">{{item.name}}</th>
                </thead>
                <tbody>
                  <tr *ngFor="let item of src">
                    <td><input type="checkbox" [(ngModel)]="item.selected"></td>
                    <td *ngFor="let _ of header">{{item[_.key]}}</td>
                  </tr>
                </tbody>
              </table>
              <ng-content select="ngb-pagination[pagination=src]"></ng-content>
            </div>
        </div>
      </div>
      <!-- Card -->
  </div>
</div>`,
                styles: [`.col{display:flex;align-items:stretch}.col .card{width:100%}.shrink{flex-grow:0;display:flex;justify-content:center;flex-flow:column}.shrink img{margin-bottom:5px}thead{background:#f4f4f4}thead th:first-of-type{width:1%}`]
            },] },
];
/** @nocollapse */
MultiSelectComponent.ctorParameters = () => [
    { type: IterableDiffers }
];
MultiSelectComponent.propDecorators = {
    title: [{ type: Input }],
    header: [{ type: Input }],
    impure: [{ type: Input }],
    src: [{ type: Input }],
    srcChange: [{ type: Output }],
    dest: [{ type: Input }],
    destChange: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2l0c20tdWkvIiwic291cmNlcyI6WyJsaWIvbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBeUVoRyxNQUFNOzs7O0lBYUosWUFBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7cUJBWnBDLEVBQUU7c0JBQ0QsRUFBRTtzQkFDRixLQUFLO21CQUVSLEVBQUU7eUJBQ0ssSUFBSSxZQUFZLEVBQUU7b0JBRXhCLEVBQUU7MEJBQ0ssSUFBSSxZQUFZLEVBQUU7UUFLdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuRTs7OztJQUVELFFBQVE7S0FFUDs7OztJQUVELFNBQVM7UUFDUCxxQkFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QscUJBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztLQUNGOzs7Ozs7SUFFRCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsR0FBRztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxFQUFFO2dCQUN0RCxNQUFNLG1CQUFNLENBQUMsRUFBRzthQUNqQixDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUMzQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLEVBQUU7Z0JBQ3RELE1BQU0sbUJBQU0sQ0FBQyxFQUFHO2FBQ2pCLENBQUMsQ0FBQyxDQUFDO1NBQ0w7S0FDRjs7OztJQUVELE1BQU07UUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRTtnQkFDdEQsTUFBTSxtQkFBTSxDQUFDLEVBQUc7YUFDakIsQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLEVBQUU7Z0JBQ2xELE1BQU0sbUJBQU0sQ0FBQyxFQUFHO2FBQ2pCLENBQUMsQ0FBQztTQUNKO0tBQ0Y7OztZQTVIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdURMO2dCQUNMLE1BQU0sRUFBRSxDQUFDLDhOQUE4TixDQUFDO2FBQ3pPOzs7O1lBeEV3RCxlQUFlOzs7b0JBMEVyRSxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSztrQkFFTCxLQUFLO3dCQUNMLE1BQU07bUJBRU4sS0FBSzt5QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSXRlcmFibGVEaWZmZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKioqKioqKioqKioqKioqKipFeGFtcGxlcyoqKioqKioqKioqKioqKioqKiogXG4gKiBcbjxpdHNtLW11bHRpLXNlbGVjdCBbKHNyYyldPVwic3JjXCIgWyhkZXN0KV09XCJkZXN0XCIgW2hlYWRlcl09XCJoZWFkZXJcIiB0aXRsZT1cIu2FjOyKpO2KuCDrqYDti7Ag7IWA66CJ7YSwXCI+XG4gIDxkaXYgZmlsdGVyPVwic3JjXCI+XG4gICAg7ZWE7YSwIO2FjOyKpO2KuFxuICA8L2Rpdj5cbiAgPG5nYi1wYWdpbmF0aW9uIGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcIiBbY29sbGVjdGlvblNpemVdPVwiNzBcIiBbKHBhZ2UpXT1cImRlc3RQYWdlXCIgYXJpYS1sYWJlbD1cIkRlZmF1bHQgcGFnaW5hdGlvblwiIHBhZ2luYXRpb249XCJkZXN0XCI+PC9uZ2ItcGFnaW5hdGlvbj5cbiAgPG5nYi1wYWdpbmF0aW9uIGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcIiBbY29sbGVjdGlvblNpemVdPVwiNzBcIiBbKHBhZ2UpXT1cInNyY1BhZ2VcIiBhcmlhLWxhYmVsPVwiRGVmYXVsdCBwYWdpbmF0aW9uXCIgcGFnaW5hdGlvbj1cInNyY1wiPjwvbmdiLXBhZ2luYXRpb24+XG48L2l0c20tbXVsdGktc2VsZWN0PlxuICogXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0c20tbXVsdGktc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgIDwhLS0gQ2FyZCAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIiAqbmdJZj1cInRpdGxlXCI+e3t0aXRsZX19PC9oND5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10ZXh0XCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbZmlsdGVyPWRlc3RdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0aD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJzZWxlY3RBbGwoZGVzdCwgJGV2ZW50LnRhcmdldC5jaGVja2VkKVwiPjwvdGg+XG4gICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBpdGVtIG9mIGhlYWRlclwiPnt7aXRlbS5uYW1lfX08L3RoPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRlc3RcIj5cbiAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJpdGVtLnNlbGVjdGVkXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgXyBvZiBoZWFkZXJcIj57e2l0ZW1bXy5rZXldfX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibmdiLXBhZ2luYXRpb25bcGFnaW5hdGlvbj1kZXN0XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gQ2FyZCAtLT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2wgc2hyaW5rXCI+XG4gICAgPGltZyAoY2xpY2spPVwiYWRkKClcIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2Fycl9sZWZ0X2J0bi5naWZcIiBhbHQ9XCJcIj5cbiAgICA8aW1nIChjbGljayk9XCJyZW1vdmUoKVwiIHNyYz1cImFzc2V0cy9pbWFnZXMvYXJyX3JpZ2h0X2J0bi5naWZcIiBhbHQ9XCJcIj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICA8IS0tIENhcmQgLS0+XG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGV4dFwiPlxuICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbZmlsdGVyPXNyY11cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRoPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAoY2hhbmdlKT1cInNlbGVjdEFsbChzcmMsICRldmVudC50YXJnZXQuY2hlY2tlZClcIj48L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBpdGVtIG9mIGhlYWRlclwiPnt7aXRlbS5uYW1lfX08L3RoPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIHNyY1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwiaXRlbS5zZWxlY3RlZFwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgXyBvZiBoZWFkZXJcIj57e2l0ZW1bXy5rZXldfX08L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZ2ItcGFnaW5hdGlvbltwYWdpbmF0aW9uPXNyY11cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gQ2FyZCAtLT5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmNvbHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6c3RyZXRjaH0uY29sIC5jYXJke3dpZHRoOjEwMCV9LnNocmlua3tmbGV4LWdyb3c6MDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmbGV4LWZsb3c6Y29sdW1ufS5zaHJpbmsgaW1ne21hcmdpbi1ib3R0b206NXB4fXRoZWFke2JhY2tncm91bmQ6I2Y0ZjRmNH10aGVhZCB0aDpmaXJzdC1vZi10eXBle3dpZHRoOjElfWBdXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdGl0bGUgPSAnJztcbiAgQElucHV0KCkgaGVhZGVyID0gW107XG4gIEBJbnB1dCgpIGltcHVyZSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNyYyA9IFtdO1xuICBAT3V0cHV0KCkgc3JjQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgQElucHV0KCkgZGVzdCA9IFtdO1xuICBAT3V0cHV0KCkgZGVzdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpdGVyYWJsZURpZmZlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xuICAgIHRoaXMuaXRlcmFibGVEaWZmZXIgPSB0aGlzLl9pdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgXG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgbGV0IHNvdXJjZUNoYW5nZXMgPSB0aGlzLml0ZXJhYmxlRGlmZmVyLmRpZmYodGhpcy5zcmMpO1xuICAgIGlmIChzb3VyY2VDaGFuZ2VzKSB7XG4gICAgICB0aGlzLnNyY0NoYW5nZS5lbWl0KHRoaXMuc3JjKTtcbiAgICB9XG4gICAgbGV0IGRlc3RDaGFuZ2VzID0gdGhpcy5pdGVyYWJsZURpZmZlci5kaWZmKHRoaXMuZGVzdCk7XG4gICAgaWYgKGRlc3RDaGFuZ2VzKSB7XG4gICAgICB0aGlzLmRlc3RDaGFuZ2UuZW1pdCh0aGlzLmRlc3QpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEFsbChsaXN0LCBiKSB7XG4gICAgbGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5zZWxlY3RlZCA9IGI7XG4gICAgfSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgaWYgKHRoaXMuaW1wdXJlKSB7XG4gICAgICB0aGlzLmRlc3QucHVzaCguLi50aGlzLnNyYy5maWx0ZXIoXz0+Xy5zZWxlY3RlZCkubWFwKF89PntcbiAgICAgICAgcmV0dXJuIHsgLi4uXyB9O1xuICAgICAgfSkpO1xuICAgICAgdGhpcy5zcmMgPSB0aGlzLnNyYy5maWx0ZXIoXz0+IV8uc2VsZWN0ZWQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXN0LnB1c2goLi4udGhpcy5zcmMuZmlsdGVyKF89Pl8uc2VsZWN0ZWQpLm1hcChfPT57XG4gICAgICAgIHJldHVybiB7IC4uLl8gfTtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuaW1wdXJlKSB7XG4gICAgICB0aGlzLnNyYy5wdXNoKC4uLnRoaXMuZGVzdC5maWx0ZXIoXz0+Xy5zZWxlY3RlZCkubWFwKF89PntcbiAgICAgICAgcmV0dXJuIHsgLi4uXyB9O1xuICAgICAgfSkpO1xuICAgICAgdGhpcy5kZXN0ID0gdGhpcy5kZXN0LmZpbHRlcihfPT4hXy5zZWxlY3RlZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXN0ID0gdGhpcy5kZXN0LmZpbHRlcihfPT4hXy5zZWxlY3RlZCkubWFwKF89PntcbiAgICAgICAgcmV0dXJuIHsgLi4uXyB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=