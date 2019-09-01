/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class TreeViewComponent {
    constructor() {
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
    ngOnInit() {
    }
    /**
     * @param {?} li
     * @return {?}
     */
    toggleFolder(li) {
        if (li.sub && li.sub.length)
            li.expanded = !li.expanded;
        this.OnClick.emit(li);
    }
    /**
     * @return {?}
     */
    getSelection() {
        let /** @type {?} */ tmp = [];
        for (let /** @type {?} */ level1 of this.data) {
            if (level1.selected) {
                tmp.push(level1);
                continue;
            }
            for (let /** @type {?} */ level2 of level1.sub) {
                if (level2.selected) {
                    tmp.push(level2);
                    continue;
                }
                for (let /** @type {?} */ level3 of level2.sub) {
                    if (level3.selected) {
                        tmp.push(level3);
                    }
                }
            }
        }
        return tmp;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    search(text) {
        if (!text)
            return;
        let /** @type {?} */ tmp = [];
        for (let /** @type {?} */ level1 of this.data) {
            if (level1.name.includes(text)) {
                tmp.push(level1);
                continue;
            }
            for (let /** @type {?} */ level2 of level1.sub) {
                if (level2.name.includes(text)) {
                    tmp.push(level2);
                    continue;
                }
                for (let /** @type {?} */ level3 of level2.sub) {
                    if (level3.name.includes(text)) {
                        tmp.push(level3);
                    }
                }
            }
        }
        this.fillterd = tmp;
    }
}
TreeViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'itsm-tree-view',
                template: `  <!-- Card -->
  <div class="card">
      <div class="card-body">
          <h4 class="card-title" *ngIf="title">{{title}}</h4>
          <div class="card-text">
            <ng-content></ng-content>
            <input class="form-control search" type="text" placeholder="검색" [(ngModel)]="q" (keyup)="search(q);">
            <ul class="level1" [hidden]="q">
              <li *ngFor="let level1 of data" [ngClass]="{ sub: level1.sub?.length, on: level1.expanded, off: !level1.expanded }">
                <input *ngIf="checkbox&&!level1.sub?.length" type="checkbox" [(ngModel)]="level1.selected">
                <a (click)="toggleFolder(level1)">{{level1.name}}</a>
                <ul class="level2" *ngIf="level1.expanded&&level1.sub?.length">
                  <li *ngFor="let level2 of level1.sub" [ngClass]="{ sub: level2.sub?.length, on: level2.expanded, off: !level2.expanded }">
                    <input *ngIf="checkbox&&!level2.sub?.length" type="checkbox" [(ngModel)]="level2.selected">	
                    <a (click)="toggleFolder(level2)">{{level2.name}}</a>
                    <ul class="level3" *ngIf="level2.expanded&&level2.sub?.length">
                      <li *ngFor="let level3 of level2.sub">
                        <input *ngIf="checkbox" type="checkbox" [(ngModel)]="level3.selected">
                        <a (click)="toggleFolder(level3)">{{level3.name}}</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="dep1" *ngIf="q && fillterd">
              <li *ngFor="let item of fillterd"><a (click)="OnClick.emit(item)">{{item.name}}</a></li>
            </ul>
          </div>
      </div>
  </div>
  <!-- Card -->`,
                styles: [`.card{width:100%;font-size:1em}.card input.search{margin-bottom:20px}.card ul{padding-left:10px;list-style:none}.card ul.level1{max-height:500px;overflow-y:auto}.card ul ul{margin-top:5px}.card ul li{cursor:pointer;padding:2px 0;color:gray}.card ul li:hover{color:#53a3ff}.card ul li.sub{padding-left:20px;background:url(../../../assets/images/folder_off.png) 3px 6px no-repeat}.card ul li.on{background:url(../../../assets/images/folder_on.png) 3px 6px no-repeat}.card ul li input{margin-right:5px}`]
            },] },
];
/** @nocollapse */
TreeViewComponent.ctorParameters = () => [];
TreeViewComponent.propDecorators = {
    title: [{ type: Input }],
    checkbox: [{ type: Input }],
    data: [{ type: Input }],
    OnClick: [{ type: Output }],
    OrgChanged: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2l0c20tdWkvIiwic291cmNlcyI6WyJsaWIvdHJlZS12aWV3L3RyZWUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFzQy9FLE1BQU07SUFVSjtxQkFUeUIsSUFBSTt3QkFDVCxLQUFLO29CQUNGLEVBQUU7dUJBQ2MsSUFBSSxZQUFZLEVBQU87MEJBQ3BCLElBQUksWUFBWSxFQUFPO3dCQUd0RCxFQUFFO0tBRUk7Ozs7SUFFakIsUUFBUTtLQUNQOzs7OztJQUVELFlBQVksQ0FBQyxFQUFFO1FBQ2IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUMxQixFQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUU3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN2Qjs7OztJQUVELFlBQVk7UUFDVixxQkFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMscUJBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqQixRQUFRLENBQUM7YUFDVjtZQUNELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pCLFFBQVEsQ0FBQztpQkFDVjtnQkFDRCxHQUFHLENBQUMsQ0FBQyxxQkFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNsQjtpQkFDRjthQUNGO1NBQ0Y7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ1o7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQUk7UUFDVCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNSLE1BQU0sQ0FBQztRQUVULHFCQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixHQUFHLENBQUMsQ0FBQyxxQkFBSSxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqQixRQUFRLENBQUM7YUFDVjtZQUNELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqQixRQUFRLENBQUM7aUJBQ1Y7Z0JBQ0QsR0FBRyxDQUFDLENBQUMscUJBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUM5QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ2xCO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0tBQ3JCOzs7WUF6R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkErQkk7Z0JBQ2QsTUFBTSxFQUFFLENBQUMscWZBQXFmLENBQUM7YUFDaGdCOzs7OztvQkFFRSxLQUFLO3VCQUNMLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxNQUFNO3lCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0c20tdHJlZS12aWV3JyxcbiAgdGVtcGxhdGU6IGAgIDwhLS0gQ2FyZCAtLT5cbiAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICA8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCIgKm5nSWY9XCJ0aXRsZVwiPnt7dGl0bGV9fTwvaDQ+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGV4dFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIHNlYXJjaFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCLqsoDsg4lcIiBbKG5nTW9kZWwpXT1cInFcIiAoa2V5dXApPVwic2VhcmNoKHEpO1wiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibGV2ZWwxXCIgW2hpZGRlbl09XCJxXCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGV2ZWwxIG9mIGRhdGFcIiBbbmdDbGFzc109XCJ7IHN1YjogbGV2ZWwxLnN1Yj8ubGVuZ3RoLCBvbjogbGV2ZWwxLmV4cGFuZGVkLCBvZmY6ICFsZXZlbDEuZXhwYW5kZWQgfVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImNoZWNrYm94JiYhbGV2ZWwxLnN1Yj8ubGVuZ3RoXCIgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJsZXZlbDEuc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwidG9nZ2xlRm9sZGVyKGxldmVsMSlcIj57e2xldmVsMS5uYW1lfX08L2E+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibGV2ZWwyXCIgKm5nSWY9XCJsZXZlbDEuZXhwYW5kZWQmJmxldmVsMS5zdWI/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsZXZlbDIgb2YgbGV2ZWwxLnN1YlwiIFtuZ0NsYXNzXT1cInsgc3ViOiBsZXZlbDIuc3ViPy5sZW5ndGgsIG9uOiBsZXZlbDIuZXhwYW5kZWQsIG9mZjogIWxldmVsMi5leHBhbmRlZCB9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImNoZWNrYm94JiYhbGV2ZWwyLnN1Yj8ubGVuZ3RoXCIgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJsZXZlbDIuc2VsZWN0ZWRcIj5cdFxuICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwidG9nZ2xlRm9sZGVyKGxldmVsMilcIj57e2xldmVsMi5uYW1lfX08L2E+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImxldmVsM1wiICpuZ0lmPVwibGV2ZWwyLmV4cGFuZGVkJiZsZXZlbDIuc3ViPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGxldmVsMyBvZiBsZXZlbDIuc3ViXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJjaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwibGV2ZWwzLnNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwidG9nZ2xlRm9sZGVyKGxldmVsMylcIj57e2xldmVsMy5uYW1lfX08L2E+XG4gICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJkZXAxXCIgKm5nSWY9XCJxICYmIGZpbGx0ZXJkXCI+XG4gICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmaWxsdGVyZFwiPjxhIChjbGljayk9XCJPbkNsaWNrLmVtaXQoaXRlbSlcIj57e2l0ZW0ubmFtZX19PC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8IS0tIENhcmQgLS0+YCxcbiAgc3R5bGVzOiBbYC5jYXJke3dpZHRoOjEwMCU7Zm9udC1zaXplOjFlbX0uY2FyZCBpbnB1dC5zZWFyY2h7bWFyZ2luLWJvdHRvbToyMHB4fS5jYXJkIHVse3BhZGRpbmctbGVmdDoxMHB4O2xpc3Qtc3R5bGU6bm9uZX0uY2FyZCB1bC5sZXZlbDF7bWF4LWhlaWdodDo1MDBweDtvdmVyZmxvdy15OmF1dG99LmNhcmQgdWwgdWx7bWFyZ2luLXRvcDo1cHh9LmNhcmQgdWwgbGl7Y3Vyc29yOnBvaW50ZXI7cGFkZGluZzoycHggMDtjb2xvcjpncmF5fS5jYXJkIHVsIGxpOmhvdmVye2NvbG9yOiM1M2EzZmZ9LmNhcmQgdWwgbGkuc3Vie3BhZGRpbmctbGVmdDoyMHB4O2JhY2tncm91bmQ6dXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvZm9sZGVyX29mZi5wbmcpIDNweCA2cHggbm8tcmVwZWF0fS5jYXJkIHVsIGxpLm9ue2JhY2tncm91bmQ6dXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvZm9sZGVyX29uLnBuZykgM3B4IDZweCBuby1yZXBlYXR9LmNhcmQgdWwgbGkgaW5wdXR7bWFyZ2luLXJpZ2h0OjVweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoKSBjaGVja2JveCA9IGZhbHNlO1xuICBASW5wdXQoKSBkYXRhOiBhbnlbXSA9IFtdO1xuICBAT3V0cHV0KCkgT25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIE9yZ0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcTtcbiAgZmlsbHRlcmQgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgdG9nZ2xlRm9sZGVyKGxpKSB7XG4gICAgaWYgKGxpLnN1YiAmJiBsaS5zdWIubGVuZ3RoKVxuICAgICAgbGkuZXhwYW5kZWQgPSAhbGkuZXhwYW5kZWQ7XG5cbiAgICB0aGlzLk9uQ2xpY2suZW1pdChsaSk7XG4gIH1cblxuICBnZXRTZWxlY3Rpb24oKSB7XG4gICAgbGV0IHRtcCA9IFtdO1xuICAgIGZvciAobGV0IGxldmVsMSBvZiB0aGlzLmRhdGEpIHtcbiAgICAgIGlmIChsZXZlbDEuc2VsZWN0ZWQpIHtcbiAgICAgICAgdG1wLnB1c2gobGV2ZWwxKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBsZXZlbDIgb2YgbGV2ZWwxLnN1Yikge1xuICAgICAgICBpZiAobGV2ZWwyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdG1wLnB1c2gobGV2ZWwyKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBsZXZlbDMgb2YgbGV2ZWwyLnN1Yikge1xuICAgICAgICAgIGlmIChsZXZlbDMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRtcC5wdXNoKGxldmVsMyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRtcDtcbiAgfVxuXG4gIHNlYXJjaCh0ZXh0KSB7XG4gICAgaWYgKCF0ZXh0KVxuICAgICAgcmV0dXJuO1xuICAgIFxuICAgIGxldCB0bXAgPSBbXTtcbiAgICBmb3IgKGxldCBsZXZlbDEgb2YgdGhpcy5kYXRhKSB7XG4gICAgICBpZiAobGV2ZWwxLm5hbWUuaW5jbHVkZXModGV4dCkpIHtcbiAgICAgICAgdG1wLnB1c2gobGV2ZWwxKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBsZXZlbDIgb2YgbGV2ZWwxLnN1Yikge1xuICAgICAgICBpZiAobGV2ZWwyLm5hbWUuaW5jbHVkZXModGV4dCkpIHtcbiAgICAgICAgICB0bXAucHVzaChsZXZlbDIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGxldmVsMyBvZiBsZXZlbDIuc3ViKSB7XG4gICAgICAgICAgaWYgKGxldmVsMy5uYW1lLmluY2x1ZGVzKHRleHQpKSB7XG4gICAgICAgICAgICB0bXAucHVzaChsZXZlbDMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZmlsbHRlcmQgPSB0bXA7XG4gIH1cbn1cbiJdfQ==