import { Component, OnInit, ViewChild } from '@angular/core';
import { OneStopProvider } from '../../../providers/onestop';
import * as _ from 'lodash';
import { GrantProvider } from '../../../providers/grant';
import { FormControl } from '@angular/forms';
import { CKEditorComponent } from '../../../itsm-ui/public_api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from '../../../services/resource.service';
import { LoginSession } from '../../../services/login.session';


@Component({
  selector: 'app-add-menual',
  templateUrl: './add-menual.component.html',
  styleUrls: ['./add-menual.component.scss']
})
export class AddMenualComponent implements OnInit {

  data: Array<any> = [];
  newMenual: any = {};
  edit: boolean = false;
  editAuth: boolean = false;
  isAdmin:boolean = false;
  isOnestopAdmin:boolean = false;

  @ViewChild('codeForm') codeForm: FormControl;
  @ViewChild('ck') ck: CKEditorComponent;

  showGrantPopup: boolean = false;//?

  //조직도 관련
  orgs: any = [];
  org: number = 1;
  depts: Array<any> = [];

  managers: Array<any> = [];
  selectedOrg: String = "";
  selectedOrgId: String = "";

  constructor(private oneStop: OneStopProvider, private grant: GrantProvider, private modalService: NgbModal,
    private resourceService: ResourceService, private loginsession: LoginSession) { }

  ngOnInit() {
    this.init();
    this.getCategory(true, true);
    this.isOnestopAdmin =  this.loginsession.profile.menu_auths.findIndex((element) => { return element == '040' }) == -1 ? false : true;
    this.isAdmin = this.loginsession.isAdmin() ||  this.isOnestopAdmin;
  }

  init(cls_no = -1, info_no = "") {
    this.newMenual = {
      cls_no: cls_no,
      content_txt: "",
      keyword: "",
      link_url: "",
      subject: "",
      open_yn: "N",
      info_no: info_no
    };
  }

  async getCategory(search: boolean = false, refresh_all: boolean = false) {
    this.data = [];
    let level1: any = await this.oneStop.category.get(0).toPromise();
    for (const element of level1) {
      let item = {
        code: element.id,
        lvl: 1,
        name: `${element.name} (${element.id})`,
        cd_nm: element.name,
        expanded: false,
        sub: []
      }
      let level2: any = await this.oneStop.menual.get(element.id).toPromise();
      for (const elementSub of level2) {
        item.sub.push({
          ...elementSub,
          lvl: 2,
          name: `${elementSub.subject} (${elementSub.info_no})`,
          cd_nm: elementSub.subject,
          expanded: false,
          sub: []
        });
      }
      this.data.push(item);
    }
  }

  select(newMenual) {
    if (newMenual.lvl != 2)
      return;

    this.edit = true;
    this.newMenual = { ...newMenual };
    delete this.newMenual.lvl;
    delete this.newMenual.name;
    delete this.newMenual.expanded;
    delete this.newMenual.sub;

    this.getMngrList();
  }

  // getMenual(search) {
  //   this.oneStop.menual.get("")
  //     .subscribe(
  //       (data: Array<any>) => {
  //         data.forEach(element => {
  //           if (this.data.find(_ => _.id == element.up_cls_no || _.id == element.cls_no))
  //             this.data.find(_ => _.id == element.up_cls_no || _.id == element.cls_no).mList.push(element);
  //         });

  //         if (search) {
  //           this.search();
  //         }
  //         console.log(this.data);
  //       },
  //       error => {
  //       }
  //     );
  // }

  save() {
    var upload = () => {
      this.oneStop.menual.post(body)
        .subscribe(
          (data: any) => {
            alert('저장되었습니다');
            if (!body.info_no)
              this.newMenual.info_no = data.id;
            this.getCategory(true, true);
          },
          error => {
            alert('저장실패');
          }
        );
    }

    if (!this.newMenual.subject || !this.newMenual.keyword || this.newMenual.cls_no == -1) {
      alert('주제, 분류, 키워드를 확인해주세요.');
      return;
    }

    // this.newMenual.content_txt = this.ck;

    var body = _.cloneDeep(this.newMenual);
    if (this.newMenual.info_no == -1) { // 새 매뉴얼일 경우
      body.info_no = "";
    }

    // if(body.info_no) {
    //   this.grant.checkAuth('/onestop/menual/add', body.info_no, 'edit')
    //   .then((data) => {
    //     if (data) {
    //       upload();
    //     }
    //   });
    // }
    // else {
    //   upload();
    // }

    //권한 체크 부분 삭제 2018.08.20 by mj(시청 공무원 새끼들 6시이후에 일시킴)
    upload();
  }

  delete() {
    this.grant.checkAuth('/onestop/menual/add', this.newMenual.info_no, 'delete')
      .then((data) => {
        if (data && confirm("삭제하시겠습니까?")) {
          this.oneStop.menual.delete(this.newMenual.info_no)
            .subscribe(
              data => {
                alert('삭제되었습니다.');
                this.getCategory(true, true);
                this.init();
              },
              error => {
                alert('삭제실패.');
              }
            );
        }
      });
  }

  openAsgnPopup(item = null, content) {
    // this.dutyData = {};

    // if (!item) {
    //   this.dutyData.duty_dt = new Date();
    //   this.dutyData.user_nm = localStorage.getItem('user_name');
    //   this.dutyData.dept_nm = localStorage.getItem('user_office_nm');
    //   this.dutyData.official_id = localStorage.getItem('user_official_id');
    //   this.dutyData.org_no = localStorage.getItem('user_org_no');
    //   this.dutyData.chief_yn = false;
    //   this.dutyData.duty_typ = '';
    //   this.dutyData.duty_site = '';
    //   this.dutyData.duty_txt = '';
    //   this.dutyData.reg_dttm = null;
    // }
    // else {
    //   this.dutyData = _.cloneDeep(item);
    //   this.prevDutyData = _.cloneDeep(item);
    // }
    this.setOrg(this.org);
    this.getMngrList();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
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
            nodeNm : row.node_nm,
            sub: []
          };

          if (row.lvl == 1) {
            lvl1 = this.depts.length;
            this.depts.push(item);
          } else if (row.lvl == 2) {
            lvl2 = this.depts[lvl1].sub.length;
            this.depts[lvl1].sub.push(item);
          }
        }
      })
      .catch(err => console.error(err));
  }

  managerAddBtn(){
    // 추가
    if (!this.selectedOrg || !this.selectedOrgId) {
      alert('관리부서를 선택하세요.');
      return;
    }

    //this.managers
   var temp =  this.managers.filter(_=>{
     return _.dept_id == this.selectedOrgId;
    })
    //this.selectedOrgId
    // 리스트 새로고침
    //getMngrList();
    //console.log(temp);
    if(temp.length == 0){
      let item: any = {
        info_no: this.newMenual.info_no,
        org_no: 1,
        dept_id: this.selectedOrgId,
        reg_user_no: 1
      };

      this.resourceService.postLifeInfoDept(this.newMenual.info_no, item).then(_=>{
        this.getMngrList();
      }).catch(err => {
        alert('추가실패.');
        });
    }else{
      alert('중복.');
    }
  }

  managerDelBtn(manager){
      //삭제
      //alert(manager.dept_nm);
      //리스트 새로고침
      //getMngrList();

      let item: any = {
        info_no: this.newMenual.info_no,
        org_no: 1,
        dept_id: manager.dept_id,
      };

      this.resourceService.deleteLifeInfoDept(this.newMenual.info_no, item)
      .then(_ => {
        this.getMngrList();
        alert('삭제되었습니다.');
        })
        .catch(err => {
          alert('삭제실패.');
          });
      
     
      
  }

  selectDept(dept) {
    this.selectedOrg = dept.nodeNm;
    this.selectedOrgId = dept.id;
    //console.log(dept.orgNo);
    //console.log(this.selectedOrgId);
  }

  getMngrList() {
    //managers 가져오는거
    this.managers = [];
    this.resourceService.getLifeInfoDept(this.newMenual.info_no)
    .then((_: any) => {
      for (let row of _) {
        let item: any = {
          dept_id: row.dept_id,
          orgcht_id: 1,
          dept_nm: row.dept_nm,
          rgs_de: row.reg_dttm,
          writer: row.reg_user_no,
          user_nm : row.user_nm
        };

        // if (row.lvl == 1) {
        //   lvl1 = this.depts.length;
        //   this.depts.push(item);
        // } else if (row.lvl == 2) {
        //   lvl2 = this.depts[lvl1].sub.length;
        //   this.depts[lvl1].sub.push(item);
        // }

        //console.log(row);

        this.managers.push(item);

        // if()
      }

      //console.log(this.managers.find(_=>{return  localStorage.getItem('user_dept_id').includes(_.dept_id)}))
      this.editAuth = false;
      var auth = this.managers.find(_=>{return  localStorage.getItem('user_dept_id').includes(_.dept_id)})


      if( auth != undefined  || this.loginsession.isAdmin() || this.isOnestopAdmin){
        this.editAuth = true;
      }
      // this.managers.find(_=>_.dept_id.contains(this.loginsession.profile.dept_id)
    })
    .catch(err => console.error(err));
   // this.managers = [{ orgcht_id : '1', dept_nm: 'dept_nm', rgs_de: 'rgs_de', writer: 'writer' }];
  }

  
}
