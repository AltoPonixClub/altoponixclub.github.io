import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { LoginService } from '../../login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userModel = new User('', '');
  returnUrl: string = "";
  loading = false;

  constructor(
    private _loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this._loginService.login(this.userModel)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      )
  }

}
