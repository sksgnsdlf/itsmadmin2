import { Component, OnInit } from '@angular/core';
import { OneStopProvider } from '../../../providers/onestop';
import { ResourceService } from '../../../services/resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';
import { LoginSession } from '../../../services/login.session';
import { UtilService } from '../../../services/util';
import { MaxPageSize } from '../../../../config';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class MyListComponent implements OnInit {
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;

  complainList: any = {};
  receipt_mthd: string = "";
  receipt_typ: string = "2";
  proc_state: string = "";
  from_dt;
  to_dt;
  cls_no: string = "";
  civil_nm: string = "";
  civil_tel_no: string = "";
  complaints_txt: string = "";

  procList: Array<any> = [];
  recvList: Array<any> = [];
  searchCateList: Array<any> = [];

  constructor(private oneStop: OneStopProvider, private resourceService: ResourceService, private router: Router, private route: ActivatedRoute, private session: LoginSession, public util: UtilService) { }

  ngOnInit() {
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

    this.getProc();
    this.getCategory();
    this.getRecv();
  }

  getList(page = this.page): Promise<any> {
    let unix_from_dt = this.util.myDateToUnix(this.from_dt);
    return this.oneStop.report.getMy(page, this.pageSize, this.receipt_mthd, this.proc_state, this.util.myDateToUnix(this.from_dt), this.util.myDateToUnix(this.to_dt), this.cls_no, this.receipt_typ, this.civil_nm, this.civil_tel_no, this.complaints_txt, this.session.profile.user_no)
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

  getProc() {
    this.resourceService.getCode('510')
    .then((_:any) => this.procList = _)
    .catch(err => console.error(err));
  }

  getCategory() {
    this.oneStop.category.get(0)
    .subscribe(
      (data:any) => {
        this.searchCateList = data;
      }
    );
  }

  getRecv() {
    this.resourceService.getCode('500')
    .then((_:any) => this.recvList = _)
    .catch(err => console.error(err));
  }

  goDetail(item) {
    console.log(item);
    this.router.navigate(['/onestop/myreport'], {queryParams: {no:item.complaint_no}});
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
