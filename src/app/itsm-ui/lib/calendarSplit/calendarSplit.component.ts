import { Component, OnInit, Output, Input, forwardRef  } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { EventEmitter } from '@angular/core';

/******************Examples******************* 
 *            
<itsm-calendar [(fromDt)]="fromDt" [(toDt)]="toDt">
                 '2018-08-22'    '2018-08-30'  
</itsm-calendar>
 * 
 */

@Component({
  selector: 'itsm-calendar-split',
  templateUrl: './calendarSplit.component.html',
  styleUrls: ['./calendarSplit.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarSplitComponent),
      multi: true
    }
  ]
})
export class CalendarSplitComponent implements ControlValueAccessor, OnInit {

  @Input() fromDt;
  @Input() toDt;
  @Input() noRange = true;
  @Input() disabled = false;
  @Input() width = '25rem';
  dpOpen1 : boolean = false;
  dpOpen2 : boolean = false;
  fromDate : any;
  toDate : any;
  stringDate : string;
  hoveredDate : NgbDate;
  @Output() fromDtChange = new EventEmitter();
  @Output() toDtChange = new EventEmitter();

  writeValue(value: any) {
    if (value !== undefined)
      this.stringDate = value;
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  constructor(private ngbFormatter : NgbDateParserFormatter) { }

  ngOnInit() {
    
    this.fromDate = this.fromDt?this.ngbFormatter.parse(this.fromDt):null;
    this.toDate = this.toDt?this.ngbFormatter.parse(this.toDt):null;
    this.stringDate = this.fromDt?`${this.fromDt} ~ ${this.toDt}`:'';
  }

  onDateSelectionFrom(date: NgbDate) {
    this.fromDate = date;
    this.fromDt = this.ngbFormatter.format(this.fromDate);
    this.fromDtChange.emit(this.fromDt);
    
    if(this.toDt && this.toDt < this.fromDt){
      this.toDate = this.fromDate;
      this.toDt = this.fromDt;
      this.toDtChange.emit(this.toDt);
    }

    this.dpOpen1 = false;
    this.dpOpen2 = false;
  }

  onDateSelectionTo(date: NgbDate) {
    this.toDate = date;
    this.toDt = this.ngbFormatter.format(this.toDate);
    this.toDtChange.emit(this.toDt);

    if(this.fromDt && this.fromDt > this.toDt){
      this.fromDate = this.toDate;
      this.fromDt = this.toDt;
      this.fromDtChange.emit(this.fromDt);
    }


    this.dpOpen1 = false;
    this.dpOpen2 = false;
  }

  isHovered = (date: NgbDate) => this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  isInside = (date: NgbDate) => date.after(this.fromDate) && date.before(this.toDate);
  isRange = (date: NgbDate) => date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date)
}
