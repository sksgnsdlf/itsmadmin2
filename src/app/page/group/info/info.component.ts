import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DAUM_MAP_API_KEY, API } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { SocietyProvider } from '../../../providers/society';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChanges } from '@angular/core';
import { FIControlOptions } from '../../../itsm-ui/public_api';
import * as _ from 'lodash';

declare const daum;
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @ViewChild('saveForm') saveForm: FormControl;
  info : any = {};
  options : any = {};
  yesOrNo = [{value:'1', nm:'허용'},{value:'0', nm:'허용(X)'}];
  stateDttm:string = '';
  showAlert = false;
  saveResult = false;
  closeResult: string;
  search:string = ''; //회원 검색문구(전화 or 이름)
  userList = [];
  societyList = [];
  selectedUser :any = {};
  society_no = null;
  image:any;
  imageName:any;

  addModalValue:any = { mbr_typ_nm:'', memo_txt:'' };
  //addModal 입력 폼
  addModalConfig: FIControlOptions[] = [
    {
      field: 'mbr_typ_nm',
      type: 'text',
      title: '회원종류',
      required: true
    },
    {
      field: 'memo_txt',
      type: 'text',
      title: '메모',
      required: false
    }
  ]

  //회원분류 목록
  memberCls = [];

  beacons = [];  
  beaconForm= {
    id:'',
    uuid:'',
    mac:'',
    minor:'',
    major:'',
    society : -1,
    org:'',
  }
  
  deleteType:any;
  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild("inputLicenseFile") inputLicenseFile: ElementRef;

  constructor(private ref: ChangeDetectorRef, private http:HttpClient, private society : SocietyProvider, private route: ActivatedRoute, private modalService: NgbModal, public renderer: Renderer) { }

  ngOnInit() {
    this.society.get(null, 0, 0, true)
    .subscribe((data:any)=>{
      this.societyList = data.list;
    })
    this.society.getOptions()
    .subscribe(data=>{
      this.options = data;
      
    });
  }
  
  societySelected(society_no){
    this.society_no = society_no;
    console.log("this.society_no => " + this.society_no);
    if(!this.society_no || this.society_no == 'null') return;
    this.getSociety(this.society_no);
  }

  getSociety(society_no){
    this.society.get(society_no)
    .subscribe((data:any)=>{
      this.info = data.list[0];
      this.stateDttm = '변경일시 : ' + this.info.state_dttm;
      this.beaconForm.org = data.list[0].org_no;
      this.getMemberCls(society_no);
      this.getBeacon(society_no);
      this.beaconForm.society = society_no;
    });
  }
  //담당자 찾기 open modal 
  getUser(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  findUser(){
    this.society.findUser({nmOrTel:this.search})
    .subscribe((list:any)=>{
      this.userList = list;
    })
  }
  getPost(){
    new daum.Postcode({
      oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ''; // 도로명 조합형 주소 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
              extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if(data.buildingName !== '' && data.apartment === 'Y'){
             extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if(extraRoadAddr !== ''){
              extraRoadAddr = ' (' + extraRoadAddr + ')';
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if(fullRoadAddr !== ''){
              fullRoadAddr += extraRoadAddr;
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          this.info.post = data.zonecode; //5자리 새우편번호 사용
          this.info.addr1 = fullRoadAddr;
          this.http.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.info.addr1}`,{
            headers:{
              Authorization: `KakaoAK ${DAUM_MAP_API_KEY}`
            }
          })
          .subscribe((data:any)=>{
            this.info.latitude = data.documents[0].y;
            this.info.longitude = data.documents[0].x;
          },err=>{
            console.log('위도, 경도 검색 실패');
            console.error(err);
          });

          this.ref.detectChanges();
      }
    }).open();
  }

  checkFileType($event, type='') {
    let files: FileList = $event.target.files;
    if (files.length > 0) {
      let file: File = files[0];
      if(type=="image")
        this.imageName = file.name;
      else{
        this.info.license_file = file.name;
      }
      if (!file.type.includes(`${type}/`)) {
        alert(type+' 형식만 업로드 가능합니다.');
        $event.target.value = '';
      }
      else {
        var fr = new FileReader();
        fr.onload = () => {
          if(type=='image'){
            this.image = fr.result;
          }else{
            // console.log(fr.result);
          }
          this.ref.detectChanges();
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }
  openFile(type) {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
      if(type=='image')
        this.inputFile.nativeElement.click();
      else{
        this.inputLicenseFile.nativeElement.click();
      }
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      if(type=='image')
        this.renderer.invokeElementMethod(this.inputFile.nativeElement, 'dispatchEvent', [event]);
      else
        this.renderer.invokeElementMethod(this.inputLicenseFile.nativeElement, 'dispatchEvent', [event]);
    }
  }
  //썸네일 혹은 파일 삭제 시 
  deleteFile(content, type = null) {
    if(type == 'image') this.deleteType = '이미지가';
    else if(type == 'file') this.deleteType = '파일이';
    else this.deleteType = '이미지, 파일이';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if(type == 'image'){
        this.image = null;
        this.info.thumb_url = '';
        this.info.img_url = '';
        this.inputFile.nativeElement.value = null;
      }else if(type == 'file'){
        this.info.license_file = null;
        this.info.license_file_url = null;
        this.inputLicenseFile.nativeElement.value = null;
      }else{
        this.image = null;
        this.info.thumb_url = '';
        this.info.img_url = '';
        this.inputFile.nativeElement.value = null;
        this.info.license_file = null;
        this.info.license_file_url = null;
        this.inputLicenseFile.nativeElement.value = null;
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  async save(){
    try{
      let formData: FormData = new FormData();
      let files: FileList = this.inputFile.nativeElement.files;
      let licenseFiles: FileList = this.inputLicenseFile.nativeElement.files;
      this.info.org_no = 1;
      this.info.intro_txt = this.nl2br(this.info.intro_txt);
      this.info.parking_txt = this.nl2br(this.info.parking_info)
      for(let key in this.info){
        formData.append(key,this.info[key]);
      }
      if (files.length > 0) {
        console.log('img')
        let file: File = files[0];
        formData.append('image', file, file.name);
      }
      if (licenseFiles.length > 0) {
        console.log('license')
        let file: File = licenseFiles[0];
        formData.append('license', file, file.name);
      }
      let result: any = await this.society.post(formData).toPromise();
      this.society_no = JSON.parse(result).society_no;

      await this.getSociety(this.society_no);
      this.ref.detectChanges();
      alert('저장 성공');
      console.log('save succeed');
    } catch (err) {
      if(err.status == 400){
        if(err.error && typeof err.error == 'string'){
          if(JSON.parse(err.error).message == 'duplicated'){
            alert('단체명이 중복됩니다')
            return;
          }
        }
      }
      alert('저장 실패');
      console.log('save failed');
      console.error(err);
    }
  }
  alertControl(){
    this.showAlert = true;
    this.ref.detectChanges();
    setInterval(()=>{this.showAlert = false;},1500);
  }
  //회원분류 목록 가져오기
  getMemberCls(society_no){
    this.society.getMemberCls(society_no)
    .subscribe((list:any)=>{
      this.memberCls = list;
    })
  }
  //회원분류 저장
  addMemberCls(){
    this.society.addMemberCls({ ...this.addModalValue, society_no:this.society_no })
    .subscribe((_:any)=>{
      console.log('succeed');
      this.getMemberCls(this.society_no);
      this.ref.detectChanges();
    },err=>{
      console.error(err);
    })
  }
  //회원분류 삭제
  deleteMemeberCls(society_no, mbr_typ){
    this.society.deleteMemberCls(society_no, mbr_typ)
    .subscribe((_:any)=>{
      this.getMemberCls(this.society_no);
      this.ref.detectChanges();
    },(err)=>{
      console.error(err);
    })
  }
  donwloadFile(){
    window.open(this.info.license_file_url, '_blank');
  }
  getBeacon(society_no) {
    this.http.get(`${API}/course/beacon?society=${society_no}&org=-1`)
    .subscribe((res:any)=>this.beacons=res);
  }
  //담당자 찾기 open modal 
  addBeacon(content){
    this.beaconForm= {
      id:'',
      uuid:'',
      mac:'',
      minor:'',
      major:'',
      society :this.society_no,
      org: this.info.org_no,
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(this.society_no)
      this.http.post(`${API}/course/beacon`, this.beaconForm, {responseType:'text'})
      .subscribe((res:any)=>{
        this.beaconForm.id=res;
        this.beacons.push(_.cloneDeep(this.beaconForm));
      });
      else{
        this.beacons.push(_.cloneDeep(this.beaconForm));
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  deleteBeacon(item, idx){
    if(this.society_no)
    this.http.delete(`${API}/course/beacon/${item.id}`, {responseType:'text'})    
      .subscribe((data:any)=>{
        this.beacons.splice(this.beacons.findIndex(_=>_.id==data), 1);
        alert('삭제 성공')
      },err=>{
        alert('삭제 실패')
      });
    else
      this.beacons.splice(idx, 1);
  }
  downloadManual() {
    window.open(`assets/manual_beacon.pdf`, '_blank');
  }
  nl2br(str){  
    console.log(str);
    return str.replace(/\n/g, "<br />");  
  } 
}
