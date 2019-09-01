import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonProvider } from '../../../providers/common';
@Component({
  selector: 'app-coop',
  templateUrl: './coop.component.html',
  styleUrls: ['./coop.component.scss']
})
export class CoopComponent implements OnInit {
  partnerList: any = [];
  search_partner: string = '';
  search_member: string = '';
  register_popup: boolean = false;
  register_mem_popup: boolean = false;
  register_info = {
    partner_no: '',
    partner_nm: '',
    addr: '',
    cop_reg_no: '',
    tel_no: '',
    members: []
  }
  register_mem_info = {
    staff_nm: '',
    cp_no: '',
    join_dttm: '',
    user_no: '',
    staff_no: ''
  }
  selectedPartnerIdx = -1;
  selectedMemberList: Array<any> = [];

  constructor(private modalService:NgbModal, private common:CommonProvider) {
    this.getPartnerList();
  }

  ngOnInit() {
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
  data_init() {
    this.register_info = {
      partner_no: '',
      partner_nm: '',
      addr: '',
      cop_reg_no: '',
      tel_no: '',
      members: []
    };
  }

  getPartnerList(partnerNo = null) {
    this.common.user.getPartnerList(this.search_partner)
    .subscribe((list:any) => {
      this.partnerList = list;
      // console.log(this.partnerList);
      //파트너 추가 시, 목록 갱신하면서 바로 해당 업체가 선택되도록.
      //그리고 바로 파트너 추가 팝업 뜨도록
      if(partnerNo){
        let idx = 0;
        this.partnerList.forEach((pn, index)=>{
          if(pn.partner_no == partnerNo){
            idx = index;
          }
        });
        this.getPartnerDetail({partner_no:partnerNo},idx);
        this.addMember();
      }
    });
    this.selectedPartnerIdx = -1;
  }

  getPartnerDetail(partner, partnerIdx) {
    this.register_info = partner;
    this.register_info.members = [];
    this.selectedPartnerIdx = partnerIdx;
    this.common.user.getPartnerDetail(partner.partner_no, this.search_member)
    .subscribe(
      (members:any) => {
        this.register_info.members = members;
      }
      ,error=>{
        console.log(error)
      }
    );
  }

  savePartner(flag) {
    if (!this.register_info.partner_nm) {
      alert('협력업체 명을 적어주세요.');
      return;
    }

    let data: any = {};
    data = this.register_info;
    this.common.user.postPartner(data)
    .subscribe(
      (res:any) => {
        let partnerNo = res.id;
        // this.getPartnerList();
        if (flag == 'update') {
          alert("업데이트 되었습니다.");
        } else {
          this.data_init();
          alert("등록되었습니다.");
        }
        this.register_popup = false;
        if(flag == 'update'){
          this.getPartnerList();
        }else{
          this.getPartnerList(partnerNo);
        }
      }
    );
  }

  delete_partner(partner_no) {
    if (partner_no) {
      this.common.user.deletePartner(partner_no)
      .subscribe(
        (res:any) => {
          this.getPartnerList();
          alert("삭제되었습니다.");
          this.data_init();
          this.selectedPartnerIdx = -1;
        },
        err => {
          if (err.json().msg)
            alert(err.json().msg);
        }
      );
    } 
    else {
      alert("협력 업체를 선택해 주세요.");
      return;
    }
  }

  selectPartner(idx) {
    this.partnerList.forEach((element) => {
      element.selected = false;
    });
    this.partnerList[idx].selected = this.partnerList[idx].selected?false:true;
    this.selectedPartnerIdx = idx;
    this.selectedMemberList = [];
  }
  trackByFn(index, item){
    return index;
  }
  add_or_update_partner(value) {
    if (value) {
      if (this.selectedPartnerIdx == -1) {
        alert('협력 업체를 선택해 주세요.');
        return;
      }
      this.register_info = this.partnerList[this.selectedPartnerIdx];
    }
    else {
      this.data_init();
    }

    this.register_popup = true
  }

  selectMember(item) {
    var index = this.selectedMemberList.findIndex(element => {
      return element.staff_no == item.staff_no;
    });
    
    if(item.selected) {
      this.selectedMemberList.push(item);
    }
    else {
      this.selectedMemberList.splice(index, 1);
    }
  }

  addMember() {
    if (this.selectedPartnerIdx == -1) {
      alert('협력 업체를 선택해 주세요.');
      return;
    }

    this.register_mem_info = {
      staff_nm: '',
      cp_no: '',
      join_dttm: '',
      user_no: '',
      staff_no: ''
    };
    this.register_mem_popup = true
  }

  editMember(item) {
    this.register_mem_info = item;
    this.register_mem_popup = true
  }

  saveMember(flag) {
    if (!this.register_mem_info.staff_nm) {
      alert('이름을 입력해 주세요.');
      return;
    }
    if (!this.register_mem_info.cp_no) {
      alert('휴대전화를 입력해 주세요.');
      return;
    }

    let data: any = {};
    data = this.register_mem_info;
    data.partner_no = this.register_info.partner_no;
    
    this.common.user.postPartnerMember(data)
    .subscribe(
      res => {
        this.getPartnerDetail(this.register_info, this.selectedPartnerIdx);
        if (flag == 'update') {
          alert("업데이트 되었습니다.");
        } else {
          alert("등록되었습니다.");
        }
        this.register_mem_popup = false;
      }
    );
  }

  deleteSelectedMember() {
    if(this.selectedMemberList.length == 0) {
      alert('삭제할 직원을 선택해주세요.');
      return ;
    }

    let promise_arr = [];
    var r = confirm("삭제하시겠습니까?");

    if (r == true) {
      this.selectedMemberList.forEach(element => {
        promise_arr.push(this.common.user.deletePartnerMember(element.staff_no).toPromise());
      });

      Promise.all(promise_arr)
      .then(() => {
        alert('삭제완료');
      })
      .catch(() => {
        alert('삭제 오류 발생');
      });

      this.getPartnerDetail(this.register_info, this.selectedPartnerIdx);
      this.selectedMemberList = [];
    }
  }

  delete_memeber() {
    if (this.register_mem_info.staff_no) {
      this.common.user.deletePartnerMember(this.register_mem_info.staff_no)
      .subscribe(
        res => {
          this.getPartnerDetail(this.register_info, this.selectedPartnerIdx);
          alert("직원이 삭제 되었습니다.");
          this.register_mem_info = {
            staff_nm: '',
            cp_no: '',
            join_dttm: '',
            user_no: '',
            staff_no: ''
          };
          this.register_mem_popup = false;
          this.selectedMemberList = [];
      });
    } 
    else {
      alert("직원을 선택해 주세요.");
      return;
    }
  }

  delete_member_all() {
    if (this.register_info.partner_no) {
      this.common.user.deletePartnerMemeberAll(this.register_info.partner_no)
      .subscribe(
        res => {
          this.getPartnerDetail(this.register_info, this.selectedPartnerIdx);
          alert("해당 업체의 모든 직원이 삭제 되었습니다.");
          this.register_mem_info = {
            staff_nm: '',
            cp_no: '',
            join_dttm: '',
            user_no: '',
            staff_no: ''
          };
      });
    } 
    else {
      alert("직원을 선택해 주세요.");
      return;
    }
  }
}
