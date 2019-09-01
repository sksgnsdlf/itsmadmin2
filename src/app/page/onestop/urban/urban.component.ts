import { Component, OnInit } from '@angular/core';
import { OneStopProvider } from '../../../providers/onestop';
import { ResourceService } from '../../../services/resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';
import { UtilService } from '../../../services/util';
import { LoginSession } from '../../../services/login.session';
import { API, MaxPageSize } from '../../../../config';
import { PushProvider } from '../../../providers/push';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-urban',
  templateUrl: './urban.component.html',
  styleUrls: ['./urban.component.scss']
})
export class UrbanComponent implements OnInit {
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;
  
  complainList: any = {};
  from_dt;
  to_dt;
  cls_no: string = "";
  civil_nm: string = "";
  civil_tel_no: string = "";
  sender_tel_no: string = "0542708282";
  complaints_txt: string = "";
  showPopup = false;
  popupTitle: string = "SMS 전송";
  popupText: string = "";
  searchCateList: Array<any> = [];

  duty = false;

  constructor(private oneStop: OneStopProvider, private resourceService: ResourceService, private router: Router, private route: ActivatedRoute, public util: UtilService, private session: LoginSession, private push: PushProvider, private modalService: NgbModal) { }
  ngOnInit() {
    if(this.session.profile.menu_down_links && this.session.profile.menu_down_links.findIndex(item => {return item.path == '/onestop/report'}) != -1)
      this.duty = true;

    this.route.queryParams.subscribe(
      params => {
        // this.router.routeReuseStrategy.shouldReuseRoute = function () {
        //   return false;
        // };
        this.router.navigated = false;
        window.scrollTo(0, 0);

        if(params['search'] == "1") {
          this.from_dt = '';
          this.to_dt = '';
          this.pageSize = 100;
          this.complaints_txt = params['keyword'];
        }
        else {
          this.from_dt = new Date();
          this.from_dt.setDate(this.from_dt.getDate() - 7);
          this.to_dt = new Date();

          this.to_dt = this.util.dateToMyDate(this.to_dt);
          this.from_dt = this.util.dateToMyDate(this.from_dt);
        }
        this.getList();
      }
    );
    this.getCategory();
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
  getList(page = this.page): Promise<any> {
    return this.oneStop.urban.get(page, this.pageSize, this.util.myDateToUnix(this.from_dt), this.util.myDateToUnix(this.to_dt), this.cls_no, this.civil_nm, this.civil_tel_no, this.complaints_txt)
    .then(
      (data:any) => {
        
        this.complainList = {};
        this.complainList = data;       
        this.total = data.total;
        this.totalPage = data.totalpage;
        this.collectionSize = this.totalPage * 10; 
      }
    ).catch(
      err => {
        console.error(err);
      }
    );
  }

  getCategory() {
    this.oneStop.urban.getCate()
    .subscribe(
      (data:any) => {
        this.searchCateList = data;
      }
    );
  }
  getExcel(){
    return this.oneStop.urban.excel(this.util.myDateToUnix(this.from_dt), this.util.myDateToUnix(this.to_dt), this.cls_no, this.civil_nm, this.civil_tel_no, this.complaints_txt)
    .subscribe(_=>{
      var blob = new Blob([_], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      var filename = `도시재생참여목록.xlsx`;
      FileSaver.saveAs(blob, filename);
    },err=>{
      console.error(err);
      alert('엑셀 저장 실패');
    });
  }
  sendSms() {
    console.log('send SMS')
    let receiver = this.complainList.data.filter(_=>_.selected);
    // this.complainList.data.forEach(_=>_.selected=false);
    if(receiver.length == 0){
      alert('수신 대상자를 선택해 주세요.');
      return;
    }
    let promiseArr = [];
    receiver.forEach(_=>{
      var body = {
        msg: this.popupText,
        name: this.sender_tel_no,
        tel: _.civil_tel_no,
        reserveDttm: null,
      };
      
      promiseArr.push(this.push.postSms(body).toPromise());
    });

    Promise.all(promiseArr)
    .then(_=>{
      alert('문자 발송 성공')
      this.showPopup = false;
    })
    .catch(err=>{
      console.error(err);
      alert('문자 발송 실패');
    })
  }

  print(day = false) {
    var f_temp = this.from_dt;
    var t_temp = this.to_dt;

    if(day) {
      this.from_dt = new Date();
      this.to_dt = new Date();
      
      this.getList()
      .then(
        () => {
          setTimeout(() => {
            const html = document.querySelector('html');
            const printContents = document.querySelector('#mCont').innerHTML;
            const printDiv = document.createElement('DIV');
            printDiv.className = '.cont';

            html.appendChild(printDiv);
            
            printDiv.innerHTML = printContents;
            document.body.style.display = 'none';
            window.print();
            
            document.body.style.display = 'block';
            printDiv.style.display = 'none';
          }, 0);
          
          this.from_dt = f_temp;
          this.to_dt = t_temp;
          this.getList();
        }
      ).catch(
        err => {
          this.from_dt = f_temp;
          this.to_dt = t_temp;
          console.error(err);
        }
      );
    }
    else {
      const html = document.querySelector('html');
      const printContents = document.querySelector('#mCont').innerHTML;
      const printDiv = document.createElement('DIV');
      printDiv.className = '.cont';

      html.appendChild(printDiv);
      
      printDiv.innerHTML = printContents;
      document.body.style.display = 'none';
      window.print();
      
      document.body.style.display = 'block';
      printDiv.style.display = 'none';
    }
  }
}
