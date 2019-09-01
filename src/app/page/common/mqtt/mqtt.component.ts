import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../../config';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss']
})
export class MqttComponent implements OnInit {
  ready = false;
  server: any = {};
  serverList = ['health', 'info', 'metrics'];
  broker: any = {};
  brokerList = ['clients/connected', 'clients/disconnected', 'clients/maximum', 'clients/total', 'uptime', 'version', 'load/messages/received', 'load/messages/sent'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    let promises = [];
    this.serverList.forEach(item=>{
      promises.push(this.http.get(`${API}/mqtt/server/${item}`)
      
      .map(_=>this.server[item] = _)
      .toPromise());
    });
    this.brokerList.forEach(item=>{
      promises.push(this.http.get(`${API}/mqtt/broker/${item}`)
      
      .map(_=>this.broker[item] = _)
      .toPromise());
    });

    Promise.all(promises)
    .then(_=>this.ready = true)
    .catch(_=>this.ready = true);
  }

}
