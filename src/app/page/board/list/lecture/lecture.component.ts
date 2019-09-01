import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { CKEditorComponent } from '../../../../itsm-ui/public_api';
import { NgbModal, ModalDismissReasons, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DAUM_MAP_API_KEY, UserSearchForm } from '../../../../../config';
import { SocietyProvider } from '../../../../providers/society';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { isNumber } from 'util';
// import { DateFormatPipe, AddPipe, SubtractPipe } from 'angular2-moment';
import * as moment from 'moment';

declare const daum;
declare let naver: any;

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class ListLectureComponent implements OnInit {
  @ViewChild('saveForm') saveForm: FormControl;
  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild("inputImage") inputImage: ElementRef;
  @ViewChild('ck') ck: CKEditorComponent;

  info: any = {
    cmnt_yn: "0", copyright_txt: "4", end_dt: "9999-12-31", open_target: "1", beacon_yn: '0', post_div: "1", post_state: "2", research_yn: "0", staff_open_yn: "0", start_dt: "2018-07-07", subj: "", post_txt: "", attend_cd: null
  };
  thumbInfo: any = { file: null, post_no: null, add_seq: null, file_nm: '', add_file_url: '', thumb_url: null, add_type: 1 };
  image: any;
  fileInfo: Array<any> = [{ file: null, post_no: null, add_seq: null, file_nm: '', add_file_url: '', thumb_url: null, add_type: 2 }];
  hashTag: Array<any> = [];
  beacons: Array<any> = []; // 해당 post의 비콘 리스트 
  beacons_d: Array<any> = []; // 삭제할 비콘 리스트
  beaconDevice = []; //전체 (해당 post의 society로 거름) 비콘 리스트
  applInfo: any = { state: '0', appl_txt: '', mbr_only_yn: '0', start_dttm: '', end_dttm: '', appl_cnt: 0, cls_person_txt: '', online_cnt: 0, select_typ: '1', payment_typ: '', online_yn: '0', person_restrict_cnt: 1 }; //신청 접수 설정 정보 
  memberCls_d = []; //해당 post의 회원 코드 리스트
  memberCls = []; //삭제할 회원 코드 리스트
  options: any = {};
  optionsAppl: any = {};
  optionsmemberCls: any = [{ mbr_typ: 0 }];
  addItem: Array<String> = [];
  addItemInfo: string = "";
  schedule: any = [];
  scheduleInfo: any = { post_no: '', beacon_yn: 0, cls_dt: '', start_dt: '', end_dt: '', cls_str_tm: '', cls_end_tm: '', in_str_tm: '', in_end_tm: '', out_str_tm: '', out_end_tm: '', in_bound: 0, out_bound: 0 }
  schInputType: number = 1;
  week = [{ key: 1, value: false, nm: '월' }, { key: 2, value: false, nm: '화' }, { key: 3, value: false, nm: '수' }, { key: 4, value: false, nm: '목' }, { key: 5, value: false, nm: '금' }, { key: 6, value: false, nm: '토' }, { key: 0, value: false, nm: '일' }];
  yesOrNo = [{ value: '1', nm: '허용' }, { value: '0', nm: '허용(X)' }];
  yesOrNoMbr = [{ value: '1', nm: '회원전용' }, { value: '0', nm: '회원전용(X)' }];
  yesOrNoBeacon = [{ value: '1', nm: '사용' }, { value: '0', nm: '사용(X)' }];
  yesOrNoResearch = [{ value: '1', nm: '조사' }, { value: '0', nm: '조사(X)' }];
  yesOrNoOnline = [{ value: '1', nm: '온라인' }, { value: '0', nm: '오프라인' }];
  kogl = [{ value: '1', image: 'assets/images/kogl/1.jpg', nm: '1유형 : 출저표시(상업적 이용 및 변경 가능)' },
  { value: '2', image: 'assets/images/kogl/2.jpg', nm: '2유형 : 출저표시 + 상업적이용금지' },
  { value: '3', image: 'assets/images/kogl/3.jpg', nm: '3유형 : 출저표시 + 변경금지' },
  { value: '4', image: 'assets/images/kogl/4.jpg', nm: '4유형 : 출저표시 + 상업적이용금지 + 변경금지' },
  { value: '0', image: 'assets/images/kogl/0.jpg', nm: '자유이용 불가(저작권법 제24조의 제 1항 중 하나에 해당됨)' }
  ];

  showAlert = false;
  saveResult = false;
  saveString: string;
  closeResult: string;

  society_no: number;
  board_tab: number;
  board_typ: number;
  post_no: number;

  map: any = {};
  mapOptions: any = {
    level: 3,
    center: new daum.maps.LatLng(36.0190238, 129.3433917)
  };

  location: any = new daum.maps.LatLng(36.0190238, 129.3433917);
  infoWindow: any = new daum.maps.InfoWindow({
    zindex:1
  });
  geocoder = new daum.maps.services.Geocoder();
  marker: any = {};
  search_map: string = "";
  ps = new daum.maps.services.Places();

  isAppl: boolean = false;
  modalReference: any;

  sex = [{ value: 'M', nm: '남자' }, { value: 'F', nm: '여자' }];

  constructor(private ref: ChangeDetectorRef, private society: SocietyProvider, private route: ActivatedRoute, private modalService: NgbModal, public renderer: Renderer, public router: Router, private ngbFormatter: NgbDateParserFormatter) { }
  ngOnInit() {
  }
  OnEditorLoaded() {
    this.route.queryParams.subscribe(
      params => {
        if (params['society_no']) {
          this.info.society_no = this.society_no = params.society_no;
        }
        if (params['board_tab']) {
          this.info.board_tab = this.board_tab = params.board_tab;
        }
        if (params['board_typ']) {
          this.info.board_typ = this.board_typ = params.board_typ;
        }
        if (params['post_no']) {
          this.info.post_no = this.post_no = params.post_no;
        }
      }
    )
    //게시물에 필요한 옵션들 
    //게시 분류, 공개 범위 분류, 게시 상태 분류, 출결 체크 방식, 행정 구역 선택 옵션, 회원 분류 조회
    this.society.board.post.getOptions(this.society_no)
      .subscribe((data: any) => {
        this.options = data;
        this.optionsmemberCls = data.mbr_cls;
        this.optionsmemberCls.forEach(element => { element.new = true; element.selected = false });
      });

    //비콘 리스트 
    this.society.board.post.beacon.getBeacons(this.society_no)
      .subscribe((data: any) => {
        this.beaconDevice = data;
        this.beaconDevice.forEach(element => { element.new = true; element.selected = false });
      });

    //신청,접수에 필요한 옵션들 
    //게시물 진행 상태, 온라인 선발 방식,  결제 방식 조회
    this.society.board.post.appl.getOptions(this.society_no)
      .subscribe(data => {
        this.optionsAppl = data;
      });
    //start_dt가 not null이라서 등록당일 값 넣어줌 
    this.info.start_dt = new Date().toISOString().slice(0, 10);
    this.info.end_dt = new Date().toISOString().slice(0, 10);
    this.applInfo.start_dt = new Date().toISOString().slice(0, 10);
    this.applInfo.end_dt = new Date().toISOString().slice(0, 10);
    this.applInfo.start_tm = '09:00';
    this.applInfo.end_tm = '18:00';
    if (this.post_no)
      this.getPost(this.post_no);

  }

  getPost(no) {
    this.society.board.post.lecture.get(no, this.society_no)
      .subscribe((data: any) => {
        this.info = data.list[0];
        if (data.thumb.length != 0) //썸네일 있을때 만 
          this.thumbInfo = data.thumb[0];
        if (data.file.length != 0) // 파일 있을때 만 
          this.fileInfo = data.file;
        if (data.list[0].hash_tag) {
          let temp: Array<any> = data.list[0].hash_tag.split(',');
          temp.forEach((element, idx) => {
            this.hashTag.push({ display: element, id: idx });
          });
        }
        if (data.beacon.length != 0) { //비콘 있을 때 만 
          this.beacons = data.beacon;
          this.beacons.forEach(element => { element.selected = true, element.new = false });
        }
        if (data.memberCls.length != 0) { //공개 설정에서 회원공개시 회원 종류 
          this.memberCls = data.memberCls;
          this.memberCls.forEach(element => { element.selected = true, element.new = false; element.mbr_typ = parseInt(element.mbr_typ) });
        }
        if (data.schedule.length != 0)  //수업 시간표 
          this.schedule = data.schedule;
        if (this.info.district_cd)
          this.info.district_nm = this.options.districts.find(x => x.district_cd == this.info.district_cd).district_nm;
        //신청ㆍ접수 정보 가지고 오기 
        this.society.board.post.appl.get(no)
          .subscribe((data: any) => {
            if (data.list) {
              this.applInfo = data.list;
              this.isAppl = true;
              this.applInfo.start_dt = moment(this.applInfo.start_dttm).format('YYYY-MM-DD');
              this.applInfo.end_dt = moment(this.applInfo.end_dttm).format('YYYY-MM-DD');
              this.applInfo.start_tm = moment(this.applInfo.start_dttm).format('HH:mm');
              this.applInfo.end_tm = moment(this.applInfo.end_dttm).format('HH:mm');
            }
            if (data.add_item)
              this.addItem = data.add_item.filter(_ => _);
          });
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //썸네일 
  checkImageType($event) {
    let files: FileList = $event.target.files;
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
          this.thumbInfo = { file: file, file_nm: file.name, post_no: null, add_seq: null, add_file_url: null, thumb_url: null, add_type: 1 };
          this.ref.detectChanges();
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }
  openImage() {
    if (this.image || this.thumbInfo.add_file_url) {
      alert('기존 썸네일 삭제 후 추가해 주세요');
      return;
    }
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
      this.inputImage.nativeElement.click();
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(this.inputImage.nativeElement, 'dispatchEvent', [event]);
    }
  }

  //파일 
  checkFileType($event) {
    let files: FileList = $event.target.files;
    if (files.length > 0) {
      let file: File = files[0];
      var fr = new FileReader();
      fr.onload = () => {
        if (this.fileInfo.length == 1 && this.fileInfo[0].file_nm == '')
          this.fileInfo.pop();
        this.fileInfo.push({ file: file, file_nm: file.name, post_no: null, add_seq: null, add_file_url: null, thumb_url: null, add_type: 2 })
        this.ref.detectChanges();
      }
      fr.readAsDataURL(files[0]);
    }
  }
  openFile() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
      this.inputFile.nativeElement.click();
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(this.inputFile.nativeElement, 'dispatchEvent', [event]);
    }
  }
  //썸네일 혹은 파일 삭제 시 
  deleteFile(content, index, item, isImage: boolean = true) {
    if (item.file_nm == '')
      return;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (item.file == undefined || item.file == null) {
        this.society.board.post.filedelete(item.post_no, item.add_seq, isImage ? item.thumb_url : item.add_file_url)
          .subscribe(_ => {
            console.log('deleteFile succeed');
          }, err => {
            console.log('deleteFile failed');
            console.error(err);
          });
      }
      if (isImage) {
        this.thumbInfo = {};
        this.image = null;
      }
      else
        this.fileInfo.splice(index, 1);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });;
  }

  //게시물 저장 시 
  async save() {
    if (this.isAppl && (this.applInfo.start_dt == '' || this.applInfo.end_dt == '')) {
      alert('신청접수 등록의 온라인 접수기간을 입력해 주세요.');
      return;
    }
    if (this.isAppl && (this.applInfo.start_tm == '' || this.applInfo.end_tm == '')) {
      alert('신청접수 등록의 온라인 접수시간을 입력해 주세요.');
      return;
    }
    if (this.info.open_target == 2 && this.memberCls.length == 0) {
      alert('공개 범위를 기관 단체 회원으로 설정 시 회원 종류를 추가 해야합니다. ');
      return;
    }
    //게시판 제목 중복 체크 (수정할 경우에는 해당 포스트 외의 제목과 중복 체크)
    // try {
    //   await this.society.board.post.subjDupCheck(this.info.subj, this.info.post_no, this.society_no, this.info.board_tab, this.info.board_typ).toPromise();     
    // }catch(err){
    //   alert('게시판 제목이 중복됩니다.');
    //   return;
    // }

    try {

      this.info.hash_tag = this.hashTag.map(e => e.display).join(", ");
      this.applInfo.start_dttm = this.applInfo.start_dt + ' ' + this.applInfo.start_tm;
      this.applInfo.end_dttm = this.applInfo.end_dt + ' ' + this.applInfo.end_tm;
      let formData: FormData = new FormData();

      for (let key in this.info) {
        formData.append(key, this.info[key]);
      }

      if (this.thumbInfo.file)
        formData.append('image', this.thumbInfo.file, this.thumbInfo.file.name);

      this.fileInfo.forEach((element) => {
        if (element.file)
          formData.append('file', element.file, element.file.name);
      })

      //post 부분 저장 
      let result: any = await this.society.board.post.lecture.post(formData).toPromise()
      this.post_no = JSON.parse(result).post_no;

      // beacon 부분 저장 
      this.beacons_d.forEach(async (element) => {
        if (!element.new) {
          await this.society.board.post.beacon.delete(this.post_no, element.beacon_no).toPromise()
        }
      });

      this.beacons.forEach(async (element) => {
        element.post_no = this.post_no;
        if (element.new)
          await this.society.board.post.beacon.post(_.cloneDeep(element)).toPromise()
      });

      // 공개 범위를 기관 단체회원으로 설정 시 회원 종류 부분 저장 
      this.memberCls_d.forEach(async (element) => {
        if (!element.new) {
          await this.society.board.post.mbrCls.delete(this.post_no, element.mbr_typ).toPromise()
        }
      });

      this.memberCls.forEach(async (element) => {
        element.post_no = this.post_no;
        if (element.new)
          await this.society.board.post.mbrCls.post(_.cloneDeep(element)).toPromise()
      });

      this.schedule.forEach(async (element) => {
        element.post_no = this.post_no;
        await this.society.board.post.lecture.postSch(element).toPromise()
      });

      //appl 부분(신청ㆍ접수) 저장 
      if (this.isAppl) {
        this.applInfo.post_no = this.post_no
        this.applInfo.add_item1 = this.addItem[0] ? this.addItem[0] : null;
        this.applInfo.add_item2 = this.addItem[1] ? this.addItem[1] : null;
        this.applInfo.add_item3 = this.addItem[2] ? this.addItem[2] : null;
        this.applInfo.add_item4 = this.addItem[3] ? this.addItem[3] : null;
        this.applInfo.add_item5 = this.addItem[4] ? this.addItem[4] : null;
        await this.society.board.post.appl.post(this.applInfo).toPromise();
      }

      this.saveResult = true;
      this.saveString = '저장 성공 ! '
      await setTimeout(() => { this.goList() }, 1000);

    } catch (err) {
      if (err === 'no_auth')
        this.saveString = '권한이 없습니다.'
      else
        this.saveString = '저장 실패 !'
      this.saveResult = false;

      console.error(err)
    }
  }

  //게시물 삭제시 
  async delete() {
    try {
      await this.society.board.post.lecture.delete(this.post_no, this.info.post_div).toPromise();
      if (this.applInfo.post_no)
        await this.society.board.post.appl.delete(this.post_no).toPromise();
      // beacon 부분 삭제 
      this.beacons_d.forEach(async (element) => {
        if (!element.new) {
          await this.society.board.post.beacon.delete(this.post_no, element.beacon_no).toPromise()
        }
      });
      this.beacons.forEach(async (element) => {
        if (!element.new)
          await this.society.board.post.beacon.delete(this.post_no, element.beacon_no).toPromise()
      });

      // 공개범위가 기관회원공개 일시 회원 분류 부분 삭제/ 기관회원 공개가 아니지만 회원 분류가 존재 할 수 도 있으므로 모두 삭제 한다.  
      this.memberCls_d.forEach(async (element) => {
        if (!element.new) {
          await this.society.board.post.mbrCls.delete(this.post_no, element.mbr_typ).toPromise()
        }
      });
      this.memberCls.forEach(async (element) => {
        element.post_no = this.post_no
        if (!element.new)
          await this.society.board.post.mbrCls.post(_.cloneDeep(element)).toPromise()
      });
      this.saveString = '삭제 성공 !'
      this.saveResult = true;
      await setTimeout(() => { this.goList() }, 1000);

    } catch (err) {
      if (err === 'no_auth')
        this.saveString = '권한이 없습니다.'
      else
        this.saveString = '삭제 실패 !'
      this.saveResult = false;
    }
  }

  //주소 가지고 오기 위해 
  openMap(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    var element = this;
    setTimeout(() => {
      var container = document.getElementById('map');
      this.map = new daum.maps.Map(container, this.mapOptions);
      this.marker = new daum.maps.Marker({
        position: this.location,
        map: this.map
      });

      if (this.info.latitude && this.info.longitude) {
        this.location = new daum.maps.LatLng(this.info.latitude, this.info.longitude);
        this.searchCoordinateToAddress(this.location, element);
      }
      this.map.setCenter(this.location);
      this.map.setLevel(3);
      /*this.SearchAddress(this.location, this.marker, this.infoWindow);
      if (this.search_map && this.search_map.length > 0) {
        this.searchAddressToCoordinate();
      }
      */
      daum.maps.event.addListener(this.map, 'click', (e) => {
        //this.SearchAddress(e.coord, this.marker, this.infoWindow);
        this.searchCoordinateToAddress(e.latLng, element);
      });
    }, 0);
  }
  /*
  SearchAddress(position, marker, infoWindow, search_map = null) {
    var tm128 = naver.maps.TransCoord.fromLatLngToTM128(position);
    naver.maps.Service.reverseGeocode({
      location: tm128,
      coordType: naver.maps.Service.CoordType.TM128
    }, (status, response) => {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }
      var items = response.result.items;
      var htmlAddresses = '';
      var item: any;
      var addrType: any;
      var selected_addr_idx = 0;
      for (var i = 0; i < items.length; i++) {
        item = items[i];
        if (item.isRoadAddress) {
          continue;
        }
        else if (!item.isRoadAddress && (item.isAdmAddress || item.address)) {
          htmlAddresses = '[지번 주소] ' + item.address;
          this.info.addr1 = item.address;
          selected_addr_idx = i;
          break;
        }
        else {
          console.error("error");
        }
      }
      marker.setPosition(position);
      if (search_map) { //검색어로 검색(도로명일때)
        infoWindow.setContent([
          '<div style="padding:10px;min-width:200px;line-height:150%;">',
          '<h4 style="margin-top:5px;">검색 주소 : ' + search_map + '</h4><br />',
          htmlAddresses
        ].join('\n'));
      } else {
        infoWindow.setContent([
          '<div style="padding:10px;min-width:200px;line-height:150%;">',
          htmlAddresses,
          '</div>'
        ].join('\n'));
      }

      infoWindow.open(this.map, marker);

      this.info.district_nm = items[items.length - 1].addrdetail.dongmyun;
      this.info.district_cd = this.options.districts.find(x => x.district_nm == this.info.district_nm).district_cd;
      this.info.latitude = position._lat;
      this.info.longitude = position._lng;
    });
  }

  searchAddressToCoordinate() {
    this.SearchByDaum()
      .then((addr: any) => {
        var addrType = '[지번 주소]';
        var point = new naver.maps.Point(addr.x, addr.y);

        this.infoWindow.setContent([
          '<div style="padding:10px;min-width:200px;line-height:150%;">',
          `<h4 style="margin-top:5px;">${addr.place_name}</h4>[도로명주소] ${addr.road_address_name}<br />[지번주소] ${addr.address_name}`
        ].join('\n'));

        this.info.addr1 = addr.road_address_name;
        let districts_check = _.find(this.options.districts, { district_nm: addr.address_name.split(' ')[3] })
        if (districts_check) {
          this.info.district_nm = districts_check.district_nm;
          this.info.district_cd = this.options.districts.find(x => x.district_nm == this.info.district_nm).district_cd;
        }
        this.info.latitude = addr.y;
        this.info.longitude = addr.x;

        this.marker.setPosition(point);
        this.map.setCenter(point);
        this.infoWindow.open(this.map, this.marker);
      })
      .catch(err => {
        console.error(err);
      })
  }

  SearchByDaum() {
    var sw = new daum.maps.LatLng(35.841296, 129.594616),
      ne = new daum.maps.LatLng(36.291604, 129.062456);
    return new Promise((resolve, reject) => {
      this.ps.keywordSearch(this.search_map, (result, status) => {
        if (status === daum.maps.services.Status.OK) {
          if (result.length)
            resolve(result[0]);
          else
            reject();
        }
      }, {
          bounds: new daum.maps.LatLngBounds(sw, ne)
        });
    });
  }
  */

 searchAddressToCoordinateInput(){
  var element = this;
  this.searchAddressToCoordinate(this.search_map, element);
 }

  searchCoordinateToAddress(latlng, element) {
    element.searchDetailAddrFromCoords(latlng, function (result, status) {
      if (status === daum.maps.services.Status.OK) {
        var detailAddr = !!result[0].road_address ? '[도로명주소] : ' + result[0].road_address.address_name +'<br/>' : '';
        detailAddr += '[지번 주소] : ' + result[0].address.address_name;


        element.info.addr1 = result[0].address.address_name;
        element.info.latitude = latlng.getLat();
        element.info.longitude = latlng.getLng();

        element.searchAddrFromCoords(latlng, function (result, status) {
          if (status === daum.maps.services.Status.OK) {
            for (var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {
                element.info.district_nm = result[i].region_3depth_name;
                element.info.district_cd = element.options.districts.find(x => x.district_nm == element.info.district_nm).district_cd;
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
      }
    })
  }

  searchAddressToCoordinate(address, element) {
   
   // element.geocoder.addressSearch(address, function(result, status) {
    element.ps.keywordSearch(address, function(result, status) {
      // 정상적으로 검색이 완료됐으면 
      if (status === daum.maps.services.Status.OK) {
        var coords = new daum.maps.LatLng(result[0].y, result[0].x);
        element.map.setCenter(coords);
        element.searchCoordinateToAddress(coords, element);
      }else{
        return alert('주소를 확인해주세요.');
      }
    });
  }
  

  searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    this.geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
  }

  searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  clearMapData() {
    this.info.addr1 = '';
    this.info.district_nm = '';
    this.info.district = '';
    this.info.latitude = '';
    this.info.longitude = '';
  }

  getDistrict() {
    this.info.district_cd = this.options.districts.find(x => x.district_nm == this.info.district_nm).district_cd;
  }

  getBeacon(content) {
    //비콘 값 입력을 위한 모달 
    this.beaconDevice.forEach(element => { element.selected = false });
    this.beacons.forEach(element => { element.selected = true });
    this.beaconDevice.unshift(..._.cloneDeep(this.beacons.filter(_ => _.selected)));
    this.beaconDevice = _.uniqBy(this.beaconDevice, 'beacon_no');
    this.beaconDevice = _.orderBy(this.beaconDevice, 'beacon_no', 'asc');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      //행사용 비콘 추가 및 삭제
      this.beacons_d.push(..._.cloneDeep(this.beaconDevice.filter(_ => !_.selected && !_.new)));
      this.beacons_d = _.uniqBy(this.beacons_d, 'beacon_no');
      this.beacons = [];
      this.beacons.push(..._.cloneDeep(this.beaconDevice.filter(_ => _.selected)));
      this.beacons = _.uniqBy(this.beacons, 'beacon_no');
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getMbrCls(content) {
    //회원 종류 입력을 위한 모달 
    this.optionsmemberCls.forEach(element => { element.selected = false; });
    this.memberCls.forEach(element => { element.selected = true; });
    this.optionsmemberCls.unshift(..._.cloneDeep(this.memberCls.filter(_ => _.selected)));
    this.optionsmemberCls = _.uniqBy(this.optionsmemberCls, 'mbr_typ');
    this.optionsmemberCls = _.orderBy(this.optionsmemberCls, 'mbr_typ', 'asc');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      //회원 종류 추가 및 삭제
      this.memberCls_d.push(..._.cloneDeep(this.optionsmemberCls.filter(_ => !_.selected && !_.new)));
      this.memberCls_d = _.uniqBy(this.memberCls_d, 'mbr_typ');
      this.memberCls = [];
      this.memberCls.push(..._.cloneDeep(this.optionsmemberCls.filter(_ => _.selected)));
      this.memberCls = _.uniqBy(this.memberCls, 'mbr_typ');
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addApplItem() {
    if (this.addItem.length != undefined && this.addItem.length == 5)
      return;
    if (this.addItemInfo) {
      this.addItem.push(this.addItemInfo);
      this.addItemInfo = '';
    }
  }

  deleteApplItem(idx) {
    this.addItem.splice(idx, 1);
  }

  getSch(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openSchInputModal(content, number, idx = null) {
    this.schInputType = number;
    if (isNumber(idx)) {
      this.scheduleInfo = _.cloneDeep(this.schedule[idx]);
      this.scheduleInfo["idx"] = idx;
    }
    else {
      this.scheduleInfo = { post_no: '', beacon_yn: '', cls_dt: '', start_dt: '', end_dt: '', cls_str_tm: '', cls_end_tm: '', in_str_tm: '', in_end_tm: '', out_str_tm: '', out_end_tm: '', in_bound: 0, out_bound: 0 }
      if (!this.info.attend_cd) {
        this.scheduleInfo.in_bound = 10;
        this.scheduleInfo.out_bound = 10;
      }
    }

    this.week.forEach(element => {
      element.value = false;
    });
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getSchedule() {
    if (this.schedule.some(_ => _.cls_dt == this.scheduleInfo.cls_dt) && this.schInputType != 3) {
      alert('일자가 중복됩니다. 일자를 클릭하여 수정해주세요. ')
      return;
    }
    if (!(this.scheduleInfo.start_dt && this.scheduleInfo.end_dt) && this.schInputType == 1) {
      alert('기간을 선택 해 주세요 ')
      return;
    }
    if (!this.scheduleInfo.cls_dt && this.schInputType != 1) {
      alert('일자를 선택 해 주세요 ')
      return;
    }
    if (!(this.scheduleInfo.cls_str_tm && this.scheduleInfo.cls_end_tm)) {
      alert('강의시간을 입력해 주세요 ')
      return;
    }
    if (!(this.scheduleInfo.in_bound && this.scheduleInfo.out_bound) && this.schInputType != 3 && this.info.attend_cd != null) {
      alert('허용시간을 입력 해 주세요 ')
      return;
    }
    if (this.week.every(_ => !_.value) && this.schInputType == 1) {
      alert('요일을 선택해 주세요')
      return;
    }

    let in_str_tm, in_end_tm, out_str_tm, out_end_tm;
    let check = this.week.filter(_ => _.value);
    let start_date = new Date(this.scheduleInfo.start_dt);
    let end_date = new Date(this.scheduleInfo.end_dt);

    this.info.start_dt = moment(this.info.start_dttm).format('YYYY-MM-DD');
    this.info.close_dt = moment(this.info.close_dttm).format('YYYY-MM-DD');
    this.info.start_tm = moment(this.info.start_dttm).format('HH:mm');
    this.info.close_tm = moment(this.info.close_dttm).format('HH:mm');


    var hours = 23;
    var minutes = 13;
    var time = moment(hours + ':' + minutes, 'HH:mm');
    time.add(7, 'm');
    if (this.info.attend_cd != null) {
      in_str_tm = moment(this.scheduleInfo.cls_str_tm, 'HH:mm').subtract(this.scheduleInfo.in_bound, 'm').format("HH:mm");
      in_end_tm = moment(this.scheduleInfo.cls_str_tm, 'HH:mm').add(this.scheduleInfo.in_bound, 'm').format("HH:mm");
      out_str_tm = moment(this.scheduleInfo.cls_end_tm, 'HH:mm').subtract(this.scheduleInfo.out_bound, 'm').format("HH:mm");
      out_end_tm = moment(this.scheduleInfo.cls_end_tm, 'HH:mm').add(this.scheduleInfo.out_bound, 'm').format("HH:mm");
    }

    if (this.schInputType == 1)
      for (var loop = start_date; loop <= end_date; loop.setDate(loop.getDate() + 1)) {
        if (check.some(_ => _.key == loop.getDay()))
          this.schedule.push({
            post_no: '', beacon_yn: '', cls_dt: loop.toISOString().slice(0, 10),
            cls_str_tm: this.scheduleInfo.cls_str_tm, cls_end_tm: this.scheduleInfo.cls_end_tm,
            in_str_tm: in_str_tm, in_end_tm: in_end_tm, out_str_tm: out_str_tm, out_end_tm: out_end_tm
          });
      }
    else if (this.schInputType == 2)
      this.schedule.push({
        post_no: '', beacon_yn: 0, cls_dt: this.scheduleInfo.cls_dt,
        cls_str_tm: this.scheduleInfo.cls_str_tm, cls_end_tm: this.scheduleInfo.cls_end_tm,
        in_str_tm: in_str_tm, in_end_tm: in_end_tm, out_str_tm: out_str_tm, out_end_tm: out_end_tm
      });
    else
      this.schedule[this.scheduleInfo.idx] = _.cloneDeep(this.scheduleInfo);

    this.schedule = _.uniqBy(this.schedule, 'cls_dt');
    this.modalReference.close();
  }
  async deleteSchedule() {
    if (this.scheduleInfo.post_no) {
      await this.society.board.post.lecture.deleteSch(this.scheduleInfo.post_no, this.scheduleInfo.cls_dt).toPromise()
    }
    await this.schedule.splice(this.scheduleInfo.idx, 1);
    await this.modalReference.close();

  }
  alertControl() {
    this.showAlert = true;
    this.ref.detectChanges();
    setTimeout(() => { this.showAlert = false; }, 1500);
  }

  goList() {
    this.router.navigate(['board/list']);
  }

  setOnlineCNT(onlineYN) {
    if (onlineYN == '0' || onlineYN == 0)
      this.applInfo.online_cnt = 0;
  }
  setBeaconYN() {
    if (this.info.attend_cd == null || this.info.attend_cd == 'null')
      this.info.beacon_yn = '0';
  }
}
