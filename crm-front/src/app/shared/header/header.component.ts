import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = {

  }
  constructor(
    private router: Router
  ) {
    let str_user: any = localStorage.getItem('user')
    this.user = JSON.parse(str_user)
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    window.location.reload()
    this.router.navigate(['/home']);
  }

}
