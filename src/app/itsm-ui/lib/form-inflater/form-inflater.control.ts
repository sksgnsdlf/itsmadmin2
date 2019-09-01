import {
  FormControl,
  ValidatorFn,
  Validators,
  FormArray
} from '@angular/forms';

import { FIControlOptions } from './form-inflater.options';

export class FIControl extends FIControlOptions {
  fc: FormControl | FormArray;

  constructor(options: FIControlOptions) {
    super();

    let formState = options.defaultValue;
    let validator = options.validator;
    let asyncValidator = options.asyncValidator;

    if (options.type == 'multi') {
      this.fc = new FormArray(options.select.options.map(_=>{
        return new FormControl(formState, validator, asyncValidator);
      }));
    } else {
      this.fc = new FormControl(formState, validator, asyncValidator);
    }

    this.applyOptions(this.fc, options);
  }

  applyOptions(fc: FormControl | FormArray, o: FIControlOptions) {
    Object.assign(this, o, { elId: o.elId || o.field });
    if (o.disabled) {
      fc.disable({ onlySelf: true, emitEvent: false });
    }
    let validators: ValidatorFn[] = fc.validator ? [fc.validator] : [];

    if (o.required) {
      validators.push(Validators.required);
    }
    if (o.maxlength) {
      validators.push(Validators.maxLength(o.maxlength));
    }
    if (o.minlength) {
      validators.push(Validators.minLength(o.minlength));
    }
    if (o.requiredTrue) {
      validators.push(Validators.requiredTrue);
    }
    fc.setValidators(Validators.compose(validators));
  }
}

export class FIGroup {
  type: string = 'group';
  fiControls: (FIControl | FIGroup)[] = [];
}