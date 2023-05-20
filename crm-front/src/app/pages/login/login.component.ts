import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
// import { User } from 'src/app/interfaces/user';
declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }
  public token: any = localStorage.getItem('token')

  constructor(
    private collaboratorService: CollaboratorService,
    private _router: Router
  ) { }


  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/dashboard'])
    }
  }

  login() {
    console.log(this.user)
    if (!this.user.email) {
      $.notify('Make sure you`re fill the email', {
        type: 'danger',
        spacing: 10,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 1000,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    } else if (!this.user.password) {
      $.notify('Make sure you`re fill the password', {
        type: 'danger',
        spacing: 10,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 1000,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    } else {
      this.collaboratorService.login(this.user).subscribe(res => {
        console.log(res)
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('id', res.id);
        this._router.navigate(['/dashboard'])
      })
    }
  }

}
