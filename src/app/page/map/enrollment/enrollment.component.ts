import { Component, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges, DoCheck, Input, Renderer, ViewChild , ElementRef } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { UserProvider } from '../../../providers/user';
import { ONESTOP_COMPLATE_CITIZENMSG} from '../../../../config';
import { LoginSession } from '../../../services/login.session';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MapProvider } from '../../../providers/map';
import { MaxPageSize } from '../../../../config';

declare let naver: any;
declare let daum: any;

@Component({
  selector: 'itsm-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  @Input()
  test: string;
  reportData: any = {};
  wasSuccessed: boolean = false;
  q;
  
  categoryList: Array<any> = [];
  showed_category_list: Array<any> = [];
  cateSearchTxt: string = "";
  selectedCate: any = {};
  procList: Array<any> = [];
  asgnStateList: Array<any> = [];
  replyMethod: Array<any> = [];
  dueDayMethod: Array<any> = [];
  selectedImg: string = "";
  dueDate: string = "";
  btn_description: string="";

  isCallcenterMember: boolean = false;
  callList:any = [];//콜센터 상담목록
  assign_popup_type: number = 0; // 0: 담당자 배정, 1: 직원 조회
  orgList: Array<any> = [];
  selectedOrgId: number = 1;
  selectedPopupTab: number = 4; // 0:인명, 업무검색, 1:협력업체, 2:지정담당자, 3:조직도, 4:부서별
  user_nm: string = "";
  task_nm: string = "";
  partner_nm: string = "";
  orgUserList: Array<any> = [];
  partnerUserList: Array<any> = [];
  cateUserList: Array<any> = [];
  orgDesignatedList: Array<any> = [];
  userList: Array<any> = [];
  selectedUserList: Array<any> = [];
  tempSelectedUserList: Array<any> = [];
  tempIdx: number = 0;
  will_saved_user_list: Array<any> = [];

  menualList: Array<any> = [];
  showed_menual_list: Array<any> = [];
  searchTxt: string = "";

  geocoder = new daum.maps.services.Geocoder();
  map: any = {};
  mapOptions: any = {
    level: 3,
    center: new daum.maps.LatLng(36.0190238, 129.3433917)
  };
  locationSelectItem: any = { position: {}, name: '', dongmyun: '' };
  location: any = new daum.maps.LatLng(36.0190238, 129.3433917);
  infoWindow: any = new daum.maps.InfoWindow({
    zindex:1
  });
  marker: any = {};
  search_map: string = "";

  officerNotiQueue: Array<any> = [];

  showChangeDutyPopup: boolean = false;
  duty_item: any = {
    org_no: '1',
    duty_site: '10',
    official_id: ''
  };
  locationList: Array<any> = [];
  dutyUserList: Array<any> = [];

  cate_changed: boolean = false;
  is_editable: boolean = true;
  selected_hst_img: string = "";

  ps = null;

  something_changed: boolean = false;
  //조직도 관련
  orgs: any = [];
  org:number = 1;
  depts: Array<any> = [];

  bizInfo : any = {msg:null,code:null};//비즈톡 정보
  bizInfoCitizen : any = {msg:null,code:null};//비즈톡 정보
  deptMasterUser:any;//부서별 대표 유저 정보
  talk_var_state:string = '1';//알림톡 처리상태 변수
  popupTitle: string = "";
  popupText: string = "";
  popupTextLength: number = 0;
  talk_mode:string = '1';  // 1 : 처리완료 알림톡, 0: 알림톡 전송
  send_mode:string = '0';  //0:즉시발송, 1: 예약발송
  send_check = "0";
  recv: any;
  recv_nm: string = "";
  recv_tel: string = "";
  recv_type: number = 0; // 0: 민원인, 1: 담당자
  send_type: number = 0; // 0: 문자, 1: PUSH -> SMS
  receipt_typ = '0';
  complate_citizen_msg = ONESTOP_COMPLATE_CITIZENMSG;

  picList: Array<any> = [];
  
  // 내가한것 ------------------------------------------------------

   // API값
//   place : any = {
//     place_no: "",
//     place_nm: "",
//     place_disp: "",
//     theme_cls: "",
//     theme_cls_nm: "",
//     place_cls: "",
//     place_cls_nm: "",
//     txt: "",
//     oper_state: "",
//     oper_state_nm: "",
//     place_figure: "",
//     place_figure_nm: "",
//     post_no: "",
//     addr1: "",
//     addr2: "",
//     lat: "",
//     lon: "",
//     points: "",
//     gpx_url: "",
//     img_url: "",
//     thumb_url: "",
//     open_time: "",
//     tel1: "",
//     tel2: "",
//     link_url: "",
//     ref_cd: "",
//     etc: "",
//     use_yn: "",
//     user_no: "",
//     user_nm: "",
//     reg_dttm: "",
//     upd_dttm: "",
//     place_cls_list: [
//         {
//             cls_cd: "",
//             cls_nm: ""
//         },
//         {
//             cls_cd: "",
//             cls_nm: ""
//         }
//     ],
//     place_time_list: [
//         {
//             day_cd: "",
//             day_nm: "",
//             open_time: "",
//             close_time: "",
//             day_off: ""
//         },
//         {
//             day_cd: "",
//             day_nm: "",
//             open_time: "",
//             close_time: "",
//             day_off: ""
//         },
//         {
//             day_cd: "",
//             day_nm: "",
//             open_time: "",
//             close_time: "",
//             day_off: ""
//         },
//         {
//             day_cd: "",
//             day_nm: "",
//             open_time: "",
//             close_time: "",
//             day_off: ""
//         },
//         {
//             day_cd: "",
//             day_nm: "",
//             open_time: "",
//             close_time: "",
//             day_off: ""
//         },
//         {
//             day_cd: "",
//             day_nm: "",
//             open_time: "",
//             close_time: "",
//             day_off: ""
//         },
//         {
//             day_cd: "",
//             day_nm: "",
//             open_time: "",
//             close_time: "",
//             day_off: ""
//         },
//         {
//             day_cd: "",
//             day_nm: "",
//             open_time: "",
//             close_time: "",
//             day_off: ""
//         }
//     ]
// }

  @ViewChild("inputFile1") inputFile1: ElementRef;
  place : any = [];

  //운영시간 , 요일별설정 선택값
  daytype: string = "1";

  // --분류변수--
  // 대분류
  place_cls1 = -1; 

  // 대분류 값들 넣는곳
  bigdata:Array<any> = []; 

  // 대분류에 맞는 소분류값
  smallpart:any;
  
  // ..
  tempSelectedUserList1: Array<any> = [];
  selectedLinkList: Array<any> = [];


  // 위도, 경도좌표
  lat;
  lon;
  addr1;

  // 시간설정 라디오버튼 
  daycheck: boolean = false;

  // 소분류 삭제할 배열
  data : any = {
    cls_nm: "",
  }

  no : any = {
    place_no: ""
}

  // 페이징변수
  total: number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;


  // 리뷰리스트
  reViewlist = [];



  

  // 모름
  tmp_flag = false;
  constructor(private mapprovider: MapProvider, private resourceService: ResourceService, private route: ActivatedRoute, 
    private router: Router, private userProvider: UserProvider, private cdRef: ChangeDetectorRef,  public ref: ChangeDetectorRef, 
    public loginSession: LoginSession,public renderer: Renderer, private session: LoginSession, private modalService: NgbModal) { }

  ngOnInit() {
    // place에서 리스트 클릭시 번호체크 + 해당 데이터를 가져옴
    this.route.queryParams.subscribe(no=>{
      // console.log("no.place_no=>"+JSON.stringify(no.place_no));
      
      // place_no이 없으면 장소등록창, 잇으면 장소수정창
      this.no.place_no = no.place_no;
      // console.log("this.no.place_no-=>"+JSON.stringify(this.no.place_no));
      if(no){
        this.mapprovider.place.get(no.place_no)
        .subscribe((data:any)=>{
          // API전체값
          this.place ={...data};

          // DB의 대분류와 view에서 대분류 select비교용
          this.data ={...data};

          // 이미지값 넘기기
          if(data.img_url){
          this.picList = [data.img_url];
          }

          this.reView();

          // 요일별 설정
          this.place.place_time_list = data.place_time_list;

          // 여기서 나중에 이미지값 넣는것도 해야할듯
          // this.=this.picList


          // console.log("this.place=>"+JSON.stringify(this.place));

         // console.log("JSON.stringify(this.place) => " + JSON.stringify(this.place))// 디비에서넘겨받은값
          // console.log("JSON.stringify(data) => " + JSON.stringify(data));
          // console.log("JSON.stringify(this.place) =>" +  JSON.stringify(this.place));
          // // console.log("JSON.stringify(data.place_time_list) => " + JSON.stringify(data.place_time_list));
          // console.log(" => " + JSON.stringify(this.place));
          // console.log(" => " + JSON.stringify(this.place.place_time_list));
          // console.log("123 => " + (this.place.place_time_list[7].day_off));
          // console.log("456 => " + JSON.stringify(this.place.place_time_list[7].open_time));
          // if(this.place.place_cls_nm != data1.place_cls_nm){
          //   console.log(1);
          // }
          // else if (this.place.place_cls_nm != data1.place_cls_nm){
          //   console.log(2);
          // }
          
          //  console.log("this.place=>" + JSON.stringify(this.place) );
          //  console.log("data.addr1=>" + JSON.stringify(data.addr1) );

            // console.log("data1.place_cls_cd=>" + JSON.stringify(data1.place_cls));
            // console.log("this.place.place_cls_cd=>" + JSON.stringify(this.place.place_cls));
            // console.log("this.place.place_cls_list[0].cls_nm=>" + JSON.stringify(this.place.place_cls_list[0].cls_nm));
            // console.log("this.place.place_cls_list=>" + JSON.stringify(this.place.place_cls_list.cls_cd));
            // console.log("this.place.place_cls_list=>" + JSON.stringify(this.place.place_cls_list.cls_nm));
            // console.log("this.place.place_cls_nm=>" + this.place.place_cls_nm);
        });
      }
    });


    // 대분류
    this.bigPart();

    // 요일별 휴무 체크예정
    //this.dayoff();

    // 리뷰
    this.reView();




    // 확인해야함
    this.ps = new daum.maps.services.Places();
    this.getDueDayMethod();
    this.getProc();
    this.getOrg();
    this.getAsgnState();
    this.getLocation();
  }
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
  openModal(content, size = null, customClass=null){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:size, windowClass:customClass }).result.then((result) => {
      // console.log(`Closed with: ${result}`);
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

  // onChange(event :Event){
  //   console.log("aaa");
  //   this.something_changed = true;
  // }


  bigCate(){
    if(this.place.place_cls != this.data.place_cls){
      this.place.place_cls_list= [];
    }
    else if(this.place.place_cls == this.data.place_cls){
      this.place.place_cls_list = this.data.place_cls_list;
    }
  }

  textareaInput(ev, from, item = null) {
    try {
      if(from == 'res') {
        this.reportData.answer_txt = ev.target.value;
      }
      else if(from == 'proc_txt') {
        item.proc_txt = ev.target.value;
        item.edited = true;
      }
    } catch (e) {
      console.info('could not set textarea-value');
    }
  }

  get complaintTextValue () {
    return this.reportData.complaints_txt;
  }

  set complaintTextValue (v) {
    try {
      this.reportData.complaints_txt = v;
    }
    catch(e) {

    };
  }

  refresh() {
    if(this.something_changed){
      let r = confirm("작성한 내용을 취소하고 새로 등록을 하시겠습니까?");
      if (r == true) {
        //this.router.navigate(['/onestop/report'], {queryParams: {no:0}});
        //this.router.navigate(['/onestop/report'], { replaceUrl: true });
        this.refreshItem();
      }
    }else{
      //this.router.navigate(['/onestop/report'], {queryParams: {no:0}});
      this.refreshItem();
    }
  }

  refreshItem(){
    this.reportData = {};
    this.locationList = [];
    this.dutyUserList = [];
    this.selectedUserList = [];
    this.locationSelectItem = { position: {}, name: '', dongmyun: '' };
    this.selectedCate = {};
    this.reportData.receipt_typ = 2;
    this.reportData.open_yn = 'N';
    this.reportData.proc_state = "0";
    this.reportData.return_mthd = "1";
    this.reportData.receipt_mthd = "2";
    this.reportData.due_day = "5"
    this.cdRef.detectChanges();

    this.something_changed = false;
    this.is_editable = true;

  }


  getDueDayMethod() {
    this.resourceService.getCode('515')
    .then((_:any) => this.dueDayMethod = _)
    .catch(err => console.error(err));
  }


  getProc() {
    this.resourceService.getCode('510')
    .then((_:any) => this.procList = _)
    .catch(err => console.error(err));
  }


  // getOrg() {
  //   this.resourceService.getOrg(4)
  //   .then((_:any) => {
  //     this.orgList = _;
  //     this.selectedOrgId = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
  //   });
  // }

  getLocation() {
    this.resourceService.getCode('590')
    .then((_:any) => this.locationList = _);
  }

  getAsgnState() {
    this.resourceService.getCode('560')
    .then((_:any) => this.asgnStateList = _);
  }

  getDeptUser(dept) {
    this.resourceService.getDeptUser(dept.id, dept.orgNo)
    .then((_:any) => {
      this.userList = [];
      this.userList = _;
    })
    .catch(err => console.error(err));
  }

  getOrgUser(selectedPopupTab = this.selectedPopupTab) {
    if (selectedPopupTab == 0) {
      if (this.selectedOrgId == -1) {
        alert('기관을 선택해주세요.');
        return;
      }
      // else if (this.user_nm.length < 2 && this.task_nm.length < 2) {
      //   alert('담당자 혹은 담당업무를 2자 이상 입력해주세요');
      //   return;
      // }
    }
    this.userProvider.getAll(selectedPopupTab, this.selectedOrgId, this.q, null, this.partner_nm)
    .subscribe(
      (data:any) => {
        if (selectedPopupTab == 0)
          this.orgUserList = data;
        else if(selectedPopupTab == 1){
          this.partnerUserList = data;
        }else if(selectedPopupTab == 4){
          this.orgDesignatedList = data;
        }
      }
    );
  }


  changePopupTab(idx) {
    this.selectedPopupTab = idx;
  }


  // 만든곳 -------------------------------------------------------------------

  // 돌아기기
  goback() {
    alert('취소하고 장소 관리 페이지로 갑니다.')
    this.router.navigate(['map/place'])
  }
  // 저장후 관리페이지로 이동
  saveback(){
    this.router.navigate(['map/place'])
  }

  // 저장
  save(){
    if (confirm(this.no.place_no ? "수정하시겠습니까?" : "추가하시겠습니까?")) {
      // form방식으로함
      let formData: FormData = new FormData();

      // 이미지 
      let img_urls: FileList = this.inputFile1.nativeElement.files;

      let postData = {
            ...this.place
           };
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
            console.log("key => " + JSON.stringify(postData));
          }
          
          // console.log("postData => " + JSON.stringify( postData));

          // 이미지도 API에 삽입하는듯?
          if (img_urls.length > 0){
            console.log('img');
            let img_url: File = img_urls[0];

            formData.append('file', img_url, img_url.name);
          }

          this.mapprovider.place.post(formData).subscribe(_=>{
            alert('저장되었습니다.');
            this.saveback();
          }, err=>{
            alert('저장실패!');
            // console.log("...this.place333 => "+ JSON.stringify(this.place));
            console.log(JSON.stringify(_));
          });
        }
      }

  // 대분류 select
  bigPart() {
    this.bigdata = [];
    this.mapprovider.cls.getSearch(1)
    .subscribe((level1:any)=>{
      this.mapprovider.cls.getSearch(2) 
      .subscribe((level2:any)=>{

           let customlv1 = []; // api에있는 데이터를 담을 배열 93p에서 push하여 사용할예정

          level2.forEach(element => {
            customlv1.push({
              ...element,                                    // ...-> 객체 주소복사 / 그러니까 http://itsmpohang.hssa.me:9001/map/place_cls/all/2 에서
                                                            // 있는걸 전부다 가져옴 cls_cd, cls_nm, use_yn까지..)
              lvl: 2,                                        // 레벨2 즉, 두번째 서브메뉴
              sub: []
            });
            // tslint:disable-next-line: triple-equals
            // if(this.place.place_cls1 == '1'){
            //   let smallpart1 = ;
            // }
            if(element.upper_cd = "1"){
              // console.log("JSON.stringify(element.cls_cd) 111=> "+JSON.stringify(element.cls_cd));
              // console.log("JSON.stringify(element.cls_nm) 111 => "+JSON.stringify(element.cls_nm));
            }
            // console.log("JSON.stringify(element) => "+JSON.stringify(element));
            // console.log("JSON.stringify(element.cls_cd) 222 => "+JSON.stringify(element.cls_cd));
            // console.log("JSON.stringify(element.cls_nm) 222=> "+JSON.stringify(element.cls_nm));
          });                                                // 요약 - 두번째 서브메뉴 선언 + 출력(tree-view에서)을 해줌

          // forEach가 2개있는데 연결 for문이 아니고 별개의 for문임

          level1.forEach(element => {
            let item = {
               ...element,
              lvl: 1,                                         // 레벨1 즉, 첫번째 서브메뉴
              sub:[],
              lv2:  customlv1.filter(lv2=>{                   // customlv2에서 조건에 맞는거만 리턴시킨다.
                return lv2.upper_cd == element.cls_cd;        // 조건은 lv2.upper_cd와 element.cls_cd가 맞는것만
                                                              // ex. 생활은 cls_cd가 1이고 주민센터는 upper_cd가 1이라서 연결해주는것
              })
            }                                                 // 요약 - 첫번째 서브메뉴선언 + 조건에 맞는것만 첫번째 서브메뉴에 두번째 서브메뉴를 정의 및 붙여주고 출력(tree-view에서)함
            this.bigdata.push(item);
            // console.log("JSON.stringify(this.bigdata) => " + JSON.stringify(this.bigdata))
          });
         });
    });
  }

  // 소분류 모달창
    openAsgnPopup2(content, i, type) {
      this.tempIdx = i;
      this.assign_popup_type = type;
      
      this.mapprovider.cls.getSearch(2, this.place.place_cls).subscribe(lv2=>{
        this.smallpart = lv2;
        // console.log("smallpart=>"+JSON.stringify(this.smallpart));
        
      this.openModal(content, null, 'customModal');
      })

    }

  //  체크박스
  userSelectChanged(ev, item) {
    // console.log("ev->"+JSON.stringify(ev));
    // console.log("체크박스 item=>"+ JSON.stringify(item));

    var index = this.tempSelectedUserList1.findIndex(element => {
      return (element.cls_cd == item.cls_cd && element.cls_nm == item.cls_nm);
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

  //  선택
  selectTempUsers() {
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

  // 소분류 - 선택된 내용들
  addRow(link_cls,user) {
    var item = {
      ...user
  };
  console.log("addRow item = > "+ JSON.stringify(item));

  // 소분류 - 중복값 확인여부
  var index = this.place.place_cls_list.findIndex(element => {
    //  console.log("==============user============"+JSON.stringify(user)); //중복값 확인
    //  console.log("==============element============"+JSON.stringify(element));
    return (element.cls_nm == user.cls_nm && element.cls_cd == user.cls_cd);
  });

  if(index > -1 ){
    alert(user.cls_nm + ' 은(는) 이미 추가된 항목입니다.');
    return;
  }
  this.place.place_cls_list.unshift(item);
  }


  // 소분류 삭제
  deleteRow(i) {
    this.place.place_cls_list.splice(i, 1);   
    console.log(i);
  }

  // 이미지 추가
  openFile() {
    var ua = window.navigator.userAgent;
    console.log("ua=>"+ ua);
    var msie = ua.indexOf('MSIE ');
    console.log("msie=>"+ msie);
    var trident = ua.indexOf('Trident/');
    console.log("trident=>"+ trident);
    if (msie > 0 || trident > 0) {
        console.log("File=>"+JSON.stringify(this.inputFile1)); 
        this.inputFile1.nativeElement.click();
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(this.inputFile1.nativeElement, 'dispatchEvent', [event]);
      console.log("asdfasdfasdfasdf"+ JSON.stringify(this.inputFile1.nativeElement));
    }
  }

  // 이미지 삭제
  deleteFile(index){
    this.picList.splice(index, 1);
  }

  // 이미지
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
          if(this.picList.length < 1)
            this.picList.push(fr.result);

        }
        fr.readAsDataURL(files[0]);
      }
    }
  }

  // 주소/위치 검색
  openMap(content) {
    this.openModal(content, 'lg');
    this.search_map = this.locationSelectItem.name;
    // console.log(this.locationSelectItem.name);
    var element = this;
    setTimeout(() => {
      var container = document.getElementById('map');
      this.map = new daum.maps.Map(container, this.mapOptions);
      this.marker = new daum.maps.Marker({
        position: this.location,
        map: this.map
      });

      if (this.locationSelectItem.position.latitude && this.locationSelectItem.position.longitude) {
        this.location = new daum.maps.LatLng(this.locationSelectItem.position.latitude, this.locationSelectItem.position.longitude);
        this.searchCoordinateToAddress(this.location, element);
      }
      this.map.setCenter(this.location);
      this.map.setLevel(3);
      daum.maps.event.addListener(this.map, 'click', (e) => {
        this.searchCoordinateToAddress(e.latLng, element);
      });
    }, 0);
  }

  // 주소/위치 연결메소드
  searchCoordinateToAddress(latlng, element) {
    element.searchDetailAddrFromCoords(latlng, function (result, status) {
      
      if (status === daum.maps.services.Status.OK) {
        var detailAddr = !!result[0].road_address ? '[도로명주소] : ' + result[0].road_address.address_name +'<br/>' : '';
        detailAddr += '[지번 주소] : ' + result[0].address.address_name;

        !!result[0].road_address ?  element.locationSelectItem.name = result[0].road_address.address_name : element.locationSelectItem.name = result[0].address.address_name;
        element.locationSelectItem.position.latitude = latlng.getLat();
        element.locationSelectItem.position.longitude = latlng.getLng();
        element.locationSelectItem.dongmyun = result[0].address.region_3depth_name;

        element.searchAddrFromCoords(latlng, function (result, status) {
          if (status === daum.maps.services.Status.OK) {
            for (var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {
                //$("#mapDong").val(result[i].region_3depth_name);
                element.locationSelectItem.dongmyun = result[i].region_3depth_name;
                break;
              }
            }
          }
        })

        var content = '<div style="padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">' +
          detailAddr +
          '</div>';


        element.marker.setPosition(latlng);
        element.marker.setMap(element.map);

        element.infoWindow.setContent(content);
        element.infoWindow.open(element.map, element.marker);
        // 좌표위치 주소
        // console.log("element.locationSelectItem.name => " +element.locationSelectItem.name);
      }
    })
  }

  searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    this.geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    
    // 주소/위치, 위도, 경도 값 넘기기
    this.place.addr1 = this.locationSelectItem.name;
    this.place.lat = coords.getLat();
    this.place.lon = coords.getLng();
    // console.log("this.place.addr1 =>" +this.place.addr1)
    // console.log("this.place.lat =>" +this.place.lat)
    // console.log("this.place.lon =>" +this.place.lon)
  }

  searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  // 주소/위치 모달
  searchAddressToCoordinateInput(){
    var element = this;
    this.searchAddressToCoordinate(this.search_map, element);
   }

   // 주소/위치 모달 연결메소드
   searchAddressToCoordinate(address, element) {
    //element.geocoder.addressSearch(address, function(result, status) {
    element.ps.keywordSearch(address, function(result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === daum.maps.services.Status.OK) {
        var coords = new daum.maps.LatLng(result[0].y, result[0].x);
        element.map.setCenter(coords);
        element.searchCoordinateToAddress(coords,element);
      }else{
        return alert('주소를 확인해주세요.');
      }
    });
  }

  // 휴무가 On이 input값 제거시킬 예정
  // dayoff(){
  //   if(JSON.stringify(this.place.place_time_list[7].day_off) == '1'){
  //     this.place.place_time_list[7].open_time = [];
  //   }
  // }
  // 리뷰,신고, 데이터 등----------------------------------------------------------------------

  // 페이징 부가처리
  reView() {
    this.paging(1);
  }

  // 페이징 부가처리
  getOrg() {
    this.reView();
  }
  
  paging(page) {
    let pageIndex = page - 1;
  
    // pageNo(pageIndex) -> 현재 페이지값 / pageSize(this.pageSize) -> 전체페이지값(10)
    let queryString = `${this.place.place_no}?pageNo=${pageIndex}&pageSize=${this.pageSize}`;   
    // queryString +=  this.role ?  `&oper_state=${this.role}`: '&oper_state=1';
  
      this.mapprovider.place.getReViewlist(queryString)
      .subscribe((element:any) => {
        // total값
        //element.place_no = this.place.place_no;
        this.total = element.total;
        this.totalPage = Math.ceil(this.total/this.pageSize);
        this.collectionSize = this.totalPage * 10;

        // 배열방식으로 되어있는 data값을 list에 다 넣어줌
        this.reViewlist = element.data;
        
        // console.log("element.total => " + element.total);
        // console.log("pageIndex => " + pageIndex);
        // console.log("this.pageSize2 => "+this.pageSize);
        // console.log("this.reViewlist => "+ JSON.stringify(this.reViewlist));
      });
      // console.log("this.place.place_no => "+ JSON.stringify(this.place.place_no));
    }
}


