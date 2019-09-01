import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonProvider } from '../../../providers/common';
import { ResourceService } from '../../../services/resource.service';
import { FIControlOptions, FormInflaterComponent } from '../../../itsm-ui/public_api';
import { FormData } from 'formdata-polyfill';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})
export class AppmenuComponent implements OnInit {
  @ViewChild(FormInflaterComponent) form: FormInflaterComponent;
  
  categoryLoaded = false;
  authLoaded = false;

  authValue = [];
  data = [];
  body: any = {  };
  formConfig: FIControlOptions[] = [
    {
      field: 'menu_id',
      type: 'hidden'
    },
    {
      field: 'ord',
      type: 'hidden'
    },
    {
      field: 'menu_cls',
      type: 'hidden',
      defaultValue: '3'
    },
    {
      field: 'menu_nm',
      type: 'text',
      title: '메뉴명',
      required: true
    },
    {
      field: 'menu_category',
      type: 'select',
      title: '카테고리',
      select: {
        emptyText: '카테고리를 선택하세요'
      },
      required: true
    },
    {
      field: 'web_url',
      type: 'text',
      title: '웹 링크 URL'
    },
    {
      field: 'icon_uri',
      type: 'image',
      title: '아이콘',
      fileField: 'file',
      imageSize: {
        width: '70px',
        height: '70px'
      }
    },
    {
      field: 'link_typ',
      type: 'radio',
      title: '링크 방식',
      select: {
        options: [ { text: '현재창', value: 'self' }, { text: '새창', value: 'blank' } ]
      },
      defaultValue: 'blank'
    },
    {
      field: 'url_android',
      type: 'text',
      title: '플레이 스토어'
    },
    {
      field: 'url_ios',
      type: 'text',
      title: '앱스토어'
    },
    {
      field: 'ios_path',
      type: 'text',
      title: 'iOS 실행 경로'
    },
    {
      field: 'use_auth',
      type: 'multi',
      title: '사용권한',
      select: { options: [] },
      required: true
    },
    {
      field: 'library_yn',
      type: 'radio',
      title: '라이브러리',
      helpText: '서비스라이브러리에 노출합니다.',
      select: {
        options: [ { text: '사용', value: '1' }, { text: '미사용', value: '2' } ]
      },
      defaultValue: '2'
    },
    {
      field: 'default_yn',
      type: 'radio',
      title: '앱메인 표시',
      select: {
        options: [ { text: '표시', value: '1' }, { text: '미표시', value: '2' } ]
      },
      defaultValue: '2'
    },
    {
      type: 'group',
      field: [
        {
          field: 'google_app_yn',
          type: 'radio',
          title: '안드로이드앱',
          select: {
            options: [ { text: '예', value: '1' }, { text: '아니오', value: '2' } ]
          },
          defaultValue: '2'
        },
        {
          field: 'google_app_ver',
          type: 'number',
          title: '안드로이드 앱 버전'
        }
      ]
    },
    {
      type: 'group',
      field: [
        {
          field: 'ios_app_yn',
          type: 'radio',
          title: 'iOS앱',
          select: {
            options: [ { text: '예', value: '1' }, { text: '아니오', value: '2' } ]
          },
          defaultValue: '2'
        },
        {
          field: 'ios_app_ver',
          type: 'number',
          title: 'iOS 앱 버전'
        }
      ]
    },
    {
      field: 'menu_txt',
      type: 'text',
      title: '앱 설명'
    },
    {
      field: 'use_yn',
      type: 'radio',
      title: '사용여부',
      select: {
        options: [ { text: '예', value: '1' }, { text: '아니오', value: '2' } ]
      },
      defaultValue: '2'
    },
  ]

  constructor(private common: CommonProvider, private resource: ResourceService) { }

  ngOnInit() {
    this.getList(true);
    this.getAuth();
  }

  getList(loadCategory = false) {
    this.resource.getCode('430')
    .then((category:any) => {
      this.data = category;

      if (loadCategory) {
        this.formConfig.find(_=>_.field == 'menu_category').select.options = category.map(_=>{
          return {
            text: _.name,
            value: _.id
          }
        });
        this.categoryLoaded = true;
      }

      this.data.forEach(level1 => {
        level1.lvl = 1;
        this.common.appmenu.get(level1.id)
        
        .subscribe((level2:any) => {
          level2.forEach(element => {
            element.name = element.menu_nm;
          });
          level1.sub = level2;
        },
        error => {
          console.error('small category err');
        });
      });
    })
    .catch(err => console.error(err));
  }

  getAuth() {
    this.resource.getCode('420')
    .then((data:any) => {
      this.authValue = data;
      this.formConfig.find(_=>_.field == 'use_auth').select.options = data.map(_=>{
        return {
          text: _.name,
          value: _.code
        }
      });
      this.authLoaded = true;
    })
    .catch(err => console.error(err));
  }

  select(item) {
    if (item.lvl == 1)
      return;

    let tmp = { ...item };

    let tmp_use_auth = [];
    for (let item of this.authValue) {
      tmp_use_auth.push(tmp.use_auth.includes(item.code));
    }
    tmp.use_auth = tmp_use_auth;

    this.body = tmp;
    this.form.edit = true;
  }

  save() {
    let formData:FormData = this.form.getMultipartFormData();
    if (formData.has('use_auth')) {
      let use_auth: string[] = JSON.parse(formData.get('use_auth') as string);

      formData.set('use_auth',
        use_auth.reduce((prev, cur, index)=>{
          return prev + (cur?this.authValue[index].code:'');
        }, '')
      );
    }
    this.common.appmenu.post(formData)
    .subscribe(_=>{
      alert('저장되었습니다.');
      this.form.reset();
      this.getList();
    }, err=>{
      if(err.status == 400)
        alert('필수항목을 입력해주세요');
      else
        alert('저장실패!');
    });
  }

  delete() {
    this.common.appmenu.delete(this.body.menu_id)
    .subscribe(_=>{
      alert('삭제되었습니다.');
      this.form.reset();
      this.getList();
    }, err=>{
      alert('삭제실패!');
    });
  }
}
