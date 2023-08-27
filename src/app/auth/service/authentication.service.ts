import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
   currentUserSubject: BehaviorSubject<User>;
  private currentRoleSubject: BehaviorSubject<String>;
  destroy$: Subject<boolean> = new Subject<boolean>()

  public currentRole: Observable<String>;
  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentRoleSubject = new BehaviorSubject<String>(localStorage.getItem('role'));
    this.currentRole = this.currentRoleSubject.asObservable();

  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    // this.currentUserSubject.value.role=Role.Fournisseur
    return this.currentUserSubject.value;
  }
  public get currentRoleValue(): String {
    // this.currentUserSubject.value.role=Role.Fournisseur
    return localStorage.getItem('role');
  }



  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    //return this.currentUser && this.currentUserSubject.value.roleUser === 'Admin';
    return this.currentUser && localStorage.getItem('role') === 'Admin';

  }

  /**
   *  Confirms if user is client
   */
  get isFournisseur() {
    return this.currentUser && localStorage.getItem('role') === 'Fournisseur';
  }

  /**
   * User login
   *
   * @param username
   * @param password

   * @returns user
   */
  login(username: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/login`, { username, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response

          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('role', user.roleUser)
            localStorage.setItem('userId', user.iduser)

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'Vous êtes conneté(e)s à FGS.  🎉',
                '👋 Bienvenue, ' + user.username + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(user);

            this._http
              .get<any>(`${environment.apiUrl}/findRolesByUsername/${username}`).pipe(takeUntil(this.destroy$)).subscribe(res => {
                // console.log(res[0].authority)
                //user.roleUser=res[0].authority
                //  localStorage.setItem('role',res[0].authority)
                //this.currentRoleSubject.next(res[0].authority)
                // console.log(localStorage.getItem('role'))

              });
          }
          // console.log(localStorage.getItem('role'))


          return user;
        })
      );

  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    //  localStorage.setItem('role',null)

    // notify
    this.currentUserSubject.next(null);
    this.currentUser = this.currentUserSubject.asObservable();


  }


}