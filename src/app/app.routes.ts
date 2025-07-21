import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'prompt',
    loadComponent: () => import('./prompt/prompt.component').then(m => m.PromptComponent)
  },
  {
    path: 'irs',
    loadComponent: () => import('./irs/irs.component').then(m => m.IRSComponent)
  },
  {
    path: 'parking',
    loadComponent: () => import('./parking/parking.component').then(m => m.ParkingComponent)
  },
  {
    path: 'medimeet/privacy-policy',
    loadComponent: () => import('./medimeet/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
