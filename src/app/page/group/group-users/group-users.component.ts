import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Renderer } from '@angular/core';
import { SocietyProvider } from '../../../providers/society';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchForm, MaxPageSize, API, SOCIETY_SELECT_ALERT_MSG } from '../../../../config';
import { CalendarComponent, CKEditorComponent, FIControlOptions } from '../../../itsm-ui/public_api';
import { HttpClient } from '@angular/common/http';

import { PushProvider } from '../../../providers/push';
import { LoginSession } from '../../../services/login.session';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';

declare const $;

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.scss']
})

export class GroupUsersComponent implements OnInit {

  testFrom;
  testTo;
  selectedSociety:any = {};
  societyListUserIn = [];
  userList = [];
  checkAllUser:boolean=false;
  //society-select buttons
  buttons=[{key:0, name:'푸시발송', class:'btn-inverse'}, {key:1, name:'회원초대', class:'btn-info'}];
  //검색 항목들
  searchForm : UserSearchForm = {
    society_no:null,
    user_cls:null,
    user_cls_cd:null
  }
  //회원 상세 폼
  reviseForm ={
    society_no:null,
    user_no:null,
    user_cls:[
      { user_cls:'1', user_cls_cd:''},
      { user_cls:'2', user_cls_cd:''},
      { user_cls:'3', user_cls_cd:''},
      { user_cls:'4', user_cls_cd:'', start_dt:'', close_dt:'' },
    ]
  };


  clsAttr:any = [];
  options:any={};
  closeResult: string;

  //table 페이징 변수
  total:number = 0;
  totalPage:number = 0;
  page:number = 1;
  pageSize:number = 10;
  maxPageSize = MaxPageSize;
  collectionSize:number = 10;
  //회원상세정보 테이블
  table = [];
  //푸시관련
  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild('ck') ck: CKEditorComponent;
  groupSearch = '';
  console = console;
  push: any = {
    title: '',
    sender: '',
    text: '',
    textSMS: '',
    isReserve: false,
    reserveDate: '',
    reserveTime: '',
    appSms: false,
    appKakao: false
  }
  sendType: string = null;
  templates: any[] = null;
  templateText;
  pushMsg: string; // 푸시 메세지
  inviteMsg: string; //초대 매세지 (기본 push, 앱 미설치 sms)
  //회원 초대명단 리스트
  tempInviteList:any = [];
  inviteList:any = [];
  inviteForm:any = {};// { user_nm:null, cp_no:null };
  //multiselect 변수

  header=[
    {
      name: '성명',
      key: 'user_nm'
    },
    {
      name: '휴대전화',
      key: 'cp_no'
    }
  ];
  constructor(private session: LoginSession, private society : SocietyProvider, private ngbFormatter : NgbDateParserFormatter, private ref:ChangeDetectorRef, private modalService: NgbModal, private http:HttpClient, private pushapi : PushProvider, private renderer: Renderer) { }

  ngOnInit() {
    //푸시 발송인 set
    this.push.sender = this.session.profile.name;
  }
  //회원 검색 option 가져오기
  optionSelected(which){
    if(!which) return;
    if(which == 'userCls'){
      //검색 옵션 선택했을 경우 그 옵션에 맞는 attr 세팅
      this.clsAttr = this.options.userClsAttr[this.searchForm.user_cls];
      this.clsAttr.unshift({cd:null, cd_nm:'전체'});
      this.clsAttr = _.uniqBy(this.clsAttr, 'cd');
    }else{
      //society 선택했을 경우
      //검색옵션 초기화
      this.searchForm = {
        society_no:which,
        user_cls:null,
        user_cls_cd:null
      };
      //초대 리스트 초기화
      this.inviteList = [];
      this.tempInviteList = [];
      this.society.get(this.searchForm.society_no, 0, 0)
      .subscribe((_:any)=>{
        this.selectedSociety = _.list[0];
        this.pushMsg = `[${this.selectedSociety.society_nm}]에서 당신을 초대합니다.`;
        this.inviteMsg = `[${this.selectedSociety.society_nm}]에서 당신을 초대합니다.`;
        //해당 society의 유저 조회
        this.searchUser(1);
        //해당 society의 옵션 가져오기
        this.society.getOptions(this.searchForm.society_no)
        .subscribe(list=>{
          this.options = list;
          this.options.userClsAttr.unshift([]); // 처음 빈값
        });
      });
    } 
    this.ref.detectChanges();
  }
  //society의 회원 목록 조회 
  searchUser(page = this.page, type=null){
    this.searchForm.pageIndex = page-1;
    this.searchForm.pageSize = this.pageSize;
    
    if(this.searchForm.society_no){
      this.society.findUser(this.searchForm)
      .subscribe((data:any)=>{
        
        this.userList = data.list;
        this.total = data.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.collectionSize = this.totalPage * 10;
        this.ref.detectChanges();
      });
    }
    if(type=='btn' && !this.searchForm.society_no){
      alert(SOCIETY_SELECT_ALERT_MSG);
    }else if(!this.searchForm.society_no) return;
  }
  //전체 선택 / 미선택
  selectAllUser(){
    this.checkAllUser = !this.checkAllUser;
    for(let i=0;i<this.userList.length;i++){
      this.userList[i].selected = this.checkAllUser;
    }
  }
  //society-select btn clicked
  btnClicked(btn, modal){
    if(btn == 0){ //푸시발송 클릭 시
      this.sendMessage(modal[btn],'push');
    }else{ //회원초대 클릭시
      this.sendMessage(modal[btn],'invite');
    }
  }
  //회원초대, 푸시발송 open modal 
  sendMessage(content, sendType=null){
    if(sendType == 'push') this.sendType = '1';
    else if(sendType == 'invite') this.sendType = '2';

    if(!this.searchForm.society_no){
      alert(SOCIETY_SELECT_ALERT_MSG);
      return;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //회원 상세 open modal 
  getUserDetail(content, userInfo){
    this.setTable(userInfo);
    this.getSocietyUserIn(userInfo.user_no);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //모달 dismiss 원인
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //회원이 가입한 society 목록 조회
  getSocietyUserIn(user_no){
    this.society.getSocietyUserIn(user_no)
    .subscribe((list:any)=>{
      this.societyListUserIn = list;
    })
  }
  //회원상세 테이블 세팅
  setTable(userInfo:any){
    console.log('set table');
    this.reviseForm.society_no = userInfo.society_no;
    this.reviseForm.user_no = userInfo.user_no;
    this.reviseForm.user_cls[0].user_cls_cd = userInfo.user_state;
    this.reviseForm.user_cls[1].user_cls_cd = userInfo.mbr_typ;
    this.reviseForm.user_cls[2].user_cls_cd = userInfo.mngr_cd?userInfo.mngr_cd:'0';
    this.reviseForm.user_cls[3].user_cls_cd = userInfo.user_pay_typ;
    this.reviseForm.user_cls[3].start_dt = userInfo.user_pay_typ=='유료'?userInfo.start_dt:null;
    this.reviseForm.user_cls[3].close_dt = userInfo.user_pay_typ=='유료'?userInfo.close_dt:null;

    console.log(userInfo);
    this.table = [
      [{ value:'성명',       typ:'label',    auth:'read only'},{ value:userInfo.user_nm,        typ:'text',    auth:'read only'},
      { value:'로그인계정',  typ:'label',    auth:'read only'},{ value:userInfo.login_accnt,    typ:'text',    auth:'read only'}],

      [{ value:'생년월일',   typ:'label',    auth:'read only'},{ value:userInfo.birth,          typ:'text',    auth:'read only'},
      { value:'성별',        typ:'label',    auth:'read only'},{ value:userInfo.sex,            typ:'text',    auth:'read only'}],

      [{ value:'전화',       typ:'label',    auth:'read only'},{ value:userInfo.tel_no,         typ:'text',    auth:'read only'},
      { value:'휴대전화',    typ:'label',    auth:'read only'},{ value:userInfo.cp_no,          typ:'text',    auth:'read only'}],

      [{ value:'이메일',     typ:'label',    auth:'read only'},{ value:userInfo.email,          typ:'text',    auth:'read only'},
      { value:'가입일시',    typ:'label',    auth:'read only'},{ value:userInfo.join_dttm,      typ:'text',    auth:'read only'}],

      [{ value:'주소',       typ:'label',    auth:'read only'},{ value:userInfo.addr1,          typ:'text',    auth:'read only'}],

      [{ value:'회원상태',   typ:'label',    auth:'read only'},{ value:userInfo.user_state_nm,  typ:'select',    auth:'revise', user_cls:1}],

      [{ value:'회원종류',   typ:'label',    auth:'read only'},{ value:userInfo.mbr_typ_nm,     typ:'select',    auth:'revise', user_cls:2}],

      [{ value:'회원구분',   typ:'label',    auth:'read only'},{ value:userInfo.mngr_cd_nm,     typ:'select',    auth:'revise', user_cls:3, disabled:userInfo.mngr_cd=='1'?true:false}],

      [{ value:'유료회원',   typ:'label',    auth:'read only'},{ value:userInfo.user_pay_typ,   typ:'calendar',  auth:'revise', }]
    ];
  }
  //회원 상세정보 수정
  updUserDetail(){
    this.society.putUserDetail(this.reviseForm)
    .subscribe(_=>{
      this.searchUser(1);
      alert('저장 성공');
    },err=>{
      console.error(err);
      let err_reason = '저장 실패';
      if(err.json().message) err_reason += ` : ${err.json().message}`;

      alert(err_reason);
    })
  }
  //
  check_mngr_cd(flag){
    if(flag){
      alert('정관리자는 회원구분을 바꿀 수 없습니다.');
    }
  }

  //초대명단 리스트
  addInviteList(){
    if(!this.inviteForm.cp_no || !this.inviteForm.user_nm){
      alert('정보를 모두 입력해 주세요');
      return;
    }
    if(this.tempInviteList.filter(_=>_.cp_no==this.inviteForm.cp_no).length != 0){
      alert('이미 입력한 내용입니다');
      return;
    } 
    this.tempInviteList.push(this.inviteForm);
    this.inviteForm = {};
  }
  //파일 input으로 연결 
  private openFile(input) {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
      input.click();
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(input, 'dispatchEvent', [event]);
    }
  }
  addInviteListFromExcel(item:any){
    let file= item.target.files[0];
    let fileReader = new FileReader();
    let arrayBuffer:any;
    fileReader.onload = (e) => {
        arrayBuffer = fileReader.result;
        var data = new Uint8Array(arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        let excel_data = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        for(let data of excel_data){
          this.inviteForm.user_nm = data['성명'];
          this.inviteForm.cp_no = data['휴대전화'];
          this.addInviteList();
        }
    }
    fileReader.readAsArrayBuffer(file);

  }
  //이하 푸시 관련 methods

  showTemplate(content) {
    console.log('show template');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.pushapi.getTemplate()
    
    .subscribe((res:any)=>{
      this.templates = res;
    });
  }
  selectTemplate(text) {
    this.pushMsg = text;
  }
  saveTemplate(text = null) {
    if (!this.templateText && !text) {
      alert('내용을 입력해주세요.');
      return;
    }
    if(!this.templates) this.templates = [];
    this.pushapi.postTemplate({text:this.templateText?this.templateText:text})
    .subscribe((_ :any)=> {
      this.templates.push({
        id: +_.text(),
        text: (this.templateText?this.templateText:text),
        selected: false
      });
      this.templateText = '';
      alert('저장되었습니다.');
    },
    (err) => {
      alert('저장실패.');
    });
  }

  deleteTemplate(id) {
    this.pushapi.deleteTemplate(id)
    .subscribe(()=>{
      alert('삭제되었습니다.');
      this.templates.splice(this.templates.findIndex(_=>_.id == id), 1);
    });
  }
  //푸시 / 메세지 발송
  send() {
    // if (!this.push.title) {
    //   alert('제목을 입력하세요.');
    //   return;
    // }

    if (!this.push.sender) {
      alert('발신명을 입력하세요.');
      return;
    }
    
    let message = this.pushMsg;
    if ((message == '<p></p>' || !message) && !this.inviteMsg) {
      alert('내용을 입력하세요.');
      return;
    }
    let sms = this.inviteMsg;
    let users;
    if(this.sendType == '1'){
      if(this.userList.length == 0){
        alert('수신자를 선택하세요.');
        return;
      }
      users = this.userList.filter(_=>_.selected);
      this.push.title = this.push.title?this.push.title:`[${this.selectedSociety.society_nm}] 공지`;
    }else if(this.sendType == '2'){
      if(this.inviteList.length == 0){
        alert('수신자를 선택하세요.');
        return;
      }
      users = this.inviteList.filter(_=>_.selected);
      this.push.title = this.push.title?this.push.title:`[${this.selectedSociety.society_nm}] 초대`;
    }else{
      alert('발송에러');
      return;
    }

    let formData: FormData = new FormData();
    formData.append('title', this.push.title);
    formData.append('message', message);
    formData.append('sender', this.push.sender);
    formData.append('method', '2');//this.sendType);
    formData.append('society_no', this.selectedSociety.society_no);
    formData.append('society_nm', this.selectedSociety.society_nm);
    formData.append('users', JSON.stringify(users));    

    if (this.sendType == '2') {
      formData.append('sms', this.inviteMsg);    
    }
    this.pushapi.society.post(formData)
    .subscribe(_=>{
      alert('전송되었습니다.');
      // this.inputFile.nativeElement.value = '';
    }, err => {
      alert('전송실패.');
    });
  }

  //초대양식 다운로드 
  getInviteForm(){
    window.open(`assets/invite_form.xlsx`, '_blank');
    /*this.society.getInviteForm()
    .subscribe((_:any)=>{
      var blob = new Blob([_], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      var filename = `회원초대명단.xlsx`;
      FileSaver.saveAs(blob, filename);
      console.log('엑셀 저장 성공');
    },err=>{
      console.error(err);
      alert('엑셀저장 실패');
    })*/
  }
  
  // checkByteLength (str: string = this.pushMsg) {
  //   this.curTxtLength = 0;
    
  //   for (var i = 0; i < str.length; i++) {
  //     var code = str.charCodeAt(i);
  //     var ch = str.substr(i,1).toUpperCase();
      
  //     code = parseInt(code.toString());
      
  //     if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0)))
  //       this.curTxtLength = this.curTxtLength + 2;
  //     else
  //       this.curTxtLength = this.curTxtLength + 1;
  //   }
  //   console.log(this.curTxtLength)
  //   if(this.curTxtLength > this.maxTxtLength){
  //     alert('문자수 제한을 넘었습니다');
  //   }
  // }
}
