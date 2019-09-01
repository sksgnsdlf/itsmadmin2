import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API, UserSearchForm } from '../../../config';
import { ResponseContentType } from '@angular/http';
import { Post } from './board-child/post';
import { Inplace } from './board-child/inplace';
import { Product } from './board-child/product';
import { Qna } from './board-child/qna';

export class Board {
    private resource: string = this.root_resource + "/board";

    public post:Post = new Post(this.auth, this.resource);
    public inplace:Inplace = new Inplace(this.auth, this.resource);
    public prod:Product = new Product(this.auth, this.resource);
    public qna:Qna = new Qna(this.auth, this.resource);
    
    constructor(private auth : HttpClient, private root_resource){}
    //all일경우 use_state 상관없이 가져오기
    getBoard(society_no, all=null){
        return this.auth.get(`${API}${this.resource}?society_no=${society_no}&all=${all}`);
    }
    postBoard(body){
        return this.auth.post(`${API}${this.resource}`, body, {responseType:'text'});
    }
    postBoardChageOrder(body){
        return this.auth.post(`${API}${this.resource}/changeOrder`, body, {responseType:'text'});
    }
    getBoardOption(){
        return this.auth.get(`${API}${this.resource}/option`)
    }
    
    findBoardAuthUser(society_no, board_tab){
        return this.auth.get(`${API}${this.resource}/auth?society_no=${society_no}&board_tab=${board_tab}`);
    }
    //boar_auth에 없는 회원 조회
    findBoardAuthCandidateUser(society_no, board_tab){
        return this.auth.get(`${API}${this.resource}/auth/candidate?society_no=${society_no}&board_tab=${board_tab}`);
    }
    nmDupCheck(body){
        return this.auth.get(`${API}${this.resource}/dup?society_no=${body.society_no}&board_tab_nm=${body.board_tab_nm}&board_tab=${body.board_tab}`, {responseType:'text'});
    }
}