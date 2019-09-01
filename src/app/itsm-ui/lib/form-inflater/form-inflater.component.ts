import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, Renderer } from '@angular/core';
import { FIControl, FIGroup } from './form-inflater.control';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FIControlOptions } from './form-inflater.options';
import { HelperService } from '../services/helper.service';
import { FormData } from 'formdata-polyfill';
@Component({
  selector: 'itsm-form-inflater',
  templateUrl: './form-inflater.component.html',
  styleUrls: ['./form-inflater.component.scss']
})
export class FormInflaterComponent implements OnInit {
  @ViewChild('fiForm') fiForm: FormGroup;
  @Output() ref: EventEmitter<FormInflaterComponent> = new EventEmitter<FormInflaterComponent>();
  public fiControls: (FIControl | FIGroup)[] = [];
  @Input() hideTitle = false; //타이틀 hide
  @Input() buttons = { reset:'초기화', delete:'삭제', submit:'저장' }; 
  @Input() customBtn = null; 
  @Input() edit = false;
  @Output() OnSubmitted = new EventEmitter();
  @Output() OnDeleteClicked = new EventEmitter();

  @Input() buttonLoc = 'right'; //left center right

  private _options: any;
  @Input()
  get options(): FIControlOptions[] { return this._options; };
  set options(value: FIControlOptions[]) {
    this.initFormGroup(value);
    this._options = value;
    this._cd.markForCheck();
  }

  private modal_radio_state = false;
  private modal_radio_value ?: { filid: string, value: any };

  @Input()
  get value(): any { return this.fiForm ? this.fiForm.value : null; };
  set value(value: any) {
    try {
      if (this.fiForm) {

        if(this.modal_radio_state)
        {
          this.modal_radio_state = false;
          value[this.modal_radio_value.filid] = this.modal_radio_value.value;
          this.fiForm.patchValue(value, { onlySelf: true, emitEvent: true });
          this._cd.markForCheck();
          return;
        }
        this.fiForm.patchValue(value, { onlySelf: true, emitEvent: false });
        this._cd.markForCheck();
      }
    } catch(err) {
      console.error(err);
    }
  }
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _cd: ChangeDetectorRef, private renderer: Renderer, private helperService: HelperService) { }

  ngOnInit() {
    this.ref.emit(this);
  }

  private initFormGroup(options: FIControlOptions[]) {
    let formControls: { [key: string]: FormControl | FormArray; } = {};
    this.createFormControl(this.fiControls, formControls, options);
    this.fiForm = new FormGroup(formControls);
    this.fiForm.valueChanges.subscribe(this.valueChange);
  }

  private createFormControl(fiControls: (FIControl | FIGroup)[], formControls: { [key: string]: FormControl | FormArray; }, options: FIControlOptions[]) {
    for (let controlOptions of options) {
      if (controlOptions.type !== 'group') {
        let control = new FIControl(controlOptions);
        control.fc = formControls[(control.field as string)] || control.fc;
        formControls[(control.field as string)] = control.fc;
        fiControls.push(control);
      } else { // 그룹인경우 리커시브
        const group = new FIGroup();
        this.fiControls.push(group);
        this.createFormControl(group.fiControls, formControls, (controlOptions.field as FIControlOptions[]), );
      }
    }
  }

  private radioSelect(filid_name,value)
  {
    this.modal_radio_state = true;
    this.modal_radio_value = { filid: filid_name, value: value };
  }

  private openFile(input) {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
      input.click();
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(input, 'dispatchEvent', [event]);
    }
  }

  private onFileChange(event, control: FIControl, bImage: boolean = false) {
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (bImage && !file.type.includes('image/')) {
        alert('이미지만 업로드 가능합니다.');
        event.target.value = '';
      }

      control.file = file;
      control.fileName = file.name;
      let value: any = {};
      value[(control.field as string)] = null;
      this.fiForm.patchValue(value);

      if (bImage) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          control.fileData = reader.result;
          value[(control.field as string)] = control.fileData;
          this.fiForm.patchValue(value);
          // need to run CD since file load runs outside of zone
          this._cd.markForCheck();
        };
      }
    }
  }

  private delete() {
    if (confirm('삭제하시겠습니까?'))
      this.OnDeleteClicked.emit();
  }

  public getMultipartFormData(): FormData {
    return this.helperService.transformToFormDataFromFromGroup(this.fiForm, this.fiControls as FIControl[]);
  }

  public reset() {
    this.edit = false;
    this.fiForm.reset();
    this.fiForm.patchValue(
      this._options.filter(_=>_.defaultValue !== undefined).reduce((prev, cur)=>{
        prev[cur.field] = cur.defaultValue;
        return prev;
      }, {})
    );
  }
}