import { Component, OnInit } from '@angular/core';
import { OneStopProvider } from '../../../providers/onestop';

@Component({
  selector: 'app-search-menual',
  templateUrl: './search-menual.component.html',
  styleUrls: ['./search-menual.component.scss']
})
export class SearchMenualComponent implements OnInit {
  
  selectedCategory: number = -1;
  categoryList: Array<any> = [];
  menualList: Array<any> = [];
  showedMenualList: Array<any> = [];
  searchTxt: string = "";

  constructor(private oneStop: OneStopProvider) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.oneStop.category.get(0)
      .subscribe(
        (data: any) => {
          this.categoryList = data;
          this.categoryList.unshift({name:'전체', id:-1 });
        }
      );

    this.oneStop.menual.get("")
      .subscribe(
        (data: any) => {
          this.menualList = data;
          this.getMenual();
        },
        error => {
        }
      );
  }

  getMenual() {
    if (this.selectedCategory == -1)
      this.showedMenualList = this.menualList.filter(_ => _.subject.indexOf(this.searchTxt) > -1 || _.keyword.indexOf(this.searchTxt) > -1 || _.content_txt.indexOf(this.searchTxt) > -1);
    else
      this.showedMenualList = this.menualList.filter(element => {
        return element.up_cls_no == this.selectedCategory && (element.subject.indexOf(this.searchTxt) > -1 || element.keyword.indexOf(this.searchTxt) > -1 || element.content_txt.indexOf(this.searchTxt) > -1);
      });
  }

  beforeChange(event) {
    this.selectedCategory = this.categoryList[event.nextId].id; 
    this.searchTxt = ''; 
    this.getMenual();
  }
}
