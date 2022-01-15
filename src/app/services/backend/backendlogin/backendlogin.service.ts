import { Injectable } from '@angular/core';

import { BackendBaseService } from '../backendbase/backendbase.service';

export interface LoginData {
  token: string,
  username: string,
  user_id: string
}

@Injectable({
  providedIn: 'root'
})
export class BackendLoginService {

  constructor() { }

  static async login(username: string, password: string, persist: boolean): Promise<LoginData> {
    return new Promise(async (resolve, reject) => {
      let json;
      try {
        json = (await BackendBaseService.post("/login/user", {username, password, persist})).data;
      } catch (e) {
        return reject(e)
      }
      return resolve(JSON.parse(JSON.stringify(json)))
    })
  }

  static async logout(user_id: string, token: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let json;
      try {
        json = (await BackendBaseService.post("/logout/user", {user_id, token})).data;
      } catch (e) {
        return reject(e)
      }
      return resolve(true)
    })
  }

  static async verify(user_id: string, token: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let json;
      try {
        json = (await BackendBaseService.post("/login/user/verify", {user_id, token})).data as any as boolean;
      } catch (e) {
        return reject(e)
      }
      return resolve(json)
    })
  }
}
