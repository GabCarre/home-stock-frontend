import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock';
import { Lot } from '../../models/lot';
import { Produit } from '../../models/produit';
import { Emplacement } from '../../models/emplacement';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lots',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lots.html',
  styleUrl: './lots.css'
})
export class Lots implements OnInit {
  lots: Lot[] = [];
  produits: Produit[] = [];
  emplacements: Emplacement[] = [];
  sousOnglet: 'ajouter' | 'liste' = 'liste';
  messageConfirmation = '';

  produitSelectionneId?: number;
  emplacementSelectionneId?: number;
  datePeremption?: string;
  quantite?: number;

  constructor(private stockService: StockService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chargerLots();
    this.chargerProduits();
    this.chargerEmplacements();
  }

  chargerLots(): void {
    this.stockService.getLots().subscribe((data) => {
      this.lots = data
      this.cdr.detectChanges(); 
    });
  }

  chargerProduits(): void {
    this.stockService.getProduits().subscribe((data) => {
      this.produits = data
      this.cdr.detectChanges(); 
    });  
  }

  chargerEmplacements(): void {
    this.stockService.getEmplacements().subscribe((data) => {
      this.emplacements = data
      this.cdr.detectChanges(); 
    });  
  }

  ajouterLot(): void {
    if (!this.produitSelectionneId || !this.quantite) return;

    const produit = this.produits.find((p) => p.id === this.produitSelectionneId);
    const emplacement = this.emplacements.find((e) => e.id === this.emplacementSelectionneId);

    const nouveauLot: Lot = {
      produit: produit!,
      emplacement: emplacement,
      datePeremption: this.datePeremption,
      quantite: this.quantite
    };

    this.stockService.creerLot(nouveauLot).subscribe(() => {
      this.produitSelectionneId = undefined;
      this.emplacementSelectionneId = undefined;
      this.datePeremption = undefined;
      this.quantite = undefined;
      this.chargerLots();
    });

    this.messageConfirmation = `"Le lot a bien été ajouté.`;
      setTimeout(() => (this.messageConfirmation = ''), 4000);
  }

  supprimerLot(id: number): void {
    if (!confirm('Supprimer ce lot ?')) return;
    this.stockService.supprimerLot(id).subscribe(() => this.chargerLots());
  }
}