import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MapProvider } from '../../../providers/map';
//test용
import { ResourceService } from '../../../services/resource.service';
import { LoginSession } from '../../../services/login.session';
import { OneStopProvider } from '../../../providers/onestop';
import { UserProvider } from '../../../providers/user';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../../config';
import { element } from '@angular/core/src/render3/instructions';
import { link } from 'fs';

declare let daum: any;

@Component({
  selector: 'itsm-cls',
  templateUrl: './cls.component.html',
  styleUrls: ['./cls.component.scss']
})
export class ClsComponent implements OnInit {

  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild('clsForm1') clsForm1: FormControl;
  @ViewChild('clsForm2') clsForm2: FormControl;
  data:Array<any> = [];
  data2 = [];
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
  edit1: boolean = false;
  edit2: boolean = false;
  picList: Array<any> = [];
  reportData: any = {};
  
  cls_link: any = {

  };
  
  search_map: string = "";
  locationSelectItem: any = { position: {}, name: '', dongmyun: '' };
  map: any = {};
  mapOptions: any = {
    level: 3,
    center: new daum.maps.LatLng(36.0190238, 129.3433917)
  };
  marker: any = {};
  location: any = new daum.maps.LatLng(36.0190238, 129.3433917);



  //마커이미지
  body: any = {};
  image: string | ArrayBuffer = "";

  //모달관련
  tempIdx: number = 0;
  assign_popup_type: number = 0; // 0: 담당자 배정, 1: 직원 조회
  orgs: any = [];
  org:number = 1;
  depts: Array<any> = [];
  selectedPopupTab: number = 3; // 0:인명, 업무검색, 1:협력업체, 2:지정담당자, 3:조직도, 4:부서별
  user_nm: string = "";
  cateUserList: Array<any> = [];
  selectedOrgId: number = 1;
  orgUserList: Array<any> = [];
  partnerUserList: Array<any> = [];
  orgDesignatedList: Array<any> = [];
  
  selectlev1Index = -1;

  partner_nm: string = "";
  q;
  cateSearchTxt: string = "";
  categoryList: Array<any> = [];
  selectedCate: any = {};
  showed_category_list: Array<any> = [];    // 바로응답분류
  tempSelectedUserList1: Array<any> = [];
  tempSelectedUserList2: Array<any> = [];
  tempSelectedUserList3: Array<any> = [];
  selectedLinkList: Array<any> = [];

  checked = 1;


  constructor(public mapprovider: MapProvider, private modalService: NgbModal, public renderer: Renderer,
    private resourceService: ResourceService, private session: LoginSession,private oneStop: OneStopProvider,
    private userProvider: UserProvider, private http: HttpClient) { }

  ngOnInit() {
    this.getCode();
    this.getBigCategory(); // 바로응답분류리스트를 미리 실행시켜놓아서 바로응답분류 검색시 모달에 바로 적용시킴
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



// itsm-tree-view 지정해주는곳
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
    this.edit1 = true;
    this.selectlev1Index = this.data.indexOf(cls123);
    this.data2 = this.data[this.selectlev1Index].lv2;
    this.cls1 = { ...cls123 };
    if(cls123.clse_cd != this.cls2.upper_cd)
      this.initData(2);
  }
  else{
    this.clearimg();
    this.edit2 = true;
    this.selectedLinkList = [];
     this.data2 = this.data[this.selectlev1Index].lv2;
    this.mapprovider.cls.getOne(cls123.cls_cd)
    .subscribe(element=>{
      this.cls2 ={
        ...cls123,
        ...element
      };
      this.selectedLinkList = this.cls2.links;
    },error=>{

    });
    // this.cls2 = { ...cls123 };  // 안쓰는거같은데
    }
  }

  // 1차분류 저장기능
  save1() {
    if (confirm(this.edit1 ? "저장하시겠습니까?" : "추가하시겠습니까?")) {
      this.mapprovider.cls.post({
        ...this.cls1,         // save를 누를때 api속성들을 연결해줌
        lvl:1,                 // 분류추가할때 api에 없는 lvl을 2로 지정해줘야 값이 넘어감
  }).subscribe(_=>{
        alert('저장되었습니다.');
         this.getCode();            // 실시간으로 데이터를 처리하는듯함
      }, err=>{
        alert('저장실패!');
      });
      // console.log("=================cls_nm"+JSON.stringify(this.cls2));
    }
  }

  // 2차분류 저장기능
  save2() {
    if (confirm( this.edit2 ? "저장 하시겠습니까?" : "추가 하시겠습니까?")) {
      let formData: FormData = new FormData();
      let files: FileList = this.inputFile.nativeElement.files;
      let postData = {
        ...this.cls2,
        lvl:2,
        upper_cd: this.cls1.cls_cd,
        user_no:this.session.profile.user_no,
        links: this.selectedLinkList
       };

      // tslint:disable-next-line: forin
      for(let key in postData){

        if(postData[key])
        {
          if(postData[key] instanceof Array)
          {
            formData.append(key,JSON.stringify(postData[key]));
          }
          else
            formData.append(key,postData[key]);
        }
          
        

        console.log("postData => "+JSON.stringify(postData))
      }

      if (files.length > 0){
        console.log('img');
        let file: File = files[0];
        formData.append('file', file, file.name);
      }

      this.mapprovider.cls.post(formData).subscribe( (data : any) => {
        alert('저장되었습니다.');
         this.edit2 = true;
         // tslint:disable-next-line: curly
         if(data.cls_cd)
            this.cls2 ={
              ...this.cls2,
              cls_cd: data.cls_cd 
            };
            console.log("formData => "+JSON.stringify(formData))
            console.log("data => "+JSON.stringify(data))
            console.log("data.cls_cd => "+JSON.stringify(data.cls_cd))
            console.log("this.cls2 => " +JSON.stringify(this.cls2))
         this.getCode(this.selectlev1Index);
      }, err=>{
        this.edit2 = false;
        alert('저장실패!');
      });
  }

  }

  // 삭제기능
  delete1() {
    if (confirm('삭제하시겠습니까?')) {
      this.mapprovider.cls.delete({
        cls_cd: this.cls1.cls_cd,  // map.ts의 api url에 cls_cd값을 넘겨줌으로서 DB에서 삭제시킴
      }).subscribe(_=>{
        alert('삭제되었습니다.');
        // this.edit = false;
        // this.clsForm.reset();
        this.getCode();
        this.initData(1);
      }, err=>{
        alert('삭제실패!');
      });
    }
  }

  // 삭제기능
  delete2() {
    if (confirm('삭제하시겠습니까?')) {
      this.mapprovider.cls.delete({
        cls_cd: this.cls2.cls_cd,  // map.ts의 api url에 cls_cd값을 넘겨줌으로서 DB에서 삭제시킴
      }).subscribe(_=>{
        alert('삭제되었습니다.');
        // this.edit = false;
        // this.clsForm.reset();
        this.getCode(this.selectlev1Index);
        this.initData(2);
      }, err=>{
        alert('삭제실패!');
      });
    }
  }

  // 마커이미지
  checkFileType($event) {
    let files: FileList = $event.target.files;
    console.log("[checkFileType]"+files.length );
    if (files.length > 0) {
      let file: File = files[0];
      if (!file.type.includes('image/')) {
        alert('이미지만 업로드 가능합니다.');
        $event.target.value = '';
      }
      else {
        var fr = new FileReader();
        fr.onload = () => {
          this.image = fr.result;
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }

  openFile() {
    var ua = window.navigator.userAgent;
    console.log("ua=>"+ ua);
    var msie = ua.indexOf('MSIE ');
    console.log("msie=>"+ msie);
    var trident = ua.indexOf('Trident/');
    console.log("trident=>"+ trident);
    if (msie > 0 || trident > 0) {
        console.log("File=>"+JSON.stringify(this.inputFile)); 
        this.inputFile.nativeElement.click();
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(this.inputFile.nativeElement, 'dispatchEvent', [event]);
      console.log("asdfasdfasdfasdf"+ JSON.stringify(this.inputFile.nativeElement));
    }
  }

  clearimg() {
    this.image = null;
    this.cls2.maker_img = null;
    this.inputFile.nativeElement.value =null;
  }

  //모달
  openAsgnPopup2(content, i, type) {
    this.tempIdx = i;
    this.assign_popup_type = type;
    this.resourceService.getOrg(4)
      .then((_:any) => this.orgs = _);
    this.org = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
    this.openModal(content, null, 'customModal');
    this.setOrg(1);         // 담당부서
    this.getOrgUser();      // 담당업체
    this.changePopupTab(1); // html에서(283p) 4일때 담당업체리스트가 나옴
  }

  changePopupTab(idx) {
    this.selectedPopupTab = idx;
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


  getCateUser() {
    this.oneStop.category.getUser(this.reportData.cls_no)
    .subscribe(
      (data:any) => {
        this.cateUserList = data;
      }
    );
  }


  // -------------------------------------------------------------
  // 바로응답분류 리스트 
  getBigCategory() {
    this.oneStop.category.getAll(1)
    .subscribe(
      (data:any) => {
        this.categoryList = data;
        this.showed_category_list = this.categoryList;

        if(this.reportData.complaint_no) {
          this.selectedCate = this.categoryList.find((element) => {
            return element.id == this.reportData.cls_no;
          });
        }
      }
    );
  }

  // 바로응답분류 체크박스
  userSelectChanged1(ev, item) {
    console.log("ev->"+JSON.stringify(ev));
    console.log("item=>"+ JSON.stringify(item));

    var index = this.tempSelectedUserList1.findIndex(element => {
      return (element.id == item.id && element.name == item.name);
    });

    if(ev.target.checked) {
      if(index < 0) {
        this.tempSelectedUserList1.push(item);
      }
    }
    else {
      if(index > -1) {
        this.tempSelectedUserList1.splice(index, 1);
      }
    }
  }

  // 바로응답분류 선택
  selectTempUsers1() {
    if(this.tempSelectedUserList1.length == 0) {
      alert('선택된 담당자가 없습니다.');
      return ;
      }

      this.tempSelectedUserList1.forEach(element => {
        this.addRow(1,element);
      });

      this.tempSelectedUserList1 = [];
      this.modalService.dismissAll();
  }

  // 분류추가 
  newCategory(level)
  {
    if(level == 1)
    {
      this.edit1 = false; 
      this.initData(1);
    }
    else
    {
      this.edit2 = false;
      this.selectedLinkList = [];
      this.initData(2);
    }
  }

  // 분류 - 선택된 내용들
  addRow(link_cls,user) {
     var item = {
       ...user,
    //   tel_no: user.tel_no,
    //   name: user.name,
      link_cls:link_cls,
      link_ref:user.id,
      link_ref_nm:user.name
    };
    // 중복값 확인
    var index = this.selectedLinkList.findIndex(element => {
      // console.log("==============user============"+JSON.stringify(user)); //중복값 확인
      return (element.link_ref_nm == user.name && element.link_ref == user.id);
    });

    if(index > -1 ){
      alert(user.name + ' 은(는) 이미 추가된 항목입니다.');
      return;
  }
    this.selectedLinkList.unshift(item);
  }

  // 바로응답분류 선택된거 삭제
  deleteRow(i) {
    this.selectedLinkList.splice(i, 1);   
  }

  // -------------------------------------------------------------
  // 담당부서 리스트 
  setOrg(org = 1) {
    this.resourceService.getDept(org, '')
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
  
  // 담당부서 체크박스                    
  userSelectChanged2(ev) {
    console.log('ev=>'+JSON.stringify(ev));
    // console.log('dept=>'+JSON.stringify(depts));
    var index = this.tempSelectedUserList2.findIndex(element => {
      return (element.name == ev.name && element.id == ev.id);
    });
    if(ev.selected) {
      if(index < 0) {
        this.tempSelectedUserList2.push(ev);
      }
    }
    else {
      if(index > -1) {
        this.tempSelectedUserList2.splice(ev, 1);
      }
    }
  }

  // 담당부서 선택
  selectTempUsers2() {
    if(this.tempSelectedUserList2.length == 0) {
      alert('선택된 담당자가 없습니다.');
      return ;
      }
      this.tempSelectedUserList2.forEach(element => {
        this.addRow(2,element);
         console.log("elemnt JSON => " + element.length);
      });

      this.tempSelectedUserList2 = [];

      this.modalService.dismissAll();
  }

  
  // -------------------------------------------------------------
  // 담당업체 + 검색기능(매개변수)
  getOrgUser() {
    this.userProvider.business.getPartner(this.partner_nm)
    .subscribe(
      (data:any) => {
          this.partnerUserList = data;
      }
    );
  }

  // 담당업체 체크박스
  userSelectChanged3(ev, item) {
    var index = this.tempSelectedUserList3.findIndex(element => {
      
      return (element.user_typ == item.user_typ && element.user_no == item.user_no) || (element.user_nm == item.user_nm && element.cp_no == item.cp_no);
    });

    if(ev.target.checked) {
      if(index < 0) {
        this.tempSelectedUserList3.push(item);
        //  this.tempSelectedUserList3.checked = false;
      }
    }
    else {
      if(index > -1) {
        this.tempSelectedUserList3.splice(index, 1);
      }
    }
  }

  // 담당업체 선택
  selectTempUsers3() {
    if(this.tempSelectedUserList3.length == 0) {
      alert('선택된 담당자가 없습니다.');
      return ;
      }
      
      this.tempSelectedUserList3.forEach(element => {
        this.addRow(3,element);
      });
  
      this.tempSelectedUserList3 = [];
      this.modalService.dismissAll();
  }
}
