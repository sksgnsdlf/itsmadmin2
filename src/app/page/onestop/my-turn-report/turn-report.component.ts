import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Renderer } from '@angular/core';
import { OneStopProvider } from '../../../providers/onestop';
import { ResourceService } from '../../../services/resource.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { UserProvider } from '../../../providers/user';
import { API } from '../../../../config';
import { LoginSession } from '../../../services/login.session';
import { PushProvider } from '../../../providers/push';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FIControlOptions, FormInflaterComponent } from '../../../itsm-ui/public_api';
import { asign_talk, complete_talk, send_state_to_citizen, complete_talk_officer, cancel_talk, asign_talk_citizen, accept_talk_citizen } from '../../../../biztalk_template';
import { FormData } from 'formdata-polyfill';
import * as moment from 'moment';

declare let naver: any;

@Component({
  selector: 'app-turn-report',
  templateUrl: './turn-report.component.html',
  styleUrls: ['./turn-report.component.scss']
})
export class MyTurnReportComponent implements OnInit {
  @ViewChild("inputFile") inputFile: ElementRef;
  form: FormInflaterComponent;

  reportData: any = {};

  categoryList: Array<any> = [];
  cateSearchTxt: string = "";
  selectedCate: any = {};
  procList: Array<any> = [];
  asgnStateList: Array<any> = [];
  replyMethod: Array<any> = [];
  dueDayMethod: Array<any> = [];
  selectedImg: string = "";
  q;
  assign_popup_type: number = 0; // 0: 담당자 배정, 1: 직원 조회

  orgList: Array<any> = [];
  selectedOrgId: number = 1;
  selectedPopupTab: number = 0;
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

  menualList: Array<any> = [];
  searchTxt: string = "";

  recent_asgn_state: any = "1";
  is_mine: boolean = false;
  is_tossed: boolean = false;
  selected_hst_img: string = "";
  img_idx: number = -1;
  will_saved_user_list: Array<any> = [];
  showed_menual_list: Array<any> = [];

  //조직도 관련
  orgs: any = [];
  org:number = 1;
  depts: Array<any> = [];
  deptMasterUser:any;
  constructor(private oneStop: OneStopProvider, private resourceService: ResourceService, private route: ActivatedRoute, private router: Router, private userProvider: UserProvider, private cdRef: ChangeDetectorRef, private session: LoginSession, public renderer: Renderer, public ref: ChangeDetectorRef, private push: PushProvider, private modalService: NgbModal) { }

  bizInfo : any = {msg:null,code:null};//비즈톡 정보
  bizInfoCitizen : any = {msg:null,code:null};//비즈톡 정보

  procAddPopModalConfig:FIControlOptions[] =[];
  procAddPopModalBtn = {};
  body: any = {};

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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // this.router.routeReuseStrategy.shouldReuseRoute = function () {
      //   return false;
      // };
      this.router.navigated = false;
      window.scrollTo(0, 0);
      console.log(params['no'])
      if (params['no'] != 0) {
        this.reportData.complaint_no = +params['no']; // (+) converts string 'no' to a number
        this.getReportData();
      }

      this.setModalFormConfig();
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

    this.getReplyMethod();
    this.getDueDayMethod();
    this.getProc();
    this.getOrg();
    this.getAsgnState();
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
    console.log(content);
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

  refresh() {
    this.router.navigate(['/onestop/myreport/' + this.reportData.complaint_no]);
  }

  formref(form)
  {
    this.form = form;
    this.form.reset();
  }

  getReportData() {
    this.oneStop.assign.get(this.reportData.complaint_no)
    .subscribe(
      (data:any) => {
        this.selectedUserList = data;
        this.findRecent();
        if(!this.is_mine)
          this.is_tossed = true;
      }
    );

    this.oneStop.report.getDetail(this.reportData.complaint_no)
    .subscribe(
      (data:any) => {
        if (data.length < 1) {
          this.router.navigate(['./onestop/list']);
        }
        this.reportData = data[0];
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
  getDeptMasterUser(){
    this.userProvider.getAll(2, this.selectedOrgId, this.q, null, this.partner_nm)
    .subscribe(
      (data:any) => {
        this.deptMasterUser = data;
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

  openAsgnPopup(content) {
    this.resourceService.getOrg(4)
      .then((_:any) => this.orgs = _);
    this.org = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
    this.setOrg(this.org);
    this.openModal(content, null, 'customModal');
    this.changePopupTab(0);

    if(this.reportData.cls_no)
      this.getCateUser();
    this.getOrgUser(1);
    this.getDeptMasterUser();
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

  selectTempUsers(item) { // 이첩
    if(item.user_no == this.session.profile.user_no) {
      alert('자기자신에게 이첩할 수 없습니다.');
    }
    else {
      item.asgn_state = '3';
      item.proc_txt = this.reportData.complaint_no + '번 민원이 ' + item.user_nm + "님에게 이첩되었습니다.";
      item.origin_proc_hst_no = this.getLastestHstNo();
      this.addRow(item);
      this.is_mine = false;
      this.modalService.dismissAll();
    }
  }

  getLastestHstNo(){
    for (let item of this.selectedUserList) {
      if(item.asgn_user_no = localStorage.getItem('user_no')){
        return item.proc_hst_no;
      }
    }
    return 0;
  }


  newRow(status = 0) { // 0: 처리내역 추가, 1: 접수
    var item: any = {
      isNew: true,
      asgn_state: '2',
      proc_dttm: new Date(),
      asgn_user_no: localStorage.getItem('user_no'),
      user_nm: localStorage.getItem('user_name'),
      dept_nm: localStorage.getItem('user_office_nm'),
      cp_no: localStorage.getItem('user_cp_no'),
      user_typ: '3'
    };

    if(status == 1) {
      this.recent_asgn_state = '2';
      item.proc_txt = "담당자가 배정되었습니다.";
      item.isAccept = true;
    }

    this.selectedUserList.unshift(item);

    if(status == 1) {
      this.save();
    }
  }

  procAddPop(procAddPopup){

    this.modalService.open(procAddPopup, { ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  procAddsave(index, status = 0) {
    if(index == this.will_saved_user_list.length) {
      if(status == 0) {
        this.getReportData();
        alert('저장되었습니다');
      }
      return;
    }
    else {
      this.will_saved_user_list[index].complaint_no = this.reportData.complaint_no;
      if (this.will_saved_user_list[index].isNew) {
        if(!this.will_saved_user_list[index].proc_txt || this.will_saved_user_list[index].proc_txt.length == 0) {
          alert('담당자의 처리내용이 비어있습니다.');
          return this.saveRows(this.will_saved_user_list.length, -1);
        }
        if(this.will_saved_user_list[index].image_file) {
          this.upLoadImage(this.will_saved_user_list[index].image_file)
          .then(
            (data:any) => {
              this.will_saved_user_list[index].image_url = `${API}${data[0].path}`;
              console.log('이미지 업로드 성공');
              this.oneStop.assign.post(this.will_saved_user_list[index])
              .then(_ => {this.sendOfficer(this.will_saved_user_list[index]); return this.saveRows(++index, 0);})
              .catch(_ => {
                alert('담당자 배정 중 오류가 발생했습니다');
                return this.saveRows(this.will_saved_user_list.length, -1);
              });
            }
          );
        }
        else {
          this.oneStop.assign.post(this.will_saved_user_list[index])
          .then(_ => {this.sendOfficer(this.will_saved_user_list[index]); return this.saveRows(++index, 0);})
          .catch(_ => {
            alert('담당자 배정 중 오류가 발생했습니다');
            return this.saveRows(this.will_saved_user_list.length, -1);
          });
        }
      }
      else
        this.saveRows(++index, 0);
    }
  }

  addRow(user) {
    var item = {
      isNew: true,
      asgn_state: user.asgn_state,
      proc_dttm: new Date(),
      asgn_user_no: user.user_no,
      user_nm: user.user_nm,
      dept_nm: user.dept_nm,
      cp_no: user.cp_no,
      edited: true,
      user_typ: user.user_typ,
      proc_txt: user.proc_txt,
      origin_proc_hst_no: user.origin_proc_hst_no
    };

    this.selectedUserList.unshift(item);
  }

  deleteRow(i) {
    this.selectedUserList.splice(i, 1);
    this.findRecent();
  }

  findRecent() {
    var recent_mine_idx = this.selectedUserList.findIndex((element) => {
      return element.asgn_user_no == this.session.profile.user_no;
    });

    var recent_pass_idx = this.selectedUserList.findIndex((element) => {
      return (element.reg_user_no == this.session.profile.user_no) && element.asgn_state == '3';
    });

    this.recent_asgn_state = this.selectedUserList[recent_mine_idx].asgn_state;
    this.is_mine = recent_pass_idx == -1 || (recent_mine_idx < recent_pass_idx) ? true : false;
  }

  //민원완료처리
  complete(){
    var item: any = {
      isNew: true,
      asgn_state: '4',
      proc_dttm: new Date(),
      asgn_user_no: localStorage.getItem('user_no'),
      user_nm: localStorage.getItem('user_name'),
      dept_nm: localStorage.getItem('user_office_nm'),
      cp_no: localStorage.getItem('user_cp_no'),
      user_typ: '3',
      msg_send : this.send_mode,
      proc_txt : this.popupTextValue,
      reserveDatetime: null
    };
    this.reserveDueDate().toPromise().then(data=>
      {
        item.reserveDatetime = data;
        console.log("data=>"+JSON.stringify(item));
        this.selectedUserList.unshift(item);
        this.save();
      });

    if(this.modalService.hasOpenModals  )
      this.modalService.dismissAll();


    // this.oneStop.complete({
    //   complaint_no : this.reportData.complaint_no,
    //   proc_state:'5'
    // })
    // .subscribe(_=>{
    //   this.getReportData();
    //   alert('처리 완료');
    //   console.log('민원완료처리 성공');
    // },err=>{
    //   alert('처리 완료 실패');
    //   console.log('민원완료처리 실패');
    // })

  }

  save() {
    var check_officer_cnt = _.cloneDeep(this.selectedUserList.filter((element) => {
      return element.isNew == true && !element.deleted;
    }));

    if(check_officer_cnt.length == 0) { // 담당자 배정 눌렀을 때, 체크
      alert('담당자를 추가 후 배정하시기 바랍니다.');
      return ;
    }

    this.will_saved_user_list = _.cloneDeep(this.selectedUserList);
    this.will_saved_user_list.reverse();
    this.saveRows(0, 0);
  }

  saveRows(index, status = 0) {
    if(index == this.will_saved_user_list.length) {
      if(status == 0) {
        this.getReportData();
        alert('저장되었습니다');
      }
      return;
    }
    else {
      this.will_saved_user_list[index].complaint_no = this.reportData.complaint_no;
      if (this.will_saved_user_list[index].isNew) {
        if(!this.will_saved_user_list[index].proc_txt || this.will_saved_user_list[index].proc_txt.length == 0) {
          alert('담당자의 처리내용이 비어있습니다.');
          return this.saveRows(this.will_saved_user_list.length, -1);
        }
        if(this.will_saved_user_list[index].image_file) {
          this.upLoadImage(this.will_saved_user_list[index].image_file)
          .then(
            (data:any) => {
              this.will_saved_user_list[index].image_url = `${API}${data[0].path}`;
              console.log('이미지 업로드 성공');
              this.oneStop.assign.post(this.will_saved_user_list[index])
              .then(_ => {this.sendOfficer(this.will_saved_user_list[index]); return this.saveRows(++index, 0);})
              .catch(_ => {
                alert('담당자 배정 중 오류가 발생했습니다');
                return this.saveRows(this.will_saved_user_list.length, -1);
              });
            }
          );
        }
        else {
          this.oneStop.assign.post(this.will_saved_user_list[index])
          .then(_ => {this.sendOfficer(this.will_saved_user_list[index]); return this.saveRows(++index, 0);})
          .catch(_ => {
            alert('담당자 배정 중 오류가 발생했습니다');
            return this.saveRows(this.will_saved_user_list.length, -1);
          });
        }
      }
      else
        this.saveRows(++index, 0);
    }

    if(this.modalService.hasOpenModals  && this.send_check !='1' )
    this.modalService.dismissAll();
  }

  getCategory() {
    if(this.cateSearchTxt.length > 0) {
      return this.categoryList.filter(_ => _.name.indexOf(this.cateSearchTxt) > -1);
    }

    return this.categoryList;
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

  openImage(idx) {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    this.img_idx = idx;
    if (msie > 0 || trident > 0) {
      this.inputFile.nativeElement.click();
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(this.inputFile.nativeElement, 'dispatchEvent', [event]);
    }
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
          this.selectedUserList[this.img_idx].image_file = file;
          this.selectedUserList[this.img_idx].image = fr.result;
          $event.target.value = '';
          this.ref.detectChanges();
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }

  upLoadImage(file) {

    return this.oneStop.uploadImg(file);
  }

  deleteImage(item) {
    delete item.image;
    delete item.image_file;
  }

  sendCitizen(item) {
    if(!item.isAccept)
      return ;

    this.bizInfoCitizen = asign_talk_citizen(this.reportData.civil_nm);
    if(this.reportData.return_mthd == 1){

      this.sendSmsToCitizen(0)
      .then(_=>{
        console.log('biztalk 전송 성공')
      })
      .catch(err=>{
        console.log('biztalk 전송 실패')
        console.error(err);
      });
    }else if(this.reportData.return_mthd == 2){
      var body = {
        title: '[포항시청-바로응답]',
        message: this.bizInfoCitizen.msg,
        sender: item.user_nm,
        users: [this.reportData.civil_user_no],
        reserveDate: null,
        method: 3,
        link: ``
      };

      this.push.post(body)
      .subscribe(
        data => {
          console.log('스마트포항 담당자 접수 PUSH OK');
        },
        error => {
          alert('스마트포항 담당자 접수 PUSH 실패');
        }
      );
    }else{

    }
  }

  sendSmsToCitizen(reserved = 0, name = '', cp = this.reportData.civil_tel_no, method='biztalk') {
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
      this.reserveDueDate().toPromise().then(data=>body.reserveDttm = data);
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

  sendSmsToOfficer(reserved = 0, name = '', cp = '', method='biztalk') {
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
      this.reserveDueDate().toPromise().then(data=>body.reserveDttm = data);
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

  sendOfficer(item) {
    if(item.asgn_state != '3')
     return ;

    var body = {
      title: '[시민의소리]',
      message: item.proc_txt,
      sender: '당직자',
      users: [item.asgn_user_no],
      reserveDate: null,
      method: 3,
      link: `smartpohang://app/page?name=OnestopDetailPage&no=${this.reportData.complaint_no}&user_no=${this.session.profile.user_no}`
    };

    this.push.post(body)
    .subscribe(
      data => {
        console.log('이첩 PUSH OK');
      },
      error => {
        alert('이첩알림 메시지 전송 실패');
      }
    );


    this.bizInfoCitizen = asign_talk(item.user_nm,this.reportData.complaints_txt,this.reportData.civil_nm,item.cp_no);
    this.sendSmsToOfficer(0, item.user_nm, item.cp_no)
      .then(_=>{
        console.log('biztalk 전송 성공')
      })
      .catch(err=>{
        console.log('biztalk 전송 실패')
        console.error(err);
      });
  }

  setModalFormConfig(){
      this.procAddPopModalConfig = [
      {
        field: 'proc_txt',
        type: 'text',
        title: '처리내역',
        required: true
      },
      {
        field: 'msg_send',
        type: 'radio',
        title: '* 공무원 알림톡 전송',
        helpText: '알림톡을 전송합니다.',
        select: {
          options: [ { text: '미전송', value: '0' }, { text: '전송', value: '1' }]
        },
        defaultValue: '0'
      },
      {
        field: 'image_url',
        type: 'image',
        fileField: 'file',
        title: '첨부이미지',
      }
    ];
    this.procAddPopModalBtn = { submit:'추가' };
  }

  procAddSubmit(){
    const formdata:FormData = this.form.getMultipartFormData();
    console.log(JSON.stringify(formdata));
    let formImageData = formdata.get('file');
    if(formImageData){
      this.upLoadImage(this.form.getMultipartFormData())
          .then(
            (data:any) => {
              let imageuRL = `${API}`+JSON.parse(data)[0].path;
              console.log('이미지 업로드 성공');
              this.procAdd(imageuRL);
            }
          ),(err)=>{
           console.log(JSON.stringify(err) );
          };
    }else{
      this.procAdd(null);
    }
  }

  procAdd(imageuRL){
    var item: any = {
      complaint_no : this.reportData.complaint_no,
      isNew: true,
      asgn_state: '2',
      proc_dttm: new Date(),
      asgn_user_no: localStorage.getItem('user_no'),
      user_nm: localStorage.getItem('user_name'),
      dept_nm: localStorage.getItem('user_office_nm'),
      cp_no: localStorage.getItem('user_cp_no'),
      user_typ: '3',
      proc_txt: this.form.value['proc_txt'] ? this.form.value['proc_txt'] : '',
      image_url : imageuRL,
      msg_send : this.form.value['msg_send'] ? this.form.value['msg_send'] : '0',
      reserveDatetime: ""
    };

    this.reserveDueDate().toPromise().then(data=>
      {
        item.reserveDatetime = data;
    	this.oneStop.assign.post(item).then(_=>{
      	alert('처리내역 추가');
      	this.getReportData();
      	this.form.reset();
      	this.modalService.dismissAll();

   	 }).catch(err=>{
      		this.form.reset();
    	});
      });
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

    if(recv_type == 2) { // 그냥 SMS
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
      if( this.recv_type != 3)
        office_tel =  this.session.profile.office_tel_no ? this.session.profile.office_tel_no:"054-270-8282";

      this.bizInfo = send_state_to_citizen(this.recv_nm, this.talk_var_state=='1'?'처리중':(this.talk_var_state=='2'?'처리완료':'처리불가'), this.popupTextValue, this.session.profile.name,office_tel);
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
      this.sendOfficer(val);
    }
  }

  sendSms(reserved = 0, name = '', cp = this.recv_tel, method='biztalk') {
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
      this.reserveDueDate().toPromise().then(data=>body.reserveDttm = data);
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

  reserveDueDate()
  {
    let calcDate =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    return this.oneStop.getDueDate(1, calcDate);
  }
}