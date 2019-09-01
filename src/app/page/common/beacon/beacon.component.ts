import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrantProvider } from '../../../providers/grant';
import { ResourceService } from '../../../services/resource.service';
import { LoginSession } from '../../../services/login.session';
import { API } from '../../../../config';
import { FIControlOptions, FormInflaterComponent } from '../../../itsm-ui/public_api';

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.scss']
})
export class BeaconComponent implements OnInit {
  @ViewChild(FormInflaterComponent) form: FormInflaterComponent;

  orgs: Array<any> = [];
  selectedOrgNo;

  beacons:any = [];
  courses:any = [];

  formConfig: FIControlOptions[] = [
    {
      field: 'id',
      title: '단말번호',
      defaultValue: '자동생성',
      readonly: true
    },
    {
      field: 'org',
      title: '기관',
      type: 'select',
      select: {
        options: []
      },
      required: true
    },
    {
      field: 'uuid',
      title: 'UUID',
      required: true
    },
    {
      field: 'mac',
      title: 'MAC Address',
      required: true
    },
    {
      type: 'group',
      field: [
        {
          field: 'major',
          title: 'major',
          required: true
        },
        {
          field: 'minor',
          title: 'minor',
          required: true
        }
      ]
    }
  ];
  body: any = {};

  constructor(private http: HttpClient, public grant: GrantProvider, public resource: ResourceService, public session: LoginSession) { }

  ngOnInit() {
    this.resource.getOrg(4)
    .then((_ :any)=> {
      this.orgs = _;
      this.formConfig.find(_=>_.field=='org').select.options = this.orgs.map(_=>{
        return {
          text: _.name,
          value: _.id
        };
      });
      this.selectedOrgNo = this.session.checkAdminAndGetOrg() == -1 ? 1 : this.session.checkAdminAndGetOrg();
      this.getBeacon();
    });
  }

  getBeacon() {
    this.http.get(`${API}/course/beacon?org=${this.selectedOrgNo}&society=-1`)
    .subscribe((res:any)=>this.beacons=res);
  }

  async select(item) {
    this.body = { ...item };
    this.form.edit = true;
    this.courses = await this.http.get(`${API}/course/use/${item.id}`).toPromise();
  }

  async save() {
    try {
      if (this.form.edit) {
        const auth = await this.grant.checkAuth('/attend/beacon', this.body.id, 'edit')
        if (auth) {
          await this.http.put(`${API}/course/beacon/${this.body.id}`, this.body, {responseType:'text'}).toPromise();
          alert('저장되었습니다.');
          this.getBeacon();   
        } else {
          throw 'no_auth'
        }
      } else {
        const id = await this.http.post(`${API}/course/beacon`, this.body, {responseType:'text'}).toPromise();
        this.body.id = id;
        this.beacons.push({...this.body});
        this.form.edit = true;
        alert('저장되었습니다.');
      }
    } catch (err) {
      if (err === 'no_auth')
        alert('권한이 없습니다.');
      else
        alert('저장실패');
    }
  }

  async delete(id) {
    try {
      const auth = await this.grant.checkAuth('/attend/beacon', id, 'delete');
      if (auth) {
        await this.http.delete(`${API}/course/beacon/${id}`, {responseType:'text'}).toPromise();
        this.beacons.splice(this.beacons.findIndex(_=>_.id==id), 1);
        this.form.reset();
        alert('삭제되었습니다.');  
      } else {
        throw 'no_auth';
      }
    } catch (err) {
      if (err === 'no_auth')
        alert('권한이 없습니다.');
      else
        alert('삭제실패');
    }
  }
}
