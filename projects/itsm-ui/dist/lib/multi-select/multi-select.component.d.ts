import { OnInit, EventEmitter, IterableDiffers } from '@angular/core';
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
export declare class MultiSelectComponent implements OnInit {
    private _iterableDiffers;
    title: string;
    header: any[];
    impure: boolean;
    src: any[];
    srcChange: EventEmitter<{}>;
    dest: any[];
    destChange: EventEmitter<{}>;
    iterableDiffer: any;
    constructor(_iterableDiffers: IterableDiffers);
    ngOnInit(): void;
    ngDoCheck(): void;
    selectAll(list: any, b: any): void;
    add(): void;
    remove(): void;
}
