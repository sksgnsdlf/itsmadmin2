import { Component, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges, DoCheck, Input, Renderer,ViewChild ,ElementRef } from '@angular/core';
import { OneStopProvider } from '../../../providers/onestop';
import { ResourceService } from '../../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { UserProvider } from '../../../providers/user';
import { API, GOOGLE_GEOCODING_API_KEY ,ONESTOP_DESCR_REPORT,ONESTOP_DESCR_DIRECT_REPORT,ONESTOP_DESCR_INVITATION_REPORT,ONESTOP_COMPLATE_CITIZENMSG} from '../../../../config';
import { asign_talk, complete_talk, send_state_to_citizen, complete_talk_officer, cancel_talk, asign_talk_citizen, accept_talk_citizen } from '../../../../biztalk_template';
import { LoginSession } from '../../../services/login.session';
import { Http, Headers } from '@angular/http';
import { PushProvider } from '../../../providers/push';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { async } from 'q';
import { resolve } from 'dns';

declare let naver: any;
declare let daum: any;
@Component({
  selector: 'app-turn-report',
  templateUrl: './turn-report.component.html',
  styleUrls: ['./turn-report.component.scss']
})
export class TurnReportComponent implements OnInit {

  @ViewChild("inputFile1") inputFile1: ElementRef;
  @Input()
  test: string;
  reportData: any = {};
  wasSuccessed: boolean = false;
  q;

  categoryList: Array<any> = [];
  showed_category_list: Array<any> = [];
  cateSearchTxt: string = "";
  selectedCate: any = {};
  procList: Array<any> = [];
  asgnStateList: Array<any> = [];
  replyMethod: Array<any> = [];
  dueDayMethod: Array<any> = [];
  selectedImg: string = "";
  dueDate: string = "";
  btn_description: string="";

  isCallcenterMember: boolean = false;
  callList:any = [];//콜센터 상담목록
  assign_popup_type: number = 0; // 0: 담당자 배정, 1: 직원 조회
  orgList: Array<any> = [];
  selectedOrgId: number = 1;
  selectedPopupTab: number = 4; // 0:인명, 업무검색, 1:협력업체, 2:지정담당자, 3:조직도, 4:부서별
  user_nm: string = "";
  task_nm: string = "";
  partner_nm: string = "";
  orgUserList: Array<any> = [];
  partnerUserList: Array<any> = [];
  cateUserList: Array<any> = [];
  orgDesignatedList: Array<any> = [];
  userList: Array<any> = [];
  selectedUserList: Array<any> = [];
  tempSelectedUserList: Array<any> = [];
  tempIdx: number = 0;
  will_saved_user_list: Array<any> = [];

  menualList: Array<any> = [];
  showed_menual_list: Array<any> = [];
  searchTxt: string = "";

  geocoder = new daum.maps.services.Geocoder();
  map: any = {};
  mapOptions: any = {
    level: 3,
    center: new daum.maps.LatLng(36.0190238, 129.3433917)
  };
  locationSelectItem: any = { position: {}, name: '', dongmyun: '' };
  location: any = new daum.maps.LatLng(36.0190238, 129.3433917);
  infoWindow: any = new daum.maps.InfoWindow({
    zindex:1
  });
  marker: any = {};
  search_map: string = "";

  officerNotiQueue: Array<any> = [];

  showChangeDutyPopup: boolean = false;
  duty_item: any = {
    org_no: '1',
    duty_site: '10',
    official_id: ''
  };
  locationList: Array<any> = [];
  dutyUserList: Array<any> = [];

  cate_changed: boolean = false;
  is_editable: boolean = true;
  selected_hst_img: string = "";

  ps = null;

  something_changed: boolean = false;
  //조직도 관련
  orgs: any = [];
  org:number = 1;
  depts: Array<any> = [];

  bizInfo : any = {msg:null,code:null};//비즈톡 정보
  bizInfoCitizen : any = {msg:null,code:null};//비즈톡 정보
  deptMasterUser:any;//부서별 대표 유저 정보
  talk_var_state:string = '1';//알림톡 처리상태 변수
  popupTitle: string = "";
  popupText: string = "";
  popupTextLength: number = 0;
  talk_mode:string = '1';  // 1 : 처리완료 알림톡, 0: 알림톡 전송
  send_mode:string = '0';  //0:즉시발송, 1: 예약발송
  send_check = "0";
  recv: any;
  recv_nm: string = "";
  recv_tel: string = "";
  recv_type: number = 0; // 0: 민원인, 1: 담당자
  send_type: number = 0; // 0: 문자, 1: PUSH -> SMS

  complate_citizen_msg = ONESTOP_COMPLATE_CITIZENMSG;

  picList: Array<any> = [];

  tmp_flag = false;
  constructor(private oneStop: OneStopProvider, private resourceService: ResourceService, private route: ActivatedRoute, private router: Router, private userProvider: UserProvider, private cdRef: ChangeDetectorRef,  public ref: ChangeDetectorRef, public renderer: Renderer, private session: LoginSession, private googleHttp: Http, private push: PushProvider, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let complaint_no = 0;
      if(params && params['no']) complaint_no = params['no'];
      // this.router.routeReuseStrategy.shouldReuseRoute = function () {
      //   return false;
      // };
      this.router.navigated = false;
      window.scrollTo(0, 0);
      if (complaint_no != 0) {
        this.reportData.complaint_no = +complaint_no; // (+) converts string 'id' to a number
        this.getReportData();
      }
      else {
        this.reportData = {};
        this.locationList = [];
        this.dutyUserList = [];
        this.selectedUserList = [];
        this.locationSelectItem = { position: {}, name: '', dongmyun: '' };
        this.selectedCate = {};
        this.reportData.receipt_typ = 2;
        this.reportData.open_yn = 'N';
        this.reportData.proc_state = "0";
        this.reportData.return_mthd = "1";
        this.reportData.receipt_mthd = "2";
        this.reportData.due_day = "5";
        this.getDutyRecent();
        this.getBigCategory();
        this.getDueDate();
        this.cdRef.detectChanges();
      }
    });

    this.oneStop.menual.get("")
      .subscribe(
      (data:any) => {
        this.menualList = data;
        this.showed_menual_list = this.menualList;
      },
      error => {
      }
    );

    this.ps = new daum.maps.services.Places();

    this.getReplyMethod();
    this.getDueDayMethod();
    this.getProc();
    this.getOrg();
    this.getAsgnState();
    this.getLocation();
    this.checkCallcenterMember();
  }
  setOrg(org = 1) {
    this.resourceService.getDept(org, '')
      .then((_: any) => {
        let lvl1, lvl2;
        this.depts = [];
        for (let row of _) {
          let item: any = {
            id: row.id,
            orgNo: row.orgNo,
            name: row.name,
            selected: false,
            expanded: false,
            sub: []
          };

          if (row.lvl == 1) {
            lvl1 = this.depts.length;
            this.depts.push(item);
          } else if (row.lvl == 2) {
            lvl2 = this.depts[lvl1].sub.length;
            this.depts[lvl1].sub.push(item);
          } else {
            if (this.depts[lvl1].sub[lvl2])
              this.depts[lvl1].sub[lvl2].sub.push(item);
            else
              this.depts[lvl1].sub.push(item);
          }
        }
      })
      .catch(err => console.error(err));
  }
  openModal(content, size = null, customClass=null){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:size, windowClass:customClass }).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onChange(event :Event){
    this.something_changed = true;
  }

  getDutyRecent() {
    this.reportData.user_nm = this.session.profile.name;
    if (this.session.profile.partner_nm && this.session.profile.partner_nm != "null")
      this.reportData.partner_nm = this.session.profile.partner_nm;
    this.oneStop.duty.recent()
    .subscribe(
      (data:any) => {
        if(!data.duty_dt) {
          this.reportData.duty_dt = new Date();
          this.reportData.org_no = this.session.profile.org_no;
          this.reportData.official_id = this.session.profile.official_id;
        }
        else {
          this.reportData.duty_dt = data.duty_dt;
          this.reportData.duty_typ = data.duty_typ;
          this.reportData.duty_typ_nm = data.duty_typ_nm;
          this.reportData.dept_nm = data.dept_nm;
          this.reportData.duty_site = data.duty_site;
          this.reportData.org_no = data.org_no;
          this.reportData.official_id = data.official_id;
        }
      },
      err => {
        this.reportData.duty_dt = new Date();
        this.reportData.org_no = this.session.profile.org_no;
        this.reportData.official_id = this.session.profile.official_id ? this.session.profile.official_id : '';
      }
    );
  }

  textareaInput(ev, from, item = null) {
    try {
      if(from == 'res') {
        this.reportData.answer_txt = ev.target.value;
      }
      else if(from == 'proc_txt') {
        item.proc_txt = ev.target.value;
        item.edited = true;
      }
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }

  get complaintTextValue () {
    return this.reportData.complaints_txt;
  }

  set complaintTextValue (v) {
    try {
      this.reportData.complaints_txt = v;
    }
    catch(e) {

    };
  }

  delete() {
    var r = confirm("삭제하시겠습니까?");
    if (r == true) {
      this.oneStop.delete(this.reportData.complaint_no)
      .subscribe(
        data => {
          alert('삭제완료');
          this.router.navigate(['/onestop/list']);
        },
        error => {
          alert('삭제실패');
          console.log(error);
        }
      );
    }
  }

  refresh() {
    if(this.something_changed){
      let r = confirm("작성한 내용을 취소하고 새로 등록을 하시겠습니까?");
      if (r == true) {
        //this.router.navigate(['/onestop/report'], {queryParams: {no:0}});
        //this.router.navigate(['/onestop/report'], { replaceUrl: true });
        this.refreshItem();
      }
    }else{
      //this.router.navigate(['/onestop/report'], {queryParams: {no:0}});
      this.refreshItem();
    }
  }

  refreshItem(){
    this.reportData = {};
    this.locationList = [];
    this.dutyUserList = [];
    this.selectedUserList = [];
    this.locationSelectItem = { position: {}, name: '', dongmyun: '' };
    this.selectedCate = {};
    this.reportData.receipt_typ = 2;
    this.reportData.open_yn = 'N';
    this.reportData.proc_state = "0";
    this.reportData.return_mthd = "1";
    this.reportData.receipt_mthd = "2";
    this.reportData.due_day = "5"
    this.getDutyRecent();
    this.getBigCategory();
    this.cdRef.detectChanges();

    this.something_changed = false;
    this.is_editable = true;

  }

  getReportData(status = 0) {
    if(status == 0) {
      this.oneStop.assign.get(this.reportData.complaint_no)
      .subscribe(
        (data:any) => {
          this.selectedUserList = data;
        }
      );
    }

    this.oneStop.report.getDetail(this.reportData.complaint_no)
    .subscribe(
      (data:any) => {
        this.picList = [];
        if (data.length < 1) {
          this.router.navigate(['./onestop/list']);
          return;
        }
        this.reportData = {};
        this.reportData = data[0];

        if(+this.reportData.proc_state >= 5 || this.reportData.receipt_mthd == 1 || this.reportData.proc_state == 4) {
          this.is_editable = false;
        }


        if(this.reportData.image_url1)
          this.picList.push(this.reportData.image_url1);
        if(this.reportData.image_url2)
          this.picList.push(this.reportData.image_url2);
        if(this.reportData.image_url3)
          this.picList.push(this.reportData.image_url3);
        if(this.reportData.image_url4)
          this.picList.push(this.reportData.image_url3);


        this.locationSelectItem.name = this.reportData.loc_txt;
        this.locationSelectItem.position.latitude = this.reportData.latitude;
        this.locationSelectItem.position.longitude = this.reportData.longitude;
        this.locationSelectItem.dongmyun = this.reportData.addr;

        if(this.reportData.receipt_mthd == 1 && !this.reportData.duty_dt) {
          this.reportData.acceptNeeded = true; // 접수가 필요한 경우
          this.getDutyRecent();
        }
        else {
          this.reportData.user_nm = this.reportData.user_nm ? this.reportData.user_nm : this.reportData.reg_user_nm;
        }

        this.getBigCategory();
      },
      error => {
        this.router.navigate(['./onestop/list']);
      }
    );
  }

  getReplyMethod() {
    this.resourceService.getCode('520')
    .then((_:any) => this.replyMethod = _)
    .catch(err => console.error(err));
  }

  getDueDayMethod() {
    this.resourceService.getCode('515')
    .then((_:any) => this.dueDayMethod = _)
    .catch(err => console.error(err));
  }


  getProc() {
    this.resourceService.getCode('510')
    .then((_:any) => this.procList = _)
    .catch(err => console.error(err));
  }

  getBigCategory() {
    this.oneStop.category.getAll(1)
    .subscribe(
      (data:any) => {
        this.categoryList = data;
        this.showed_category_list = this.categoryList;

        if(this.reportData.complaint_no) {
          this.selectedCate = this.categoryList.find((element) => {
            return element.id == this.reportData.cls_no;
          });
        }
      }
    );
  }

  getOrg() {
    this.resourceService.getOrg(4)
    .then((_:any) => {
      this.orgList = _;
      this.selectedOrgId = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
    });
  }

  getLocation() {
    this.resourceService.getCode('590')
    .then((_:any) => this.locationList = _);
  }

  getAsgnState() {
    this.resourceService.getCode('560')
    .then((_:any) => this.asgnStateList = _);
  }

  getDeptUser(dept) {
    this.resourceService.getDeptUser(dept.id, dept.orgNo)
    .then((_:any) => {
      this.userList = [];
      this.userList = _;
    })
    .catch(err => console.error(err));
  }

  getOrgUser(selectedPopupTab = this.selectedPopupTab) {
    if (selectedPopupTab == 0) {
      if (this.selectedOrgId == -1) {
        alert('기관을 선택해주세요.');
        return;
      }
      // else if (this.user_nm.length < 2 && this.task_nm.length < 2) {
      //   alert('담당자 혹은 담당업무를 2자 이상 입력해주세요');
      //   return;
      // }
    }
    this.userProvider.getAll(selectedPopupTab, this.selectedOrgId, this.q, null, this.partner_nm)
    .subscribe(
      (data:any) => {
        if (selectedPopupTab == 0)
          this.orgUserList = data;
        else if(selectedPopupTab == 1){
          this.partnerUserList = data;
        }else if(selectedPopupTab == 4){
          this.orgDesignatedList = data;
        }
      }
    );
  }

  getCateUser() {
    this.oneStop.category.getUser(this.reportData.cls_no)
    .subscribe(
      (data:any) => {
        this.cateUserList = data;
      }
    );
  }

  changePopupTab(idx) {
    this.selectedPopupTab = idx;
  }


  //이미지 추가
  openFile() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
        this.inputFile1.nativeElement.click();

    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(this.inputFile1.nativeElement, 'dispatchEvent', [event]);
      console.log("this.inputFile1.nativeElement = > " + JSON.stringify(this.inputFile1.nativeElement));

    }
  }
  deleteFile(index){
    for(let row = 0 ; row < this.picList.length ; row++)
    {
      if(row == 0 && row >= index){
        this.reportData.image_url1 = this.reportData.image_url2;
      }else if(row == 1 && row >= index){
        this.reportData.image_url2 =  this.reportData.image_url3;
      } else if(row == 2 && row >= index){
        this.reportData.image_url3 =  this.reportData.image_url4;
      } else if(row == 3 && row >= index){
        this.reportData.image_url4 = "";
      }
    }
    this.picList.splice(index, 1);

  }

  checkFileType($event) {
    let files: FileList = $event.target.files;
    if (files.length > 0) {
      let file: File = files[0];
      if (!file.type.includes('image/')) {
        alert('이미지만 업로드 가능합니다.');
        $event.target.value = '';
      }
      else {
        var fr = new FileReader();
        fr.onload = () => {
          if(this.picList.length < 4)
            this.picList.push(fr.result);

          $event.target.value = '';
          this.ref.detectChanges();
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }

  openAsgnPopup(content, i, type, user_nm: string) {
    this.tempIdx = i;
    this.assign_popup_type = type;
    this.resourceService.getOrg(4)
      .then((_:any) => this.orgs = _);
    this.org = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
    this.setOrg(this.org);
    this.openModal(content, null, 'customModal');
    this.changePopupTab(4);

    if(type == 0) {
      this.user_nm = user_nm;
      //2018.09.27
      //담당자 검색 버튼 클릭 시 팝업과 동시에 모든 유저 조회하는 부분.(검색 버튼 누르면 나오도록 수정)
      // this.getOrgUser(0);
    }

    if(this.reportData.cls_no)
      this.getCateUser();
    this.getOrgUser(1);
    this.getOrgUser(4);
  }

  openAsgnPopup2(content, i, type, user_nm: string) {
    this.tempIdx = i;
    this.assign_popup_type = type;
    this.resourceService.getOrg(4)
      .then((_:any) => this.orgs = _);
    this.org = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
    this.setOrg(this.org);
    this.openModal(content, null, 'customModal');
    this.changePopupTab(4);

    if(type == 0) {
      this.user_nm = user_nm;
      //2018.09.27
      //담당자 검색 버튼 클릭 시 팝업과 동시에 모든 유저 조회하는 부분.(검색 버튼 누르면 나오도록 수정)
      // this.getOrgUser(0);
    }

    if(this.reportData.cls_no)
      this.getCateUser();
    this.getOrgUser(1);
    this.getOrgUser(4);
  }

  //콜센터 직원인지 조회
  checkCallcenterMember(){
    this.oneStop.checkCallMem()
    .subscribe((_:any)=>{
      if(_ && _.cnt != 0) this.isCallcenterMember = true;
      else this.isCallcenterMember = false;
    });
  }
  //콜센터 상담목록 조회
  getCallList(){
    this.oneStop.getCallList()
    .subscribe((list:any)=>{
      this.callList = list;
    })
  }
  //콜센터 상담목록 조회 팝업
  openCallcenterPopup(content){
    this.getCallList();
    this.openModal(content, 'lg');
  }
  //콜센터 데이터 binding
  callcenterBinding(callcenterData){
    this.reportData.civil_nm = callcenterData.USER_NM;
    this.reportData.civil_tel_no = callcenterData.TEL_NO;
    this.complaintTextValue = callcenterData.QUESTION;
    this.reportData.answer_txt = callcenterData.ANSWER;
  }
  userSelectChanged(ev, item) {
    var index = this.tempSelectedUserList.findIndex(element => {
      return (element.user_typ == item.user_typ && element.user_no == item.user_no) || (element.user_nm == item.user_nm && element.cp_no == item.cp_no);
    });

    if(ev.target.checked) {
      if(index < 0) {
        this.tempSelectedUserList.push(item);
      }
    }
    else {
      if(index > -1) {
        this.tempSelectedUserList.splice(index, 1);
      }
    }
  }

  selectTempUsers() {
    if(this.tempSelectedUserList.length == 0) {
      alert('선택된 담당자가 없습니다.');
      return ;
    }

    // if(!this.selectedUserList[this.tempIdx].user_nm && !this.selectedUserList[this.tempIdx].cp_no && this.selectedUserList[this.tempIdx].proc_txt == '담당자가 배정되었습니다.')
      this.deleteRow(this.tempIdx);

    this.tempSelectedUserList.forEach(element => {
      this.addRow(element);
    });

    this.tempSelectedUserList = [];
    this.modalService.dismissAll();
  }

  selectTempUsers2() {
    if(this.tempSelectedUserList.length == 0) {
      alert('선택된 담당자가 없습니다.');
      return ;
    }

    // if(!this.selectedUserList[this.tempIdx].user_nm && !this.selectedUserList[this.tempIdx].cp_no && this.selectedUserList[this.tempIdx].proc_txt == '담당자가 배정되었습니다.')
    //this.deleteRow(this.tempIdx);

    this.tempSelectedUserList.forEach(element => {
      this.addRow(element);
    });

    this.tempSelectedUserList = [];
    this.modalService.dismissAll();
  }

  newRow() {
    var item = {
      isNew: true,
      asgn_state: 1,
      proc_dttm: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      asgn_user_no: null,
      user_nm: '',
      dept_nm: '',
      cp_no: '',
      user_typ: '',
      proc_txt: '접수되었습니다.'
    };
    this.selectedUserList.unshift(item);
  }

  cancelRow() {

    this.officerNotiQueue = [];

    this.officerNotiQueue = _.cloneDeep(this.selectedUserList.filter((element) => {
      return element.asgn_user_no && element.selected;
    }));

    var output = [], keys = [] , tempSave = false;

    this.officerNotiQueue.forEach(_=>{
      var key = _.asgn_user_no;
      if(keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(_);
      }
    });

    this.officerNotiQueue = output;

    if(this.officerNotiQueue.length == 0) { // 알림을 받을 수 있는 처리내역이 있는 경우
      alert("배정을 취소할 담당자를 선택하세요")
    }else{
      let temp = [];
      this.selectedUserList.forEach(_=>{
        if (_.selected) {
          if(_.isNew && _.asgn_state == 1){

          }else{
            temp.push({
              ..._,
              asgn_state:5,
              selected: false,
              isNew: true,
              proc_dttm: moment(new Date()).format('YYYY-MM-DD HH:mm'),
              proc_txt: '배정 취소되었습니다.'
            });

            tempSave = true;
          }
        } else {
          _.selected = false;
          //temp.push(_);
        }
      });

      if(tempSave){
        this.cancelPushToOfficer();
        this.selectedUserList = temp;
        this.save(false, true);
      }else{
        this.selectedUserList = temp;
      }

    }


  }

  addRow(user) {
    var item = {
      isNew: true,
      asgn_state: 1,
      proc_dttm: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      asgn_user_no: user.user_no,
      user_nm: user.user_nm,
      dept_nm: user.dept_nm,
      cp_no: user.cp_no,
      edited: true,
      user_typ: user.user_typ,
      proc_txt: '접수되었습니다.'
    };
    this.selectedUserList.unshift(item);
  }

  deleteRow(i) {
    // this.selectedUserList[i].isNew = false;
    // this.selectedUserList[i].edited = false;
    // this.selectedUserList[i].deleted = true;
    this.selectedUserList.splice(i, 1);
  }

  accept() { // 모바일 신고건에 대해 담당자 접수
    this.reportData.reg_user_no = localStorage.getItem('user_no');
    this.reportData.proc_state = 2;
    this.save(false, false, false, 0, null, false, 1);
  }
  checkCateChanged(item){
    if(this.reportData.cls_no == item.id){
      this.cate_changed = false;
    }else{
      this.selectedCate = item;
      this.reportData.cls_no = item.id
      this.cate_changed = true;
    }

  }
  putProcTxt(){
    this.oneStop.putProcTxt({ procList : this.selectedUserList})
    .subscribe(_=>{
      alert('저장 성공');
    },err=>{
      console.error(err);
      alert('저장 실패');
    });
  }


  private _dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  ImageDataUploadapi() {

    const formData = new FormData();
    for (let i = 0; i < this.picList.length; i++) {
      if(this.picList[i].includes(API)){
        continue;
      }

      let blob = this._dataURItoBlob(this.picList[i]);
      let ext = this.picList[i].split("/")[1].split(";")[0];

      formData.append('file' + (i + 1), blob, 'file' + (i + 1) + '.'+ext);


      console.log("picData=>"+formData);
      console.log("picData[JSON]=>"+JSON.stringify(formData) );
    }
    return this.oneStop.uploadImg(formData);

  }

  save(complete: boolean = false, saveList: boolean = true, showPopup: boolean = false, recv_type: number = 0, item = null, showDutyPopup: boolean = false, refreshList: number = 0) {
    if(!this.checkAbleToSave())
      return ;
    //미분류(기타)를 default로
    this.reportData.cls_no = this.reportData.cls_no?this.reportData.cls_no:105;
    var body = _.cloneDeep(this.reportData);
    body.loc_txt = this.locationSelectItem.name;
    body.latitude = this.locationSelectItem.position.latitude;
    body.longitude = this.locationSelectItem.position.longitude;
    body.addr = this.locationSelectItem.dongmyun;

    if(!this.reportData.civil_nm)
      body.civil_nm = "[민원인]";

    if(saveList && this.selectedUserList.filter(element => {return !element.deleted}).length > 0 && +body.proc_state < 2)
      body.proc_state = 2;

    if(body.duty_dt)
      body.duty_dt = new Date(body.duty_dt).getTime()/1000;

    if(body.official_id == this.session.profile.official_id && (!body.reg_user_no || body.reg_user_no == 1)) {
      body.reg_user_no = this.session.profile.user_no;
    }

    if(complete) { // 민원 완료 처리
      if(body.receipt_typ == 1) { // 상담완료
        body.proc_state = '5';
      }
      else { // 배정쪽에서 버튼 클릭
        body.proc_close_dttm = new Date().getTime()/1000;
        let item = {
          isNew: true,
          asgn_state: 4,
          proc_dttm: moment(new Date()).format('YYYY-MM-DD HH:mm'),
          asgn_user_no: this.session.profile.user_no,
          user_nm: this.session.profile.name,
          cp_no: this.session.profile.cp_no,
          edited: true,
          user_typ: this.session.profile.user_role,
          proc_txt: this.popupText,
          receipt_page : 1
        };
        this.selectedUserList.unshift(item);
      }
      let txt = '처리완료';
      // username, proc, worker, tel

      //처리완료 비즈톡 수정

      if(this.send_check =='1')
      {
        this.sendNoti( Number(this.send_mode) );
      }
      this.completePushToOfficer();
    }

    if(this.picList.length > 0)
    {
      this.ImageDataUploadapi().then(
        (data:any) => {
          let Jsondata = JSON.parse(data);
          for (let item of Jsondata) {
            if (item.fieldname.split("file")[1] == "1")
              body.image_url1 = item.path ? API + item.path : undefined;
            else if (item.fieldname.split("file")[1] == "2")
              body.image_url2 = item.path ? API + item.path : undefined;
            else if (item.fieldname.split("file")[1] == "3")
              body.image_url3 = item.path ? API + item.path : undefined;
            else if (item.fieldname.split("file")[1] == "4")
              body.image_url4 = item.path ? API + item.path : undefined;
          }
          this.oneStop.post(body).subscribe(
            (data:any) => {
              if (!this.reportData.complaint_no){
                this.reportData.complaint_no = JSON.parse(data).id;
              }
              if(saveList) {
                this.will_saved_user_list = _.cloneDeep(this.selectedUserList);
                this.will_saved_user_list.reverse();
                this.saveRows(0, 0, showPopup, recv_type, item, complete);
              }
              else {
                if(showDutyPopup) {
                  this.getReportData(1);
                  this.getDutyList();
                  this.showChangeDutyPopup = true;
                  return ;
                }
                this.getReportData(refreshList);
                if(!(!showPopup && recv_type == -1)){
                  this.something_changed = false;
                  this.cate_changed = false;
                  alert('저장되었습니다.');
                }
              }
            }
          );
        }
      );
    }
    else
      this.oneStop.post(body).subscribe(
      (data:any) => {
        if (!this.reportData.complaint_no){
          this.reportData.complaint_no = JSON.parse(data).id;
        }
        if(saveList) {
          this.will_saved_user_list = _.cloneDeep(this.selectedUserList);
          this.will_saved_user_list.reverse();
          this.saveRows(0, 0, showPopup, recv_type, item, complete);
        }
        else {
          if(showDutyPopup) {
            this.getReportData(1);
            this.getDutyList();
            this.showChangeDutyPopup = true;
            return ;
          }
          this.getReportData(refreshList);
          if(!(!showPopup && recv_type == -1)){
            this.something_changed = false;
            this.cate_changed = false;
            alert('저장되었습니다.');
          }
        }
      }
    );
    if(this.modalService.hasOpenModals  && this.send_check !='1' )
    this.modalService.dismissAll();
  }

  dismissAlert(msg){
    this.modalService.dismissAll();
    if(msg){
      alert(msg);
    }
  }

  checkAbleToSave() {
    // if(!this.reportData.cls_no) {
    //   alert('분류를 선택해주세요.');
    //   return false;
    // }
    if(!this.reportData.civil_tel_no) {
      alert('전화번호를 입력해주세요.');
      return false;
    }
    if(!this.reportData.complaints_txt) {
      alert('접수내용을 입력해주세요.');
      return false;
    }
    return true;
  }

  saveRows(index, status = 0, showPopup = false, recv_type = 0, item = null, complete = false) {
    if(index == this.will_saved_user_list.length) {
      if(status == 0) {
        this.getReportData();
        // alert('저장되었습니다');
        if(complete) {
          this.oneStop.complete({complaint_no: this.reportData.complaint_no, proc_state: '5'})
          .subscribe(_ => {
            this.getReportData(0);
            console.log('처리완료.');
          });
        }
      }
      return ;
    }
    else {
      this.will_saved_user_list[index].complaint_no = this.reportData.complaint_no;

      if (this.will_saved_user_list[index].isNew) {
        if(!this.will_saved_user_list[index].proc_txt || this.will_saved_user_list[index].proc_txt.length == 0) {
          alert('담당자의 처리내용이 비어있습니다.');
          return this.saveRows(this.will_saved_user_list.length, -1);
        }
        this.oneStop.assign.post(this.will_saved_user_list[index])
        .then(_ => {return this.saveRows(++index, 0, showPopup, recv_type, item, complete);})
        .catch(_ => {
          alert('담당자 배정 중 오류가 발생했습니다');
          return this.saveRows(this.will_saved_user_list.length, -1);
        });
      }
      else{
        this.oneStop.assign.post(this.will_saved_user_list[index])
        .then(_ => {return  this.saveRows(++index, 0, showPopup, recv_type, item, complete);})
        .catch(_ => {
          alert('오류가 발생했습니다');
          return  this.saveRows(++index, 0, showPopup, recv_type, item, complete);
        });

      }

    }
  }

  get popupTextValue () {
    return this.popupText;
  }

  set popupTextValue (v) {
    try {
      this.popupText = v;
      // this.getByteLength();
    }
    catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }

  showAssignorPopups(recv_type, content, popupTitle) {
    console.log('showAssignnorPopups');
    this.recv_type = recv_type;
    // this.popupText = '[바로응답]';
    this.recv = null;
    this.officerNotiQueue = [];


    if(recv_type == 0) { //민원인
      this.popupTitle = popupTitle? popupTitle:"민원인에게 알림톡 발송";
      this.send_type = 0;
      this.recv_nm = this.reportData.civil_nm;
      this.recv_tel = this.reportData.civil_tel_no;
    }

    else if(recv_type == 1) { //담당자 && 민원인에게 배정 톡 보내기
      if(!this.checkAbleToSave()) {
        return ;
      }

      var check_officer_cnt = _.cloneDeep(this.selectedUserList.filter((element) => {
        return element.isNew;
      }));

      if(recv_type == 1 && check_officer_cnt.length == 0) { // 담당자 배정 눌렀을 때, 체크
        alert('담당자를 추가 후 배정하시기 바랍니다.');
        return ;
      }
      this.officerNotiQueue = _.cloneDeep(this.selectedUserList.filter((element) => { //새로 추가된 담당자를 대상으로 푸시 or SMS
        return element.isNew && (element.asgn_user_no || element.cp_no);
      }));

      if(this.officerNotiQueue.length != 0) { // 알림을 받을 수 있는 처리내역이 있는 경우
        this.popupTitle = popupTitle? popupTitle:"담당자에게 알림 발송";
        this.send_type = 1;
        this.recv_nm = this.officerNotiQueue[0].user_nm += `${this.officerNotiQueue.length > 1 ? ' 외 ' + (this.officerNotiQueue.length - 1) + '명': ''}`;

        this.bizInfo = asign_talk(this.recv_nm,this.reportData.complaints_txt,this.reportData.civil_nm,this.reportData.civil_tel_no);
        this.popupText = this.bizInfo.msg;

        this.save(false, this.reportData.complaint_no?false:true, false, -1, null, false, 1);
        this.openModal(content, 'lg');
      }
      else {
        this.save(false, true);
        this.modalService.dismissAll();
      }
    }
    else if(recv_type == 2) { // 그냥 SMS
      this.popupTitle = popupTitle? popupTitle:"알림톡 전송";
      this.send_type = 0;
      this.recv_nm = this.reportData.civil_nm ? this.reportData.civil_nm : '';
      this.recv_tel = this.reportData.civil_tel_no ? this.reportData.civil_tel_no : '';

      if(this.reportData.complaints_txt)
        this.popupText = this.reportData.complaints_txt;
      this.openModal(content, 'lg');
    }
    else if(recv_type == 3 || recv_type == 4)
    {
      this.popupTitle = popupTitle? popupTitle:"알림톡 전송";
      this.send_type = 0;
      this.recv_nm = this.reportData.civil_nm ? this.reportData.civil_nm : '';
      this.recv_tel = this.reportData.civil_tel_no ? this.reportData.civil_tel_no : '';
      if(recv_type == 4)
        this.talk_var_state = '2';
      this.openModal(content, 'lg');
    }
    else{
      this.openModal(content, 'lg');
    }
  }

  // type:0 - 배정 알림 type:1 - 알림톡 전송
  sendNoti(val: number) { //0: 즉시, 1: 예약

    if(!this.recv_nm) {
      alert('수신인을 입력해주세요.');
      return ;
    }

    if (!this.popupText) {
      alert('내용을 입력하세요.');
      return ;
    }

    if(this.send_type == 0 && !this.recv_tel) {
      alert('전화번호를 입력해주세요.');
      return ;
    }
    if(this.recv_type == 2  || this.recv_type == 3 || this.recv_type == 4){ //알림톡 전송 팝업일때

      let office_tel = "054-270-8282";
      let office_name = "8282콜센터";
      if( this.recv_type != 3)
      {
        office_tel =  this.session.profile.office_tel_no ? this.session.profile.office_tel_no:"054-270-8282";
        office_name = this.session.profile.name ? this.session.profile.name:"담당자";
      }

      // this.complate_citizen_msg = this.complate_citizen_msg.replace("()", this.popupText);
      this.bizInfo = send_state_to_citizen(this.recv_nm, this.talk_var_state=='1'?'처리중':(this.talk_var_state=='2'?'처리완료':'처리불가'), this.popupTextValue, office_name,office_tel);
      this.sendSms(val, this.recv_nm, this.recv_tel, 'talk')
      .then(_=>{
        this.modalService.dismissAll();
        alert('전송되었습니다.');
      })
      .catch((error) => {
        console.log(error);
        alert('전송 중 오류가 발생했습니다.');
      });
    }
    else {
      //시민이 수신여부에따라 알림톡전송
      /*
      if(this.reportData.return_mthd == 1){
        this.oneStop.checkAccept(this.reportData.complaint_no)
        .then((result:any)=>{
          if(result.chk == 1){

            this.bizInfoCitizen = accept_talk_citizen(this.reportData.civil_nm);
            this.sendSmsToCitizen(0)
            .then(_=>{
              console.log('biztalk 전송 성공')
            })
            .catch(err=>{
              console.log('biztalk 전송 실패')
              console.error(err);
            });

          }else{
            console.log('이미 접수')
          }

          this.sendOfficer(val);
        })
        .catch(err=>{
          console.log(err);
        });

      }else if(this.reportData.return_mthd == 2){
        this.bizInfoCitizen = accept_talk_citizen(this.reportData.civil_nm);
        var body = {
          title: '[포항시청-바로응답]',
          message: this.bizInfoCitizen.msg,
          sender: '관리자',
          users: [this.reportData.civil_user_no],
          reserveDate: null,
          method: 3,
          link: ``
        };

        this.push.post(body)
        .subscribe(
          data => {
            console.log('스마트포항 담당자 접수 PUSH OK');
            this.sendOfficer(val);
          },
          error => {
            alert('스마트포항 담당자 접수 PUSH 실패');
          }
        );

      }else{
        this.sendOfficer(val);
      }
       */
      this.sendOfficer(val);

    }
  }

  async sendSmsToCitizen(reserved = 0, name = '', cp = this.reportData.civil_tel_no, method='biztalk') {
    console.log('send '+ method);
    var body = {
      msg: this.bizInfoCitizen.msg,
      name: name,
      tel: cp,
      reserveDttm: null,
      method,
      template_code:this.bizInfoCitizen.code
    };

    if(reserved == 1) { // 문자 예약일 경우

      await this.reserveDueDate().then(value=>body.reserveDttm = value);
      // body.reserveDttm = new Date();
      // if(body.reserveDttm.getHours() >= 18 && body.reserveDttm.getHours() <= 23) {
      //   body.reserveDttm.setDate(body.reserveDttm.getDate() + 1);
      //   body.reserveDttm.setUTCHours(9, 0, 0, 0);
      //   body.reserveDttm = body.reserveDttm.toISOString().slice(0, 19).replace('T', ' ');
      // }
      // else if(body.reserveDttm.getHours() >= 0 && body.reserveDttm.getHours() <= 9) {
      //   body.reserveDttm.setUTCHours(9, 0, 0, 0);
      //   body.reserveDttm.toISOString().slice(0, 19).replace('T', ' ');
      //   body.reserveDttm = body.reserveDttm.toISOString().slice(0, 19).replace('T', ' ');
      // }
      // else {
      //   body.reserveDttm = null;
      // }
    }

    return this.push.postSms(body).toPromise();
  }

  async sendSms(reserved = 0, name = '', cp = this.recv_tel, method='biztalk') {
    console.log('send '+ method);
    var body = {
      msg: this.bizInfo.msg,
      name: name,
      tel: cp,
      reserveDttm: null,
      method,
      template_code:this.bizInfo.code
    };

    if(reserved == 1) { // 문자 예약일 경우
      await this.reserveDueDate().then(value=>body.reserveDttm = value);
      // body.reserveDttm = new Date();
      // if(body.reserveDttm.getHours() >= 18 && body.reserveDttm.getHours() <= 23) {
      //   body.reserveDttm.setDate(body.reserveDttm.getDate() + 1);
      //   body.reserveDttm.setUTCHours(9, 0, 0, 0);
      //   body.reserveDttm = body.reserveDttm.toISOString().slice(0, 19).replace('T', ' ');
      // }
      // else if(body.reserveDttm.getHours() >= 0 && body.reserveDttm.getHours() <= 9) {
      //   body.reserveDttm.setUTCHours(9, 0, 0, 0);
      //   body.reserveDttm.toISOString().slice(0, 19).replace('T', ' ');
      //   body.reserveDttm = body.reserveDttm.toISOString().slice(0, 19).replace('T', ' ');
      // }
      // else {
      //   body.reserveDttm = null;
      // }

    }
    
    return this.push.postSms(body).toPromise().then(_=>this.popupText='');
  }
  cancelPushToOfficer(){ //공무원에게 배정 취소됬다고 푸시

/*
    this.recv = this.selectedUserList.filter(element => element.asgn_user_no && element.selected ) // user_no 가 있는 경우 &&  선택된 경우
    .map(element => {
      return element.asgn_user_no;
    });
    for(let i = 0; i < this.recv.length; i++){
      for(let j = i+1; j<this.recv.length;j++){
        if(this.recv[i] == this.recv[j]){
          this.recv.splice(j,1);
          j--;
        }
      }
    }
    console.log(this.recv)
    this.bizInfo = cancel_talk(this.session.profile.name, this.complaintTextValue, this.reportData.civil_nm, this.reportData.civil_tel_no);
    var body = {
      title: '[바로응답]',
      message: this.bizInfo.msg,
      sender: '당직자',
      users: this.recv,
      reserveDate: null,
      method: 3, // 3: push & biztalk
      link: null//`smartpohang://app/page?name=OnestopDetailPage&no=${this.reportData.complaint_no}&user_no=${this.session.profile.user_no}`
    };
    this.push.post(body)
    .subscribe(_=>{
      console.log('푸시 전송 성공')
    },err=>{
      console.log(err);
    })
    this.sendSms(0, this.session.profile.name, this.session.profile.cp_no)
    .then(_=>{
      console.log('biztalk 전송 성공')
    })
    .catch(err=>{
      console.log('biztalk 전송 실패')
      console.error(err);
    });
*/


      this.recv_nm = this.officerNotiQueue[0].user_nm += `${this.officerNotiQueue.length > 1 ? ' 외 ' + (this.officerNotiQueue.length - 1) + '명': ''}`;
      this.bizInfo = cancel_talk(this.recv_nm, this.complaintTextValue, this.reportData.civil_nm, this.reportData.civil_tel_no);

      var promise_arr = [];
      this.officerNotiQueue.forEach(_=>{
        if(_.asgn_user_no)
          promise_arr.push(this.sendSms(0, _.user_nm, _.cp_no, 'talk'));
      })

      if(promise_arr.length > 0) {
        Promise.all(promise_arr)
        .then(() => {
          alert('배정취소되었습니다.');
        })
        .catch((error) => {
          console.log(error);
          alert('전송 중 오류가 발생했습니다.');
        });
      }
  }
  completePushToOfficer(){ //공무원에게 처리 완료됬다고 푸시
    this.recv = this.selectedUserList.filter(element => element.asgn_user_no && (element.asgn_state != '5' )) // user_no 가 있는 경우 &&  배정취소상태가 아닌 경우
    .map(element => {
      return element.asgn_user_no;
    });
    for(let i = 0; i < this.recv.length; i++){
      for(let j = i+1; j<this.recv.length;j++){
        if(this.recv[i] == this.recv[j]){
          this.recv.splice(j,1);
          j--;
        }
      }
    }
    console.log(this.recv)
    this.bizInfo = complete_talk_officer(this.session.profile.name, this.complaintTextValue, this.reportData.civil_nm, this.reportData.civil_tel_no);
    var body = {
      title: '[바로응답]',
      message: this.bizInfo.msg,
      sender: '당직자',
      users: this.recv,
      reserveDate: null,
      method: 3, // 3: push & biztalk
      link: null//`smartpohang://app/page?name=OnestopDetailPage&no=${this.reportData.complaint_no}&user_no=${this.session.profile.user_no}`
    };
    this.push.post(body)
    .subscribe(_=>{
      console.log('푸시 전송 성공')
    },err=>{
      console.error(err);
    });
    this.sendSms(0, this.session.profile.name, this.session.profile.cp_no)
    .then(_=>{
      console.log('biztalk 전송 성공')
    })
    .catch(err=>{
      console.log('biztalk 전송 실패')
      console.error(err);
    });
  }

  async sendOfficer(reserved = 0) {
    console.log('sendOfficer');
    var smsQueue = this.officerNotiQueue.filter(element => { // user_no가 없으면서 번호가 있는 경우
      return ((!element.asgn_user_no || element.user_typ != 3) && element.cp_no);
    });

    this.recv = (this.officerNotiQueue.filter(element => element.asgn_user_no)) // user_no 가 있는 경우
    .map(element => {
      return element.asgn_user_no;
    });
    var body = {
      title: '[바로응답]',
      message: this.popupText,
      sender: '당직자',
      users: this.recv,
      reserveDate: null,
      method: 3, // 3: push & biztalk
      link: null//`smartpohang://app/page?name=OnestopDetailPage&no=${this.reportData.complaint_no}&user_no=${this.session.profile.user_no}`
    };

    if(reserved == 1) { // PUSH 예약일 경우
      // body.reserveDate = new Date();

      // if(body.reserveDate.getHours() >= 18 && body.reserveDate.getHours() <= 23) {
      //   body.reserveDate.setDate(body.reserveDate.getDate() + 1);
      //   body.reserveDate.setUTCHours(9, 0, 0, 0);
      //   body.reserveDate = body.reserveDate.toISOString().slice(0, 19).replace('T', ' ');
      // }
      // else if(body.reserveDate.getHours() >= 0 && body.reserveDate.getHours() <= 9) {
      //   body.reserveDate.setUTCHours(9, 0, 0, 0);
      //   body.reserveDate.toISOString().slice(0, 19).replace('T', ' ');
      //   body.reserveDate = body.reserveDate.toISOString().slice(0, 19).replace('T', ' ');
      // }
      // else {
      //   body.reserveDate = null;
      // }

      await this.reserveDueDate().then(value=> body.reserveDate = value);
    }
    var promise_arr = [];

    if(this.recv.length > 0) {
      promise_arr.push(this.push.post(body).toPromise());
      this.officerNotiQueue.forEach(_=>{
        if(_.asgn_user_no)
          promise_arr.push(this.sendSms(reserved, _.user_nm, _.cp_no, 'talk'));
      })
    }

    // if(smsQueue.length > 0) {
    //   smsQueue.forEach(element => {
    //     promise_arr.push(this.sendSms(reserved, element.user_nm, element.cp_no, 'talk'));
    //   });
    // }
    
    if(promise_arr.length > 0) {
      Promise.all(promise_arr)
      .then(() => {

        alert('전송되었습니다.');
        this.save(false, true);
        this.modalService.dismissAll();
      })
      .catch((error) => {
        console.log(error);
        alert('전송 중 오류가 발생했습니다.');
      });
    }
  }

  isNewUserHere() {
    return this.selectedUserList.findIndex(element => {
      return element.isNew;
    }) == -1 ? false: true;
  }

  getDutyList() {
    var from_dt = new Date();
    var to_dt = new Date();
    this.duty_item.official_id = '';

    if(from_dt.getHours() >= 0 && from_dt.getHours() < 9) {
      from_dt.setDate(from_dt.getDate() - 1);
    }

    this.oneStop.duty.get(this.duty_item.org_no, '', this.duty_item.duty_site, from_dt.getTime()/1000, to_dt.getTime()/1000)
    .then((_:any) => {
      if(_.length == 0){
        alert('이첩할 당직자가 없습니다.');
        this.modalService.dismissAll();
        return;
      }
      this.dutyUserList = _;
      this.dutyUserList = this.dutyUserList.filter((element) => {
        return element.chief_yn == 0;
      });
    });
  }

  changeDuty() {
    if(this.duty_item && !this.duty_item.official_id) {
      alert('당직자를 선택해주세요.');
      return ;
    }

    this.duty_item = _.cloneDeep(this.dutyUserList.find((element) => {
      return element.official_id = this.duty_item.official_id;
    }));

    var body = _.cloneDeep(this.reportData);
    body.loc_txt = this.locationSelectItem.name;
    body.latitude = this.locationSelectItem.position.latitude;
    body.longitude = this.locationSelectItem.position.longitude;
    body.addr = this.locationSelectItem.dongmyun;
    body.complaint_no = '';

    body.org_no = this.duty_item.org_no;
    body.duty_dt = new Date(this.duty_item.duty_dt).getTime()/1000;
    body.duty_typ = this.duty_item.duty_typ;
    body.duty_site = this.duty_item.duty_site;
    body.official_id = this.duty_item.official_id;

    body.reg_user_no = this.duty_item.user_no;

    this.oneStop.post(body)
    .subscribe(
      data => {
        this.modalService.dismissAll();
        alert('이첩되었습니다.');
        this.dutyUserList.forEach((element)=> {
          var body = {
            msg: '[불편신고접수 이첩] 불편신고가 접수되었습니다. 당직시스템을 확인하시기 바랍니다.',
            name: element.user_nm,
            tel: element.cp_no,
            reserveDttm: null,
          };
          this.push.postSms(body)
          .subscribe(_=>{
          },err=>{console.error(err)});
        });
      }
    );
  }

  getCategory() {
    if(this.cateSearchTxt.length > 0) {
      return this.showed_category_list = this.categoryList.filter(_ => _.name.indexOf(this.cateSearchTxt) > -1);
    }

    return this.showed_category_list = this.categoryList;
  }

  getMenual() {
    if(this.searchTxt.length > 0) {
      return this.showed_menual_list = this.menualList.filter(_ => _.subject.indexOf(this.searchTxt) > -1 || _.keyword.indexOf(this.searchTxt) > -1 || _.content_txt.indexOf(this.searchTxt) > -1);
    }
    return this.showed_menual_list = this.menualList;
  }

  openMenual(item) {
    var my_window = window.open("", "_blank", "width=700, height=900, scrollbars=yes");
    my_window.document.write(`<html style="overflow: scroll;">`);
    my_window.document.write(`<title>${item.subject}</title>`);
    my_window.document.write(`<h3>${item.subject}</h3>`);
    my_window.document.write(`<div>키워드: ${item.keyword}</div>`);
    my_window.document.write(`<div>링크: `);
    if(item.link_url) {
      my_window.document.write(`<a href="${item.link_url}" target="_blank">${item.link_url}</a>`);
    }
    my_window.document.write(`</div>`);
    my_window.document.write(`<div>수정일: ${item.upd_dttm}</div>`);
    my_window.document.write(`<div>${item.content_txt}</div>`);
    my_window.document.write(`</html>`);
  }

  openMap(content) {
    this.openModal(content, 'lg');
    this.search_map = this.locationSelectItem.name;
    var element = this;
    setTimeout(() => {
      var container = document.getElementById('map');
      this.map = new daum.maps.Map(container, this.mapOptions);
      this.marker = new daum.maps.Marker({
        position: this.location,
        map: this.map
      });

      if (this.locationSelectItem.position.latitude && this.locationSelectItem.position.longitude) {
        this.location = new daum.maps.LatLng(this.locationSelectItem.position.latitude, this.locationSelectItem.position.longitude);
        this.searchCoordinateToAddress(this.location, element);
      }
      this.map.setCenter(this.location);
      this.map.setLevel(3);
      //this.SearchAddress(this.location, this.marker, this.infoWindow);
      /*
      if(this.search_map && this.search_map.length > 0) {
        this.searchAddressToCoordinate(this.search_map, element);
      }
      */
      daum.maps.event.addListener(this.map, 'click', (e) => {
        this.searchCoordinateToAddress(e.latLng, element);
      });
    }, 0);
  }

 searchAddressToCoordinateInput(){
  var element = this;
  this.searchAddressToCoordinate(this.search_map, element);
 }

  searchCoordinateToAddress(latlng, element) {
    element.searchDetailAddrFromCoords(latlng, function (result, status) {
      if (status === daum.maps.services.Status.OK) {
        var detailAddr = !!result[0].road_address ? '[도로명주소] : ' + result[0].road_address.address_name +'<br/>' : '';
        detailAddr += '[지번 주소] : ' + result[0].address.address_name;


        //!!result[0].road_address ? $("#mapAdr").val(result[0].road_address.address_name) : $("#mapAdr").val(result[0].address.address_name);
        //$("#mapDong").val(result[0].address.region_3depth_name);

        !!result[0].road_address ?  element.locationSelectItem.name = result[0].road_address.address_name : element.locationSelectItem.name = result[0].address.address_name;
        element.locationSelectItem.position.latitude = latlng.getLat();
        element.locationSelectItem.position.longitude = latlng.getLng();
        element.locationSelectItem.dongmyun = result[0].address.region_3depth_name;



        element.searchAddrFromCoords(latlng, function (result, status) {
          if (status === daum.maps.services.Status.OK) {
            for (var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {
                //$("#mapDong").val(result[i].region_3depth_name);
                element.locationSelectItem.dongmyun = result[i].region_3depth_name;
                break;
              }
            }
          }
        })

        var content = '<div style="padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">' +
          detailAddr +
          '</div>';


        element.marker.setPosition(latlng);
        element.marker.setMap(element.map);

        element.infoWindow.setContent(content);
        element.infoWindow.open(element.map, element.marker);
      }
    })
  }

  searchAddressToCoordinate(address, element) {
    //element.geocoder.addressSearch(address, function(result, status) {
    element.ps.keywordSearch(address, function(result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === daum.maps.services.Status.OK) {
        var coords = new daum.maps.LatLng(result[0].y, result[0].x);
        element.map.setCenter(coords);
        element.searchCoordinateToAddress(coords,element);
      }else{
        return alert('주소를 확인해주세요.');
      }
    });
  }


  searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    this.geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  searchCase(keyword = this.selectedCate.keyword_txt, type) {
    window.open(`/onestop/list?search=1&keyword=${keyword ? keyword : type == 0 ? "": (this.reportData.complaints_txt ? this.reportData.complaints_txt : '')}`, "_blank", "width=1450, height=900, scrollbars=yes");
  }

  searchCase2() {
    window.open(`/onestop/list?search=2`, "_blank", "width=1450, height=900, scrollbars=yes");
  }

  printPage() {
    const printArea = document.querySelector('body > .print-area');
    printArea.innerHTML = document.getElementById('printArea').innerHTML;
    window.print();
  }

  reportCancel(){
    let item = {
      isNew: true,
      asgn_state: 5,
      proc_dttm: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      asgn_user_no: this.session.profile.user_no,
      user_nm: this.session.profile.name,
      cp_no: this.session.profile.cp_no,
      user_typ: this.session.profile.user_role,
      edited: false,
      proc_txt: this.popupText
    };
    this.oneStop.assign.post(item ).then(()=>{
      this.popupText = "";
      var body = _.cloneDeep(this.reportData);
      body.proc_state = 4;
      this.oneStop.state(body)
      .subscribe(
        (data:any) => {
          this.is_editable = false;
          // this.oneStop.assign.post();
          this.getReportData();
        }
      );
    },error=>{
      this.popupText = "";
    });


  }

  decritiontext(type)
  {
    if(type == 1)
      this.btn_description =  ONESTOP_DESCR_DIRECT_REPORT;
    else if(type  == 0)
      this.btn_description =  ONESTOP_DESCR_REPORT;
    else if(type == 2)
      this.btn_description = ONESTOP_DESCR_INVITATION_REPORT;
    else
      this.btn_description = "";
  }

  getDueDate(){

    let calcDate =  this.reportData.receipt_dttm ? this.reportData.receipt_dttm : moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.oneStop.getDueDate(this.reportData.due_day, calcDate).subscribe(
      (data: any) => {
        this.reportData.due_date = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  reserveDueDate():Promise<String>
  {
    let calcDate =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    return new Promise<String>(resolve=>{
      this.oneStop.getDueDate(1, calcDate).toPromise().then(data=>resolve(data))
    });
  }
}