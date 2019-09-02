import { Component, OnInit, ChangeDetectorRef, Renderer, ViewChild , ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { LoginSession } from '../../../services/login.session';
import { NgbModal, NgbModalRef , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild("inputFile1") inputFile1: ElementRef;
  place : any = {};


  // 대분류
  place_cls1 = -1; 

  // 대분류 값들 넣는곳
  bigdata:Array<any> = []; 

  // 대분류에 맞는 소분류값
  smallpart:any;

  // 소분류 선택, 리스트
  tempSelectedUserList1: Array<any> = [];
  selectedLinkList: Array<any> = [];

  // 소분류 모달
  tempIdx: number = 0;
  assign_popup_type: number = 0; 

  // 이미지
  picList: Array<any> = [];
  is_editable: boolean = true;
  selectedImg: string = "";

  // 지도
  search_map: string = "";
  marker: any = {};
  locationSelectItem: any = { position: {}, name: '', dongmyun: '' };
  location: any = new daum.maps.LatLng(36.0190238, 129.3433917);
  infoWindow: any = new daum.maps.InfoWindow({
    zindex:1
  });
  mapOptions: any = {
    level: 3,
    center: new daum.maps.LatLng(36.0190238, 129.3433917)
  };
  map: any = {};
  geocoder = new daum.maps.services.Geocoder();

  // (지도)위도, 경도좌표
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

  //운영시간 , 요일별설정 선택값
  daytype: string = "1";

  // 페이징변수
  total: number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;

  // 리스트클릭변수
 
  receipt_typ: string = "0";


  // 리뷰리스트
  reViewlist = [];

  // 오류신고리스트
  reErrorlist = [];

  // 불편신고리스트
  reInconlist = [];

  // 리스트3개클릭시 모달, 객체변수
  body: any = {};
  modal: NgbModalRef;

  // 리뷰, 오류신고, 불편신고 리스트내용 받을 값
  review_no ;
  place_no ;
  txt ;
  user_nm ;
  reg_dttm ;
  upd_dttm ;
  rate_score ;
  report_no;
  complaint_no;
  proc_state ; 
  // org:number = 1;
  // ps = null;

  // ---------------------------------------------------
  constructor(private mapprovider: MapProvider, private route: ActivatedRoute, private router: Router, public ref: ChangeDetectorRef,
    public loginSession: LoginSession,public renderer: Renderer, private modalService: NgbModal) { }

  ngOnInit() {
    // place에서 리스트 클릭시 번호체크 + 해당 데이터를 가져옴
    this.route.queryParams.subscribe(no=>{
      // console.log("no.place_no=>"+JSON.stringify(no.place_no));
 
      // place_no이 없으면 장소등록창, 잇으면 장소수정창
      this.no.place_no = no.place_no;
      // console.log("this.no.place_no-=>"+JSON.stringify(this.no.place_no));
      if(no.place_no){
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

          // 요일별 설정
          this.place.place_time_list = data.place_time_list;

          // 리뷰
          this.reView();

          // 오류신고
          this.reError();

          // 불편신고
          this.reIncon();
        });
      }
      else
      {
        this.place = {
          place_cls : 1
        }
      }
    });


    // 대분류
    this.bigPart();

    // 요일별 휴무 체크예정
    //this.dayoff();

    // 리뷰
    this.reView();

    // 오류신고
    this.reError();

    // 불편신고
    this.reIncon();

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
            if(element.upper_cd = "1"){
            }
          });


          level1.forEach(element => {
            let item = {
               ...element,
              lvl: 1,
              sub:[],
              lv2:  customlv1.filter(lv2=>{
                return lv2.upper_cd == element.cls_cd;
              })
            }
            this.bigdata.push(item);
          });
         });
    });
  }

    // 대분류선택시 소분류를 비우거나 기존 대분류 DB값이 일치할때는 유지
    bigCate(){
      if(this.place.place_cls != this.data.place_cls){
        this.place.place_cls_list= [];
      }
      else if(this.place.place_cls == this.data.place_cls){
        this.place.place_cls_list = this.data.place_cls_list;
      }
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

  // 모달창
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

  // 리뷰 페이징
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
        this.total = element.total;
        this.totalPage = Math.ceil(this.total/this.pageSize);
        this.collectionSize = this.totalPage * 10;

        // 배열방식으로 되어있는 data값을 list에 다 넣어줌
        this.reViewlist = element.data;
        
      });
    }

  // 오류신고 페이징
  reError() {
    this.paging2(1);
  }

  // 페이징 부가처리
  // getOrg() {
  //   this.reView();
  // }
  
  paging2(page) {
    let pageIndex = page - 1;
  
    // pageNo(pageIndex) -> 현재 페이지값 / pageSize(this.pageSize) -> 전체페이지값(10)
    let queryString = `${this.place.place_no}?pageNo=${pageIndex}&pageSize=${this.pageSize}`;   
    // queryString +=  this.role ?  `&oper_state=${this.role}`: '&oper_state=1';
  
      this.mapprovider.place.geterrorlist(queryString)
      .subscribe((element:any) => {
        // total값
        this.total = element.total;
        this.totalPage = Math.ceil(this.total/this.pageSize);
        this.collectionSize = this.totalPage * 10;

        // 배열방식으로 되어있는 data값을 list에 다 넣어줌
        this.reErrorlist = element.data;
      });
    }

  // 오류신고 페이징
  reIncon() {
    this.paging3(1);
  }
  
  paging3(page) {
    let pageIndex = page - 1;
  
    // pageNo(pageIndex) -> 현재 페이지값 / pageSize(this.pageSize) -> 전체페이지값(10)
    let queryString = `${this.place.place_no}?pageNo=${pageIndex}&pageSize=${this.pageSize}`;   
    // queryString +=  this.role ?  `&oper_state=${this.role}`: '&oper_state=1';
  
      this.mapprovider.place.getinconlist(queryString)
      .subscribe((element:any) => {
        // total값
        this.total = element.total;
        this.totalPage = Math.ceil(this.total/this.pageSize);
        this.collectionSize = this.totalPage * 10;

        // 배열방식으로 되어있는 data값을 list에 다 넣어줌
        this.reInconlist = element.data;
      });
    }


  // 리뷰, 오류신고, 불편신고 클릭시 상세정보
    select(item) {
      // 리뷰번호
      this.review_no = item.review_no;
      // 게시글번호
      this.place_no = item.place_no;
      // 내용
      this.txt = item.txt;
      // 작성자
      this.user_nm = item.user_nm;
      // 평점
      this.rate_score = item.rate_score;
      // 등록일자
      this.reg_dttm = item.reg_dttm;
      // 수정일자
      this.upd_dttm = item.upd_dttm;
      // 오류신고번호
      this.report_no = item.report_no;
      // 불편신고번호
      this.complaint_no = item.complaint_no;
      // 모르는데 일단 가져옴(불편신고값)
      this.proc_state = item.proc_state;

      console.log("item = > " + JSON.stringify(item))
    }
  
    open(content) {
      this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    }
}


