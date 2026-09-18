import { Categorie } from './categorie';
import { Lot } from './lot';

export interface Produit {
  id?: number;
  nom: string;
  codeBarre?: string;
  categorie?: Categorie;
  unite?: string;
  seuilAlerte?: number;
  lots?: Lot[];
}