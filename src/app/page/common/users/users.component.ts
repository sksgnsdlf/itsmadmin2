import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { MaxPageSize } from '../../../../config';
import { LoginSession } from '../../../services/login.session';
import { CKEditorComponent } from '../../../itsm-ui/public_api';
import * as moment from 'moment';
import { UtilService } from '../../../services/util';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonProvider } from '../../../providers/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;

  roles = [];

  role = "전체";
  startDate;
  endDate;
  search;
  org = "";
  
  list = [];

  orgList: Array<any> = [];

  push: any = {
    title: '',
    sender: '',
    text: '',
    isReserve: false,
    reserveDate: '',
    reserveTime: '',
    topic: ''
  };

  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild('ck') ck: CKEditorComponent;
  pushMethod: string = "1";
  messageEditor: string;


  constructor(private resource: ResourceService, private resourceService: ResourceService, public session: LoginSession, 
    public util: UtilService, private modalService:NgbModal, private common:CommonProvider, public router: Router) { }

  ngOnInit() {
    this.resource.getCode('100')
      .then((_:any) => this.roles = _);
    this.getOrg();
  }
  OnEditorLoaded(){

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
  filter() {
    this.paging(1);
  }

  getOrg() {
    this.resourceService.getOrg()
      .then((_:any) => {
        this.orgList = _;
        this.org = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
        this.filter();
      })
      .catch(
      err => {
        console.error(err);
      }
    );
  }

  paging(page) {
    let pageIndex = page - 1;
    let queryString = `?offset=${pageIndex * this.pageSize}&limit=${this.pageSize}`;
    if (this.role && this.role != "전체") queryString += `&role=${this.role}`;
    if (this.startDate) queryString += `&startDate=${this.util.myDateToUnix(this.startDate)}`;
    if (this.endDate) queryString += `&endDate=${this.util.myDateToUnix(this.endDate)}`;
    if (this.search) queryString += `&name=${this.search}`;
    if (this.org) queryString += `&org=${this.org}`;
    this.common.user.get(queryString)
    .subscribe((_:any) => {
      this.total = _.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;

      this.list = _.list;
    });
  }

  pushPopup(content) {
    this.openModal(content, 'lg');
    this.push.sender = this.session.profile.name;
    this.push.topic = this.session.profile.org_no;
  }

  send() {
    if (1) {
      alert('준비중인 기능입니다.');
      this.modalService.dismissAll();
      return;
    }
    if (!this.push.title) {
      alert('제목을 입력하세요.');
      return;
    }

    if (!this.push.sender) {
      alert('발신명을 입력하세요.');
      return;
    }

    let message = this.messageEditor;
    if (message == '<p></p>' || !message ) {
      alert('내용을 입력하세요.');
      return;
    }

    let files: FileList = this.inputFile.nativeElement.files;
    let formData: FormData = new FormData();

    if (files.length > 0) {
      let file: File = files[0];
      formData.append('file', file, file.name);
    }

    formData.append('title', this.push.title);
    formData.append('message', message);
    formData.append('sender', this.push.sender);
    formData.append('topic', this.push.topic);

    if (this.push.isReserve && this.push.reserveDate) {
      formData.append('reserveDate', `${moment(this.push.reserveDate).format('YYYY-MM-DD')} ${this.push.reserveTime}`);
    }
  }

  clear() {
    this.push = {
      title: '',
      sender: '',
      text: '',
      isReserve: false,
    };
    this.messageEditor = '';
    if(this.inputFile)
      this.inputFile.nativeElement.value = '';
    this.modalService.dismissAll();
  }

  openDetail(id){
    //this.router.navigate(['common/users/detail/'+id], { queryParams: { org: this.org, role: this.role, startDate: this.startDate, endDate: this.endDate, search:this.search } });
    this.router.navigate(['common/users/detail/'+id]);
  }

}

