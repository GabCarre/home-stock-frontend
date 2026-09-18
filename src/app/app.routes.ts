import { Routes } from '@angular/router';
import { Produits } from './components/produits/produits';
import { Lots } from './components/lots/lots';

export const routes: Routes = [
  { path: '', redirectTo: 'produits', pathMatch: 'full' },
  { path: 'produits', component: Produits },
  { path: 'lots', component: Lots }
];