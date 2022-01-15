import { Injectable } from '@angular/core';
import { BackendBaseService } from '../backendbase/backendbase.service';

export interface StatTimeStamp {
  [key: string]: number;
}

export interface StatisticGraph {
  value: number | null
  history: StatTimeStamp
}

export interface MonitorData {
  [key: string]: StatisticGraph | string,
}

export interface UserData {
  monitor_ids: [string],
  username: string,
  type: string,
}

@Injectable({
  providedIn: 'root'
})
export class BackendDataService {

  constructor() { }

  static async getMonitorData(monitor_id: string, token: string): Promise<MonitorData> {
    return new Promise(async (resolve, reject) => {
      if (monitor_id != "") {
        let json;
        try {
          json = (await BackendBaseService.get("/monitors/get", {"monitor_id": monitor_id, "token": token})).data;
        } catch (e) {
          return reject(e)
        }
        return resolve(JSON.parse(JSON.stringify(json)))
      }
    })
  }

  static async getUserData(user_id: string, token: string): Promise<UserData> {
    return new Promise(async (resolve, reject) => {
      let json;
      try {
        json = (await BackendBaseService.get("/owners/get", {"user_id": user_id, "token": token})).data;
      } catch (e) {
        return reject(e)
      }
      return resolve(JSON.parse(JSON.stringify(json)))
    })
  }

  static async getAllUserData(token: string): Promise<{[key: string]: UserData}> {
    return new Promise(async (resolve, reject) => {
      let json;
      try {
        json = (await BackendBaseService.get("/owners/get", {"token": token})).data;
      } catch (e) {
        return reject(e)
      }
      return resolve(JSON.parse(JSON.stringify(json)))
    })
  }

  static async verifyToken(token: string, user_id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let json;
      try {
        json = (await BackendBaseService.get("/login/verify", {"user_id": user_id, "token": token})).data;
      } catch (e) {
        return reject(e)
      }
      return json;
    })
  }
}
