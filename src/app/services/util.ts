import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class UtilService {
    public myDateToUnix(my_date:any) {
        var date = _.cloneDeep(my_date.date);
        if(!date)
            return new Date(my_date).getTime()/1000;
        else{
            if(date.month.toString().length == 1) {
                date.month = '0' + date.month;
            }
            if(date.day.toString().length == 1) {
                date.day = '0' + date.day;
            }
            var unix: Date = new Date(date.year + '-' + date.month + '-' + date.day);
            return unix.getTime()/1000;
        }
    }

    public myDateToDate(my_date) {
        var date = my_date.date;
        if(!date)
            return ;
        if(date.month.toString().length == 1) {
            date.month = '0' + date.month;
        }
        if(date.day.toString().length == 1) {
            date.day = '0' + date.day;
        }
        return new Date(date.year + '-' + date.month + '-' + date.day);
    }

    public myDateToYMD(my_date) {
        var date = my_date.date;
        if(!date)
            return ;
        if(date.month.toString().length == 1) {
            date.month = '0' + date.month;
        }
        if(date.day.toString().length == 1) {
            date.day = '0' + date.day;
        }
        return date.year + '-' + date.month + '-' + date.day;
    }

    public dateToMyDate(js_date: Date) {
        if(!js_date)
            return ;

        var year = js_date.getFullYear();
        var month = js_date.getMonth() + 1;
        var day = js_date.getDate();
        // return {date: {year: year, month: month, day: day}};
        return `${year}-${month<10?'0'+month:month}-${day<10?'0'+day:day}`;
    }

    public getDatePickerOpts() {
        return {
            dateFormat: 'yyyy-mm-dd',
            todayBtnTxt: '오늘',
            firstDayOfWeek: 'su',
            showClearDateBtn: false,
            editableDateField: false,
            width: '120px',
            openSelectorOnInputClick: true
        };
    }
}