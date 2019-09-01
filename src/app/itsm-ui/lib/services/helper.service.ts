import { Injectable } from '@angular/core';
import { FIControl } from '../form-inflater/form-inflater.control';

@Injectable()
export class HelperService {
    transformToFormData(data, fiControls: FIControl[] = []): FormData {
        const formData = new FormData();

        fiControls.forEach((_: FIControl)=>{
            if (_.fileField && _.file) {
                formData.append(_.fileField, _.file, _.fileName);
            }
        });

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key]) {
                    if (typeof(data[key]) === "object") {
                        formData.append(key, JSON.stringify(data[key]));
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            }
        }

        return formData;
    }

    transformToFormDataFromFromGroup(form, fiControls: FIControl[] = []): FormData {
        const formData = new FormData();

        fiControls.forEach((_: FIControl)=>{
            if (_.fileField && _.file) {
                formData.append(_.fileField, _.file, _.fileName);
            }
        });

        for (const key in form.value) {
            if (form.value.hasOwnProperty(key)) {
                if (form.value[key]) {
                    if (typeof(form.value[key]) === "object") {
                        formData.append(key, JSON.stringify(form.value[key]));
                    } else {
                        formData.append(key, form.value[key]);
                    }
                }
            }
        }

        return formData;
    }
}