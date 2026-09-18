import { Produit } from './produit';
import { Emplacement } from './emplacement';

export interface Lot {
  id?: number;
  produit: Produit;
  emplacement?: Emplacement;
  datePeremption?: string;
  quantite: number;
}