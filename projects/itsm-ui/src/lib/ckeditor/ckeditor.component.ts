import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef,
  OnDestroy, OnChanges, SimpleChanges, AfterViewInit,
  NgZone,
  Inject
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var CKEDITOR: any;

const defaults = {
  contentsCss: [''],
  customConfig: ''
};

export const CKEDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CKEditorComponent),
  multi: true
};

@Component({
  selector: 'itsm-ckeditor',
  template: `<textarea #ck></textarea>`,
  providers: [CKEDITOR_VALUE_ACCESSOR]
})
export class CKEditorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {

  private ckIns: any;
  private onChange(_: any) { };
  private onTouched() { };
  private innerValue: string = '';
  private interval: any = null;

  @Input()
  public readonly: boolean = false;

  @Input()
  public config: any = {};

  @Input()
  public skin: string = 'moono-lisa';

  @Input()
  public language: string = 'ko';

  @Input()
  public fullPage: boolean = false;

  @Output()
  public onLoad: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('ck')
  public ck: ElementRef;

  constructor(private ngZone: NgZone, @Inject('config') private moduleConfig) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ckIns) {
      return;
    }
    if (changes.readonly) {
      this.ckIns.setReadOnly(this.readonly);
    }
  }

  getContent() {
    return this.ckIns.getData();
  }

  ngOnDestroy() {
    if (this.ckIns) {
      this.ckIns.removeAllListeners();
      CKEDITOR.instances[this.ckIns.name].destroy();
      this.ckIns.destroy();
      this.ckIns = null;
      clearInterval(this.interval);
    }
  }

  ngAfterViewInit() {
    this.initCKEditor();
  }

  private initCKEditor() {
    if (typeof CKEDITOR === 'undefined') {
      return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
    }
    let opt = Object.assign({}, defaults, this.config, {
      readOnly: this.readonly,
      skin: this.skin,
      language: this.language,
      fullPage: this.fullPage,
      filebrowserUploadUrl: this.moduleConfig.CKEDITOR_UPLOAD_URI
    });
    this.ckIns = CKEDITOR.replace(this.ck.nativeElement, opt);
    this.ckIns.setData(this.innerValue);
    setTimeout(_=>{
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

  private updateValue(value: string) {
    this.ngZone.run(() => {
      this.innerValue = value;
      this.onChange(value);
      this.onTouched();
    });
  }

  writeValue(value: any): void {
    this.innerValue = value || '';
    if (this.ckIns) {
      this.ckIns.setData(this.innerValue);
      let val = this.ckIns.getData();
      this.ckIns.setData(val);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }
}
