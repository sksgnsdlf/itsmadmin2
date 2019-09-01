import { Component, OnInit } from '@angular/core';
import { LoginSession } from '../../services/login.session';
import { Router, ActivatedRoute, Params } from '@angular/router';

const serverAddr = "https://smart.pohang.go.kr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public auth: LoginSession, private route: Router, private activatedRoute: ActivatedRoute) { }

  username;
  password;
  loginform = true;
  recoverform = false;
  processMessage = (event) => {

    if (event.origin !== serverAddr)
      return;

    if (event.data.hasOwnProperty('error')) {
      console.error(event.data.error);
    } else if (event.data.hasOwnProperty('access_token')) {
      this.auth.login(null, null, event.data)
        .then(_ => {
          this.route.navigate(['/']);
        })
        .catch(err => {
          if (err.status == 404) {
            alert('아이디/비밀번호를 확인하세요.');
          }
          else {
            alert('네트워크/서버 상태를 확인해주세요.');
          }
        });
    }
  };

  // showRecoverForm() {
  //   this.loginform = !this.loginform;
  //   this.recoverform = !this.recoverform;
  // }

  login() {
    if (!this.username || !this.password) {
      alert('아이디/비밀번호를 확인하세요.');
      return;
    }

    this.auth.login(this.username, this.password)
      .then(_ => {
        this.route.navigate(['/']);
      })
      .catch(err => {
        let msg = null;
        try {
          let tmp = JSON.parse(err._body);
          if (tmp.hasOwnProperty('msg'))
            msg = tmp.msg;
        } catch (err) {

        }
        if (this.isIE() && this.isIE() < 10) {
          // is IE version less than 9
          alert('Internet Exporer 9 이하는 지원하지 않습니다. \n하단의 관리자 프로그램 다운로드 버튼을 클릭하여 관리자 프로그램을 다운받아 사용해 주세요.');
        } else {
          if (msg) {
            alert(msg);
          }
          else if (err.status == 404) {
            alert('아이디/비밀번호를 확인하세요.');
          }
          else if (err.status == 'no_auth') {
            alert('권한이 없습니다.');
          }
          else if (err.status == 403) {
            alert('휴대폰 인증 되지 않은 아이디입니다. 스마트포항앱에서 휴대폰 인증을 진행해 주세요.');
          }
          else {
            alert('네트워크/서버 상태를 확인해주세요.');
          }
        }

        this.auth.logout();
      });
  }

  ngOnInit() {
    window.addEventListener("message", this.processMessage, false);
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let userId = params['user_id'];
      if (userId)
        this.auth.login(userId, '*dlcmdpaxptmxm*')
          .then(_ => {
            this.route.navigate(['/']);
          })
    });
  }

  ngOnDestroy() {
    window.removeEventListener("message", this.processMessage);
  }

  cert() {
    let popup = window.open("http://smart.pohang.go.kr/profile/login", "", 'width=430, height=560, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200');
  }

  find(password = false) {
    window.open(`http://www.pohang.go.kr/pohang/login.do`, '_blank');
  }

  download() {
    window.open(`assets/sp_installer.exe`, '_blank');
  }
  download_research_form() {
    window.open(`assets/research_form.xlsx`, '_blank');
  }
  download_manual() {
    window.open(`assets/manual_group_admin.pdf`, '_blank');
  }
  isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }
}
