import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hub } from '../Model/hub';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  rows: any;
  
  onDatatablessChanged: BehaviorSubject<any>;
  private apiServerUrl =  environment.apiBaseUrl;
  private societeLivraisonID = environment.societeLivraisonID;
  constructor(private http: HttpClient) { this.onDatatablessChanged = new BehaviorSubject({});}

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */


  public addHub(hub : Hub): Observable<Hub> {
    return this.http.post<Hub>(`${this.apiServerUrl}/add-Hub`, hub);
  }
  public getHubBySocieteLiv(): Observable<Hub[]> {
    return this.http.get<Hub[]>(`${this.apiServerUrl}/retrieve-all-Hubs`);
  }
  public updateHub(hub : Hub): Observable<Hub> {
    return this.http.put<Hub>(`${this.apiServerUrl}/modify-Hub`,hub);
  }
  public deleteHub(ref : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/removeHub/${ref}`);
  }
  public getHubById(id : number): Observable<Hub> {
    return this.http.get<Hub>(`${this.apiServerUrl}/retrieve-Hub/${id}`);
  }
  
  public getLivreurListByHub(id : number): Observable<Hub> {
    return this.http.get<Hub>(`${this.apiServerUrl}/getLivreurListByHub/${id}`);
  }
}