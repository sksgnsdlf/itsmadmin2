/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef, NgZone, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
const /** @type {?} */ defaults = {
    contentsCss: [''],
    customConfig: ''
};
export const /** @type {?} */ CKEDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CKEditorComponent),
    multi: true
};
export class CKEditorComponent {
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
function CKEditorComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CKEditorComponent.prototype.ckIns;
    /** @type {?} */
    CKEditorComponent.prototype.innerValue;
    /** @type {?} */
    CKEditorComponent.prototype.interval;
    /** @type {?} */
    CKEditorComponent.prototype.readonly;
    /** @type {?} */
    CKEditorComponent.prototype.config;
    /** @type {?} */
    CKEditorComponent.prototype.skin;
    /** @type {?} */
    CKEditorComponent.prototype.language;
    /** @type {?} */
    CKEditorComponent.prototype.fullPage;
    /** @type {?} */
    CKEditorComponent.prototype.onLoad;
    /** @type {?} */
    CKEditorComponent.prototype.ck;
    /** @type {?} */
    CKEditorComponent.prototype.ngZone;
    /** @type {?} */
    CKEditorComponent.prototype.moduleConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2tlZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaXRzbS11aS8iLCJzb3VyY2VzIjpbImxpYi9ja2VkaXRvci9ja2VkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBRWpGLE1BQU0sRUFDTixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBSXpFLHVCQUFNLFFBQVEsR0FBRztJQUNmLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNqQixZQUFZLEVBQUUsRUFBRTtDQUNqQixDQUFDO0FBRUYsTUFBTSxDQUFDLHVCQUFNLHVCQUF1QixHQUFRO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFPRixNQUFNOzs7OztJQTZCSixZQUFvQixNQUFjLEVBQTRCLFlBQVk7UUFBdEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUE0QixpQkFBWSxHQUFaLFlBQVksQ0FBQTswQkF4QjdDLEVBQUU7d0JBQ1AsSUFBSTt3QkFHRCxLQUFLO3NCQUdYLEVBQUU7b0JBR0QsWUFBWTt3QkFHUixJQUFJO3dCQUdILEtBQUs7c0JBR0csSUFBSSxZQUFZLEVBQU87S0FLcUI7Ozs7O0lBMUJ2RSxRQUFRLENBQUMsQ0FBTTtJQUFLLENBQUM7Ozs7SUFDckIsU0FBUztJQUFNLENBQUM7Ozs7SUEyQnhCLFFBQVEsTUFBTTs7Ozs7SUFFZCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FB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QUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwQyxxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QjtLQUNGOzs7OztJQUNELGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7S0FDcEI7Ozs7O0lBQ0QsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUNyQjs7Ozs7SUFDRCxnQkFBZ0IsQ0FBRSxVQUFtQjtLQUVwQzs7O1lBekhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7YUFDckM7Ozs7WUF0QkMsTUFBTTs0Q0FvRCtCLE1BQU0sU0FBQyxRQUFROzs7dUJBckJuRCxLQUFLO3FCQUdMLEtBQUs7bUJBR0wsS0FBSzt1QkFHTCxLQUFLO3VCQUdMLEtBQUs7cUJBR0wsTUFBTTtpQkFHTixTQUFTLFNBQUMsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLFxyXG4gIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBBZnRlclZpZXdJbml0LFxyXG4gIE5nWm9uZSxcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZGVjbGFyZSB2YXIgQ0tFRElUT1I6IGFueTtcclxuXHJcbmNvbnN0IGRlZmF1bHRzID0ge1xyXG4gIGNvbnRlbnRzQ3NzOiBbJyddLFxyXG4gIGN1c3RvbUNvbmZpZzogJydcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDS0VESVRPUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENLRWRpdG9yQ29tcG9uZW50KSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpdHNtLWNrZWRpdG9yJyxcclxuICB0ZW1wbGF0ZTogYDx0ZXh0YXJlYSAjY2s+PC90ZXh0YXJlYT5gLFxyXG4gIHByb3ZpZGVyczogW0NLRURJVE9SX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ0tFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gIHByaXZhdGUgY2tJbnM6IGFueTtcclxuICBwcml2YXRlIG9uQ2hhbmdlKF86IGFueSkgeyB9O1xyXG4gIHByaXZhdGUgb25Ub3VjaGVkKCkgeyB9O1xyXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogc3RyaW5nID0gJyc7XHJcbiAgcHJpdmF0ZSBpbnRlcnZhbDogYW55ID0gbnVsbDtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgY29uZmlnOiBhbnkgPSB7fTtcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgc2tpbjogc3RyaW5nID0gJ21vb25vLWxpc2EnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nID0gJ2tvJztcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgZnVsbFBhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgcHVibGljIG9uTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnY2snKVxyXG4gIHB1YmxpYyBjazogRWxlbWVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgQEluamVjdCgnY29uZmlnJykgcHJpdmF0ZSBtb2R1bGVDb25maWcpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuY2tJbnMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXMucmVhZG9ubHkpIHtcclxuICAgICAgdGhpcy5ja0lucy5zZXRSZWFkT25seSh0aGlzLnJlYWRvbmx5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ja0lucy5nZXREYXRhKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLmNrSW5zKSB7XHJcbiAgICAgIHRoaXMuY2tJbnMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcbiAgICAgIENLRURJVE9SLmluc3RhbmNlc1t0aGlzLmNrSW5zLm5hbWVdLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5ja0lucy5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuY2tJbnMgPSBudWxsO1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5pbml0Q0tFZGl0b3IoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdENLRWRpdG9yKCkge1xyXG4gICAgaWYgKHR5cGVvZiBDS0VESVRPUiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignQ0tFZGl0b3IgNC54IGlzIG1pc3NpbmcgKGh0dHA6Ly9ja2VkaXRvci5jb20vKScpO1xyXG4gICAgfVxyXG4gICAgbGV0IG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCB0aGlzLmNvbmZpZywge1xyXG4gICAgICByZWFkT25seTogdGhpcy5yZWFkb25seSxcclxuICAgICAgc2tpbjogdGhpcy5za2luLFxyXG4gICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcclxuICAgICAgZnVsbFBhZ2U6IHRoaXMuZnVsbFBhZ2UsXHJcbiAgICAgIGZpbGVicm93c2VyVXBsb2FkVXJsOiB0aGlzLm1vZHVsZUNvbmZpZy5DS0VESVRPUl9VUExPQURfVVJJXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2tJbnMgPSBDS0VESVRPUi5yZXBsYWNlKHRoaXMuY2submF0aXZlRWxlbWVudCwgb3B0KTtcclxuICAgIHRoaXMuY2tJbnMuc2V0RGF0YSh0aGlzLmlubmVyVmFsdWUpO1xyXG4gICAgc2V0VGltZW91dChfPT57XHJcbiAgICAgIHRoaXMub25Mb2FkLmVtaXQoKTtcclxuICAgIH0sIDIwMCk7XHJcblxyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLmNrSW5zLmdldERhdGEoKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY2tJbnMuZ2V0RGF0YSgpKTtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0sIDUwMCk7XHJcblxyXG4gICAgLy8gdGhpcy5ja0lucy5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgLy8gICBsZXQgdmFsID0gdGhpcy5ja0lucy5nZXREYXRhKCk7XHJcbiAgICAvLyAgIHRoaXMudXBkYXRlVmFsdWUodmFsKTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWUgfHwgJyc7XHJcbiAgICBpZiAodGhpcy5ja0lucykge1xyXG4gICAgICB0aGlzLmNrSW5zLnNldERhdGEodGhpcy5pbm5lclZhbHVlKTtcclxuICAgICAgbGV0IHZhbCA9IHRoaXMuY2tJbnMuZ2V0RGF0YSgpO1xyXG4gICAgICB0aGlzLmNrSW5zLnNldERhdGEodmFsKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHJcbiAgfVxyXG59XHJcbiJdfQ==