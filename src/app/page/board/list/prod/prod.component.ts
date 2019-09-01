import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { CKEditorComponent } from '../../../../itsm-ui/public_api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../../providers/society';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.scss']
})
export class ListProdComponent implements OnInit {
  @ViewChild('saveForm') saveForm: FormControl;
  @ViewChild("inputImage") inputImage: ElementRef;
  @ViewChild('ck') ck: CKEditorComponent;

  info: any = { open_yn: "1" };
  thumbInfo: any = { file: null, room_no: null, img_url: '', thumb_url: '' };
  image: any;
  yesOrNo = [{ value: '1', nm: '노출' }, { value: '0', nm: '미노출(X)' }];

  showAlert = false;
  saveResult = false;
  saveString: string;
  closeResult: string;

  society_no: number;
  board_tab: number;
  board_typ: number;
  prod_no: number;

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
          this.info.prod_no = this.prod_no = params.post_no;
        }
      }
    )
    if (this.prod_no)
      this.getPost(this.prod_no);

  }

  getPost(no) {
    this.society.board.prod.get(no)

      .subscribe((data: any) => {
        this.info = data.list[0];
        if (data.list[0].img_url)
          this.thumbInfo = { file: null, file_nm: null, prod_no: this.prod_no, img_url: data.list[0].img_url, thumb_url: data.list[0].thumb_url };
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
      if (this.info.img_url)
        this.info['image_d'] = true;
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
    //   await this.society.board.post.subjDupCheck(this.info.subj, this.info.prod_no, this.society_no, this.info.board_tab, this.info.board_typ).toPromise();     
    // }catch(err){
    //   alert('게시판 제목이 중복됩니다.');
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
      let result = await this.society.board.prod.post(formData).toPromise()
      // this.prod_no = JSON.parse(result).prod_no;

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
      await this.society.board.prod.delete(this.prod_no).toPromise();

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

  alertControl() {
    this.showAlert = true;
    this.ref.detectChanges();
    setTimeout(() => { this.showAlert = false; }, 1500);
  }

  goList() {
    this.router.navigate(['board/list']);
  }

}
