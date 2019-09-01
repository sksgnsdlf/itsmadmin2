import { Component, Input, Output, EventEmitter, IterableDiffers, ViewChild, forwardRef, NgZone, Inject, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TreeViewComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
class MultiSelectComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ defaults = {
    contentsCss: [''],
    customConfig: ''
};
const /** @type {?} */ CKEDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CKEditorComponent),
    multi: true
};
class CKEditorComponent {
    /**
     * @param {?} ngZone
     * @param {?} moduleConfig
     */
    constructor(ngZone, moduleConfig) {
        this.ngZone = ngZone;
        this.moduleConfig = moduleConfig;
        this.innerValue = '';
        this.interval = null;
        this.readonly = false;
        this.config = {};
        this.skin = 'moono-lisa';
        this.language = 'ko';
        this.fullPage = false;
        this.onLoad = new EventEmitter();
    }
    /**
     * @param {?} _
     * @return {?}
     */
    onChange(_) { }
    ;
    /**
     * @return {?}
     */
    onTouched() { }
    ;
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.ckIns) {
            return;
        }
        if (changes["readonly"]) {
            this.ckIns.setReadOnly(this.readonly);
        }
    }
    /**
     * @return {?}
     */
    getContent() {
        return this.ckIns.getData();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.ckIns) {
            this.ckIns.removeAllListeners();
            CKEDITOR.instances[this.ckIns.name].destroy();
            this.ckIns.destroy();
            this.ckIns = null;
            clearInterval(this.interval);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initCKEditor();
    }
    /**
     * @return {?}
     */
    initCKEditor() {
        if (typeof CKEDITOR === 'undefined') {
            return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        }
        let /** @type {?} */ opt = Object.assign({}, defaults, this.config, {
            readOnly: this.readonly,
            skin: this.skin,
            language: this.language,
            fullPage: this.fullPage,
            filebrowserUploadUrl: this.moduleConfig.CKEDITOR_UPLOAD_URI
        });
        this.ckIns = CKEDITOR.replace(this.ck.nativeElement, opt);
        this.ckIns.setData(this.innerValue);
        setTimeout(_ => {
            this.onLoad.emit();
        }, 200);
        this.interval = setInterval(() => {
            this.ngZone.run(() => {
                this.innerValue = this.ckIns.getData();
                this.onChange(this.ckIns.getData());
                this.onTouched();
            });
        }, 500);
        // this.ckIns.on('change', () => {
        //   this.onTouched();
        //   let val = this.ckIns.getData();
        //   this.updateValue(val);
        // });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        this.ngZone.run(() => {
            this.innerValue = value;
            this.onChange(value);
            this.onTouched();
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.innerValue = value || '';
        if (this.ckIns) {
            this.ckIns.setData(this.innerValue);
            let /** @type {?} */ val = this.ckIns.getData();
            this.ckIns.setData(val);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
    }
}
CKEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'itsm-ckeditor',
                template: `<textarea #ck></textarea>`,
                providers: [CKEDITOR_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
CKEditorComponent.ctorParameters = () => [
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: ['config',] }] }
];
CKEditorComponent.propDecorators = {
    readonly: [{ type: Input }],
    config: [{ type: Input }],
    skin: [{ type: Input }],
    language: [{ type: Input }],
    fullPage: [{ type: Input }],
    onLoad: [{ type: Output }],
    ck: [{ type: ViewChild, args: ['ck',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ItsmUiModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { TreeViewComponent, MultiSelectComponent, CKEDITOR_VALUE_ACCESSOR, CKEditorComponent, ItsmUiModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRzbS11aS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vaXRzbS11aS9saWIvdHJlZS12aWV3L3RyZWUtdmlldy5jb21wb25lbnQudHMiLCJuZzovL2l0c20tdWkvbGliL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9pdHNtLXVpL2xpYi9ja2VkaXRvci9ja2VkaXRvci5jb21wb25lbnQudHMiLCJuZzovL2l0c20tdWkvbGliL2l0c20tdWkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRzbS10cmVlLXZpZXcnLFxuICB0ZW1wbGF0ZTogYCAgPCEtLSBDYXJkIC0tPlxuICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIiAqbmdJZj1cInRpdGxlXCI+e3t0aXRsZX19PC9oND5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10ZXh0XCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2VhcmNoXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIsOqwrLCgMOswoPCiVwiIFsobmdNb2RlbCldPVwicVwiIChrZXl1cCk9XCJzZWFyY2gocSk7XCI+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJsZXZlbDFcIiBbaGlkZGVuXT1cInFcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsZXZlbDEgb2YgZGF0YVwiIFtuZ0NsYXNzXT1cInsgc3ViOiBsZXZlbDEuc3ViPy5sZW5ndGgsIG9uOiBsZXZlbDEuZXhwYW5kZWQsIG9mZjogIWxldmVsMS5leHBhbmRlZCB9XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiY2hlY2tib3gmJiFsZXZlbDEuc3ViPy5sZW5ndGhcIiB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cImxldmVsMS5zZWxlY3RlZFwiPlxuICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJ0b2dnbGVGb2xkZXIobGV2ZWwxKVwiPnt7bGV2ZWwxLm5hbWV9fTwvYT5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsZXZlbDJcIiAqbmdJZj1cImxldmVsMS5leHBhbmRlZCYmbGV2ZWwxLnN1Yj8ubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGxldmVsMiBvZiBsZXZlbDEuc3ViXCIgW25nQ2xhc3NdPVwieyBzdWI6IGxldmVsMi5zdWI/Lmxlbmd0aCwgb246IGxldmVsMi5leHBhbmRlZCwgb2ZmOiAhbGV2ZWwyLmV4cGFuZGVkIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiY2hlY2tib3gmJiFsZXZlbDIuc3ViPy5sZW5ndGhcIiB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cImxldmVsMi5zZWxlY3RlZFwiPlx0XG4gICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJ0b2dnbGVGb2xkZXIobGV2ZWwyKVwiPnt7bGV2ZWwyLm5hbWV9fTwvYT5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibGV2ZWwzXCIgKm5nSWY9XCJsZXZlbDIuZXhwYW5kZWQmJmxldmVsMi5zdWI/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGV2ZWwzIG9mIGxldmVsMi5zdWJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImNoZWNrYm94XCIgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJsZXZlbDMuc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJ0b2dnbGVGb2xkZXIobGV2ZWwzKVwiPnt7bGV2ZWwzLm5hbWV9fTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cImRlcDFcIiAqbmdJZj1cInEgJiYgZmlsbHRlcmRcIj5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGZpbGx0ZXJkXCI+PGEgKGNsaWNrKT1cIk9uQ2xpY2suZW1pdChpdGVtKVwiPnt7aXRlbS5uYW1lfX08L2E+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwhLS0gQ2FyZCAtLT5gLFxuICBzdHlsZXM6IFtgLmNhcmR7d2lkdGg6MTAwJTtmb250LXNpemU6MWVtfS5jYXJkIGlucHV0LnNlYXJjaHttYXJnaW4tYm90dG9tOjIwcHh9LmNhcmQgdWx7cGFkZGluZy1sZWZ0OjEwcHg7bGlzdC1zdHlsZTpub25lfS5jYXJkIHVsLmxldmVsMXttYXgtaGVpZ2h0OjUwMHB4O292ZXJmbG93LXk6YXV0b30uY2FyZCB1bCB1bHttYXJnaW4tdG9wOjVweH0uY2FyZCB1bCBsaXtjdXJzb3I6cG9pbnRlcjtwYWRkaW5nOjJweCAwO2NvbG9yOmdyYXl9LmNhcmQgdWwgbGk6aG92ZXJ7Y29sb3I6IzUzYTNmZn0uY2FyZCB1bCBsaS5zdWJ7cGFkZGluZy1sZWZ0OjIwcHg7YmFja2dyb3VuZDp1cmwoLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9mb2xkZXJfb2ZmLnBuZykgM3B4IDZweCBuby1yZXBlYXR9LmNhcmQgdWwgbGkub257YmFja2dyb3VuZDp1cmwoLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9mb2xkZXJfb24ucG5nKSAzcHggNnB4IG5vLXJlcGVhdH0uY2FyZCB1bCBsaSBpbnB1dHttYXJnaW4tcmlnaHQ6NXB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZyA9IG51bGw7XG4gIEBJbnB1dCgpIGNoZWNrYm94ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRhdGE6IGFueVtdID0gW107XG4gIEBPdXRwdXQoKSBPbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgT3JnQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBxO1xuICBmaWxsdGVyZCA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICB0b2dnbGVGb2xkZXIobGkpIHtcbiAgICBpZiAobGkuc3ViICYmIGxpLnN1Yi5sZW5ndGgpXG4gICAgICBsaS5leHBhbmRlZCA9ICFsaS5leHBhbmRlZDtcblxuICAgIHRoaXMuT25DbGljay5lbWl0KGxpKTtcbiAgfVxuXG4gIGdldFNlbGVjdGlvbigpIHtcbiAgICBsZXQgdG1wID0gW107XG4gICAgZm9yIChsZXQgbGV2ZWwxIG9mIHRoaXMuZGF0YSkge1xuICAgICAgaWYgKGxldmVsMS5zZWxlY3RlZCkge1xuICAgICAgICB0bXAucHVzaChsZXZlbDEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGxldmVsMiBvZiBsZXZlbDEuc3ViKSB7XG4gICAgICAgIGlmIChsZXZlbDIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0bXAucHVzaChsZXZlbDIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGxldmVsMyBvZiBsZXZlbDIuc3ViKSB7XG4gICAgICAgICAgaWYgKGxldmVsMy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdG1wLnB1c2gobGV2ZWwzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG1wO1xuICB9XG5cbiAgc2VhcmNoKHRleHQpIHtcbiAgICBpZiAoIXRleHQpXG4gICAgICByZXR1cm47XG4gICAgXG4gICAgbGV0IHRtcCA9IFtdO1xuICAgIGZvciAobGV0IGxldmVsMSBvZiB0aGlzLmRhdGEpIHtcbiAgICAgIGlmIChsZXZlbDEubmFtZS5pbmNsdWRlcyh0ZXh0KSkge1xuICAgICAgICB0bXAucHVzaChsZXZlbDEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGxldmVsMiBvZiBsZXZlbDEuc3ViKSB7XG4gICAgICAgIGlmIChsZXZlbDIubmFtZS5pbmNsdWRlcyh0ZXh0KSkge1xuICAgICAgICAgIHRtcC5wdXNoKGxldmVsMik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgbGV2ZWwzIG9mIGxldmVsMi5zdWIpIHtcbiAgICAgICAgICBpZiAobGV2ZWwzLm5hbWUuaW5jbHVkZXModGV4dCkpIHtcbiAgICAgICAgICAgIHRtcC5wdXNoKGxldmVsMyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5maWxsdGVyZCA9IHRtcDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSXRlcmFibGVEaWZmZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKioqKioqKioqKioqKioqKipFeGFtcGxlcyoqKioqKioqKioqKioqKioqKiogXG4gKiBcbjxpdHNtLW11bHRpLXNlbGVjdCBbKHNyYyldPVwic3JjXCIgWyhkZXN0KV09XCJkZXN0XCIgW2hlYWRlcl09XCJoZWFkZXJcIiB0aXRsZT1cIsOtwoXCjMOsworCpMOtworCuCDDq8KpwoDDrcKLwrAgw6zChcKAw6vCoMKJw63ChMKwXCI+XG4gIDxkaXYgZmlsdGVyPVwic3JjXCI+XG4gICAgw63ClcKEw63ChMKwIMOtwoXCjMOsworCpMOtworCuFxuICA8L2Rpdj5cbiAgPG5nYi1wYWdpbmF0aW9uIGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcIiBbY29sbGVjdGlvblNpemVdPVwiNzBcIiBbKHBhZ2UpXT1cImRlc3RQYWdlXCIgYXJpYS1sYWJlbD1cIkRlZmF1bHQgcGFnaW5hdGlvblwiIHBhZ2luYXRpb249XCJkZXN0XCI+PC9uZ2ItcGFnaW5hdGlvbj5cbiAgPG5nYi1wYWdpbmF0aW9uIGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcIiBbY29sbGVjdGlvblNpemVdPVwiNzBcIiBbKHBhZ2UpXT1cInNyY1BhZ2VcIiBhcmlhLWxhYmVsPVwiRGVmYXVsdCBwYWdpbmF0aW9uXCIgcGFnaW5hdGlvbj1cInNyY1wiPjwvbmdiLXBhZ2luYXRpb24+XG48L2l0c20tbXVsdGktc2VsZWN0PlxuICogXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2l0c20tbXVsdGktc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgIDwhLS0gQ2FyZCAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIiAqbmdJZj1cInRpdGxlXCI+e3t0aXRsZX19PC9oND5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10ZXh0XCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbZmlsdGVyPWRlc3RdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0aD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJzZWxlY3RBbGwoZGVzdCwgJGV2ZW50LnRhcmdldC5jaGVja2VkKVwiPjwvdGg+XG4gICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBpdGVtIG9mIGhlYWRlclwiPnt7aXRlbS5uYW1lfX08L3RoPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRlc3RcIj5cbiAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJpdGVtLnNlbGVjdGVkXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgXyBvZiBoZWFkZXJcIj57e2l0ZW1bXy5rZXldfX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibmdiLXBhZ2luYXRpb25bcGFnaW5hdGlvbj1kZXN0XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwhLS0gQ2FyZCAtLT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2wgc2hyaW5rXCI+XG4gICAgPGltZyAoY2xpY2spPVwiYWRkKClcIiBzcmM9XCJhc3NldHMvaW1hZ2VzL2Fycl9sZWZ0X2J0bi5naWZcIiBhbHQ9XCJcIj5cbiAgICA8aW1nIChjbGljayk9XCJyZW1vdmUoKVwiIHNyYz1cImFzc2V0cy9pbWFnZXMvYXJyX3JpZ2h0X2J0bi5naWZcIiBhbHQ9XCJcIj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICA8IS0tIENhcmQgLS0+XG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGV4dFwiPlxuICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbZmlsdGVyPXNyY11cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRoPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAoY2hhbmdlKT1cInNlbGVjdEFsbChzcmMsICRldmVudC50YXJnZXQuY2hlY2tlZClcIj48L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBpdGVtIG9mIGhlYWRlclwiPnt7aXRlbS5uYW1lfX08L3RoPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIHNyY1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwiaXRlbS5zZWxlY3RlZFwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgXyBvZiBoZWFkZXJcIj57e2l0ZW1bXy5rZXldfX08L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZ2ItcGFnaW5hdGlvbltwYWdpbmF0aW9uPXNyY11cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwhLS0gQ2FyZCAtLT5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmNvbHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6c3RyZXRjaH0uY29sIC5jYXJke3dpZHRoOjEwMCV9LnNocmlua3tmbGV4LWdyb3c6MDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmbGV4LWZsb3c6Y29sdW1ufS5zaHJpbmsgaW1ne21hcmdpbi1ib3R0b206NXB4fXRoZWFke2JhY2tncm91bmQ6I2Y0ZjRmNH10aGVhZCB0aDpmaXJzdC1vZi10eXBle3dpZHRoOjElfWBdXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdGl0bGUgPSAnJztcbiAgQElucHV0KCkgaGVhZGVyID0gW107XG4gIEBJbnB1dCgpIGltcHVyZSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHNyYyA9IFtdO1xuICBAT3V0cHV0KCkgc3JjQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgQElucHV0KCkgZGVzdCA9IFtdO1xuICBAT3V0cHV0KCkgZGVzdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpdGVyYWJsZURpZmZlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xuICAgIHRoaXMuaXRlcmFibGVEaWZmZXIgPSB0aGlzLl9pdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgXG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgbGV0IHNvdXJjZUNoYW5nZXMgPSB0aGlzLml0ZXJhYmxlRGlmZmVyLmRpZmYodGhpcy5zcmMpO1xuICAgIGlmIChzb3VyY2VDaGFuZ2VzKSB7XG4gICAgICB0aGlzLnNyY0NoYW5nZS5lbWl0KHRoaXMuc3JjKTtcbiAgICB9XG4gICAgbGV0IGRlc3RDaGFuZ2VzID0gdGhpcy5pdGVyYWJsZURpZmZlci5kaWZmKHRoaXMuZGVzdCk7XG4gICAgaWYgKGRlc3RDaGFuZ2VzKSB7XG4gICAgICB0aGlzLmRlc3RDaGFuZ2UuZW1pdCh0aGlzLmRlc3QpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEFsbChsaXN0LCBiKSB7XG4gICAgbGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZWxlbWVudC5zZWxlY3RlZCA9IGI7XG4gICAgfSk7XG4gIH1cblxuICBhZGQoKSB7XG4gICAgaWYgKHRoaXMuaW1wdXJlKSB7XG4gICAgICB0aGlzLmRlc3QucHVzaCguLi50aGlzLnNyYy5maWx0ZXIoXz0+Xy5zZWxlY3RlZCkubWFwKF89PntcbiAgICAgICAgcmV0dXJuIHsgLi4uXyB9O1xuICAgICAgfSkpO1xuICAgICAgdGhpcy5zcmMgPSB0aGlzLnNyYy5maWx0ZXIoXz0+IV8uc2VsZWN0ZWQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXN0LnB1c2goLi4udGhpcy5zcmMuZmlsdGVyKF89Pl8uc2VsZWN0ZWQpLm1hcChfPT57XG4gICAgICAgIHJldHVybiB7IC4uLl8gfTtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuaW1wdXJlKSB7XG4gICAgICB0aGlzLnNyYy5wdXNoKC4uLnRoaXMuZGVzdC5maWx0ZXIoXz0+Xy5zZWxlY3RlZCkubWFwKF89PntcbiAgICAgICAgcmV0dXJuIHsgLi4uXyB9O1xuICAgICAgfSkpO1xuICAgICAgdGhpcy5kZXN0ID0gdGhpcy5kZXN0LmZpbHRlcihfPT4hXy5zZWxlY3RlZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXN0ID0gdGhpcy5kZXN0LmZpbHRlcihfPT4hXy5zZWxlY3RlZCkubWFwKF89PntcbiAgICAgICAgcmV0dXJuIHsgLi4uXyB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZixcclxuICBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCxcclxuICBOZ1pvbmUsXHJcbiAgSW5qZWN0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmRlY2xhcmUgdmFyIENLRURJVE9SOiBhbnk7XHJcblxyXG5jb25zdCBkZWZhdWx0cyA9IHtcclxuICBjb250ZW50c0NzczogWycnXSxcclxuICBjdXN0b21Db25maWc6ICcnXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ0tFRElUT1JfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDS0VkaXRvckNvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaXRzbS1ja2VkaXRvcicsXHJcbiAgdGVtcGxhdGU6IGA8dGV4dGFyZWEgI2NrPjwvdGV4dGFyZWE+YCxcclxuICBwcm92aWRlcnM6IFtDS0VESVRPUl9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENLRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBwcml2YXRlIGNrSW5zOiBhbnk7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZShfOiBhbnkpIHsgfTtcclxuICBwcml2YXRlIG9uVG91Y2hlZCgpIHsgfTtcclxuICBwcml2YXRlIGlubmVyVmFsdWU6IHN0cmluZyA9ICcnO1xyXG4gIHByaXZhdGUgaW50ZXJ2YWw6IGFueSA9IG51bGw7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHJlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGNvbmZpZzogYW55ID0ge307XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNraW46IHN0cmluZyA9ICdtb29uby1saXNhJztcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgbGFuZ3VhZ2U6IHN0cmluZyA9ICdrbyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGZ1bGxQYWdlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIHB1YmxpYyBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2NrJylcclxuICBwdWJsaWMgY2s6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoJ2NvbmZpZycpIHByaXZhdGUgbW9kdWxlQ29uZmlnKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmNrSW5zKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzLnJlYWRvbmx5KSB7XHJcbiAgICAgIHRoaXMuY2tJbnMuc2V0UmVhZE9ubHkodGhpcy5yZWFkb25seSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2tJbnMuZ2V0RGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5ja0lucykge1xyXG4gICAgICB0aGlzLmNrSW5zLnJlbW92ZUFsbExpc3RlbmVycygpO1xyXG4gICAgICBDS0VESVRPUi5pbnN0YW5jZXNbdGhpcy5ja0lucy5uYW1lXS5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuY2tJbnMuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLmNrSW5zID0gbnVsbDtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdENLRWRpdG9yKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRDS0VkaXRvcigpIHtcclxuICAgIGlmICh0eXBlb2YgQ0tFRElUT1IgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ0NLRWRpdG9yIDQueCBpcyBtaXNzaW5nIChodHRwOi8vY2tlZGl0b3IuY29tLyknKTtcclxuICAgIH1cclxuICAgIGxldCBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgdGhpcy5jb25maWcsIHtcclxuICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZG9ubHksXHJcbiAgICAgIHNraW46IHRoaXMuc2tpbixcclxuICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXHJcbiAgICAgIGZ1bGxQYWdlOiB0aGlzLmZ1bGxQYWdlLFxyXG4gICAgICBmaWxlYnJvd3NlclVwbG9hZFVybDogdGhpcy5tb2R1bGVDb25maWcuQ0tFRElUT1JfVVBMT0FEX1VSSVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNrSW5zID0gQ0tFRElUT1IucmVwbGFjZSh0aGlzLmNrLm5hdGl2ZUVsZW1lbnQsIG9wdCk7XHJcbiAgICB0aGlzLmNrSW5zLnNldERhdGEodGhpcy5pbm5lclZhbHVlKTtcclxuICAgIHNldFRpbWVvdXQoXz0+e1xyXG4gICAgICB0aGlzLm9uTG9hZC5lbWl0KCk7XHJcbiAgICB9LCAyMDApO1xyXG5cclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5ja0lucy5nZXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmNrSW5zLmdldERhdGEoKSk7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCA1MDApO1xyXG5cclxuICAgIC8vIHRoaXMuY2tJbnMub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgIC8vICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIC8vICAgbGV0IHZhbCA9IHRoaXMuY2tJbnMuZ2V0RGF0YSgpO1xyXG4gICAgLy8gICB0aGlzLnVwZGF0ZVZhbHVlKHZhbCk7XHJcbiAgICAvLyB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbHVlIHx8ICcnO1xyXG4gICAgaWYgKHRoaXMuY2tJbnMpIHtcclxuICAgICAgdGhpcy5ja0lucy5zZXREYXRhKHRoaXMuaW5uZXJWYWx1ZSk7XHJcbiAgICAgIGxldCB2YWwgPSB0aGlzLmNrSW5zLmdldERhdGEoKTtcclxuICAgICAgdGhpcy5ja0lucy5zZXREYXRhKHZhbCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcblxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBUcmVlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdHJlZS12aWV3L3RyZWUtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IENLRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9ja2VkaXRvci9ja2VkaXRvci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTmdiTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RyZWVWaWV3Q29tcG9uZW50LCBNdWx0aVNlbGVjdENvbXBvbmVudCwgQ0tFZGl0b3JDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVHJlZVZpZXdDb21wb25lbnQsIE11bHRpU2VsZWN0Q29tcG9uZW50LCBDS0VkaXRvckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSXRzbVVpTW9kdWxlIHsgXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEl0c21VaU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogY29uZmlnIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7SUFnREU7cUJBVHlCLElBQUk7d0JBQ1QsS0FBSztvQkFDRixFQUFFO3VCQUNjLElBQUksWUFBWSxFQUFPOzBCQUNwQixJQUFJLFlBQVksRUFBTzt3QkFHdEQsRUFBRTtLQUVJOzs7O0lBRWpCLFFBQVE7S0FDUDs7Ozs7SUFFRCxZQUFZLENBQUMsRUFBRTtRQUNiLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU07WUFDekIsRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDdkI7Ozs7SUFFRCxZQUFZO1FBQ1YscUJBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEtBQUsscUJBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqQixTQUFTO2FBQ1Y7WUFDRCxLQUFLLHFCQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUM3QixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pCLFNBQVM7aUJBQ1Y7Z0JBQ0QsS0FBSyxxQkFBSSxNQUFNLElBQUksTUFBTSxDQUFD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