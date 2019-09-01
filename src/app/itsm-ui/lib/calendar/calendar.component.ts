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
  selector: 'itsm-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements ControlValueAccessor, OnInit {

  @Input() fromDt;
  @Input() toDt;
  @Input() noRange = false;
  @Input() disabled = false;
  @Input() width = '17rem';
  dpOpen : boolean = false;
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
    this.fromDate = this.fromDt?this.fromDt:null;
    this.toDate = this.toDt?this.toDt:null;
    this.stringDate = this.fromDt?`${this.fromDt} ~ ${this.toDt}`:'';
  }

  onDateSelection(date: NgbDate) {
    if(this.noRange){
      this.fromDate = date;
      this.fromDt = this.ngbFormatter.format(this.fromDate);
      this.fromDtChange.emit(this.fromDt);
      this.dpOpen = false;
    }
    else{
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
      } else if (this.fromDate && !this.toDate && !date.before(this.fromDate)) {
        this.toDate = date;
      } else {
        this.toDate = null;
        this.toDt = null;
        this.fromDate = date;
      }
  
      this.fromDt = this.ngbFormatter.format(this.fromDate);
      this.toDt = this.ngbFormatter.format(this.toDate);
      this.stringDate = `${this.fromDt} ~ ${this.toDt}`;
      this.propagateChange(this.stringDate);
  
      if(this.fromDate && !this.toDate) 
        this.fromDtChange.emit(this.fromDt);
      else if(this.toDate) 
        this.toDtChange.emit(this.toDt);
      if(this.toDate != null)  
        this.dpOpen = false;
    }
  }

  isHovered = (date: NgbDate) => this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  isInside = (date: NgbDate) => date.after(this.fromDate) && date.before(this.toDate);
  isRange = (date: NgbDate) => date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date)
}
