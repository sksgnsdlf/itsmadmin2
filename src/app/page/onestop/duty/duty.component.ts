import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { OneStopProvider } from '../../../providers/onestop';
import * as _ from 'lodash';
import * as FileSaver from 'file-saver';
import { LoginSession } from '../../../services/login.session';
import { UtilService } from '../../../services/util';
import { MaxPageSize, TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../config';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.scss']
})
export class DutyComponent implements OnInit {
  orgList: Array<any> = [];
  org_no: string = "1";
  locationList: Array<any> = [];
  duty_site: string = "";
  typList: Array<any> = [];
  duty_typ: string = "";

  dutyList: Array<any> = [];

  from_dt: any = new Date();
  to_dt: any = new Date();

  selectedRow: number = -1;

  // 당직등록 데이터
  dutyData: any = {
    duty_dt: '',
    duty_typ: '',
    duty_site: '',
    duty_txt: '',
    chief_yn: 0,
    org_no: ''
  };
  prevDutyData: any = {};

  complaint_data: Array<any> = [];
  duty_info: any = {};

  total: number = 0;
  totalPage: number = 0;
  page = 1;
  pageSize = 10;
  maxPage: number = MaxPageSize;
  collectionSize: number = 10;

  constructor(private resourceService: ResourceService, private oneStop: OneStopProvider, public loginSession: LoginSession, public util: UtilService, private modalService: NgbModal) { }

  ngOnInit() {
    this.from_dt.setDate(this.from_dt.getDate() - 1);
    this.from_dt = this.from_dt.toISOString().slice(0, 10);
    this.to_dt = this.to_dt.toISOString().slice(0, 10);

    this.getOrg();
    this.getLocation();
    this.getTyp();
    this.getDutyList();
    this.org_no = this.loginSession.checkAdminAndGetOrg() == -1 ? 1 : this.loginSession.checkAdminAndGetOrg();
  }


  textareaInput(ev) {
    try {
      this.dutyData.duty_txt = ev.target.value;
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }

  getOrg() {
    this.resourceService.getOrg(4)
      .then((_: any) => this.orgList = _);
  }

  getLocation() {
    this.resourceService.getCode('590')
      .then((_: any) => this.locationList = _);
  }

  getTyp() {
    this.resourceService.getCode('595')
      .then((_: any) => this.typList = _);
  }

  getDutyList() {
    this.oneStop.duty.get(this.org_no, this.duty_typ, this.duty_site, moment(this.from_dt).format('X'), moment(this.to_dt).format('X'))
      .then((_: any) => {
        this.dutyList = _;
        this.selectedRow = -1;
        this.dutyList.forEach(element => {
          if (element.chief_yn == 1)
            element.chief_yn = true;
          else
            element.chief_yn = false;
          element.reg_user_no = element.user_no;
        });
      });
  }

  openAsgnPopup(item = null, content) {
    this.dutyData = {};

    if (!item) {
      this.dutyData.duty_dt = new Date();
      this.dutyData.user_nm = localStorage.getItem('user_name');
      this.dutyData.dept_nm = localStorage.getItem('user_office_nm');
      this.dutyData.official_id = localStorage.getItem('user_official_id');
      this.dutyData.org_no = localStorage.getItem('user_org_no');
      this.dutyData.chief_yn = false;
      this.dutyData.duty_typ = '';
      this.dutyData.duty_site = '';
      this.dutyData.duty_txt = '';
      this.dutyData.reg_dttm = null;
    }
    else {
      this.dutyData = _.cloneDeep(item);
      this.prevDutyData = _.cloneDeep(item);
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  saveAsng() {
    var body: any = _.cloneDeep(this.dutyData);

    if (body.chief_yn == true || body.chief_yn == 1)
      body.chief_yn = '1';
    else
      body.chief_yn = '0';

    if (!body.duty_dt || !body.duty_typ || !body.duty_site) {
      alert('당직기간, 당직장소, 당직구분은 필수입니다');
      return;
    }
    if (body.reg_dttm) {
      body.duty_dt = body.duty_dt.toString().substr(0, 11);
      body.duty_dt = new Date(body.duty_dt);
    }
    body.duty_dt = new Date(body.duty_dt).getTime() / 1000;

    // 자기꺼를 새로 등록하려 할 때만 체크
    if (body.official_id == localStorage.getItem('user_official_id') && !body.reg_dttm) {
      this.oneStop.duty.dupCheck(body.org_no, body.duty_dt, body.duty_typ)
        .subscribe(
          (data: any) => {

            this.oneStop.duty.post(body)
              .subscribe(
                (data: any) => {
                  alert('저장되었습니다.');
                  this.getDutyList();
                  this.loginSession.getAuthLinks();
                  this.modalService.dismissAll();
                },
                error => {
                  alert('저장실패');
                }
              );
          },
          error => {
            if (error.status == 300) {
              alert(error.code + ': ' + error.msg);
              return;
            }
          }
        );
    }
    else {
      this.oneStop.duty.post(body)
        .subscribe(
          data => {
            alert('저장되었습니다.');
            this.getDutyList();
            this.modalService.dismissAll();
          },
          error => {
            alert('저장실패');
          }
        );
    }
  }

  deleteDuty() {
    var body = {
      org_no: this.dutyData.org_no,
      duty_typ: this.dutyData.duty_typ,
      duty_dt: '' + new Date(this.dutyData.duty_dt),
      official_id: this.dutyData.official_id
    }
    body.duty_dt = body.duty_dt.toString().substr(0, 10);
    body.duty_dt = '' + new Date(body.duty_dt).getTime() / 1000;

    var prevBody = _.cloneDeep(this.prevDutyData);
    prevBody.duty_dt = prevBody.duty_dt.toString().substr(0, 10);
    prevBody.duty_dt = '' + new Date(prevBody.duty_dt).getTime() / 1000;

    if (!(body.org_no == prevBody.org_no && body.duty_typ == prevBody.duty_typ && body.duty_dt == prevBody.duty_dt && body.official_id == prevBody.official_id)) {
      body = _.cloneDeep(prevBody);
    }

    this.oneStop.duty.delete(body.org_no, body.duty_typ, body.duty_dt, body.official_id)
      .subscribe(
        data => {
          alert('삭제되었습니다');
          this.getDutyList();
          this.modalService.dismissAll();
          this.loginSession.getAuthLinks();
          return;
        },
        error => {
          alert('삭제실패');
          return;
        }
      );
  }

  excel() {
    if (this.selectedRow == -1) {
      alert('저장할 당직정보를 선택해주세요.');
      return;
    }
    var params = this.dutyList[this.selectedRow];
    var datetime = moment(new Date()).format('YYMMDD');
    this.oneStop.report.excel(this.dutyList[this.selectedRow].org_no, this.dutyList[this.selectedRow].duty_site, this.dutyList[this.selectedRow].duty_typ, this.dutyList[this.selectedRow].duty_dt)
      .subscribe((_) => { // download file
        var blob = new Blob([_], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var filename = `신고일지(${params.user_nm}${datetime}).xlsx`;
        FileSaver.saveAs(blob, filename);
      });
  }

  print() {
    // var params = {
    //   org_no: 1,
    //   duty_site: 10,
    //   duty_typ: 1,
    //   duty_dt: '2018-01-04 00:00:00'
    // };

    if (this.selectedRow == -1) {
      alert('저장할 당직정보를 선택해주세요.');
      return;
    }
    var params = this.dutyList[this.selectedRow];

    this.oneStop.report.print(params.org_no, params.duty_site, params.duty_typ, params.duty_dt)
      .subscribe(
        (data: any) => {
          this.duty_info = data.duty_info[0];
          this.complaint_data = data.complaint_data;
          this.complaint_data.forEach(element => {
            if (element.proc_result) {
              element.proc_result = element.proc_result.replace(new RegExp("\n", 'g'), "<br/>");
            }
          });
          setTimeout(() => {
            const html = document.querySelector('html');
            const printContents = document.querySelector('.print-area').innerHTML;
            const printDiv = document.createElement("DIV");
            printDiv.className = "print-area";

            html.appendChild(printDiv);
            printDiv.innerHTML = printContents;
            document.body.style.display = 'none';
            window.print();
            document.body.style.display = 'block';
            printDiv.style.display = 'none';
          }, 0);
        }
      );
  }

  datecal(date)
  {
    return  moment(date).format('YYYY-MM-DD');
  }
}
