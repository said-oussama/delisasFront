import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Fournisseur } from '../Model/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private societeLivraisonID = environment.societeLivraisonID;
  private apiServerUrl =  environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getFournisseurBySocieteLiv(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiServerUrl}/getPersonnelBySocieteLiv/${this.societeLivraisonID}`);
  }
  public getAllFournisseur(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiServerUrl}/findAllFournisseur`);
  }
  
  public updateFournisseur(fournisseur : Fournisseur,iduser): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiServerUrl}/updatefournisseur/${iduser}`,fournisseur);
    
  }
  public getFournisseurById(id ): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.apiServerUrl}/findFournisseurById/${id}`);
  }

  public addFournisseur(fournisseur : Fournisseur): Observable<Fournisseur> {
    fournisseur.isDeleted=false;
    return this.http.post<Fournisseur>(`${this.apiServerUrl}/addFournisseur`, fournisseur);
  }

  public deleteFournisseur(id : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteLogiqueFournisseur/${id}`);
  } 
  public addFournisseurWithImage(fournisseur : any): Observable<Fournisseur> {
    console.log(fournisseur)
    return this.http.post<Fournisseur>(`${this.apiServerUrl}/addFournisseurWithLogoAndPatente`, fournisseur);
  }
  public updateFournisseurPhoto(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/updateFournisseurWithLogo`, formData);
  }
  public getImage(id): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/patenteFournisseur/${id}`,{responseType: 'blob', observe: 'response'})
    ;
  }

  public getFournisseuryId(id): Observable<any> {
    return this.http.get(`${this.apiServerUrl}​/findFournisseurById​/${id}`);
  }
}
