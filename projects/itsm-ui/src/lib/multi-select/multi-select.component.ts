import { Component, OnInit, Input, Output, EventEmitter, IterableDiffers } from '@angular/core';

/******************Examples******************* 
 * 
<itsm-multi-select [(src)]="src" [(dest)]="dest" [header]="header" title="테스트 멀티 셀렉터">
  <div filter="src">
    필터 테스트
  </div>
  <ngb-pagination class="d-flex justify-content-center" [collectionSize]="70" [(page)]="destPage" aria-label="Default pagination" pagination="dest"></ngb-pagination>
  <ngb-pagination class="d-flex justify-content-center" [collectionSize]="70" [(page)]="srcPage" aria-label="Default pagination" pagination="src"></ngb-pagination>
</itsm-multi-select>
 * 
 */
@Component({
  selector: 'itsm-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() title = '';
  @Input() header = [];
  @Input() impure = false;

  @Input() src = [];
  @Output() srcChange = new EventEmitter();
  
  @Input() dest = [];
  @Output() destChange = new EventEmitter();

  iterableDiffer;

  constructor(private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    
  }

  ngDoCheck() {
    let sourceChanges = this.iterableDiffer.diff(this.src);
    if (sourceChanges) {
      this.srcChange.emit(this.src);
    }
    let destChanges = this.iterableDiffer.diff(this.dest);
    if (destChanges) {
      this.destChange.emit(this.dest);
    }
  }

  selectAll(list, b) {
    list.forEach(element => {
      element.selected = b;
    });
  }

  add() {
    if (this.impure) {
      this.dest.push(...this.src.filter(_=>_.selected).map(_=>{
        return { ..._ };
      }));
      this.src = this.src.filter(_=>!_.selected)
    }
    else {
      this.dest.push(...this.src.filter(_=>_.selected).map(_=>{
        return { ..._ };
      }));
    }
  }

  remove() {
    if (this.impure) {
      this.src.push(...this.dest.filter(_=>_.selected).map(_=>{
        return { ..._ };
      }));
      this.dest = this.dest.filter(_=>!_.selected);
    }
    else {
      this.dest = this.dest.filter(_=>!_.selected).map(_=>{
        return { ..._ };
      });
    }
  }
}
