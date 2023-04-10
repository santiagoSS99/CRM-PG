import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private viewsWithoutSidebar: RegExp[] = [
    /^\/home/,
    /^\/login/,
  ]
  router: Router;
  title = 'crm-front';

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {

  }

  showSidebar(): boolean {
    return !this.viewsWithoutSidebar.find((route) => {
      return this.router.url.match(route);
    });
  }
}
