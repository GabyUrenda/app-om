import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent {
    
  constructor(
    private router: Router
  ) { }

  onBegin(): void {
    this.router.navigate(['/tasks-list'])
  }
}