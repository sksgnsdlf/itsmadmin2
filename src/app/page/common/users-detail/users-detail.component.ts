import { Component, OnInit } from '@angular/core';
import { TB_COL_BACK_COLOR, TB_BORDER_COLOR } from '../../../../config';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonProvider } from '../../../providers/common';
import * as moment from 'moment';

@Component({
  selector: 'app-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  userDetailInfo:any = null;
  add_to_partner:boolean = false; // 협력업체 직원으로 지정 버튼시
  search_partner:string = '';
  basicInfo:any = {};
  joinSite:any = [];
  membershipCard:any = [];
  mobileDevice:any[] = [];
  mileageInfo:any = [];
  userAttr:any = [];
  partnerList:any = []; //협력업체 목록
  selectedPartner:any = {}; //선택된 업체정보

  //table info
  basicInfoTable:any = {};
  appInfoTable:any = {};
  joinSiteInfoTable:any = {};
  deviceInfoTable:any = {};
  userAttrInfoTable:any = {};
  mileageInfoTable:any = {};

  constructor(private route:ActivatedRoute, private location: Location, private common: CommonProvider, public router: Router) {
    route.params
    .subscribe(no=>{
      this.getUserDetail(no.id);
    });
  }
  ngOnInit() {
    
  }
  setTable(){
    this.basicInfoTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'row'
      },
      cols:[
        {value:1,width:'10.2%'},{value:2,width:'18.4%'},{value:3,width:'10.2%'},{value:4,width:'18.4%'},{value:5,width:'10.2%'},{value:6,width:'18.4%'}
      ],
      rows:[
        [ { value:'성명',           typ:'label',    auth:'read only'},{ value:this.basicInfo.user_nm,           typ:'text',    auth:'read only', align:'center'},
          { value:'회원번호',        typ:'label',    auth:'read only'},{ value:this.basicInfo.user_no,           typ:'text',    auth:'read only', align:'center'},
          { value:'로그인계정',      typ:'label',    auth:'read only'},{ value:this.basicInfo.login_accnt,       typ:'text',    auth:'read only', align:'center'},
        ],
        [ { value:'성별',           typ:'label',    auth:'read only'},{ value:this.basicInfo.sex,              typ:'text',    auth:'read only', align:'center'},
          { value:'생년월일',        typ:'label',    auth:'read only'},{ value:moment(this.basicInfo.birth).format('YYYY-MM-DD'), typ:'text',    auth:'read only', align:'center'},
          { value:'직장명',          typ:'label',    auth:'read only'},{ value:this.basicInfo.office_nm,       typ:'text',    auth:'read only', align:'center'},
        ],
        [ { value:'일반전화',        typ:'label',    auth:'read only'},{ value:this.basicInfo.tel_no,          typ:'text',    auth:'read only', align:'center'},
          { value:'휴대전화',        typ:'label',    auth:'read only'},{ value:this.basicInfo.cp_no,           typ:'text',    auth:'read only', align:'center'},
          { value:'이메일',         typ:'label',    auth:'read only'},{ value:this.basicInfo.email,           typ:'text',    auth:'read only', align:'center'},
        ],
        [ { value:'우편번호',       typ:'label',    auth:'read only'},{ value:this.basicInfo.post,            typ:'text',    auth:'read only', align:'center'},
          { value:'주소',           typ:'label',    auth:'read only'},{ value:this.basicInfo.addr1,           typ:'text',    auth:'read only'},
          { value:'마일리지',       typ:'label',    auth:'read only'},{ value:this.basicInfo.mileage,         typ:'text',    auth:'read only', align:'center'},
        ],
        [ { value:'가입일시',       typ:'label',    auth:'read only'},{ value:moment(this.basicInfo.join_dttm).format('YYYY-MM-DD'), typ:'text',    auth:'read only', align:'center'},
          { value:' ',              typ:'label',    auth:'read only'},{ value:'',                              typ:'text',    auth:'read only', align:'center'},
          { value:' ',              typ:'label',    auth:'read only'},{ value:'',                              typ:'text',    auth:'read only', align:'center'},
        ]      
      ]
    }
    this.appInfoTable = {
      attr:{
        col_back_color:TB_COL_BACK_COLOR,
        border_color:TB_BORDER_COLOR,
        border_yn:true,
        table_dir:'col'
      },
      cols:[
        { value:'일시', width:'20%', align:'center'},
        { value:'액션', width:'20%', align:'center'},
        { value:'로그인종류', width:'20%', align:'center'},
        { value:'앱버전', width:'20%', align:'center'},
        { value:'단말기종류', width:'20%', align:'center'}
      ],
      rows:this.basicInfo.login_hst.map((_:any)=>{
          return [
            { key:'exec_dttm', value:_.exec_dttm },
            { key:'login_out_typ', value:_.login_out_typ },
            { key:'login_typ', value:_.login_typ },
            { key:'ver_txt', value:_.ver_txt },
            { key:'device_platform', value:_.device_platform }
          ]
      })
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
          { key:'idx', value:idx+1, align:'center'},
          { key:'org_nm', value:_.org_nm, align:'center'},
          { key:'site_accnt', value:_.site_accnt, align:'center'},
          { key:'latest_cert_dttm', value:moment(_.latest_cert_dttm).format('YYYY-MM-DD HH:mm:ss'), align:'center'}
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
  getUserDetail(userNo){
    this.common.user.getUserDetail(userNo)
    .subscribe(
      (data:any)=>{
        this.userDetailInfo = data;
        this.basicInfo = this.userDetailInfo.basic_info;
        this.joinSite = this.userDetailInfo.join_site;
        this.membershipCard = this.userDetailInfo.membership_card;
        for(let item of this.membershipCard){
          item.start_dt = moment(item.start_dt).format('YYYY-MM-DD');
          item.close_dt = moment(item.close_dt).format('YYYY-MM-DD');
        }
        this.mobileDevice = this.userDetailInfo.mobile_device;
        this.mileageInfo = this.userDetailInfo.mileage_info;
        this.userAttr = this.userDetailInfo.user_attr;
        this.setTable();
      },
      err=>{
        console.error(err);
      }
    )
  }
  getPartnerList(search=''){
    this.common.user.getPartnerList(search)
    .subscribe((list:any)=>{
      this.add_to_partner = true; //팝업띄우기
      this.partnerList = list;
    });
  }
  selectPartner(partnerInfo){
    for(let item of this.partnerList){
      if(item.partner_no != partnerInfo.partner_no){
        item.selected = false;
      }else{
        item.selected = true;
      }
    }
    this.selectedPartner = partnerInfo;
  }
  addToPartner(){
    this.common.user.asignPartner({
      partner_no:this.selectedPartner.partner_no,
      user_no:this.basicInfo.user_no
    })
    .subscribe(
      res=>{
        alert("추가 완료");
      },
      err=>{
        alert("추가 실패");
      }
    );
    this.init_partner_rel_data();
  }
  init_partner_rel_data(){
    this.add_to_partner = false;
    for(let item of this.partnerList){
      item.selected = false;
    }
    this.selectedPartner = {};
  }  
  back(){
    this.router.navigate(['common/users']);
  }
}
