import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getJson } from '../../utils/api';
import { short } from "tiny-human-time";
import Hls from "hls.js"
import { User } from '../../user';
import { LoginService } from '../../login.service';

interface Owner {
  user_id?: string,
  monitor_ids: string[]
}

interface OwnerList {
  [key: string]: Owner;
}

interface StatTimeStamp {
  [key: string]: number;
}

interface StatisticGraph {
  value: number | null
  history: StatTimeStamp
}

interface StatData {
  [key: string]: StatisticGraph;
}

interface OtherProps {
  foliage_feed: string,
  root_stream: string,
}

@Component({
  selector: 'app-webapp-page',
  templateUrl: './webapp-page.component.html',
  styleUrls: ['./webapp-page.component.css']
})
export class WebappPageComponent implements OnInit {
  userModel = new User('', '');
  notSubmitted: boolean = true;

  @ViewChild('endpoint') endpointRef?: ElementRef;
  @ViewChild('user') userRef?: ElementRef;
  @ViewChild('monitor') monitorRef?: ElementRef;
  @ViewChild('stream') stream?: ElementRef;
  
  endpoint: string = "https://altoponix-database.herokuapp.com/api/v1";
  owners: OwnerList = {};
  users: string[] = [];
  monitors: string[] = [];
  selectedUser: string = "";
  selectedMonitor: string = "";
  loading: boolean = false;
  data: StatData = {};
  lastUpdatedDate?: Date;
  lastUpdatedDateString: string = "Updating...";
  error: boolean = false;
  firstNameAutofilled: boolean = false;
  lastNameAutofilled: boolean = false;

  timeUpdateFunc: any;
  dataUpdateFunc: any;

  string_props: OtherProps = {foliage_feed: "-",root_stream: "-"};

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.dataUpdateFunc = setInterval(() => {
      this.getMonitorData()
    }, 15000);
    this.timeUpdateFunc = setInterval(() => {
      if (this.lastUpdatedDate != undefined){
        let str: string = short(Date.now(), this.lastUpdatedDate);
        if (str.endsWith('ms')) {
          this.lastUpdatedDateString = "Last updated now";
        }else{
          this.lastUpdatedDateString = "Last updated " + str + " ago";
        }
      }
      if (this.loading) 
        this.lastUpdatedDateString = "Updating...";
      if (this.error) 
        this.lastUpdatedDateString = "Error fetching data";
      
    }, 100);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeUpdateFunc);
    clearInterval(this.dataUpdateFunc);
  }

  onChangeEndpoint(e: any): void {
    let target = e;
    this.endpoint = target.options[target.selectedIndex].text;
    this.fetchUsers();
  }

  onChangeUser(e: any): void {
    let target = e;
    this.selectedUser = target.options[target.selectedIndex].text;
    this.monitors = this.owners[this.selectedUser]["monitor_ids"];
    this.selectedMonitor = this.monitors[0];
    this.getMonitorData();
  }

  onChangeMonitor(e: any): void {
    let target = e;
    this.selectedMonitor = target.options[target.selectedIndex].text;
    this.getMonitorData();
  }

  async fetchUsers(): Promise<void> {
    this.loading = true;
    this.error = false;
    let json;
    try {
      json = await getJson(this.endpoint + "/owners/get");
    } catch (e) {
      this.loading = false;
      this.error = true;
      return
    }
    this.owners = JSON.parse((JSON.stringify(json)));
    this.users = Object.keys(this.owners);
    this.selectedUser = this.users[0];
    this.monitors = this.owners[this.selectedUser]["monitor_ids"];

    this.selectedMonitor = this.monitors[0];
    this.loading = false;
    if (this.monitorRef)
      this.monitorRef.nativeElement.selectedIndex = 0;
    if (this.userRef) 
      this.userRef.nativeElement.selectedIndex = 0;
    this.getMonitorData();
  }

  async getMonitorData(): Promise<void> {
    if (this.selectedMonitor != undefined) {
      this.lastUpdatedDate = new Date();
      this.loading = true;
      let json;
      try {
        json = await getJson(this.endpoint + "/monitors/get?monitor_id=" + this.selectedMonitor);
      } catch (e) {
        this.loading = false;
        this.error = true;
        return
      }
      this.data = JSON.parse(JSON.stringify(json));
      let props: OtherProps = JSON.parse(JSON.stringify(json));

      this.string_props.foliage_feed = props.foliage_feed;
      this.string_props.root_stream = props.root_stream;

      let video = this.stream?.nativeElement
      let videoSrc = "https://altoponix-cdn.sfo3.digitaloceanspaces.com/streaming/" + this.selectedMonitor + "/master.m3u8"

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
      }else if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      }
      video.play()

      delete this.data["foliage_feed"];
      delete this.data["root_stream"];

      this.loading = false;
    }
  }

  onSubmit() {
    this.notSubmitted = false;
    this._loginService.login(this.userModel)
      .subscribe(
        data => console.log('Success', data),
        error => console.log('Error', error)
      )
  }

}
