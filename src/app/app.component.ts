import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule, RoutesRecognized } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterModule],
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(private readonly router: Router, private readonly titleService: Title) {
    this.setDocumentTitle();
  }
    
  private setDocumentTitle(): void {
    this.router.events.subscribe((route) => {
      if (!(route instanceof RoutesRecognized)) { return; } // prettier-ignore
      if (route.url.includes('prompt')){
        this.titleService.setTitle('Prompt Engineering');
      }
    });
  }
}
