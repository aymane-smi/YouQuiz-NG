import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from'@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title:boolean = false;
  constructor(private router:Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.title = this.getPageTitle() === "Not Found";
      console.log(this.title);
    });
  }

  getPageTitle(): string {
    let currentRoute = this.route;

    while (currentRoute.children.length > 0) {
      currentRoute = currentRoute.children[0];
    }

    const pageTitle = currentRoute.snapshot.data['title'];
    return pageTitle;
  }
}
