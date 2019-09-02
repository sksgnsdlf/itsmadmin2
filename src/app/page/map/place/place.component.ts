import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { LoginSession } from '../../../services/login.session';
import { Router } from '@angular/router';
import { MapProvider } from '../../../providers/map';
import { MaxPageSize } from '../../../../config';
import { UtilService } from '../../../services/util';

@Component({
  selector: 'itsm-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  // API가져오기 ( total, data)
  list: any = {
    total: '',
    pldata: [
      {
        place_no: '',
        place_disp : '',
        theme_cls: '',
        theme_cls_nm: '',
        place_cls_nm: '',
        place_cls_nm2: '',
        oper_state: '',
        oper_state_nm: '',
        location: '',
        user_no: '',
        user_nm: '',
        reg_dttm: '',
        upd_dttm: ''
      }
    ]
  };
  // list = [];

  // 페이징변수
  total: number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;
  org = "";

  lv2 = [];
  // 검색변수 ( 타입 지정안하면 안될수있음)
  oper_state="";   // 운영상태
  place_cls1 = -1; // 대분류
  select_theme=0;
  place_cls2 =''; // 소분류
  place_nm :string = "";     // 장소명
  from_dt;      // 등록일자 from
  to_dt;        // 등록일자 to
  use_yn = 1;
  // 분류변수
  data:Array<any> = [];


  orgList: Array<any> = [];
  roles = [];
// org_no: string = "1";
  // orgList: Array<any> = [];
  // complainList: any = {};

  // 당직등록 데이터
  // dutyData: any = {
  //   duty_dt: '',
  //   duty_typ: '',
  //   duty_site: '',
  //   duty_txt: '',
  //   chief_yn: 0,
  //   org_no: ''
  // };
  // data:Array<any> = [];

  constructor(private resource: ResourceService,public session: LoginSession, private mapprovider: MapProvider, private resourceService: ResourceService,public loginSession: LoginSession, private router: Router,public util: UtilService) { }

  ngOnInit() {
    // 페이징 관련
    this.resource.getCode('100')
    .then((_:any) => this.roles = _);
    this.getOrg();
    // 분류
    this.getCode();
  }

  // 등록페이지
  goto_add_group_page(society_no = null){
    this.router.navigate(['/map/enrollment'],{ queryParams: { society_no } });
  }

// 리스트 값 + 페이징
paging(page) {
  let pageIndex = page - 1;

  // API 파라미터 -> oper_state=1 / pageNo=0 /pageSize=10 / from_dt=2019-08-06 
  //                to_dt=2019-08-07 / place_cls1=1 / place_cls2=8 / place_nm=포항시청& / theme_cls=1

  // pageNo(pageIndex) -> 현재 페이지값 / pageSize(this.pageSize) -> 전체페이지값(10)
  let queryString = `?pageNo=${pageIndex}&pageSize=${this.pageSize}`;   
  // queryString +=  this.role ?  `&oper_state=${this.role}`: '&oper_state=1';

  // 검색조건------------

  // 운영상태
  if(this.oper_state) queryString += `&oper_state=${this.oper_state}` ;
  console.log("this.oper_state => " + this.oper_state);

  // 대분류
  if(this.place_cls1 > -1) 
  {                                 // index값 0~4까지를 대입시켜주는것이다.
    queryString += `&place_cls1=${this.data[this.place_cls1].cls_cd}`;
    console.log("place_cls1 => " + this.data[this.place_cls1].cls_cd );
  }
  
  // 소분류
  if(this.place_cls2)
  {
    queryString += `&place_cls2=${this.place_cls2}`; 
    console.log("place_cls2 => " + this.place_cls2 );
  }
  // 장소명
  if(this.place_nm) queryString += `&place_nm=${this.place_nm}`;
  console.log("this.place_nm => " + this.place_nm);
  // 등록일자(from)
  if(this.from_dt) queryString += `&from_dt=${this.from_dt}`;
  console.log("this.from_dt => " + this.from_dt);
  // 등록일자(to)
  if(this.to_dt) queryString += `&to_dt=${this.to_dt}`;
  console.log("this.to_dt => " + this.to_dt);

  queryString += `&use_yn=${this.use_yn}`;

  
    this.mapprovider.place.getlist(queryString)
    .subscribe((element:any) => {
      // total값
      this.total = element.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;
      // 배열방식으로 되어있는 data값을 list에 다 넣어줌
      this.list = element.data;
      console.log("element => "+ JSON.stringify(element));
    }); 
    
  }

  // 페이징 부가처리
  filter() {
    this.paging(1);
  }

  // 페이징 부가처리
  getOrg() {
    this.filter();
  }

  // 대분류, 소분류 select(option)
  getCode(lev1Index = -1) {
    this.data = [];
      this.mapprovider.cls.getSearch(1)
      .subscribe((level1:any)=>{
        this.mapprovider.cls.getSearch(2)
        .subscribe((level2:any)=>{

             let customlv1 = [];

            level2.forEach(element => {
              customlv1.push({
                ...element,
                lvl: 2,
                name: `${element.cls_nm} (${element.cls_cd})`,
                expanded: false,
                sub: []
              });
            });

            level1.forEach(element => {
              let item = {
                 ...element,
                lvl: 1,
                name: `${element.cls_nm} (${element.cls_cd})`,
                expanded: false,
                sub:[],
                lv2:  customlv1.filter(lv2=>{
                  return lv2.upper_cd == element.cls_cd;
                })
              }
            this.data.push(item);
            });
           });
      });
    }

    // 페이지당 표시수
    onChange(pageSize:any){
      let pageIndex = this.page - 1;
      let queryString = `?pageNo=${pageIndex}&pageSize=${pageSize}`;

      this.mapprovider.place.getlist(queryString)
      .subscribe((element:any) => {
      this.total = element.total;
      this.totalPage = Math.ceil(this.total/this.pageSize);
      this.collectionSize = this.totalPage * 10;
      this.list = element.data;
    });
  }

  // 상세(수정)내용페이지
  openDetail(place_no){
    // let cls_cd = null;
    // for(let item of place_no){
    //   if(item.key == 'place_no') place_no = item.value;
    // }
    this.router.navigate(['map/enrollment'],{ queryParams: { place_no } }); //
    //console.log("cls_cd=>" +cls_cd);
  }
}
