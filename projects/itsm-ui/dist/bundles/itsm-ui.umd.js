(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@ng-bootstrap/ng-bootstrap')) :
    typeof define === 'function' && define.amd ? define('itsm-ui', ['exports', '@angular/core', '@angular/forms', '@angular/common', '@ng-bootstrap/ng-bootstrap'], factory) :
    (factory((global['itsm-ui'] = {}),global.ng.core,global.ng.forms,global.ng.common,null));
}(this, (function (exports,core,forms,common,ngBootstrap) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TreeViewComponent = (function () {
        function TreeViewComponent() {
            this.title = null;
            this.checkbox = false;
            this.data = [];
            this.OnClick = new core.EventEmitter();
            this.OrgChanged = new core.EventEmitter();
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
                    for (var _a = __values(this.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var level1 = _b.value;
                        if (level1.selected) {
                            tmp.push(level1);
                            continue;
                        }
                        try {
                            for (var _c = __values(level1.sub), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var level2 = _d.value;
                                if (level2.selected) {
                                    tmp.push(level2);
                                    continue;
                                }
                                try {
                                    for (var _e = __values(level2.sub), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        var level3 = _f.value;
                                        if (level3.selected) {
                                            tmp.push(level3);
                                        }
                                    }
                                }
                                catch (e_1_1) {
                                    e_1 = { error: e_1_1 };
                                }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_g = _e.return))
                                            _g.call(_e);
                                    }
                                    finally {
                                        if (e_1)
                                            throw e_1.error;
                                    }
                                }
                            }
                        }
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (_d && !_d.done && (_h = _c.return))
                                    _h.call(_c);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_j = _a.return))
                            _j.call(_a);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
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
                    for (var _a = __values(this.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var level1 = _b.value;
                        if (level1.name.includes(text)) {
                            tmp.push(level1);
                            continue;
                        }
                        try {
                            for (var _c = __values(level1.sub), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var level2 = _d.value;
                                if (level2.name.includes(text)) {
                                    tmp.push(level2);
                                    continue;
                                }
                                try {
                                    for (var _e = __values(level2.sub), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        var level3 = _f.value;
                                        if (level3.name.includes(text)) {
                                            tmp.push(level3);
                                        }
                                    }
                                }
                                catch (e_4_1) {
                                    e_4 = { error: e_4_1 };
                                }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_g = _e.return))
                                            _g.call(_e);
                                    }
                                    finally {
                                        if (e_4)
                                            throw e_4.error;
                                    }
                                }
                            }
                        }
                        catch (e_5_1) {
                            e_5 = { error: e_5_1 };
                        }
                        finally {
                            try {
                                if (_d && !_d.done && (_h = _c.return))
                                    _h.call(_c);
                            }
                            finally {
                                if (e_5)
                                    throw e_5.error;
                            }
                        }
                    }
                }
                catch (e_6_1) {
                    e_6 = { error: e_6_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_j = _a.return))
                            _j.call(_a);
                    }
                    finally {
                        if (e_6)
                            throw e_6.error;
                    }
                }
                this.fillterd = tmp;
                var e_6, _j, e_5, _h, e_4, _g;
            };
        TreeViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'itsm-tree-view',
                        template: "  <!-- Card -->\n  <div class=\"card\">\n      <div class=\"card-body\">\n          <h4 class=\"card-title\" *ngIf=\"title\">{{title}}</h4>\n          <div class=\"card-text\">\n            <ng-content></ng-content>\n            <input class=\"form-control search\" type=\"text\" placeholder=\"\uAC80\uC0C9\" [(ngModel)]=\"q\" (keyup)=\"search(q);\">\n            <ul class=\"level1\" [hidden]=\"q\">\n              <li *ngFor=\"let level1 of data\" [ngClass]=\"{ sub: level1.sub?.length, on: level1.expanded, off: !level1.expanded }\">\n                <input *ngIf=\"checkbox&&!level1.sub?.length\" type=\"checkbox\" [(ngModel)]=\"level1.selected\">\n                <a (click)=\"toggleFolder(level1)\">{{level1.name}}</a>\n                <ul class=\"level2\" *ngIf=\"level1.expanded&&level1.sub?.length\">\n                  <li *ngFor=\"let level2 of level1.sub\" [ngClass]=\"{ sub: level2.sub?.length, on: level2.expanded, off: !level2.expanded }\">\n                    <input *ngIf=\"checkbox&&!level2.sub?.length\" type=\"checkbox\" [(ngModel)]=\"level2.selected\">\t\n                    <a (click)=\"toggleFolder(level2)\">{{level2.name}}</a>\n                    <ul class=\"level3\" *ngIf=\"level2.expanded&&level2.sub?.length\">\n                      <li *ngFor=\"let level3 of level2.sub\">\n                        <input *ngIf=\"checkbox\" type=\"checkbox\" [(ngModel)]=\"level3.selected\">\n                        <a (click)=\"toggleFolder(level3)\">{{level3.name}}</a>\n                      </li>\n                    </ul>\n                  </li>\n                </ul>\n              </li>\n            </ul>\n            <ul class=\"dep1\" *ngIf=\"q && fillterd\">\n              <li *ngFor=\"let item of fillterd\"><a (click)=\"OnClick.emit(item)\">{{item.name}}</a></li>\n            </ul>\n          </div>\n      </div>\n  </div>\n  <!-- Card -->",
                        styles: [".card{width:100%;font-size:1em}.card input.search{margin-bottom:20px}.card ul{padding-left:10px;list-style:none}.card ul.level1{max-height:500px;overflow-y:auto}.card ul ul{margin-top:5px}.card ul li{cursor:pointer;padding:2px 0;color:gray}.card ul li:hover{color:#53a3ff}.card ul li.sub{padding-left:20px;background:url(../../../assets/images/folder_off.png) 3px 6px no-repeat}.card ul li.on{background:url(../../../assets/images/folder_on.png) 3px 6px no-repeat}.card ul li input{margin-right:5px}"]
                    },] },
        ];
        /** @nocollapse */
        TreeViewComponent.ctorParameters = function () { return []; };
        TreeViewComponent.propDecorators = {
            title: [{ type: core.Input }],
            checkbox: [{ type: core.Input }],
            data: [{ type: core.Input }],
            OnClick: [{ type: core.Output }],
            OrgChanged: [{ type: core.Output }]
        };
        return TreeViewComponent;
    }());

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
    var MultiSelectComponent = (function () {
        function MultiSelectComponent(_iterableDiffers) {
            this._iterableDiffers = _iterableDiffers;
            this.title = '';
            this.header = [];
            this.impure = false;
            this.src = [];
            this.srcChange = new core.EventEmitter();
            this.dest = [];
            this.destChange = new core.EventEmitter();
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
                    (_a = this.dest).push.apply(_a, __spread(this.src.filter(function (_) { return _.selected; }).map(function (_) {
                        return __assign({}, _);
                    })));
                    this.src = this.src.filter(function (_) { return !_.selected; });
                }
                else {
                    (_b = this.dest).push.apply(_b, __spread(this.src.filter(function (_) { return _.selected; }).map(function (_) {
                        return __assign({}, _);
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
                    (_a = this.src).push.apply(_a, __spread(this.dest.filter(function (_) { return _.selected; }).map(function (_) {
                        return __assign({}, _);
                    })));
                    this.dest = this.dest.filter(function (_) { return !_.selected; });
                }
                else {
                    this.dest = this.dest.filter(function (_) { return !_.selected; }).map(function (_) {
                        return __assign({}, _);
                    });
                }
                var _a;
            };
        MultiSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'itsm-multi-select',
                        template: "\n<div class=\"row\">\n  <div class=\"col\">\n    <!-- Card -->\n    <div class=\"card\">\n      <div class=\"card-body\">\n          <h4 class=\"card-title\" *ngIf=\"title\">{{title}}</h4>\n          <div class=\"card-text\">\n            <ng-content select=\"[filter=dest]\"></ng-content>\n            <table class=\"table\">\n              <thead>\n                <th><input type=\"checkbox\" (change)=\"selectAll(dest, $event.target.checked)\"></th>\n                <th *ngFor=\"let item of header\">{{item.name}}</th>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let item of dest\">\n                  <td><input type=\"checkbox\" [(ngModel)]=\"item.selected\"></td>\n                  <td *ngFor=\"let _ of header\">{{item[_.key]}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <ng-content select=\"ngb-pagination[pagination=dest]\"></ng-content>\n          </div>\n      </div>\n    </div>\n    <!-- Card -->\n  </div>\n  <div class=\"col shrink\">\n    <img (click)=\"add()\" src=\"assets/images/arr_left_btn.gif\" alt=\"\">\n    <img (click)=\"remove()\" src=\"assets/images/arr_right_btn.gif\" alt=\"\">\n  </div>\n  <div class=\"col\">\n    <!-- Card -->\n    <div class=\"card\">\n        <div class=\"card-body\">\n            <div class=\"card-text\">\n              <ng-content select=\"[filter=src]\"></ng-content>\n              <table class=\"table\">\n                <thead>\n                  <th><input type=\"checkbox\" (change)=\"selectAll(src, $event.target.checked)\"></th>\n                  <th *ngFor=\"let item of header\">{{item.name}}</th>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let item of src\">\n                    <td><input type=\"checkbox\" [(ngModel)]=\"item.selected\"></td>\n                    <td *ngFor=\"let _ of header\">{{item[_.key]}}</td>\n                  </tr>\n                </tbody>\n              </table>\n              <ng-content select=\"ngb-pagination[pagination=src]\"></ng-content>\n            </div>\n        </div>\n      </div>\n      <!-- Card -->\n  </div>\n</div>",
                        styles: [".col{display:flex;align-items:stretch}.col .card{width:100%}.shrink{flex-grow:0;display:flex;justify-content:center;flex-flow:column}.shrink img{margin-bottom:5px}thead{background:#f4f4f4}thead th:first-of-type{width:1%}"]
                    },] },
        ];
        /** @nocollapse */
        MultiSelectComponent.ctorParameters = function () {
            return [
                { type: core.IterableDiffers }
            ];
        };
        MultiSelectComponent.propDecorators = {
            title: [{ type: core.Input }],
            header: [{ type: core.Input }],
            impure: [{ type: core.Input }],
            src: [{ type: core.Input }],
            srcChange: [{ type: core.Output }],
            dest: [{ type: core.Input }],
            destChange: [{ type: core.Output }]
        };
        return MultiSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ defaults = {
        contentsCss: [''],
        customConfig: ''
    };
    var /** @type {?} */ CKEDITOR_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return CKEditorComponent; }),
        multi: true
    };
    var CKEditorComponent = (function () {
        function CKEditorComponent(ngZone, moduleConfig) {
            this.ngZone = ngZone;
            this.moduleConfig = moduleConfig;
            this.innerValue = '';
            this.interval = null;
            this.readonly = false;
            this.config = {};
            this.skin = 'moono-lisa';
            this.language = 'ko';
            this.fullPage = false;
            this.onLoad = new core.EventEmitter();
        }
        /**
         * @param {?} _
         * @return {?}
         */
        CKEditorComponent.prototype.onChange = /**
         * @param {?} _
         * @return {?}
         */
            function (_) { };
        /**
         * @return {?}
         */
        CKEditorComponent.prototype.onTouched = /**
         * @return {?}
         */
            function () { };
        /**
         * @return {?}
         */
        CKEditorComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        /**
         * @param {?} changes
         * @return {?}
         */
        CKEditorComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (!this.ckIns) {
                    return;
                }
                if (changes["readonly"]) {
                    this.ckIns.setReadOnly(this.readonly);
                }
            };
        /**
         * @return {?}
         */
        CKEditorComponent.prototype.getContent = /**
         * @return {?}
         */
            function () {
                return this.ckIns.getData();
            };
        /**
         * @return {?}
         */
        CKEditorComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this.ckIns) {
                    this.ckIns.removeAllListeners();
                    CKEDITOR.instances[this.ckIns.name].destroy();
                    this.ckIns.destroy();
                    this.ckIns = null;
                    clearInterval(this.interval);
                }
            };
        /**
         * @return {?}
         */
        CKEditorComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.initCKEditor();
            };
        /**
         * @return {?}
         */
        CKEditorComponent.prototype.initCKEditor = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (typeof CKEDITOR === 'undefined') {
                    return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
                }
                var /** @type {?} */ opt = Object.assign({}, defaults, this.config, {
                    readOnly: this.readonly,
                    skin: this.skin,
                    language: this.language,
                    fullPage: this.fullPage,
                    filebrowserUploadUrl: this.moduleConfig.CKEDITOR_UPLOAD_URI
                });
                this.ckIns = CKEDITOR.replace(this.ck.nativeElement, opt);
                this.ckIns.setData(this.innerValue);
                setTimeout(function (_) {
                    _this.onLoad.emit();
                }, 200);
                this.interval = setInterval(function () {
                    _this.ngZone.run(function () {
                        _this.innerValue = _this.ckIns.getData();
                        _this.onChange(_this.ckIns.getData());
                        _this.onTouched();
                    });
                }, 500);
                // this.ckIns.on('change', () => {
                //   this.onTouched();
                //   let val = this.ckIns.getData();
                //   this.updateValue(val);
                // });
            };
        /**
         * @param {?} value
         * @return {?}
         */
        CKEditorComponent.prototype.updateValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                var _this = this;
                this.ngZone.run(function () {
                    _this.innerValue = value;
                    _this.onChange(value);
                    _this.onTouched();
                });
            };
        /**
         * @param {?} value
         * @return {?}
         */
        CKEditorComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.innerValue = value || '';
                if (this.ckIns) {
                    this.ckIns.setData(this.innerValue);
                    var /** @type {?} */ val = this.ckIns.getData();
                    this.ckIns.setData(val);
                }
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        CKEditorComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChange = fn;
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        CKEditorComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouched = fn;
            };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        CKEditorComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) {
            };
        CKEditorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'itsm-ckeditor',
                        template: "<textarea #ck></textarea>",
                        providers: [CKEDITOR_VALUE_ACCESSOR]
                    },] },
        ];
        /** @nocollapse */
        CKEditorComponent.ctorParameters = function () {
            return [
                { type: core.NgZone },
                { type: undefined, decorators: [{ type: core.Inject, args: ['config',] }] }
            ];
        };
        CKEditorComponent.propDecorators = {
            readonly: [{ type: core.Input }],
            config: [{ type: core.Input }],
            skin: [{ type: core.Input }],
            language: [{ type: core.Input }],
            fullPage: [{ type: core.Input }],
            onLoad: [{ type: core.Output }],
            ck: [{ type: core.ViewChild, args: ['ck',] }]
        };
        return CKEditorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ItsmUiModule = (function () {
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            ngBootstrap.NgbModule
                        ],
                        declarations: [TreeViewComponent, MultiSelectComponent, CKEditorComponent],
                        exports: [TreeViewComponent, MultiSelectComponent, CKEditorComponent]
                    },] },
        ];
        return ItsmUiModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.TreeViewComponent = TreeViewComponent;
    exports.MultiSelectComponent = MultiSelectComponent;
    exports.CKEDITOR_VALUE_ACCESSOR = CKEDITOR_VALUE_ACCESSOR;
    exports.CKEditorComponent = CKEditorComponent;
    exports.ItsmUiModule = ItsmUiModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRzbS11aS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vaXRzbS11aS9saWIvdHJlZS12aWV3L3RyZWUtdmlldy5jb21wb25lbnQudHMiLCJuZzovL2l0c20tdWkvbGliL211bHRpLXNlbGVjdC9tdWx0aS1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9pdHNtLXVpL2xpYi9ja2VkaXRvci9ja2VkaXRvci5jb21wb25lbnQudHMiLCJuZzovL2l0c20tdWkvbGliL2l0c20tdWkubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpdHNtLXRyZWUtdmlldycsXG4gIHRlbXBsYXRlOiBgICA8IS0tIENhcmQgLS0+XG4gIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiICpuZ0lmPVwidGl0bGVcIj57e3RpdGxlfX08L2g0PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRleHRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBzZWFyY2hcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiw6rCssKAw6zCg8KJXCIgWyhuZ01vZGVsKV09XCJxXCIgKGtleXVwKT1cInNlYXJjaChxKTtcIj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cImxldmVsMVwiIFtoaWRkZW5dPVwicVwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGxldmVsMSBvZiBkYXRhXCIgW25nQ2xhc3NdPVwieyBzdWI6IGxldmVsMS5zdWI/Lmxlbmd0aCwgb246IGxldmVsMS5leHBhbmRlZCwgb2ZmOiAhbGV2ZWwxLmV4cGFuZGVkIH1cIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJjaGVja2JveCYmIWxldmVsMS5zdWI/Lmxlbmd0aFwiIHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwibGV2ZWwxLnNlbGVjdGVkXCI+XG4gICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cInRvZ2dsZUZvbGRlcihsZXZlbDEpXCI+e3tsZXZlbDEubmFtZX19PC9hPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImxldmVsMlwiICpuZ0lmPVwibGV2ZWwxLmV4cGFuZGVkJiZsZXZlbDEuc3ViPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbGV2ZWwyIG9mIGxldmVsMS5zdWJcIiBbbmdDbGFzc109XCJ7IHN1YjogbGV2ZWwyLnN1Yj8ubGVuZ3RoLCBvbjogbGV2ZWwyLmV4cGFuZGVkLCBvZmY6ICFsZXZlbDIuZXhwYW5kZWQgfVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJjaGVja2JveCYmIWxldmVsMi5zdWI/Lmxlbmd0aFwiIHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwibGV2ZWwyLnNlbGVjdGVkXCI+XHRcbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cInRvZ2dsZUZvbGRlcihsZXZlbDIpXCI+e3tsZXZlbDIubmFtZX19PC9hPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsZXZlbDNcIiAqbmdJZj1cImxldmVsMi5leHBhbmRlZCYmbGV2ZWwyLnN1Yj8ubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsZXZlbDMgb2YgbGV2ZWwyLnN1YlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiY2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cImxldmVsMy5zZWxlY3RlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cInRvZ2dsZUZvbGRlcihsZXZlbDMpXCI+e3tsZXZlbDMubmFtZX19PC9hPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwiZGVwMVwiICpuZ0lmPVwicSAmJiBmaWxsdGVyZFwiPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZmlsbHRlcmRcIj48YSAoY2xpY2spPVwiT25DbGljay5lbWl0KGl0ZW0pXCI+e3tpdGVtLm5hbWV9fTwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPCEtLSBDYXJkIC0tPmAsXG4gIHN0eWxlczogW2AuY2FyZHt3aWR0aDoxMDAlO2ZvbnQtc2l6ZToxZW19LmNhcmQgaW5wdXQuc2VhcmNoe21hcmdpbi1ib3R0b206MjBweH0uY2FyZCB1bHtwYWRkaW5nLWxlZnQ6MTBweDtsaXN0LXN0eWxlOm5vbmV9LmNhcmQgdWwubGV2ZWwxe21heC1oZWlnaHQ6NTAwcHg7b3ZlcmZsb3cteTphdXRvfS5jYXJkIHVsIHVse21hcmdpbi10b3A6NXB4fS5jYXJkIHVsIGxpe2N1cnNvcjpwb2ludGVyO3BhZGRpbmc6MnB4IDA7Y29sb3I6Z3JheX0uY2FyZCB1bCBsaTpob3Zlcntjb2xvcjojNTNhM2ZmfS5jYXJkIHVsIGxpLnN1YntwYWRkaW5nLWxlZnQ6MjBweDtiYWNrZ3JvdW5kOnVybCguLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2ZvbGRlcl9vZmYucG5nKSAzcHggNnB4IG5vLXJlcGVhdH0uY2FyZCB1bCBsaS5vbntiYWNrZ3JvdW5kOnVybCguLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2ZvbGRlcl9vbi5wbmcpIDNweCA2cHggbm8tcmVwZWF0fS5jYXJkIHVsIGxpIGlucHV0e21hcmdpbi1yaWdodDo1cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgVHJlZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KCkgY2hlY2tib3ggPSBmYWxzZTtcbiAgQElucHV0KCkgZGF0YTogYW55W10gPSBbXTtcbiAgQE91dHB1dCgpIE9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBPcmdDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHE7XG4gIGZpbGx0ZXJkID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHRvZ2dsZUZvbGRlcihsaSkge1xuICAgIGlmIChsaS5zdWIgJiYgbGkuc3ViLmxlbmd0aClcbiAgICAgIGxpLmV4cGFuZGVkID0gIWxpLmV4cGFuZGVkO1xuXG4gICAgdGhpcy5PbkNsaWNrLmVtaXQobGkpO1xuICB9XG5cbiAgZ2V0U2VsZWN0aW9uKCkge1xuICAgIGxldCB0bXAgPSBbXTtcbiAgICBmb3IgKGxldCBsZXZlbDEgb2YgdGhpcy5kYXRhKSB7XG4gICAgICBpZiAobGV2ZWwxLnNlbGVjdGVkKSB7XG4gICAgICAgIHRtcC5wdXNoKGxldmVsMSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgbGV2ZWwyIG9mIGxldmVsMS5zdWIpIHtcbiAgICAgICAgaWYgKGxldmVsMi5zZWxlY3RlZCkge1xuICAgICAgICAgIHRtcC5wdXNoKGxldmVsMik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgbGV2ZWwzIG9mIGxldmVsMi5zdWIpIHtcbiAgICAgICAgICBpZiAobGV2ZWwzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0bXAucHVzaChsZXZlbDMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0bXA7XG4gIH1cblxuICBzZWFyY2godGV4dCkge1xuICAgIGlmICghdGV4dClcbiAgICAgIHJldHVybjtcbiAgICBcbiAgICBsZXQgdG1wID0gW107XG4gICAgZm9yIChsZXQgbGV2ZWwxIG9mIHRoaXMuZGF0YSkge1xuICAgICAgaWYgKGxldmVsMS5uYW1lLmluY2x1ZGVzKHRleHQpKSB7XG4gICAgICAgIHRtcC5wdXNoKGxldmVsMSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgbGV2ZWwyIG9mIGxldmVsMS5zdWIpIHtcbiAgICAgICAgaWYgKGxldmVsMi5uYW1lLmluY2x1ZGVzKHRleHQpKSB7XG4gICAgICAgICAgdG1wLnB1c2gobGV2ZWwyKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBsZXZlbDMgb2YgbGV2ZWwyLnN1Yikge1xuICAgICAgICAgIGlmIChsZXZlbDMubmFtZS5pbmNsdWRlcyh0ZXh0KSkge1xuICAgICAgICAgICAgdG1wLnB1c2gobGV2ZWwzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZpbGx0ZXJkID0gdG1wO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJdGVyYWJsZURpZmZlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqKioqKioqKioqKioqKioqKkV4YW1wbGVzKioqKioqKioqKioqKioqKioqKiBcbiAqIFxuPGl0c20tbXVsdGktc2VsZWN0IFsoc3JjKV09XCJzcmNcIiBbKGRlc3QpXT1cImRlc3RcIiBbaGVhZGVyXT1cImhlYWRlclwiIHRpdGxlPVwiw63ChcKMw6zCisKkw63CisK4IMOrwqnCgMOtwovCsCDDrMKFwoDDq8KgwonDrcKEwrBcIj5cbiAgPGRpdiBmaWx0ZXI9XCJzcmNcIj5cbiAgICDDrcKVwoTDrcKEwrAgw63ChcKMw6zCisKkw63CisK4XG4gIDwvZGl2PlxuICA8bmdiLXBhZ2luYXRpb24gY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclwiIFtjb2xsZWN0aW9uU2l6ZV09XCI3MFwiIFsocGFnZSldPVwiZGVzdFBhZ2VcIiBhcmlhLWxhYmVsPVwiRGVmYXVsdCBwYWdpbmF0aW9uXCIgcGFnaW5hdGlvbj1cImRlc3RcIj48L25nYi1wYWdpbmF0aW9uPlxuICA8bmdiLXBhZ2luYXRpb24gY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlclwiIFtjb2xsZWN0aW9uU2l6ZV09XCI3MFwiIFsocGFnZSldPVwic3JjUGFnZVwiIGFyaWEtbGFiZWw9XCJEZWZhdWx0IHBhZ2luYXRpb25cIiBwYWdpbmF0aW9uPVwic3JjXCI+PC9uZ2ItcGFnaW5hdGlvbj5cbjwvaXRzbS1tdWx0aS1zZWxlY3Q+XG4gKiBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaXRzbS1tdWx0aS1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgPCEtLSBDYXJkIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiICpuZ0lmPVwidGl0bGVcIj57e3RpdGxlfX08L2g0PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRleHRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltmaWx0ZXI9ZGVzdF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRoPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAoY2hhbmdlKT1cInNlbGVjdEFsbChkZXN0LCAkZXZlbnQudGFyZ2V0LmNoZWNrZWQpXCI+PC90aD5cbiAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGl0ZW0gb2YgaGVhZGVyXCI+e3tpdGVtLm5hbWV9fTwvdGg+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGVzdFwiPlxuICAgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cIml0ZW0uc2VsZWN0ZWRcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBfIG9mIGhlYWRlclwiPnt7aXRlbVtfLmtleV19fTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuZ2ItcGFnaW5hdGlvbltwYWdpbmF0aW9uPWRlc3RdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPCEtLSBDYXJkIC0tPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbCBzaHJpbmtcIj5cbiAgICA8aW1nIChjbGljayk9XCJhZGQoKVwiIHNyYz1cImFzc2V0cy9pbWFnZXMvYXJyX2xlZnRfYnRuLmdpZlwiIGFsdD1cIlwiPlxuICAgIDxpbWcgKGNsaWNrKT1cInJlbW92ZSgpXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9hcnJfcmlnaHRfYnRuLmdpZlwiIGFsdD1cIlwiPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgIDwhLS0gQ2FyZCAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10ZXh0XCI+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltmaWx0ZXI9c3JjXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICA8dGg+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIChjaGFuZ2UpPVwic2VsZWN0QWxsKHNyYywgJGV2ZW50LnRhcmdldC5jaGVja2VkKVwiPjwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGl0ZW0gb2YgaGVhZGVyXCI+e3tpdGVtLm5hbWV9fTwvdGg+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3JjXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJpdGVtLnNlbGVjdGVkXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBfIG9mIGhlYWRlclwiPnt7aXRlbVtfLmtleV19fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5nYi1wYWdpbmF0aW9uW3BhZ2luYXRpb249c3JjXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSBDYXJkIC0tPlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AuY29se2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpzdHJldGNofS5jb2wgLmNhcmR7d2lkdGg6MTAwJX0uc2hyaW5re2ZsZXgtZ3JvdzowO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZsZXgtZmxvdzpjb2x1bW59LnNocmluayBpbWd7bWFyZ2luLWJvdHRvbTo1cHh9dGhlYWR7YmFja2dyb3VuZDojZjRmNGY0fXRoZWFkIHRoOmZpcnN0LW9mLXR5cGV7d2lkdGg6MSV9YF1cbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB0aXRsZSA9ICcnO1xuICBASW5wdXQoKSBoZWFkZXIgPSBbXTtcbiAgQElucHV0KCkgaW1wdXJlID0gZmFsc2U7XG5cbiAgQElucHV0KCkgc3JjID0gW107XG4gIEBPdXRwdXQoKSBzcmNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIFxuICBASW5wdXQoKSBkZXN0ID0gW107XG4gIEBPdXRwdXQoKSBkZXN0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGl0ZXJhYmxlRGlmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzKSB7XG4gICAgdGhpcy5pdGVyYWJsZURpZmZlciA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBsZXQgc291cmNlQ2hhbmdlcyA9IHRoaXMuaXRlcmFibGVEaWZmZXIuZGlmZih0aGlzLnNyYyk7XG4gICAgaWYgKHNvdXJjZUNoYW5nZXMpIHtcbiAgICAgIHRoaXMuc3JjQ2hhbmdlLmVtaXQodGhpcy5zcmMpO1xuICAgIH1cbiAgICBsZXQgZGVzdENoYW5nZXMgPSB0aGlzLml0ZXJhYmxlRGlmZmVyLmRpZmYodGhpcy5kZXN0KTtcbiAgICBpZiAoZGVzdENoYW5nZXMpIHtcbiAgICAgIHRoaXMuZGVzdENoYW5nZS5lbWl0KHRoaXMuZGVzdCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0QWxsKGxpc3QsIGIpIHtcbiAgICBsaXN0LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBlbGVtZW50LnNlbGVjdGVkID0gYjtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZCgpIHtcbiAgICBpZiAodGhpcy5pbXB1cmUpIHtcbiAgICAgIHRoaXMuZGVzdC5wdXNoKC4uLnRoaXMuc3JjLmZpbHRlcihfPT5fLnNlbGVjdGVkKS5tYXAoXz0+e1xuICAgICAgICByZXR1cm4geyAuLi5fIH07XG4gICAgICB9KSk7XG4gICAgICB0aGlzLnNyYyA9IHRoaXMuc3JjLmZpbHRlcihfPT4hXy5zZWxlY3RlZClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc3QucHVzaCguLi50aGlzLnNyYy5maWx0ZXIoXz0+Xy5zZWxlY3RlZCkubWFwKF89PntcbiAgICAgICAgcmV0dXJuIHsgLi4uXyB9O1xuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5pbXB1cmUpIHtcbiAgICAgIHRoaXMuc3JjLnB1c2goLi4udGhpcy5kZXN0LmZpbHRlcihfPT5fLnNlbGVjdGVkKS5tYXAoXz0+e1xuICAgICAgICByZXR1cm4geyAuLi5fIH07XG4gICAgICB9KSk7XG4gICAgICB0aGlzLmRlc3QgPSB0aGlzLmRlc3QuZmlsdGVyKF89PiFfLnNlbGVjdGVkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc3QgPSB0aGlzLmRlc3QuZmlsdGVyKF89PiFfLnNlbGVjdGVkKS5tYXAoXz0+e1xuICAgICAgICByZXR1cm4geyAuLi5fIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLFxyXG4gIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBBZnRlclZpZXdJbml0LFxyXG4gIE5nWm9uZSxcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZGVjbGFyZSB2YXIgQ0tFRElUT1I6IGFueTtcclxuXHJcbmNvbnN0IGRlZmF1bHRzID0ge1xyXG4gIGNvbnRlbnRzQ3NzOiBbJyddLFxyXG4gIGN1c3RvbUNvbmZpZzogJydcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDS0VESVRPUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENLRWRpdG9yQ29tcG9uZW50KSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpdHNtLWNrZWRpdG9yJyxcclxuICB0ZW1wbGF0ZTogYDx0ZXh0YXJlYSAjY2s+PC90ZXh0YXJlYT5gLFxyXG4gIHByb3ZpZGVyczogW0NLRURJVE9SX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ0tFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIHByaXZhdGUgY2tJbnM6IGFueTtcclxuICBwcml2YXRlIG9uQ2hhbmdlKF86IGFueSkgeyB9O1xyXG4gIHByaXZhdGUgb25Ub3VjaGVkKCkgeyB9O1xyXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogc3RyaW5nID0gJyc7XHJcbiAgcHJpdmF0ZSBpbnRlcnZhbDogYW55ID0gbnVsbDtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgY29uZmlnOiBhbnkgPSB7fTtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgc2tpbjogc3RyaW5nID0gJ21vb25vLWxpc2EnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nID0gJ2tvJztcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgZnVsbFBhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgcHVibGljIG9uTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnY2snKVxyXG4gIHB1YmxpYyBjazogRWxlbWVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgQEluamVjdCgnY29uZmlnJykgcHJpdmF0ZSBtb2R1bGVDb25maWcpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuY2tJbnMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXMucmVhZG9ubHkpIHtcclxuICAgICAgdGhpcy5ja0lucy5zZXRSZWFkT25seSh0aGlzLnJlYWRvbmx5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ja0lucy5nZXREYXRhKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLmNrSW5zKSB7XHJcbiAgICAgIHRoaXMuY2tJbnMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcbiAgICAgIENLRURJVE9SLmluc3RhbmNlc1t0aGlzLmNrSW5zLm5hbWVdLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5ja0lucy5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuY2tJbnMgPSBudWxsO1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5pbml0Q0tFZGl0b3IoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdENLRWRpdG9yKCkge1xyXG4gICAgaWYgKHR5cGVvZiBDS0VESVRPUiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignQ0tFZGl0b3IgNC54IGlzIG1pc3NpbmcgKGh0dHA6Ly9ja2VkaXRvci5jb20vKScpO1xyXG4gICAgfVxyXG4gICAgbGV0IG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCB0aGlzLmNvbmZpZywge1xyXG4gICAgICByZWFkT25seTogdGhpcy5yZWFkb25seSxcclxuICAgICAgc2tpbjogdGhpcy5za2luLFxyXG4gICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcclxuICAgICAgZnVsbFBhZ2U6IHRoaXMuZnVsbFBhZ2UsXHJcbiAgICAgIGZpbGVicm93c2VyVXBsb2FkVXJsOiB0aGlzLm1vZHVsZUNvbmZpZy5DS0VESVRPUl9VUExPQURfVVJJXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2tJbnMgPSBDS0VESVRPUi5yZXBsYWNlKHRoaXMuY2submF0aXZlRWxlbWVudCwgb3B0KTtcclxuICAgIHRoaXMuY2tJbnMuc2V0RGF0YSh0aGlzLmlubmVyVmFsdWUpO1xyXG4gICAgc2V0VGltZW91dChfPT57XHJcbiAgICAgIHRoaXMub25Mb2FkLmVtaXQoKTtcclxuICAgIH0sIDIwMCk7XHJcblxyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLmNrSW5zLmdldERhdGEoKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY2tJbnMuZ2V0RGF0YSgpKTtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0sIDUwMCk7XHJcblxyXG4gICAgLy8gdGhpcy5ja0lucy5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgLy8gICBsZXQgdmFsID0gdGhpcy5ja0lucy5nZXREYXRhKCk7XHJcbiAgICAvLyAgIHRoaXMudXBkYXRlVmFsdWUodmFsKTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWUgfHwgJyc7XHJcbiAgICBpZiAodGhpcy5ja0lucykge1xyXG4gICAgICB0aGlzLmNrSW5zLnNldERhdGEodGhpcy5pbm5lclZhbHVlKTtcclxuICAgICAgbGV0IHZhbCA9IHRoaXMuY2tJbnMuZ2V0RGF0YSgpO1xyXG4gICAgICB0aGlzLmNrSW5zLnNldERhdGEodmFsKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFRyZWVWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90cmVlLXZpZXcvdHJlZS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbXVsdGktc2VsZWN0L211bHRpLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ0tFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2NrZWRpdG9yL2NrZWRpdG9yLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOZ2JNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVHJlZVZpZXdDb21wb25lbnQsIE11bHRpU2VsZWN0Q29tcG9uZW50LCBDS0VkaXRvckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUcmVlVmlld0NvbXBvbmVudCwgTXVsdGlTZWxlY3RDb21wb25lbnQsIENLRWRpdG9yQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBJdHNtVWlNb2R1bGUgeyBcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogSXRzbVVpTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBjb25maWcgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJJdGVyYWJsZURpZmZlcnMiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJOZ1pvbmUiLCJJbmplY3QiLCJWaWV3Q2hpbGQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiTmdiTW9k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