import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonProvider } from '../../../providers/common';
import { ResourceService } from '../../../services/resource.service';
import { FIControlOptions, FormInflaterComponent } from '../../../itsm-ui/public_api';
import { FormData } from 'formdata-polyfill';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  form: FormInflaterComponent;
  state = [];
  data = {
    total: 0,
    list: []
  };

  page = 1;
  modal: NgbModalRef;

  startDt;
  endDt;
  selectedState = null;

  edit = false;

  body: any = {};
  formConfig: FIControlOptions[] = [
    {
      field: 'post_state',
      title: '게시상태',
      type: 'select',
      select: {
        emptyText: '게시 상태를 선택해 주세요'
      },
      required: true
    },
    {
      field: 'img_url',
      title: '배너이미지',
      type: 'image',
      fileField: 'file',
      helpText: '배너의 이미지는 960 X 540으로 맞춰주세요',
      required: true
    },
    {
      field: 'term',
      title: '게시기간',
      type: 'period',
      required: true
    },
    {
      field: 'link_url',
      title: '링크',
      type: 'text',
      required: true
    },
    {
      field: 'ord',
      title: '표시순서',
      type: 'text',
      helpText: '클수록 먼저 표시됩니다.',
      required: true
    },
    {
      field: 'banner_no',
      type: 'hidden'
    },
    {
      field: 'reg_dttm',
      type: 'hidden'
    }
  ];

  constructor(private resource: ResourceService, private common: CommonProvider, private modalService: NgbModal) { }

  ngOnInit() {
    this.resource.getCode('700')
    .then((data:any) => {
      this.state = data;
      this.formConfig.find(_=>_.field == 'post_state').select.options = data.map(_=>{
        return {
          text: _.name,
          value: _.code
        }
      });
    })
    .catch(err => console.error(err));
    this.search();
  }

  ref(form) {
    this.form = form;
  }

  select(item) {
    this.body = { ...item };
    this.body.term = `${item.start_dttm.split(' ')[0]} ~ ${item.close_dttm.split(' ')[0]}`;
  }

  search(page = this.page) {
    this.common.banner.get(this.startDt, this.endDt, this.selectedState, page-1, 10)
    .subscribe((data:any) => {
      this.data = data;
    });
  }

  open(content) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }

  save() {
    let formData = this.form.getMultipartFormData();
    if (formData.has('term')) {
      let term: string[] = (formData.get('term') as string).split(' ~ ');

      formData.append('start_dttm', term[0]);
      formData.append('close_dttm', term[1]);
    }

    this.common.banner.post(formData)
    .subscribe(_ => {
      alert('저장되었습니다.');
      this.modal.close();
      this.edit = null;
      this.search();
    }, error => {
      alert('저장실패');
    });
  }

  delete() {
    this.common.banner.delete(this.body)
    .subscribe(_ => {
      alert('삭제되었습니다.');
      this.modal.close();
      this.edit = null;
      this.search();
    }, error => {
      alert('삭제실패');
    });
  }
}
