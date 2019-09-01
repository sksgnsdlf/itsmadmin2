import { Input, Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from "@angular/core";
import { FIControl } from "./form-inflater.control";

@Component({
    selector: 'fi-control',
    templateUrl: 'fi-control.component.html'
  })
  export class FIBaseControlComponent implements OnInit {
    private _prev: any;
    @Input('control') c: FIControl;
  
    constructor(private _cd: ChangeDetectorRef) {
    }
  
    ngOnInit() {
      this._prev = this.c.fc.value;
      this.c.fc.valueChanges.subscribe((next) => {
        if (next !== this._prev) {
          this._prev = next;
          this._cd.markForCheck();
        }
      });
    }
  }