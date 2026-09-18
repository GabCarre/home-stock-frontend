import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock';
import { Produit } from '../../models/produit';
import { Categorie } from '../../models/categorie';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-produits',
  imports: [CommonModule, FormsModule],
  templateUrl: './produits.html',
  styleUrl: './produits.css'
})
export class Produits implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  nouveauProduit: Produit = { nom: '' };
  sousOnglet: 'ajouter' | 'liste' = 'liste';
  messageConfirmation = '';

  constructor(private stockService: StockService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chargerProduits();
    this.chargerCategories();
  }

  chargerProduits(): void {
  this.stockService.getProduits().subscribe((data) => {
    console.log('Produits reçus:', data);
    this.produits = data;
    this.cdr.detectChanges(); 
  });
}

  chargerCategories(): void {
    this.stockService.getCategories().subscribe((data) => (this.categories = data));
  }

  quantiteTotale(produit: Produit): number {
    return (produit.lots ?? []).reduce((sum, lot) => sum + Number(lot.quantite), 0);
  }

  ajouterProduit(): void {
    this.stockService.creerProduit(this.nouveauProduit).subscribe(() => {
      const nomProduit = this.nouveauProduit.nom;
      this.nouveauProduit = { nom: '' };
      this.chargerProduits();
      this.messageConfirmation = `"${nomProduit}" a bien été ajouté.`;
      setTimeout(() => (this.messageConfirmation = ''), 4000);
    });
  }

  supprimerProduit(id: number): void {
    if (!confirm('Supprimer ce produit et tous ses lots ?')) return;
    this.stockService.supprimerProduit(id).subscribe(() => this.chargerProduits());
  }
}