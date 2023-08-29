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
export class ConsoleService  {

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


  public addHub(hub : Console): Observable<Console> {
    return this.http.post<Console>(`${this.apiServerUrl}/addConsole`, hub);
  }
  public getConsoleBySocieteLiv(): Observable<Console[]> {
    return this.http.get<Console[]>(`${this.apiServerUrl}/retrieve-all-consoles`);
  }
  public getConsolesSortant(id): Observable<Console[]> {
    return this.http.get<Console[]>(`${this.apiServerUrl}/findConsolesSortant/${id}`);
  }
  public getConsolesEntrant(id): Observable<Console[]> {
    return this.http.get<Console[]>(`${this.apiServerUrl}/findConsolesEntrant/${id}`);
  }
  public updateConsole(console : Console): Observable<Console> {
    return this.http.put<Console>(`${this.apiServerUrl}/modify-Console`,console);
  }
  public deleteHub(ref : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/remove-console/${ref}`);
  }
  public getHubById(id : number): Observable<Hub> {
    return this.http.get<Hub>(`${this.apiServerUrl}/retrieve-Hub/${id}`);
  }
  public findColisHubDepartHubArrivee(barcode): Observable<Hub> {
    return this.http.get<Hub>(`${this.apiServerUrl}/findColisHubDepartHubArrivee/${barcode}`);
  }

  public getAllHubs(): Observable<Hub> {
    return this.http.get<Hub>(`${this.apiServerUrl}/retrieve-all-Hubs`);
  }

  
  
  public getConsoleByBarCode(barcode): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/findConsoleByBarCode/${barcode}`);
  }
  public addConsole(body): Observable<Console> {
    return this.http.post<Console>(`${this.apiServerUrl}/addConsole`, body);
  }
  public approveConsole(barcode,userId): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/approveConsole/${barcode}/${userId}`,{});
  }
  public generateConsolePDF(barCode : number): Observable<Blob> {
    return this.http.get(`${this.apiServerUrl}/generateConsolePDF/${barCode}`,{responseType: 'blob' });
  }
}