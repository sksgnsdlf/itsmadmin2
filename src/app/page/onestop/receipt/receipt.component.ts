import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OneStopProvider } from '../../../providers/onestop';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  showPopup: boolean = false;
  civil_nm: string = "";
  civil_tel_no: string = "";
  loc_txt: string = "";
  complaints_txt: string = "";
  answer_txt: string = "";
  categoryList: Array<any> = [];
  menualList: Array<any> = [];
  searchTxt: string = "";
  selectedCategory: number = -1;
  selectedMenualNo: number = -1;

  constructor(private router: Router, private oneStop: OneStopProvider) { }

  ngOnInit() {
    this.getCategory();
  }

  init() {
    this.civil_nm = "";
    this.civil_tel_no = "";
    this.loc_txt = "";
    this.complaints_txt = "";
    this.answer_txt = "";
  }

  getCategory() {
    this.oneStop.category.get(0)
    .subscribe(
      (data:any)=> {
        this.categoryList = data;
      }
    );
    
    this.oneStop.menual.get("")
    .subscribe(
      (data:any) => {
        this.menualList = data;
      },
      error => {

      }
    );
  }

  getMenual() {
    if(this.searchTxt.length > 0) {
      this.selectedCategory = -1;
      this.selectedMenualNo = -1;
      return this.menualList.filter(_ => _.subject.indexOf(this.searchTxt) > -1 || _.keyword.indexOf(this.searchTxt) > -1);
    }

    if(this.selectedCategory == -1)
      return this.menualList;
    else
      return this.menualList.filter(element => {
        return element.up_cls_no == this.selectedCategory;
      });
  }

  textareaInput(ev, from) {
    try {
      if(from == 'req')
        this.complaints_txt = ev.target.value;
      else
        this.answer_txt = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

  goEnd() {
    localStorage.setItem('reportData', JSON.stringify({civil_nm: this.civil_nm, civil_tel_no: this.civil_tel_no, loc_txt: this.loc_txt, complaints_txt: this.complaints_txt, answer_txt: this.answer_txt}));
    this.router.navigate(['/onestop/end', 0]);
  }

  goReport() {
    localStorage.setItem('reportData', JSON.stringify({civil_nm: this.civil_nm, civil_tel_no: this.civil_tel_no, loc_txt: this.loc_txt, complaints_txt: this.complaints_txt, answer_txt: this.answer_txt}));
    this.router.navigate(['/onestop/report'], {queryParams: {no:0}});
  }

  closePopup() {
    this.showPopup = false;
    localStorage.removeItem('reportData');
  }
}
