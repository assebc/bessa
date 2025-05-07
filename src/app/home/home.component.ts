import { Component } from '@angular/core';
import { links } from '../../../public/links';
import { CommonModule } from '@angular/common';

interface Link {
  caption: string;
  url: string;
  icon?: string;
  width?: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly links: Link[] = links;

}
