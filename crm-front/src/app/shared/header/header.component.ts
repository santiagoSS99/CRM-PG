import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = {

  }
  constructor() {
    let str_user: any = localStorage.getItem('user')
    this.user = JSON.parse(str_user)
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    window.location.reload()
  }

}
