import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonProvider } from '../../../providers/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  data = [];
  code: any = {};
  edit: boolean = false;
  @ViewChild('codeForm') codeForm: FormControl;

  constructor(public common: CommonProvider) { }

  ngOnInit() {
    this.getCode();
  }

  getCode() {
    this.data = [];
    this.common.code.get()
    .subscribe((level1:any)=>{
      level1.forEach(element => {
        let item = {
          code: element.id,
          lvl: 1,
          name: `${element.name} (${element.id})`,
          cd_nm: element.name,
          expanded: false,
          sub: []
        }
        this.common.code.get(2, element.id)
        .subscribe((level2:any) => {
          level2.forEach(element => {
            item.sub.push({
              ...element,
              lvl: 2,
              name: `${element.name} (${element.id})`,
              cd_nm: element.name,
              expanded: false,
              sub: []
            });
          });

          this.data.push(item);
        });
      });
    });
  }

  select(code) {
    if (code.lvl != 2)
      return;

    this.edit = true;
    this.code = { ...code };
    delete this.code.lvl;
    delete this.code.name;
    delete this.code.expanded;
    delete this.code.sub;
  }

  save() {
    if (confirm('저장하시겠습니까?')) {
      this.common.code.post({
        ...this.code,
        type: 2,
        name: this.code.cd_nm
      }).subscribe(_=>{
        alert('저장되었습니다.');
        this.edit = false;
        this.codeForm.reset();
        this.getCode();
      }, err=>{
        alert('저장실패!');
      });
    }
  }

  delete() {
    if (confirm('삭제하시겠습니까?')) {
      this.common.code.delete({
        code: this.code,
        id: this.code.id
      }).subscribe(_=>{
        alert('삭제되었습니다.');
        this.edit = false;
        this.codeForm.reset();
        this.getCode();
      }, err=>{
        alert('삭제실패!');
      });
    }
  }
}
