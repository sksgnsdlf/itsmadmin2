import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { CommonProvider } from '../../../providers/common';
import { LoginSession } from '../../../services/login.session';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss']
})
export class OrganComponent implements OnInit {
  @ViewChild("orgForm") orgForm: FormControl
  @ViewChild("inputFile") inputFile: ElementRef;
  
  data = [];
  body: any = {};
  edit = null;
  image: string | ArrayBuffer = "";

  constructor(private common: CommonProvider, private session: LoginSession, public renderer: Renderer) { }

  ngOnInit() {
    this.getOrgan();
    this.initData();
  }
  initData(){
    this.body = {
      certUseYN : '0',
      autoLoginYN : '0',
      imgOpenYN : '0',
      cpOpenYN : '0',
      dispYN : '0'
    }
  }
  getOrgan() {
    this.data = [];
    this.common.organ.get()
    .subscribe((_:any)=>{
        this.data = _;
        if (this.session.checkAdminAndGetOrg() != -1) {
          this.data = this.data.filter((element) => {
            return element.no == this.session.checkAdminAndGetOrg();
          });
        }
      }
    );
  }

  select(item) {
    this.edit = item.no;
    this.body = { ...item };
  }

  save() {
    let files: FileList = this.inputFile.nativeElement.files;
    let formData: FormData = new FormData();
    if (this.image) {
      let file: File = files[files.length - 1];
      formData.append('file', file, file.name);
    }
    
    for (let [k, v] of Object.entries<any>(this.body)) {
      formData.append(k, v);
    }

    let task;
    if (this.edit) {
      task = this.common.organ.put(formData);
    } else {
      task = this.common.organ.post(formData);
    }

    task.subscribe(_=>{
      alert('저장되었습니다.');
      this.edit = false;
      this.orgForm.reset();
      this.initData();
      this.getOrgan();
    }, err=>{
      alert('저장실패!');
    });
  }

  delete() {
    this.common.organ.delete({
      no: this.body.no
    }).subscribe(_=>{
      alert('삭제되었습니다.');
      this.edit = false;
      this.orgForm.reset();
      this.getOrgan();
    }, err=>{
      alert('삭제실패!');
    });
  }

  checkFileType($event) {
    let files: FileList = $event.target.files;
    if (files.length > 0) {
      let file: File = files[0];
      this.body.imageName = file.name;
      if (!file.type.includes('image/')) {
        alert('이미지만 업로드 가능합니다.');
        $event.target.value = '';
      }
      else {
        var fr = new FileReader();
        fr.onload = () => {
          this.image = fr.result;
        }
        fr.readAsDataURL(files[0]);
      }
    }
  }

  openFile() {
    var ua = window.navigator.userAgent;
    console.log(ua);
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
      this.inputFile.nativeElement.click();
    }
    else {
      let event = new MouseEvent('click', { bubbles: true });
      this.renderer.invokeElementMethod(this.inputFile.nativeElement, 'dispatchEvent', [event]);
    }
  }

  clearimg() {
    this.image = null;
    this.body.iconUri = null;
  }
}
