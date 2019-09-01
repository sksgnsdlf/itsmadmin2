import {
    ValidatorFn,
    AsyncValidatorFn,
  } from '@angular/forms';
  
  export type InputType = 'text'
    | 'search' | 'email' | 'url' | 'tel' | 'password' | 'period'
    | 'number' | 'date' | 'color' | 'image' | 'file' | 'multi' | 'radio'
    | 'checkbox' | 'hidden' | 'select' | 'radio-button-group' | 'group';
  
  
  export class FIControlOptions {
    elId?: string;
    field: string | FIControlOptions[];
    title?: string = null;
    defaultValue?: any = null;
    type?: InputType = 'text';
    format?: string = null;
    placeholder?: string = '';
    helpText?: string = '';
    helpTextHtml?: string = '';
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    maxlength?: number;
    minlength?: number;
    requiredTrue?: boolean;
    step?: number;
    select?: FISelectOptions;
  
    validator?: ValidatorFn | ValidatorFn[];
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[];

    file?: string | Blob;
    fileData?: string | ArrayBuffer;
    fileName?: string;
    fileField?: string;
    imageSize?: { width: string, height: string };
  }
  
  
  export class FISelectOptions {
    options?: { text: string, value: any }[];
    emptyText?: string;
  }