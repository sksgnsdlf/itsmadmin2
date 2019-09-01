import { Component, OnInit } from '@angular/core';
import { OneStopProvider } from '../../../providers/onestop';
import { ResourceService } from '../../../services/resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';
import { UtilService } from '../../../services/util';
import { LoginSession } from '../../../services/login.session';
import { MaxPageSize } from '../../../../config';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class OnestopListComponent implements OnInit {
  total:number = 0;
  totalPage:number = 0;
  page = 1;
  pageSize = 10;
  maxPage:number = MaxPageSize;
  collectionSize:number = 10;
  
  complainList: any = {};
  receipt_mthd: string = "";
  receipt_typ: string = "";
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

  totalConsult: number = 0;
  totalComplain: number = 0;
  totalProcessing: number = 0;
  totalEnd: number = 0;

  duty = false;
  author = '';

  constructor(private oneStop: OneStopProvider, private resourceService: ResourceService, private router: Router, private route: ActivatedRoute, public util: UtilService, private session: LoginSession) { }

  ngOnInit() {
    if(this.session.profile.menu_down_links && this.session.profile.menu_down_links.findIndex(item => {return item.path == '/onestop/report'}) != -1)
      this.duty = true;
      
    this.author = this.session.profile.name;

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
        }else if(params['search'] == "2") {
          this.from_dt = new Date();
          this.from_dt.setDate(this.from_dt.getDate() - 1);
          this.to_dt = new Date();

          this.to_dt = this.util.dateToMyDate(this.to_dt);
          this.from_dt = this.util.dateToMyDate(this.from_dt);
        }
        else {
          this.from_dt = new Date();
          this.from_dt.setDate(this.from_dt.getDate() - 7);
          this.to_dt = new Date();

          this.to_dt = this.util.dateToMyDate(this.to_dt);
          this.from_dt = this.util.dateToMyDate(this.from_dt);
        }
      }
    );

    this.getProc();
    this.getCategory();
    this.getRecv();
    this.getList();
  }

  getList(page = this.page): Promise<any> {
    return this.oneStop.report.get(page, this.pageSize, this.receipt_mthd, this.proc_state, this.util.myDateToUnix(this.from_dt), this.util.myDateToUnix(this.to_dt), this.cls_no, this.receipt_typ, this.civil_nm, this.civil_tel_no, this.complaints_txt, this.duty?'true':'', this.author?this.author:'')
    .then(
      (data:any) => {
        this.complainList = {};
        this.complainList = data;
        this.totalComplain = 0;
        this.totalConsult = 0;
        this.totalEnd = 0;
        this.totalProcessing = 0;

        //page 관련 변수 초기화
        this.total = data.total;
        this.totalPage = data.totalpage;
        this.collectionSize = this.totalPage * 10;

        if(this.complainList.data && this.complainList.data.length > 0) {
          this.complainList.data.forEach(element => {
            if(element.proc_state == '5' || element.proc_state == '6') {
              this.totalEnd++;
            }
            else if(element.receipt_typ == 2 && element.proc_state == '2') {
              this.totalProcessing++;
            }
            
            if(element.receipt_typ == 1) {
              this.totalConsult++;
              this.totalEnd++;
            }
            else if(element.receipt_typ == 2) {
              this.totalComplain++;
            }
          });
        }
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
    this.router.navigate(['/onestop/report'], {queryParams: {no:item.complaint_no}});
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
          console.log('다시받아온다');
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
