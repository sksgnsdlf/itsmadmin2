import { Component, OnInit , ViewChild} from '@angular/core';
import { MapProvider } from '../../../providers/map';
import { LoginSession } from '../../../services/login.session';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'itsm-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @ViewChild('clsForm1') clsForm1: FormControl;

  //
  data = [] ;
  // 분류담을 변수
  list = {};

  item = [];

  place_cls1 = -1; // 대분류
  place_cls2 =''; // 소분류

  lv2 = [];

  // 표시순서
  disp_ord;


  data2 = [];
  selectlev1Index = -1;
  selectedLinkList: Array<any> = [];
  cls1: any = {   // 최초 페이지때 분류값이 아예없으면 API에 값을 못넘겨줘서 오류남, 그래서 값이 없음으로 기본값을 지정해줘야 API가 먹힘
    cls_cd: undefined,
    cls_nm: undefined,
    lvl: undefined,
    disp_ord: undefined,
    use_yn: 0
  };

  cls2: any = {
    cls_cd: undefined,
    cls_nm: undefined,
    lvl: undefined,
    upper_cd: undefined,
    maker_img: undefined,
    etc: undefined,
    disp_ord: undefined,
    use_yn: undefined,
    links: [
      {
        link_cls: undefined,
        link_ref: undefined
      }
    ]
  };

  secondlist = {
    report_cd: '',
    report_txt: '',
    cls_cd: '',
    disp_ord : ''
  };



  constructor(private mapprovider: MapProvider, public loginSession: LoginSession) { }

  ngOnInit() {
    this.getCode();
  }

  getCode(lev1Index = -1) {
    this.data = [];
      this.mapprovider.cls.getSearch(1) // 85p ~ 86p + 108p ~ 127p
      .subscribe((level1:any)=>{
        this.mapprovider.cls.getSearch(2) // 87p ~ 104p 
        .subscribe((level2:any)=>{

             let customlv1 = []; // api에있는 데이터를 담을 배열 93p에서 push하여 사용할예정

            level2.forEach(element => {
              customlv1.push({
                ...element,                                    // ...-> 객체 주소복사 / 그러니까 http://itsmpohang.hssa.me:9001/map/place_cls/all/2 에서
                                                              // 있는걸 전부다 가져옴 cls_cd, cls_nm, use_yn까지..)
                lvl: 2,                                        // 레벨2 즉, 두번째 서브메뉴
                name: `${element.cls_nm} (${element.cls_cd})`, // 92p에서 전부다 가져왔는데 여기에 cls_nm과 cls_cd값이 있는걸 name에 넣어줌 
                                                              // (name은 tree-view.component.html에 있음) 
                                                              // ex.생활(1) 안에 있는 서브메뉴들(주민센터(6), 무인민원발급기(7)) 출력시키는부분
              // cls_nm: element.cls_nm,
                expanded: false,
                sub: []
               
              }); 
            });                                                // 요약 - 두번째 서브메뉴 선언 + 출력(tree-view에서)을 해줌

            // forEach가 2개있는데 연결 for문이 아니고 별개의 for문임

            level1.forEach(element => {
              let item = {
                 ...element,
                 // cls_nm: element.cls_nm,                         // 분류명
                 // etc: element.etc,                               // 설명(비고)
                 // use_yn: element.use_yn,                         // 사용여부
                 // maker_img: element.maker_img,                   // 마커이미지경로
                lvl: 1,                                         // 레벨1 즉, 첫번째 서브메뉴
                name: `${element.cls_nm} (${element.cls_cd})`,  // 이 부분이 생활(1), 교통(2), 의료(3) 출력시키는부분 (name은 tree-view.component.html에 있음) 
                expanded: false,
                sub:[],
                lv2:  customlv1.filter(lv2=>{                   // customlv2에서 조건에 맞는거만 리턴시킨다.
                  return lv2.upper_cd == element.cls_cd;        // 조건은 lv2.upper_cd와 element.cls_cd가 맞는것만
                                                                // ex. 생활은 cls_cd가 1이고 주민센터는 upper_cd가 1이라서 연결해주는것
                })
              }                                                 // 요약 - 첫번째 서브메뉴선언 + 조건에 맞는것만 첫번째 서브메뉴에 두번째 서브메뉴를 정의 및 붙여주고 출력(tree-view에서)함
            this.data.push(item);
            });
              // 2차분류에서 분류추가할때 2차분류 서브메뉴를 새로불러들임()
               if(lev1Index > -1)
               {
                  this.data2 = this.data[lev1Index].lv2; 
               }
                   
           });
      });
    }
  // 서브메뉴의 서브메뉴 클릭시 데이터를 가져옴
  select(lvl, cls123) {            // tree-view.html에서 level2를 가져온다고함..
  if(lvl == 1)
  {
    this.selectlev1Index = this.data.indexOf(cls123);
    this.data2 = this.data[this.selectlev1Index].lv2;
    this.cls1 = { ...cls123 };
    if(cls123.clse_cd != this.cls2.upper_cd)
      this.initData(2);
  }
  else{
    this.selectedLinkList = [];
     this.data2 = this.data[this.selectlev1Index].lv2;
    this.mapprovider.report.getlist(cls123.cls_cd)
    .subscribe(element=>{
      this.list = element;
      //  this.disp_ord = element.disp_ord;
      this.selectedLinkList = this.cls2.links;
      
      console.log("cls123.cls_cd = > " + JSON.stringify(element));
    },error=>{

    });
    }
    
  }

  initData(type){
    switch(type)
    {
      case 1:
          this.cls1 = {
            cls_cd: undefined,
            cls_nm: undefined,
            disp_ord: undefined,
            lvl:1,
            use_yn: "1"
          };
        break;
      case 2:
          this.cls2  = {
            cls_cd: undefined,
            cls_nm: undefined,
            lvl: 2,
            upper_cd: this.cls2.upper_cd,
            maker_img: undefined,
            etc: undefined,
            disp_ord: undefined,
            use_yn: "1",
            links: [
              {
                link_cls: undefined,
                link_ref: undefined
              }
            ]
          };
          break;
    }
  }

  save() {
    // if (confirm(this.edit1 ? "저장하시겠습니까?" : "추가하시겠습니까?")) {
      this.mapprovider.report.post({
        ...this.cls1,
        //...this.secondlist      // save를 누를때 api속성들을 연결해줌
  }).subscribe(_=>{
        alert('저장되었습니다.');
         this.getCode();            // 실시간으로 데이터를 처리하는듯함
      }, err=>{
        alert('저장실패!');
        console.log("JSON.stringify(this.secondlist) = > " + JSON.stringify(this.cls1));
      });
      // console.log("=================cls_nm"+JSON.stringify(this.cls2));
    // }
  }
}
