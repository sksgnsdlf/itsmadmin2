import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { CKEditorComponent } from '../../../../itsm-ui/public_api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../../providers/society';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

declare const daum;
declare let naver: any;

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class ListSurveyComponent implements OnInit {
  @ViewChild('saveForm') saveForm: FormControl;
  @ViewChild("inputFile") inputFile: ElementRef;
  @ViewChild("inputImage") inputImage: ElementRef;
  @ViewChild('ck') ck: CKEditorComponent;

  info: any = {
    cmnt_yn: "0", open_yn: "0", survey_target: "1", state: "1", subj: "", post_txt: ""
  };
  thumbInfo: any = { file: null, survey_no: null, img_url: '', thumb_url: null };
  image: any;
  hashTag: Array<any> = [];
  items_d = [];
  items = [];
  options: any = {};
  memberCls_d = []; //삭제할 회원 코드 리스트 
  memberCls = []; //해당 survey의 회원 코드 리스트
  optionsmemberCls: any = [{ mbr_typ: 0 }];

  surveyItem: any = { item_nm: '', item_typ: 1, select_cnt: '', multi: [] };
  multiInput: string = '';

  yesOrNo = [{ value: '1', nm: '허용' }, { value: '0', nm: '허용(X)' }];
  yesOrNoOpen = [{ value: '1', nm: '공개' }, { value: '0', nm: '공개(X)' }];

  showAlert = false;
  saveResult = false;
  saveString: string;
  closeResult: string;

  society_no: number;
  board_tab: number;
  board_typ: number;
  survey_no: number;

  constructor(private ref: ChangeDetectorRef, private society: SocietyProvider, private route: ActivatedRoute, private modalService: NgbModal, public renderer: Renderer, public router: Router) { }

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
          this.info.survey_no = this.survey_no = params.post_no;
        }
      }
    )
    this.society.board.post.survey.getOptions(this.society_no)
      .subscribe((data: any) => {
        this.options = data;
        this.optionsmemberCls = data.mbr_cls;
        this.optionsmemberCls.forEach(element => { element.new = true; element.selected = false });
      });
    var now = new Date();
    this.info.start_dt = moment(now).format('YYYY-MM-DD');
    this.info.close_dt = moment(now).format('YYYY-MM-DD');
    this.info.start_tm = moment(now).format('HH:mm');
    this.info.close_tm = moment(now).format('HH:mm');
    if (this.survey_no)
      this.getPost(this.survey_no);

  }

  getPost(no) {
    // this.society.board.post.survey.get(no)
    this.society.board.post.survey.getSurveyResult(no, this.society_no)
      .subscribe((data: any) => {
        this.info = data.surveyDetail;
        this.info.board_typ = this.board_typ;
        if (data.surveyDetail.img_url)
          this.thumbInfo = { file: null, file_nm: null, survey_no: this.survey_no, img_url: data.surveyDetail.img_url, thumb_url: data.surveyDetail.thumb_url };
        if (data.surveyDetail.hash_tag) {
          let temp: Array<any> = data.surveyDetail.hash_tag.split(',');
          temp.forEach((element, idx) => {
            this.hashTag.push({ display: element, id: idx });
          });
        }
        if (data.surveyItem) { //설문 문항이 있을 경우
          this.items = data.surveyItem;
        }
        if (data.memberCls.length != 0) { //공개 설정에서 회원공개시 회원 종류 
          this.memberCls = data.memberCls;
          this.memberCls.forEach(element => { element.selected = true, element.new = false; element.mbr_typ = parseInt(element.mbr_typ) });
        }
        this.info.start_dt = moment(this.info.start_dttm).format('YYYY-MM-DD');
        this.info.close_dt = moment(this.info.close_dttm).format('YYYY-MM-DD');
        this.info.start_tm = moment(this.info.start_dttm).format('HH:mm');
        this.info.close_tm = moment(this.info.close_dttm).format('HH:mm');
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
    if (!(this.image || this.info.img_url))
      return;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.thumbInfo = { file: null, file_nm: null, img_url: null, thumb_url: null };
      this.image = null;
      // if (this.info.thumb_url)
      //   this.info['image_d'] = true;
      //기존 파일을 삭제하지 않기때문에... 논의대상
      this.info.thumb_url = null;
      this.info.img_url = '';
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });;
  }

  //게시물 저장 시 
  async save() {
    if (this.info.start_dt == '' || this.info.end_dt == '') {
      alert('조사기간을 입력해 주세요.');
      return;
    }
    if (this.info.start_tm == '' || this.info.close_tm == '') {
      alert('조사시간을 입력해 주세요.');
      return;
    }
    //게시판 제목 중복 체크 (수정할 경우에는 해당 포스트 외의 제목과 중복 체크)
    // try {
    //   console.log(this.info)
    //   await this.society.board.post.subjDupCheck(this.info.survey_subj, this.info.survey_no, this.society_no, this.info.board_tab, this.info.board_typ).toPromise();   
    // }catch(err){
    //   alert('게시판 제목이 중복됩니다.');
    //   return;
    // }

    try {
      this.info.hash_tag = this.hashTag.map(e => e.display).join(", ");
      this.info.start_dttm = this.info.start_dt + ' ' + this.info.start_tm;
      this.info.close_dttm = this.info.close_dt + ' ' + this.info.close_tm;
      let formData: FormData = new FormData();

      for (let key in this.info) {
        formData.append(key, this.info[key]);
      }
      formData.append('items', JSON.stringify(this.items));
      formData.append('items_d', JSON.stringify(this.items_d));

      if (this.thumbInfo.file)
        formData.append('image', this.thumbInfo.file, this.thumbInfo.file.name);


      //post 부분 저장 
      let result: any = await this.society.board.post.survey.post(formData).toPromise()
      this.survey_no = JSON.parse(result).survey_no;

      this.memberCls_d.forEach(async (element) => {
        if (!element.new) {
          await this.society.board.post.mbrCls.surveydelete(this.survey_no, element.mbr_typ).toPromise()
        }
      });

      this.memberCls.forEach(async (element) => {
        element.survey_no = this.survey_no
        if (element.new)
          await this.society.board.post.mbrCls.surveypost(_.cloneDeep(element)).toPromise()
      });

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
      await this.society.board.post.survey.delete(this.survey_no).toPromise();
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

  getMbrCls(content) {
    //회원 종류 입력을 위한 모달 
    console.log(this.optionsmemberCls)
    console.log(this.memberCls)
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

  openItem(content, item = null, idx = null) {
    if (item) {
      this.surveyItem = _.cloneDeep(item);
      if (!this.surveyItem.multi_d)
        this.surveyItem['multi_d'] = [];
    } else {
      this.surveyItem = { idx: '', item_nm: '', item_typ: "1", select_cnt: 1, multi: [], multi_d: [], item_typ_nm: '' };
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      if (result == 'a') {//add
        if (idx == null) {
          this.surveyItem.item_typ_nm = this.options.item.find(x => x.id == this.surveyItem.item_typ).name;
          if (this.surveyItem.item_typ == "1" && this.surveyItem.multi.length > 0)
            this.surveyItem.mult = [];
          this.items.push(this.surveyItem);
        }
        else {
          this.surveyItem.item_typ_nm = this.options.item.find(x => x.id == this.surveyItem.item_typ).name;
          this.items[idx] = _.cloneDeep(this.surveyItem);
        }
      }
      if (result == 'd') {//delete
        this.items.splice(idx, 1);
        if (this.surveyItem.item_no)
          this.items_d.push(this.surveyItem);
      }
      this.multiInput = '';
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  itemTypeSelected() {
    if (!this.surveyItem.item_no) {
      this.surveyItem.multi = [];
      switch (this.surveyItem.item_typ) {
        case 2:
        case "2":
          this.surveyItem.multi.push({ choice_txt: '매우 그렇다.' });
          this.surveyItem.multi.push({ choice_txt: '그렇다.' });
          this.surveyItem.multi.push({ choice_txt: '보통이다.' });
          this.surveyItem.multi.push({ choice_txt: '부족하다.' });
          this.surveyItem.multi.push({ choice_txt: '매우부족하다.' });
          break;
      }
    }
  }

  deleteMulti(idx) {
    // this.info.items.multi.splice(idx, 1);
    if (this.surveyItem.multi[idx].choice_no)
      this.surveyItem.multi_d.push(this.surveyItem.multi[idx]);
    this.surveyItem.multi.splice(idx, 1);
  }

  addMulti() {
    if (this.multiInput == '')
      return;
    this.surveyItem.multi.push({ choice_txt: this.multiInput });
    this.multiInput = '';
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
