import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendBaseService {

  constructor() { }

  static endpoint = "http://127.0.0.1:5000/api/v1"
  // static endpoint = "https://altoponix-database.herokuapp.com/api/v1"

  static get = async(method: string, args?: {[key: string]: string|number}): Promise<{code: number, data: JSON}> => {
    return new Promise((resolve, reject) => {
      let r = new XMLHttpRequest();
      let u = new URL(BackendBaseService.endpoint + method);
      for (var arg in args)
        u.searchParams.append(arg, args[arg] + "")
      r.timeout = 10000;
      r.onload = function(e) {
        let j = JSON.parse(r.responseText)
        if (j["success"] == true) {
          return resolve({code: r.status, data: j["data"]});
        }else{
          return reject({code: r.status, data: j["cause"]});
        }
      }
      r.ontimeout = function(e) {
        return reject({code: 408, data: "Timeout"});
      }
      r.onerror = function (e) {
        return reject({code: 503, data: "Service Unavailable"});
      }
      r.open("GET", u.toString());
      r.send(null)
    });
  }

  static post = async(method: string, args?: Object): Promise<{code: number, data: JSON}> => {
    return new Promise((resolve, reject) => {
      let r = new XMLHttpRequest();
      let u = new URL(BackendBaseService.endpoint + method);
      r.timeout = 10000;
      r.onload = function(e) {
        let j = JSON.parse(r.responseText)
        if (j["success"] == true) {
          return resolve({code: r.status, data: j["data"]});
        }else{
          return reject({code: r.status, data: j["cause"]});
        }
      }
      r.ontimeout = function(e) {
        return reject({code: 408, data: "Timeout"});
      }
      r.onerror = function (e) {
        return reject({code: 503, data: "Service Unavailable"});
      }
      r.open("POST", u.toString());
      r.setRequestHeader('Content-Type', 'application/json');
      r.send(JSON.stringify(args));
    });
  }
}
