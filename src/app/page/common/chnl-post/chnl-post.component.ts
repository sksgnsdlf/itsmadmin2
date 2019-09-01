import { Component, OnInit } from '@angular/core';
import { ChnlProvider } from '../../../providers/chnl';
import { SocietyProvider } from '../../../providers/society';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chnl-post',
  templateUrl: './chnl-post.component.html',
  styleUrls: ['./chnl-post.component.scss']
})
export class ChnlPostComponent implements OnInit {
  chnlList:any;
  clsList:any;
  selectedChnl:any = {};
  selectedCls:any = {};
  constructor(private chnl:ChnlProvider, private society:SocietyProvider, private modalService: NgbModal) { }

  ngOnInit() {
    this.getChnl();
    this.getCls();
  }
  getChnl(){
    this.chnl.get()
    .subscribe(_=>{
      this.chnlList = _;
      this.chnlList = this.chnlList.map(_=>{
        return { ..._, disp_yn : _.disp_yn>'0'?'1':'0' }
      });
    });
  }
  addChnl(body){
    if(!body.chnl_nm){
      alert('채널명을 입력해주세요');
      return;
    }
    this.chnl.post(body)
    .subscribe(_=>{
      alert('저장 성공');
      this.getChnl();
      this.modalService.dismissAll();
    },err=>{
      alert('저장 실패');
    })
  }
  getCls(){
    this.society.board.post.getCls()
    .subscribe(_=>{
      this.clsList = _;
    })
  }
  addCls(body){
    if(!body.post_div_nm || !body.topic){
      alert('모두 입력해주세요');
      return;
    }
    this.society.board.post.postCls(body)
    .subscribe(_=>{
      alert('저장 성공');
      this.getCls();
      this.modalService.dismissAll();
    },err=>{
      alert('저장 실패');
    })
  }
  openModal(content, size = null){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: size}).result.then((result) => {
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
}
