import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../../config';

@Component({
  selector: 'itsm-themeenrollment',
  templateUrl: './themeenrollment.component.html',
  styleUrls: ['./themeenrollment.component.scss']
})
export class ThemeenrollmentComponent implements OnInit {

  id;
  messageEditor: string;

  push: any = {
    title: '',
    sender: '',
    text: '',
    textSMS: '',
    isReserve: false,
    reserveDate: '',
    reserveTime: '',
    appSms: false,
    appKakao: false
  }
  smsEditor: string;
  pushMethod = "1";
  recvs = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
  }
  OnEditorLoaded() {
    this.route.queryParams.subscribe(
      params => {
        if (params['id']) {
          this.id = params.id;
          this.http.get(`${API}/push/${this.id}`)

            .subscribe((data: any) => {
              this.push.title = data.msg.title;
              this.messageEditor = data.msg.text;
              this.smsEditor = data.msg.smsText;
              this.smsEditor = data.msg.smsText;
              this.pushMethod = data.msg.pushMethod;
              this.recvs = data.recvs;
            })
        }

      }
    )
  }
}
