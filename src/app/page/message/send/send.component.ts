import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { LoginSession } from '../../../services/login.session';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

import { API } from '../../../../config';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../services/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  id;
  pushMethod = "1";
  selectedEditor = 0;
  recvTab = 0;
  groupSearch = '';

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
  @ViewChild("inputFile") inputFile: ElementRef;

  showTemplatePopup = false;

  templates: any[] = null;
  templateText;


  data;
  org;
  orgs;
  depts: Array<any> = [];

  groups = [];
  members = [];
  recvs = [];

  memSelectAll = false;
  recvSelectAll = false;

  messageEditor: string;
  smsEditor: string;

  today = new Date();

  showAlert = false;
  saveResult = false;
  saveString: string;
  closeResult: string;

  constructor(private ref: ChangeDetectorRef, private http: HttpClient, private resource: ResourceService, public session: LoginSession, private route: ActivatedRoute, public util: UtilService, private modalService: NgbModal) { }

  ngOnInit() {
    this.resource.getOrg(4)
      .then(_ => this.orgs = _);
    this.org = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
    this.setOrg(this.org);
    this.push.sender = this.session.profile.name;
    this.http.get(`${API}/push/group`)
      .subscribe((data: any) => {
        this.groups = data;
      });
  }

  OnEditorLoaded() {
    this.route.queryParams.subscribe(
      params => {
        if (params['id']) {
          this.id = params.id;
          this.http.get(`${API}/push/${this.id}`)

            .subscribe((data: any) => {
              this.push.title = data.msg.title;
              this.messageEditor = data.msg.text;
              this.smsEditor = data.msg.smsText;
              this.smsEditor = data.msg.smsText;
              this.pushMethod = data.msg.pushMethod;
              this.recvs = data.recvs;
            })
        }

      }
    )
  }

  setOrg(org = 1) {
    this.resource.getDept(org, '')
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

  pushMethodChanged() {
    if (this.pushMethod == '1')
      this.selectedEditor = 0;
  }

  selectTemplate(text) {
    if (this.selectedEditor == 0) {
      this.messageEditor = text;
    } else {
      this.push.textSMS = text;
    }

    this.showTemplatePopup = false;
  }

  checkFileType($event) {
    let files: FileList = $event.target.files;
    if (files.length > 0) {
      let file: File = files[0];
      if (!file.type.includes('image/')) {
        alert('이미지만 업로드 가능합니다.');
        $event.target.value = '';
      }
    }
  }

  send() {
    if (!this.push.title) {
      alert('제목을 입력하세요.');
      return;
    }

    if (!this.push.sender) {
      alert('발신명을 입력하세요.');
      return;
    }

    let message = this.messageEditor;
    if (message == '<p></p>' || !message) {
      alert('내용을 입력하세요.');
      return;
    }

    if (this.pushMethod == '2' && !this.smsEditor) {
      alert('SMS로 보낼 내용을 입력하세요.');
      return;
    }

    let groups = this.groups.filter(_ => _.selected);
    let depts = this.getSelection(this.depts);
    if (groups.length == 0 && depts.length == 0 && this.recvs.length == 0) {
      alert('수신자를 선택하세요.');
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
    formData.append('method', this.pushMethod);
    if (this.recvTab == 0) {
      formData.append('_depts', `[${depts.map(_ => _.id).toString()}]`);
    } else {
      formData.append('_groups', `[${groups.map(_ => _.id).toString()}]`);
    }
    formData.append('_users', `[${this.recvs.map(_ => _.id).toString()}]`);

    if (this.push.isReserve && this.push.reserveDate) {
      formData.append('reserveDate', `${this.util.myDateToYMD(this.push.reserveDate)} ${this.push.reserveTime}`);
    }
    if (this.pushMethod == '2') {
      formData.append('sms', this.smsEditor);
    }

    if (this.push.appSms) {
      formData.append('appSms', '1');
    }
    if (this.push.appKakao) {
      formData.append('appKakao', '1');
    }

    this.http.post(`${API}/push`, formData, {responseType:'text'})
      .subscribe(_ => {
        alert('전송되었습니다.');
        this.inputFile.nativeElement.value = '';
      }, err => {
        alert('전송실패.');
      });
  }

  clear() {
    this.push = {
      title: '',
      sender: '',
      text: '',
      textSMS: '',
      isReserve: false,
      reserveDate: '',
      reserveTime: ''
    };
    this.messageEditor = '';
    this.smsEditor = '';
    this.inputFile.nativeElement.value = '';
  }

  clearRecv() {
    this.recvs = [];
  }

  showTemplate(content) {
    this.templateText = '';
    if (!this.templates)
      this.http.get(`${API}/push/template`)

        .subscribe((res: any) => {
          this.templates = res;
        });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  saveTemplate(text = null) {
    if (!this.templateText && !text) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (!this.templates) this.templates = [];
    this.http.post(`${API}/push/template`, {
      text: this.templateText ? this.templateText : text
    },
     {responseType:'text'}
     ).subscribe((_: any) => {
      this.templates.push({
        id: +_.text(),
        text: (this.templateText ? this.templateText : text),
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
    this.http.delete(`${API}/push/template/${id}`)
      .subscribe(() => {
        alert('삭제되었습니다.');
        this.templates.splice(this.templates.findIndex(_ => _.id == id), 1);
      });
  }

  showGroupMember(id) {
    this.http.get(`${API}/push/group/${id}`)

      .subscribe((res: any) => {
        this.members = res;
      });
  }

  selecteDept(dept) {
    this.resource.getDeptUser(dept.id, dept.orgNo, true)
      .then((_: any) => this.members = _)
      .catch(err => console.error(err));
  }

  selectAll(list, b) {
    list.forEach(element => {
      element.selected = b;
    });
  }

  add() {
    this.recvs.push(..._.cloneDeep(this.members.filter(_ => _.selected)));
    this.recvs = _.uniqBy(this.recvs, 'id');
  }

  remove() {
    _.remove(this.recvs, _ => _.selected);
  }

  alertControl() {
    this.showAlert = true;
    this.ref.detectChanges();
    setTimeout(() => { this.showAlert = false; }, 1500);
  }

  getSelection(array) {
    let tmp = [];
    for (let level1 of array) {
      if (level1.selected) {
        tmp.push(level1);
        continue;
      }
      for (let level2 of level1.sub) {
        if (level2.selected) {
          tmp.push(level2);
          continue;
        }
        for (let level3 of level2.sub) {
          if (level3.selected) {
            tmp.push(level3);
          }
        }
      }
    }

    return tmp;
  }

}
