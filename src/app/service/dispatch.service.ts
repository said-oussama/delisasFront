import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Console } from 'app/Model/console';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hub } from '../Model/hub';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  rows: any;

  onDatatablessChanged: BehaviorSubject<any>;
  private apiServerUrl = environment.apiBaseUrl;
  private societeLivraisonID = environment.societeLivraisonID;
  constructor(private http: HttpClient) { this.onDatatablessChanged = new BehaviorSubject({}); }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    throw new Error('Method not implemented.');
  }

  getAllDispatchs(): Observable<Console> {
    return this.http.get<any>(`${this.apiServerUrl}/findAllDispatchs`);
  }
  getAllColis(): Observable<Console> {
    return this.http.get<any>(`${this.apiServerUrl}/findColisByEtat/cree`);
  }
  getLivreurList(): Observable<Console> {
    return this.http.get<any>(`${this.apiServerUrl}/getLivreurList`);
  }
  dispatch(formData): Observable<Console> {
    return this.http.post<any>(`${this.apiServerUrl}/addDispatch`, formData);
  }
  getDispatchByDate(date): Observable<Console> {
    return this.http.get<any>(`${this.apiServerUrl}/findByCreationDate/${date}`);
  }
}