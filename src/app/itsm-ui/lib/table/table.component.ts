import { Component, OnInit, Output, Input, forwardRef, OnChanges, SimpleChange, SimpleChanges, ChangeDetectorRef  } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { TB_COL_BACK_COLOR, TB_BORDER_COLOR, TB_HOVER_COLOR } from '../../../../config';
@Component({
    selector: 'itsm-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [
        { 
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TableComponent),
            multi: true
        }
    ]
})
/**
 * 예시
 */
// 컬럼명이 위에 있을 경우 
// this.beaconTable = {
//     attr:{
//         col_back_color:'#f0f2f4', //테이블 컬럼명 배경 색깔 
//         border_color:'#dde1e5',  
//         border_yn:true,  
//         table_dir:'col' //col:컬럼명 제일 위에 row:컬럼명 왼쪽에
//     },
//     cols:[
//         {value:'단말번호', width:'20%', align:'center'}, //default align = center
//         {value:'uuid', width:'40%'},
//         {value:'맥어드레스', width:'40%'}
//     ],
//     rows:this.postInfo.beacons.map(_=>{
//        return [
//          {value:_.beacon_no, align:'center'}, 
//          {value:_.uuid, align:'center'},
//          {value:_.mac_addr, align:'center'}]
//      })
// }

// 컬럼명이 왼쪽에 있을 경우
// this.eventTable = {
//     attr:{
//         col_back_color:TB_COL_BACK_COLOR,
//         border_color:TB_BORDER_COLOR,
//         border_yn:true, 
//         table_dir:'row'
//     },
//     cols:[
//         {value:1,width:'20%'},{value:2,width:'30%'},{value:3,width:'20%'},{value:4,width:'30%'}
//     ],
//     rows:[
//         [{ value:'제목',          typ:'label',    auth:'read only'},{ value:this.postInfo.subj,           typ:'text',    auth:'read only'}],
//         [{ value:'행사일시',       typ:'label',    auth:'read only'},{ value:this.postInfo.start_dt?this.postInfo.start_dt+' ~ '+this.postInfo.end_dt:'',
//                                                                     typ:'text',    auth:'read only'}]
//     ]
// };
export class TableComponent implements OnChanges, OnInit {
    @Input() table:any = {};
    @Input() clickable:boolean = false;
    thStyle = [];
    tdStyle = [];
    divStyle = [];

    highlightStyle = {};
    @Output() onRowClicked = new EventEmitter();
    @Output() onRowChanged = new EventEmitter();
    constructor(private ref:ChangeDetectorRef) {}

    ngOnInit(){
        // this.setStyle();
    }
    ngOnChanges(changes: SimpleChanges){
        let _table: SimpleChange = changes.table;
        this.table = _table.currentValue;
        if(this.table.attr)
            this.setStyle();
        this.ref.detectChanges();
    }
    checked(){

    }
    setStyle(){
        //컬럼이 위에 있을 경우 
        if(this.table.attr.table_dir == 'col'){
            for(let col of this.table.cols){
                this.thStyle[col.value] = {
                    'text-align':col.align?col.align:'center', 
                    'border':this.table.attr.border_yn?'1px solid':null, 
                    'border-color':this.table.attr.border_color, 
                    'background-color':this.table.attr.col_back_color?this.table.attr.col_back_color:null,
                    'font-weight':'bold',
                    'vertical-align':col.vertical_align?col.vertical_align:'middle'
                }
            }
            for(let row of this.table.rows){
                for(let col of row){
                    this.tdStyle[col.key+'_'+col.value] = {
                        'text-align':col.align?col.align:'center',
                        'border':this.table.attr.border_yn?'1px solid':null, 
                        'border-color':this.table.attr.border_color,
                        'vertical-align':col.vertical_align?col.vertical_align:'middle'
                    }
                    //input text 일때 td 패딩 제거 
                    // if(col.type == 'text'){
                    //     this.tdStyle[col.value].padding = '0.5rem';
                    // }
                }
            }
        }
        //컬럼이 왼쪽에 있을 경우
        else{
            for(let row of this.table.rows){
                for(let col of row){
                    this.tdStyle[col.value] = {
                        'border':this.table.attr.border_yn?'1px solid':null,
                        'border-color':this.table.attr.border_color,
                        'background-color':col.typ=='label'?this.table.attr.col_back_color:null,
                        'vertical-align':col.vertical_align?col.vertical_align:'middle'
                    }
                    this.divStyle[col.value] = {
                        'text-align':col.typ=='label'?(col.align?col.align:'center'):(col.align?col.align:'left'),
                        'font-weight':col.typ=='label'?'bold':'',
                        'vertical-align':col.vertical_align?col.vertical_align:'middle'
                    }
                }
            }
        }

        this.highlightStyle = {
            'background-color': this.clickable?TB_HOVER_COLOR:null,
            'cursor':this.clickable?'pointer':null
        }
    }
}
