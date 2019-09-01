import { OnInit, EventEmitter } from '@angular/core';
export declare class TreeViewComponent implements OnInit {
    title: string;
    checkbox: boolean;
    data: any[];
    OnClick: EventEmitter<any>;
    OrgChanged: EventEmitter<any>;
    q: any;
    fillterd: any[];
    constructor();
    ngOnInit(): void;
    toggleFolder(li: any): void;
    getSelection(): any[];
    search(text: any): void;
}
