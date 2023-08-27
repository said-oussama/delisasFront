import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';

import { AccountSettingsService } from 'app/main/pages/account-settings/account-settings.service';
import { FournisseurService } from 'app/service/fournisseur.service';
import { environment } from 'environments/environment';
import { Fournisseur } from 'app/Model/fournisseur';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OldPwdValidators } from './old-pwd.validators';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  private apiServerUrl = environment.apiBaseUrl;
  public data: any;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public avatarImage: string;
  form1: FormGroup; 

  private userDetails;
  gouvernoratList = [
    { value: 'ARIANA', viewValue: 'ARIANA' },
    { value: 'BEJA', viewValue: 'BEJA' },
    { value: 'BEN AROUS', viewValue: 'BEN AROUS' },
    { value: 'BIZERTE', viewValue: 'BIZERTE' },
    { value: 'GABES', viewValue: 'GABES' },
    { value: 'GAFSA', viewValue: 'GAFSA' },
    { value: 'JENDOUBA', viewValue: 'JENDOUBA' },
    { value: 'KAIROUAN', viewValue: 'KAIROUAN' },
    { value: 'KASSERINE', viewValue: 'KASSERINE' },
    { value: 'KEBILI', viewValue: 'KEBILI' },
    { value: 'KEF', viewValue: 'KEF' },
    { value: 'MAHDIA', viewValue: 'MAHDIA' },
    { value: 'MANOUBA', viewValue: 'MANOUBA' },
    { value: 'MEDENINE', viewValue: 'MEDENINE' },
    { value: 'MONASTIR', viewValue: 'MONASTIR' },
    { value: 'NABEUL', viewValue: 'NABEUL' },
    { value: 'SFAX', viewValue: 'SFAX' },
    { value: 'SIDI BOUZID', viewValue: 'SIDI BOUZID' },
    { value: 'SILIANA', viewValue: 'SILIANA' },
    { value: 'SOUSSE', viewValue: 'SOUSSE' },
    { value: 'TATAOUINE', viewValue: 'TATAOUINE' },
    { value: 'TOZEUR', viewValue: 'TOZEUR' },
    { value: 'TUNIS', viewValue: 'TUNIS' },
    { value: 'ZAGHOUAN', viewValue: 'ZAGHOUAN' },
  ]
  // private
  private _unsubscribeAll: Subject<any>;
  userId: any;
  accountDetails: any;

  /**
   * Constructor
   *
   * @param {AccountSettingsService} _accountSettingsService
   */
  constructor(private fb : FormBuilder,private _toastrService: ToastrService, private _accountSettingsService: AccountSettingsService, private fournisseurService: FournisseurService
  ) {
    this.form1 = this.fb.group({
      'oldPwd': ['',Validators.required,OldPwdValidators.shouldBe1234],
      'newPwd': ['',Validators.required],
      'confirmPwd': ['',Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Password Text Type Old
   */
  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  /**
   * Toggle Password Text Type New
   */
  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  /**
   * Toggle Password Text Type Retype
   */
  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }

  /**
   * Upload Image
   *
   * @param event
   */
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.userId = localStorage.getItem('userId')
    this.fournisseurService.getFournisseurById(this.userId).subscribe(data => {
      this.accountDetails = data
    })
    this._accountSettingsService.onSettingsChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
      this.avatarImage = this.data.accountSetting.general.avatar;
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Account Settings',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Pages',
            isLink: true,
            link: '/'
          },
          {
            name: 'Account Settings',
            isLink: false
          }
        ]
      }
    };
  }
  public async onUpdateFournisseur(): Promise<void> {
    await this.fournisseurService.updateFournisseur(this.accountDetails, this.userId).toPromise().then(
      (response: Fournisseur) => {
        ;
        this._toastrService.success('Vous avez modifié le fournisseur ' + response.iduser + ' avec succès ! ',
          'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true })
        this.fournisseurService.getFournisseurById(this.userId).subscribe(response => {

          this.accountDetails = response;
        });



      },

      (error: HttpErrorResponse) => {
        alert(error.message);
        this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
          "Échec Modification !", { toastClass: 'toast ngx-toastr', closeButton: true, });
      });
  }
  get oldPwd(){
    console.log(this.form1)
    return this.form1.get('oldPwd');
  }

   get newPwd(){
    return this.form1.get('newPwd');
  }

   get confirmPwd(){
    return this.form1.get('confirmPwd');
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
