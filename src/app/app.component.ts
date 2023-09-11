import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pokedex';

  constructor(private router: Router) {}

  //on browser refresh go to the root page
  ngOnInit() {
    this.router.navigate([''])
  }
}
