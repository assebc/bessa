import { Component } from '@angular/core';
import { links } from '../../public/links';
import { CommonModule } from '@angular/common';

interface Link {
  caption: string;
  url: string;
  icon?: string;
  width?: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly links: Link[] = links;
}
