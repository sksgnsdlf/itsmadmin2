import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'itsm-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  @Input() title: string = null;
  @Input() checkbox = false;
  @Input() data: any[] = [];
  @Output() OnClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() OrgChanged: EventEmitter<any> = new EventEmitter<any>();

  q;
  fillterd = [];

  constructor() { }

  ngOnInit() {
  }

  toggleFolder(li) {
    if (li.sub && li.sub.length)
      li.expanded = !li.expanded;

    this.OnClick.emit(li);
  }

  getSelection() {
    let tmp = [];
    for (let level1 of this.data) {
      if (level1.selected) {
        tmp.push(level1);
        continue;
      }
      for (let level2 of level1.sub) {
        if (level2.selected) {
          tmp.push(level2);
          continue;
        }
        for (let level3 of level2.sub) {
          if (level3.selected) {
            tmp.push(level3);
          }
        }
      }
    }

    return tmp;
  }

  search(text) {
    if (!text)
      return;
    
    let tmp = [];
    for (let level1 of this.data) {
      if (level1.name.includes(text)) {
        tmp.push(level1);
        continue;
      }
      for (let level2 of level1.sub) {
        if (level2.name.includes(text)) {
          tmp.push(level2);
          continue;
        }
        for (let level3 of level2.sub) {
          if (level3.name.includes(text)) {
            tmp.push(level3);
          }
        }
      }
    }

    this.fillterd = tmp;
  }
}
