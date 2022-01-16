import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendLoginService } from 'src/app/services/backend/backendlogin/backendlogin.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [BackendLoginService]
})
export class LoginPageComponent implements OnInit {

  @ViewChild("gradient") gradient?: ElementRef;

  @ViewChild("username") usernameEl?: ElementRef;
  @ViewChild("password") passwordEl?: ElementRef;
  @ViewChild("persist") persistEl?: ElementRef;

  errorMsg = ""

  constructor() { }

  ngOnInit(): void {
    this.check()
  }

  async check() {
    let s = window.sessionStorage
    let l = window.localStorage
    let user_id = l.getItem("user_id") ?? s.getItem("user_id") ?? ""
    let token = l.getItem("token") ?? s.getItem("token") ?? ""
    if (user_id != "" && token != "" && await BackendLoginService.verify(user_id, token))
      this.route("/s2-webapp")
  }

  async log() {
    let username = this.usernameEl?.nativeElement.value
    let password = this.passwordEl?.nativeElement.value
    let persist = this.persistEl?.nativeElement.checked
    if (username == "" || password == "") {
      this.errorMsg = "Incorrect username or password."
      return
    }
    let data;
    try {
      data = await BackendLoginService.login(username, password, persist)
    } catch (e: any) {
      if (e.code == 401) 
        this.errorMsg = "Incorrect username or password."
      else
        this.errorMsg = "An error occured. Please try again later."
      return
    }
    if (persist) {
      let s = window.localStorage;
      s.setItem("username", data.username)
      s.setItem("user_id", data.user_id)
      s.setItem("token", data.token)
      this.route("/s2-webapp")
    }else{
      let s = window.sessionStorage;
      s.setItem("username", data.username)
      s.setItem("user_id", data.user_id)
      s.setItem("token", data.token)
      this.route("/s2-webapp")
    }
  }

  route(url: string): void {
    window.location.href = url;
  }

  ngAfterViewInit() {
    if (this.gradient) {
      const canvas = this.gradient.nativeElement
      canvas.width = 512;
      canvas.height = 512;

      let gl: WebGL2RenderingContext = canvas.getContext('webgl')
      gl.viewport(0,0,gl.drawingBufferWidth, gl.drawingBufferHeight)

      let buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER, 
        new Float32Array([
          -1.0, -1.0, 
           1.0, -1.0, 
          -1.0,  1.0, 
          -1.0,  1.0, 
           1.0, -1.0, 
           1.0,  1.0]), 
        gl.STATIC_DRAW
      );

      let vert = `
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0, 1);
        }
      `
      let frag = `
        precision mediump float;
        uniform float iTime;
        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        void main()
        {
          vec2 p = vec2(gl_FragCoord.xy / 512.0);
          vec2 r = 2.0*vec2(gl_FragCoord.xy - 0.5*512.0)/512.0;
          float t = iTime;
          r = r * 6.0;
          float v1 = sin(r.x + t*1.2);
          float v2 = sin(r.y + t*1.6);
          float v3 = sin(r.x+r.y +t*0.9);
          float v4 = sin(length(r) +1.7*t);
          float v = v1+v2+v3+v4;
          v = (sin(v/50.)*1.3+cos(v/46.)*0.8+tan(v/50.))*0.7-0.05;
          vec3 ret = hsv2rgb(vec3(v,.1,1.));
          gl_FragColor = vec4(ret, 1);
        }
        
      `

      let vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader!, vert);
      gl.compileShader(vertexShader!);
    
      let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader!, frag);
      gl.compileShader(fragmentShader!);
    
      let program = gl.createProgram();
      gl.attachShader(program!, vertexShader!);
      gl.attachShader(program!, fragmentShader!);
      gl.linkProgram(program!);	
      gl.useProgram(program!);

      const tick = (time: number) => {
        gl.clearColor(1,1,1,1);
        gl.clear(gl.COLOR_BUFFER_BIT)
        let positionLocation = gl.getAttribLocation(program!, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        let timeLocation = gl.getUniformLocation(program!, "iTime"); 
        gl.uniform1f(timeLocation, time/1000)
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }
}