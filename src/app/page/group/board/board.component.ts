import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocietyProvider } from '../../../providers/society';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FIControlOptions } from '../../../itsm-ui/public_api';
import * as _ from 'lodash';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  societyList = [];
  society_no = null;
  boardList = [];
  boardOption: any = {
    type: [],
    target: []
  };
  closeResult;
  addManagerModalOpen: boolean = false;
  postBoardVal: any = {};
  postBody: any = {
    society_no: null,
    board_tab: null,
    board_typ: null,
    board_tab_nm: null,
    disp_ord: null,
    open_target: null,
    use_state: null,
    auth_user: []
  };
  authCandidateList: any = [];
  dragIndex: number = -1;
  dropIndex: number = -1;

  constructor(private society: SocietyProvider, private modalService: NgbModal, private ref: ChangeDetectorRef) { }

  ngOnInit() {}
  initPostBody() {
    this.postBody = {
      society_no: (!this.society_no || this.society_no == 'null') ? null : this.society_no,
      board_tab: null,
      board_typ: null,
      board_tab_nm: null,
      disp_ord: null,
      open_target: '1',
      use_state: '1',
      auth_user: []
    };
  }
  societySelected(society_no) {
    this.society_no = society_no;
    //postBoard에 해당 society_no SET && 나머지는 null
    this.initPostBody();
    //해당 단체의 게시판 리스트 조회
    this.getBoard(this.society_no);
  }
  //해당 단체의 게시판 리스트 조회
  getBoard(society_no) {
    this.society.board.getBoard(society_no, true)
      .subscribe((list:any) => {
        this.boardList = list;
      })
  }
  //게시판 수정 및 추가에 필요한 옵션 가져오기
  getBoardOption() {
    this.society.board.getBoardOption()
      .subscribe((options: any) => {
        this.boardOption = {
          type: options.board_typ_option,
          target: options.open_target_option,
          use_state: [{ cd: '1', cd_nm: '사용' }, { cd: '0', cd_nm: '미사용' }]
        };
      });
  }

  getBoardTypeTxt() {
    if (this.boardOption.type.length != 0 && this.postBody.board_typ)
      for (let i = 0; i < this.boardOption.type.length; i++) {
        if (this.postBody.board_typ == this.boardOption.type[i].cd)
          return this.boardOption.type[i].cd_txt;
      }
    return null;

  }

  //게시판 수정 및 등록
  postBoard() {
    this.society.board.nmDupCheck(this.postBody)
    .subscribe(_=>{
      this.save();
    },err=>{
      console.error(err);
      if(err.status == 400)
        alert('게시판명이 중복됩니다.');
      else
        alert('저장 실패');
      this.getBoard(this.postBody.society_no)
    })
    
  }
  save(){
    this.society.board.postBoard(this.postBody)
      .subscribe(_ => {
        this.getBoard(this.society_no);
        alert('저장 성공');
        this.modalService.dismissAll();
      }, err => {
        console.error(err);
        alert('저장 실패')
        this.getBoard(this.postBody.society_no)
      })
  }
  delete() {

  }
  openAddManager(content) {
    this.addManagerModalOpen = true;
    this.society.board.findBoardAuthCandidateUser(this.society_no, this.postBody.board_tab)
      .subscribe((list:any) => {
        let temp = [];
        for (let i = 0; i < list.length; i++) {
          let flag = true;
          for (let j = 0; j < this.postBody.auth_user.length; j++) {
            if (list[i].user_no == this.postBody.auth_user[j].user_no) {
              flag = false;
              break;
            }
          }
          if (flag) temp.push(list[i]);
        }
        this.authCandidateList = temp;
        this.openModal(content, 'lg');
      })

  }
  editAuthUser(item, flag) {
    if (flag == 'add') {
      this.postBody.auth_user.push(item);
    } else {
      let temp = [];
      for (let i = 0; i < this.postBody.auth_user.length; i++) {
        if (this.postBody.auth_user[i].user_no != item.user_no) {
          temp.push(this.postBody.auth_user[i]);
        }
      }
      this.postBody.auth_user = temp;
    }
  }
  openBoardDetailModal(content, item: any = null) {
    //게시판 등록 옵션 가져오기
    this.getBoardOption();
    if (item) {
      this.postBody = _.cloneDeep(item) ;
      this.society.board.findBoardAuthUser(this.postBody.society_no, item.board_tab)
        .subscribe(list => {
          this.postBody.auth_user = list;
        })
    } else {
      this.initPostBody();
    }
    this.openModal(content, 'lg');
  }
  openModal(content, size) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.addManagerModalOpen = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.addManagerModalOpen = false;
    });
  }
  //모달 dismiss 원인
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  startDrag(idx) {
    this.dragIndex = idx;
  }

  addDropItem(idx) {
    this.dropIndex = idx;

    if (this.dropIndex != this.dragIndex) {
      var dragItem = _.cloneDeep(this.boardList[this.dragIndex]);
      var dropItem = _.cloneDeep(this.boardList[this.dropIndex]);

      var temp = dragItem.disp_ord;
      dragItem.disp_ord = dropItem.disp_ord;
      dropItem.disp_ord = temp;

      this.boardList[this.dragIndex] = dropItem;
      this.boardList[this.dropIndex] = dragItem;


      this.society.board.postBoardChageOrder(this.boardList[this.dragIndex])
        .subscribe(_ => {
          this.society.board.postBoardChageOrder(this.boardList[this.dropIndex])
            .subscribe(_ => {
              alert('저장 성공');
            }, err => {
              console.error(err);
              alert('저장 실패')
            })
        })
    }
  }
}
