import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { Colis } from 'app/Model/colis';
import { environment } from 'environments/environment';

@Injectable()
export class DatatablesService implements Resolve<any> {
  private fournisseurID = environment.FournisseurID;
  rows: Colis[];
  rows2: Colis[];

  onDatatablessChanged: BehaviorSubject<any>;
  onDatatablessChanged2: BehaviorSubject<any>;


  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onDatatablessChanged = new BehaviorSubject({});
    this.onDatatablessChanged2 = new BehaviorSubject({});

  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows(),this.getDataTableRows2()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`http://localhost:8082/getAllColis/${this.fournisseurID}`).subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  getDataTableRows2(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`http://localhost:8082/getColisBySocieteLiv/1`).subscribe((response: any) => {
        this.rows2 = response;
        this.onDatatablessChanged2.next(this.rows2);
        resolve(this.rows2);
      }, reject);
    });
  }
}
