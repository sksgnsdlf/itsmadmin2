import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { CKEditorComponent } from '../../../../itsm-ui/public_api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../../providers/society';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ResourceService } from '../../../../services/resource.service';

declare const daum;
declare let naver: any;

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class ListSpaceComponent implements OnInit {
  @ViewChild('saveForm') saveForm: FormControl;
  @ViewChild("inputImage") inputImage: ElementRef;
  @ViewChild('ck') ck: CKEditorComponent;

  info: any = {};
  thumbInfo: any = { file: null, room_no: null, img_url: '', thumb_url: '' };
  image: any;
  options: any = [];

  showAlert = false;
  saveResult = false;
  saveString: string;
  closeResult: string;

  society_no: number;
  board_tab: number;
  board_typ: number;
  room_no: number;

  map: any = {};
  mapOptions: any = {
    level: 3,
    center: new daum.maps.LatLng(36.0190238, 129.3433917)
  };

  location: any = new daum.maps.LatLng(36.0190238, 129.3433917);
  infoWindow: any = new daum.maps.InfoWindow({
    zIndex : 1
  });
  geocoder = new daum.maps.services.Geocoder();
  marker: any = {};
  search_map: string = "";
  ps = new daum.maps.services.Places();

  constructor(private ref: ChangeDetectorRef, private society: SocietyProvider, private route: ActivatedRoute, private modalService: NgbModal, public renderer: Renderer, public router: Router, private resource: ResourceService) { }

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
          this.info.room_no = this.room_no = params.post_no;
        }
      }
    )
    //게시물에 필요한 옵션들 
    //운영상태
    this.resource.getCode('942')
      .then(data => {
        this.options = data;
        
      })
    this.info.build_dt = new Date().toISOString().slice(0, 10);
    if (this.room_no)
      this.getPost(this.room_no);

  }

  getPost(no) {
    this.society.board.inplace.get(no)
      .subscribe((data: any) => {
        this.info = data.list[0];
        this.info.board_typ = this.board_typ;
        if (data.list[0].img_url)
          this.thumbInfo = { file: null, file_nm: null, room_no: this.room_no, img_url: data.list[0].img_url, thumb_url: data.list[0].thumb_url };
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
          this.thumbInfo = { file: file, file_nm: file.name, img_url: null, thumb_url: null };
          this.ref.detectChanges();
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }
  openImage() {
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

  //썸네일 혹은 파일 삭제 시 
  deleteImage(content) {
    if (!(this.image || this.info.thumb_url))
      return;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.thumbInfo = { file: null, file_nm: null, img_url: null, thumb_url: null };
      this.image = null;
      // if (this.info.thumb_url)
      //   this.info['image_d'] = true;
      //기존 파일을 삭제하지 않기때문에... 논의대상
      this.info.thumb_url = '';
      this.info.img_url = '';
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });;
  }

  //게시물 저장 시 
  async save() {
    //게시판 제목 중복 체크 (수정할 경우에는 해당 포스트 외의 제목과 중복 체크)
    // try {
    //   await this.society.board.post.subjDupCheck(this.info.room_nm, this.info.room_no, this.society_no, this.info.board_tab, this.info.board_typ).toPromise();      
    // }catch(err){
    //   if(err.status == 400)
    //     alert('게시판 제목이 중복됩니다.');
    //   else
    //     alert('저장 실패');
    //   return;
    // }
    try {

      let formData: FormData = new FormData();

      for (let key in this.info) {
        formData.append(key, this.info[key]);
      }

      if (this.thumbInfo.file)
        formData.append('image', this.thumbInfo.file, this.thumbInfo.file.name);

      //post 부분 저장 
      let result = await this.society.board.inplace.post(formData).toPromise()
      // this.room_no = JSON.parse(result).room_no;

      this.saveResult = true;
      this.saveString = '저장 성공 ! '
      await setTimeout(() => { this.goList() }, 1000);

    } catch (err) {
      if (err === 'no_auth')
        this.saveString = '권한이 없습니다.'
      else
        this.saveString = '저장 실패 !'
      this.saveResult = false;
    }
  }

  //게시물 삭제시 
  async delete() {
    try {
      await this.society.board.inplace.delete(this.room_no).toPromise();

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
    });;
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
      //this.SearchAddress(this.location, this.marker, this.infoWindow);
      /*
      if (this.search_map && this.search_map.length > 0) {
        //this.searchAddressToCoordinate();
        this.searchAddressToCoordinate(this.search_map, element);
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

      this.info.zip = items.zonecode; //5자리 새우편번호 사용
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

        this.info.zip = addr.zonecode; //5자리 새우편번호 사용
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

        //element.info.zip =  result[0].address.zonecode; //5자리 새우편번호 사용
        element.info.addr1 = result[0].address.address_name;
        let districts_check = _.find(element.options.districts, { district_nm:  result[0].address.address_name.split(' ')[3] })
        if (districts_check) {
          element.info.district_nm = districts_check.district_nm;
          element.info.district_cd = element.options.districts.find(x => x.district_nm == element.info.district_nm).district_cd;
        }
        element.info.latitude = latlng.getLat();
        element.info.longitude = latlng.getLng();


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
    element.geocoder.addressSearch(address, function(result, status) {
      // 정상적으로 검색이 완료됐으면 
      if (status === daum.maps.services.Status.OK) {
        var coords = new daum.maps.LatLng(result[0].y, result[0].x);
        element.map.setCenter(coords);
        element.searchCoordinateToAddress(coords);
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
    this.info.zip = '';
  }

  alertControl() {
    this.showAlert = true;
    this.ref.detectChanges();
    setTimeout(() => { this.showAlert = false; }, 1500);
  }

  goList() {
    this.router.navigate(['board/list']);
  }

}
