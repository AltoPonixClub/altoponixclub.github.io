import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { short } from "tiny-human-time";
import Hls from "hls.js"
import { BackendDataService, StatisticGraph, UserData } from 'src/app/services/backend/backenddata/backenddata.service';
import { BackendBaseService } from 'src/app/services/backend/backendbase/backendbase.service';
import { BackendLoginService } from 'src/app/services/backend/backendlogin/backendlogin.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
  providers: [BackendDataService]
})
export class MonitorComponent implements OnInit {

  @ViewChild('endpoint') endpointRef?: ElementRef;
  @ViewChild('user') userRef?: ElementRef;
  @ViewChild('monitor') monitorRef?: ElementRef;
  @ViewChild('stream') stream?: ElementRef;
  @ViewChild('icon') icon?: ElementRef;
  @ViewChild('drop') drop?: ElementRef;
  
  endpoint: string = "https://altoponix-database.herokuapp.com/api/v1";

  users: string[] = [];
  monitors: string[] = [];
  selectedUser: string = "";
  selectedMonitor: string = "";

  monitorData: {[key: string]: StatisticGraph} = {};
  string_props: {[key: string]: string} = {foliage_feed: "-",root_stream: "-"};

  loading: boolean = false;
  lastUpdatedDate?: Date;
  lastUpdatedDateString: string = "Updating...";
  error: boolean = false;
  
  timeUpdateFunc: any;
  dataUpdateFunc: any;

  dropdown: boolean = false;

  token = ""
  username = ""
  user_id = ""

  opened = false;

  constructor() { }

  ngOnInit(): void {

    let s = window.sessionStorage;
    let l = window.localStorage;
    this.token = s.getItem("token") ?? l.getItem("token") ?? ""
    this.username = s.getItem("username") ?? l.getItem("username") ?? ""
    this.user_id = s.getItem("user_id") ?? l.getItem("user_id") ?? ""

    if (this.token == "") 
      return this.deAuth()

    // Start BackendDataService
    this.load()

    //Fetch every 15 seconds
    this.dataUpdateFunc = setInterval(() => {
      this.getMonitorData()
    }, 15000);

    //Update time text
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

  async load() {
    if (!await BackendLoginService.verify(this.user_id, this.token))
      this.deAuth();
    try {
      let userData = await BackendDataService.getAllUserData(this.token)
      this.users = Object.keys(userData)
      this.changeUser(this.users[0])
    } catch (e: any) {
      if (e.code == 401) 
        return this.deAuth()
      this.users = [this.user_id]
      this.changeUser(this.users[0])
    }
    if (this.userRef) 
      this.userRef.nativeElement.selectedIndex = 0;
  }

  async getMonitorData(): Promise<void> {
    if (this.selectedMonitor != undefined) {
      this.lastUpdatedDate = new Date();
      this.loading = true;

      let monitorData;
      try {
        monitorData = await BackendDataService.getMonitorData(this.selectedMonitor, this.token)
      } catch (e: any) {
        if (e.code == 401)
          return this.deAuth()
      }

      let graphs: {[key: string]: StatisticGraph} = {}
      for (var key in monitorData) 
        if ((monitorData[key] as StatisticGraph).value !== undefined) 
          graphs[key] = monitorData[key] as StatisticGraph
        else
          this.string_props[key] = monitorData[key] as string
        
      this.monitorData = graphs
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timeUpdateFunc);
    clearInterval(this.dataUpdateFunc);
  }

  changeEndpoint(endpoint: string) {
    BackendBaseService.endpoint = endpoint;
    this.load()
  }

  async changeUser(user_id: string) {
    let userData: UserData;
    try {
      userData = await BackendDataService.getUserData(user_id, this.token)
    } catch (e: any) {
      if (e.code == 401)
        return this.deAuth()
    }
    this.monitors = userData!.monitor_ids;
    this.changeMonitor(this.monitors[0]);
    if (this.monitorRef)
      this.monitorRef.nativeElement.selectedIndex = 0;
  }

  changeMonitor(monitor_id: string) {
    this.selectedMonitor = monitor_id;
    this.getMonitorData();
  }

  onChangeEndpoint(e: any): void { this.changeEndpoint(e.options[e.selectedIndex].text); }

  onChangeUser(e: any): void { this.changeUser(e.options[e.selectedIndex].text); }

  onChangeMonitor(e: any): void { this.changeMonitor(e.options[e.selectedIndex].text); }

  updateLivestream() {
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
  }

  deAuth(): void{
    let s = window.sessionStorage
    let l = window.localStorage
    s.removeItem("token")
    s.removeItem("user_id")
    s.removeItem("username")
    l.removeItem("token")
    l.removeItem("user_id")
    l.removeItem("username")
    window.location.href = "/login";
  }

  async logout(): Promise<void> {
    let s = window.sessionStorage
    let l = window.localStorage
    await BackendLoginService.logout(l.getItem("user_id") ?? s.getItem("user_id") ?? "", l.getItem("token") ?? s.getItem("token") ?? "")
    s.removeItem("token")
    s.removeItem("user_id")
    s.removeItem("username")
    l.removeItem("token")
    l.removeItem("user_id")
    l.removeItem("username")
    this.route("/login")
  }

  route(url: string): void {
    window.location.href = url;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (this.icon!.nativeElement.contains(event.target))
      this.dropdown = true
    if (this.dropdown && !this.drop!.nativeElement.contains(event.target)) 
      this.dropdown = false
  }
}
