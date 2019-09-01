import { Component, OnInit, ViewChild } from '@angular/core';
import { DateFormatPipe } from 'angular2-moment';

import { OneStopProvider } from '../../../providers/onestop';
import { ResourceService } from '../../../services/resource.service';
import { UserProvider } from '../../../providers/user';
import { FIControlOptions, FormInflaterComponent } from '../../../itsm-ui/public_api';
import { LoginSession } from '../../../services/login.session';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild('form') form: FormInflaterComponent;

  data = [];
  orgs = [];
  selectedDeptList = [];

  loaded = false;
  formConfig: FIControlOptions[] = [
    {
      field: 'id',
      type: 'hidden'
    },
    {
      field: 'up_cls_no',
      type: 'select',
      title: '분류',
      select: { },
      required: true
    },
    {
      field: 'use_yn',
      title: '앱 표시 여부',
      type: 'radio',
      select: {
        options: [
          { text: '예', value: '1' }, { text: '아니오', value: '0' }
        ]
      },
      defaultValue: '0'
    },
    {
      field: 'name',
      title: '항목명',
      required: true
    },
    {
      field: 'keyword_txt',
      title: '키워드'
    },
    {
      type: 'group',
      field: [
        {
          field: 'url_android',
          title: '구글마켓',
          placeholder: 'https://'
        },
        {
          field: 'url_ios',
          title: '앱스토어',
          placeholder: 'https://'
        }
      ]
    },
    {
      type: 'group',
      field: [
        {
          field: 'web_url',
          title: '웹사이트',
          placeholder: 'https://'
        },
        {
          field: 'link_txt',
          title: '링크설명'
        }
      ]
    },
    {
      type: 'group',
      field: [
        {
          field: 'user_nm',
          title: '등록회원',
          defaultValue: this.session.profile.name,
          readonly: true
        },
        {
          field: 'updDttm',
          title: '최종변경일시',
          readonly: true,
          defaultValue: this.moment.transform(new Date(), 'YY-MM-DD HH:mm')
        }
      ]
    }
  ];
  body: any = {};

  selectedOrgId = -1;
  dept_search;
  partner_search;

  deptBody: any = {};
  deptList = [];
  partnerList = [];

  constructor(private oneStop: OneStopProvider, private resource: ResourceService, private user: UserProvider, private session: LoginSession, private moment: DateFormatPipe) { }

  ngOnInit() {
    this.getCategory(true);
    this.resource.getOrg()
    .then((_:any) => this.orgs = _);
  }

  select(item) {
    if (item.sub)
      return;

    this.form.edit = true;
    this.selectedDeptList = [];
    this.body = { ...item };
    this.body.updDttm = this.moment.transform(this.body.updDttm, 'YY-MM-DD HH:mm');
    // this.body.up_cls_no = this.selectedBigCategory;
    this.oneStop.category.deptGet(item.id)
    .subscribe((data:any) => {
      this.selectedDeptList = data.filter(element => element );
    });
  }

  getCategory(refresh_all: boolean = false) {
    this.loaded = false;
    this.oneStop.category.get(0)
    
    .subscribe((data:any) => {
      this.data = data;
      this.selectedDeptList = [];
      this.formConfig.find(_=>_.field=='up_cls_no').select.options = data.map(_=>{
        return {
          text: _.name,
          value: _.id
        }
      });
      this.loaded = true;
      if(refresh_all) {
        this.getInnerCategory();
      }
    });
  }

  getInnerCategory() {
    this.data.forEach(level1 => {
      this.oneStop.category.get(1, level1.id)
      
      .subscribe(data => {
        level1.sub = data;
      });
    });
  }

  selectDept(item, dvsn) {
    var index = this.selectedDeptList.findIndex(element => {
      return element.org_no == item.id && !element.deleted;
    });

    if(index == -1) {
      this.deptBody = { ...item };
      this.deptBody.dvsn = dvsn;
      this.deptBody.dept_nm = item.name;
      this.deptBody.org_no = item.id;
    }
    else {
      // 수정
    }
  }

  save() {

  }

  delete() {

  }

  getDept() {
    if(this.selectedOrgId == -1) {
      alert('기관을 선택해주세요');
      return ;
    }
    if(this.dept_search && this.dept_search.length < 2) {
      alert('2자 이상 입력해주세요');
      return ;      
    }

    this.resource.getDept(this.selectedOrgId, this.dept_search)
    .then((_:any )=> this.deptList = _)
    .catch(
      err=>{
        console.error(err);
      }
    );
  }

  getBPartner() {
    this.user.business.getPartner(this.partner_search)
    .subscribe((data:any) => {
      this.partnerList = data;
    });
  }
}
