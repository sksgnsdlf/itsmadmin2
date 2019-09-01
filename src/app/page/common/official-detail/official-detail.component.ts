import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonProvider } from '../../../providers/common';
import { TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../config';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-official-detail',
  templateUrl: './official-detail.component.html',
  styleUrls: ['./official-detail.component.scss']
})
export class OfficialDetailComponent implements OnInit {
  officialDetailInfo:any={};
  basicInfo:any = {};
  joinSite:any = [];
  membershipCard:any=[];
  mileageInfo:any=[];
  mobileDevice:Array<any> = [];
  userAttr:any=[];
  basicInfoTable:any = {};
  appInfoTable:any = {};
  joinSiteInfoTable:any = {};
  deviceInfoTable:any = {};
  userAttrInfoTable:any = {};
  mileageInfoTable:any = {};
  constructor(private route:ActivatedRoute, private common: CommonProvider, private location: Location) {
    route.params
    .subscribe(no=>{
      this.getOfficialDetailInfo(no.id);
    });
  }

  ngOnInit() {
  }
  setTable(){
    this.basicInfoTable={
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'row'
      },
      cols:[
        {value:1,width:'20%'},{value:2,width:'30%'},{value:3,width:'20%'},{value:4,width:'30%'}
      ],
      rows:[
        [ { value:'프로필',      typ:'label',    auth:'read only'},{ value:this.basicInfo.thumb_url,  typ:'img',    auth:'read only', align:'center'},
          { value:'이름',        typ:'label',    auth:'read only'},{ value:this.basicInfo.user_nm,        typ:'text',    auth:'read only', align:'center'}
        ],
        [ { value:'최종변경일시',typ:'label',    auth:'read only'},{ value:moment(this.basicInfo.upd_dttm).format('YYYY-MM-DD'), typ:'text',    auth:'read only', align:'center'},
          { value:'신분번호',    typ:'label',    auth:'read only'},{ value:this.basicInfo.official_id,    typ:'text',    auth:'read only', align:'center'}
        ],
        [ { value:'행정 전화번호',typ:'label',    auth:'read only'},{ value:this.basicInfo.office_tel_no,  typ:'text',    auth:'read only', align:'center'},
          { value:'직급명',       typ:'label',    auth:'read only'},{ value:this.basicInfo.duty_nm,       typ:'text',    auth:'read only', align:'center'}
        ],
        [ { value:'휴대전화',     typ:'label',    auth:'read only'},{ value:this.basicInfo.cp_no,         typ:'text',    auth:'read only', align:'center'},
          { value:'담당업무',     typ:'label',    auth:'read only'},{ value:this.basicInfo.task_nm,       typ:'text',    auth:'read only', align:'center'}
        ]      
      ]
    }
    this.appInfoTable={
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'row'
      },
      cols:[
        {value:1,width:'50%'},{value:2,width:'50%'}
      ],
      rows:[
        [ 
          { value:'최근 앱 실행 일자',           typ:'label',    auth:'read only'},
          { value:moment(this.basicInfo.exec_dttm).format('YYYY-MM-DD'),  typ:'text',    auth:'read only', align:'center'}
        ]
      ]
    }
    this.joinSiteInfoTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col'
      },
      cols:[
        { value:'No', width:'20%', align:'center'},
        { value:'사이트명', width:'20%', align:'center'},
        { value:'사이트접속계정', width:'20%', align:'center'},
        { value:'최종인증일시', width:'20%', align:'center'},
        { value:'', width:'20%', align:'center'}
      ],
      rows:this.joinSite.map((_,idx)=>{
        return [
          { key:'idx', value:idx+1, align:'center' },
          { key:'org_nm', value:_.org_nm, align:'center' },
          { key:'site_accnt', value:_.site_accnt, align:'center' },
          { key:'latest_cert_dttm', value:moment(_.latest_cert_dttm).format('YYYY-MM-DD HH:mm:ss'), align:'center' }
        ]
      })
    }
    this.deviceInfoTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col'
      },
      cols:[
        { value:'단말기 플랫폼', width:'50%', align:'center'},
        { value:'단말기 모델', width:'50%', align:'center'}
      ],
      rows:this.mobileDevice.map(_=>{
        return [
          { key:'device_platform', value:_.device_platform, align:'center'},
          { key:'device_model', value:_.device_model, align:'center'}
        ]
      })
    }
    this.userAttrInfoTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col'
      },
      cols:[
        { value:'No', width:'33.3%', align:'center'},
        { value:'속성값', width:'33.3%', align:'center'},
        { value:'최종변경일시', width:'33.3%', align:'center'}
      ],
      rows:this.userAttr.map(_=>{
        return [
          { key:'no', value:_.no, align:'center'},
          { key:'attr_val', value:_.attr_val, align:'center'},
          { key:'upd_dttm', value:moment(_.upd_dttm).format('YYYY-MM-DD HH:mm:ss'), align:'center'}
        ]
      })
    }
    this.mileageInfoTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col'
      },
      cols:[
        { value:'No', width:'20%', align:'center'},
        { value:'기관이름', width:'20%', align:'center'},
        { value:'마일리지', width:'20%', align:'center'},
        { value:'적립일시', width:'20%', align:'center'},
        { value:'유효', width:'20%', align:'center'}
      ],
      rows:this.mileageInfo.map((_,idx)=>{
        return [
          { key:'idx', value:idx+1, align:'center'},
          { key:'org_nm', value:_.org_nm, align:'center'},
          { key:'point', value:_.point, align:'center'},
          { key:'reg_dttm', value:moment(_.reg_dttm).format('YYYY-MM-DD HH:mm:ss'), align:'center'},
          { key:'close_dttm', value:moment(_.close_dttm).format('YYYY-MM-DD HH:mm:ss'), align:'center'}
        ]
      })
    }
  }
  getOfficialDetailInfo(id){
    this.common.user.getOfficialDetail(id)
    .subscribe(
      (data:any)=>{
        this.officialDetailInfo = data;
        this.basicInfo = this.officialDetailInfo.basic_info;
        this.joinSite = this.officialDetailInfo.join_site;
        this.membershipCard = this.officialDetailInfo.membership_card;
        for(let item of this.membershipCard){
          item.start_dt = moment(item.start_dt).format('YYYY-MM-DD');
          item.close_dt = moment(item.close_dt).format('YYYY-MM-DD');
        }
        this.mileageInfo = this.officialDetailInfo.mileage_info;
        this.mobileDevice = this.officialDetailInfo.mobile_device;
        this.userAttr = this.officialDetailInfo.user_attr;
        this.setTable();
      },
      err=>{
        console.error(err);
      }
    );
  }
  back(){
    this.location.back();
  }
}
