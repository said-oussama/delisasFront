import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Colis } from 'app/Model/colis';
import { ColisService } from 'app/service/colis.service';
import Stepper from 'bs-stepper';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

import { FournisseurService } from 'app/service/fournisseur.service';
import { Fournisseur } from 'app/Model/fournisseur';
import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormWizardComponent implements OnInit {
  
  //private fournisseurID = environment.fournisseurID;
  public contentHeader: object;
  public referenceVar  ; 
	public nom_cVar;
	public prenom_cVar; 
	public tel_c_1Var;
	public tel_c_2Var; 
	public date_creationVar;
	public adresseVar; 
	public gouvernoratVar; 
	public delegationVar ;
	public localiteVar;
	public code_postalVar; 
	public codVar; 
  public mode_paiementVar = "espece"; 
	public serviceVar = "livraison" ;
	public designationVar;
	public remarqueVar; 
	public etatVar ;
	public anomalieVar;
	public nb_pVar ; 
	public longeurVar;
	public largeurVar;
	public hauteurVar ;
	public poidsVar;
  public fournisseur_idVar;
  public currentUser: User;
  private fournisseurID;
  fragileVar;
  tailleVar;
   barCodeAncienColis;
   fragileList = [
    
    { value: 'true', viewValue: 'Oui' },
    { value: 'false', viewValue: 'Non' },

  
];

tailleList = [
  { value: 'petit', viewValue: 'Petit' },
  { value: 'moyen', viewValue: 'Moyen' },
  { value: 'grand', viewValue: 'Grand' },
  { value: 'extraLarge', viewValue: 'Extra Large' },


]
  public gouvernoratList =[
    {value:'ARIANA', viewValue: 'ARIANA'},
		{value:'BEJA', viewValue: 'BEJA'},
		{value:'BEN AROUS', viewValue: 'BEN AROUS'},
		{value:'BIZERTE', viewValue: 'BIZERTE'},
		{value:'GABES', viewValue: 'GABES'},
		{value:'GAFSA', viewValue: 'GAFSA'},
		{value:'JENDOUBA', viewValue: 'JENDOUBA'},
		{value:'KAIROUAN', viewValue: 'KAIROUAN'},
		{value:'KASSERINE', viewValue: 'KASSERINE'},
		{value:'KEBILI', viewValue: 'KEBILI'},
		{value:'KEF', viewValue: 'KEF'},
		{value:'MAHDIA', viewValue: 'MAHDIA'},
		{value:'MANOUBA', viewValue: 'MANOUBA'},
		{value:'MEDENINE', viewValue: 'MEDENINE'},
		{value:'MONASTIR', viewValue: 'MONASTIR'},
		{value:'NABEUL', viewValue: 'NABEUL'},
		{value:'SFAX', viewValue: 'SFAX'},
		{value:'SIDI BOUZID', viewValue: 'SIDI BOUZID'},
		{value:'SILIANA', viewValue: 'SILIANA'},
		{value:'SOUSSE', viewValue: 'SOUSSE'},
		{value:'TATAOUINE', viewValue: 'TATAOUINE'},
		{value:'TOZEUR', viewValue: 'TOZEUR'},
		{value:'TUNIS', viewValue: 'TUNIS'},
		{value:'ZAGHOUAN', viewValue: 'ZAGHOUAN'},
]

  public services = [
    {value: 'livraison', viewValue: 'Livraison', selected:true},
    {value: 'echange', viewValue: 'Echange'},
  ];
  mode_pay = [
    { value: 'traite', viewValue: 'Traite' },
    { value: 'cheque', viewValue: 'Chéque' },
    { value: 'virement', viewValue: 'Virement' },
    { value: 'espece', viewValue: 'Espèse' },
  ];


  // private
  private horizontalWizardStepper: Stepper;
  private bsStepper;

  public testColis : Colis;
  public testFournisseur : Fournisseur;
  
  /**
   * Horizontal Wizard Stepper Next
   *
   * @param data
   */
  horizontalWizardStepperNext(data) {
    if (data.form.valid === true) {
      this.horizontalWizardStepper.next();
    }
  }
  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
  }

    private toastRef: any;
    private options: GlobalConfig;
  /**
   * Constructor
   *
   * 
   * @param {ToastrService} _toastrService
   */
  constructor(private colisService: ColisService, private _toastrService: ToastrService, 
    private serviceFournisseur : FournisseurService,private _authenticationService: AuthenticationService,private _router : Router) {
    this.horizontalWizardStepper
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.fournisseurID=this.currentUser.iduser
  }

  ngOnInit() {
    console.log(this.fournisseurID)
    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});
    this.bsStepper = document.querySelectorAll('.bs-stepper');

    this.contentHeader = {
      headerTitle: 'Ajouter Nouveau Colis',
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
            name: 'Ajouter Nouveau Colis',
            isLink: false
          }
        ]
      }
    };
  }
   
  
  public async onAddColis (HWForm : NgForm,HWForm2 : NgForm) :Promise<void> {
    if (HWForm2.form.valid === true)

        {
            this.testColis=Object.assign(HWForm.value, HWForm2.value); 
          
            await this.serviceFournisseur.getFournisseurById(this.fournisseurID).toPromise().then(
            (response : Fournisseur)=> {; this.testFournisseur= response;},
            (error : HttpErrorResponse) => { alert ( error.message)});

            this.testColis.fournisseur= this.testFournisseur;

            await this.colisService.addColis(this.testColis).toPromise().then(
            (response : Colis )=> {; 
            this._toastrService.success('Vous avez ajouté le colis '+ response.reference +' avec succès ! ',
            'Ajout avec succès !',{ toastClass: 'toast ngx-toastr', closeButton: true,timeOut:2000 }).onHidden.subscribe(res => {

              this._router.navigate(['']);

              this._router.navigate(['/colis/list-colis']);
              HWForm.form.reset();
              HWForm2.form.reset();
            });
          },

            (error : HttpErrorResponse) => { console.log(error.message) ; });
           // window.location.reload();

        } 
    else 
        {
              this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
              "Échec d'ajout !", { toastClass: 'toast ngx-toastr', closeButton: true,});
        }

  }
 
}
