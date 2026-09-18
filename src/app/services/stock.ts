import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { Lot } from '../models/lot';
import { Categorie } from '../models/categorie';
import { Emplacement } from '../models/emplacement';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly apiBase = 'http://192.168.1.74:8080/api';

  constructor(private http: HttpClient) {}

  // Produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiBase}/produits`);
  }

  creerProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiBase}/produits`, produit);
  }

  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/produits/${id}`);
  }

  // Lots
  getLots(): Observable<Lot[]> {
    return this.http.get<Lot[]>(`${this.apiBase}/lots`);
  }

  creerLot(lot: Lot): Observable<Lot> {
    return this.http.post<Lot>(`${this.apiBase}/lots`, lot);
  }

  supprimerLot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/lots/${id}`);
  }

  // Données de référence
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiBase}/categories`);
  }

  getEmplacements(): Observable<Emplacement[]> {
    return this.http.get<Emplacement[]>(`${this.apiBase}/emplacements`);
  }
}