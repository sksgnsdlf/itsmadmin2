import { Component, OnInit, Output, Input, forwardRef, SimpleChange, SimpleChanges, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { SocietyProvider } from '../../../providers/society';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocietyGroupSearchForm } from '../../../../config';
import { LoginSession } from '../../../services/login.session';
@Component({
    selector: 'society-select',
    templateUrl: './society-select.component.html',
    styleUrls: ['./society-select.component.scss']
})

export class SocietySelectComponent implements OnInit, AfterContentInit {
    list = [];
    masterList = [];
    societyNo = null;
    societyName = null;
    @Input() buttons:any = [];
    @Input() checkOperState:any = 1;
    @Output() OnChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() OnBtnClicked: EventEmitter<any> = new EventEmitter<any>();

    searchForm: SocietyGroupSearchForm = {
        oper_state: '',
        district_cd: '',
        fromDt: '',
        toDt: '',
        society_cls: '',
        society_nm: ''
    }

    total: number = 0;
    totalPage: number = 0;
    page = 1;
    pageSize = 10;
    maxPageSize = 6;
    collectionSize: number = 10;
    closeResult: string;
    loginInfo;
    user_auth;
    constructor(private ref: ChangeDetectorRef, private society: SocietyProvider, private modalService: NgbModal, private loginsession: LoginSession) { }

    ngOnInit() {}
    initSocietyList(){
        this.user_auth = localStorage.getItem('user_auth');
        this.loginInfo = this.loginsession;
        this.society.get(null, 0, 20, ( this.user_auth == 'sys') ? false : true)
            .subscribe((data: any) => {
                this.list = data.list;
                if(!this.societyNo && this.user_auth != 'sys'){
                    let flag = 0;
                    for(let data of this.list){
                        if(data.oper_state == 1){
                            flag = 1;
                            this.societyNo = data.society_no;
                            this.societyName = data.society_nm;
                            break;
                        }
                    }
                }
                this.confirmOperState();
            });
    }
    ngAfterContentInit(){
        this.initSocietyList();
    }
    societySelected(item = null) {
        if (item) {
            this.societyNo = item.society_no;
            this.societyName = item.society_nm;
        }
        for(let data of this.list){
            if(data.society_no == this.societyNo){ this.societyName = data.society_nm; break; }
        }
        this.confirmOperState();
    }
    confirmOperState(){
        let flag = 1;
        // system관리자일때만 모두 다 보이게
        if(this.user_auth != 'sys'){
            for(let data of this.list){
                if(data.society_no == this.societyNo){
                    // 0:신청,1:승인,9:폐쇄
                    if(data.oper_state == '0'){ flag = 0; break; } 
                    else if(data.oper_state == '9') { flag = 9; break; }
                }
            }
        }
        if(flag == 1){
            this.OnChange.emit(this.societyNo);
        } else{
            if(flag == 0) alert(`[${this.societyName}] 단체는 승인되지 않았습니다.`);
            else alert(`[${this.societyName}] 단체는 폐쇠되었습니다.`);
        }
    }
    buttonClicked(btn){
        this.OnBtnClicked.emit(btn.key);
    }
    openModal(content) {
        this.searchSociety(this.page);
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.searchForm.society_nm = '';
            },
            reason => {
                this.searchForm.society_nm = '';
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    searchSociety(page = this.page) {
        // if(this.checkOperState == '1') this.searchForm.oper_state = '1';
        this.society.get(null, page - 1, this.pageSize, null, this.searchForm)
            .subscribe((data: any) => {
                this.masterList = data.list;
                this.total = data.total;
                this.totalPage = Math.ceil(this.total / this.pageSize);
                this.collectionSize = this.totalPage * 10;
            });
    }
}
