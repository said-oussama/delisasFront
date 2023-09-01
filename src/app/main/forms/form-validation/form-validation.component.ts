
import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { Colis, HistoStateOnly } from 'app/Model/colis';
import { HttpErrorResponse } from '@angular/common/http';
import { ColisService } from 'app/service/colis.service';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Fournisseur } from 'app/Model/fournisseur';
import { FournisseurService } from 'app/service/fournisseur.service';
import Stepper from 'bs-stepper';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { User } from 'app/auth/models';
import * as snippet from 'app/main/components/timeline/timeline.snippetcode';



@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormValidationComponent implements OnInit {
  @Output() dateSelect = new EventEmitter<NgbDateStruct>();

  public basicDPdata: NgbDateStruct;

  // snippet code variables
  public _snippetCodeBasic = snippet.snippetCodeBasic;
  
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  public contentHeader: object;
  public rows: any;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public SelectionType = SelectionType;
  public displayRows: number = 0;
  public test: number = 0;
  public totalstate = {
    cree: 0,

    aenleve:0,
    enleve: 0,


    enStock: 0,
    enCoursDeLivraison: 0,
    livre: 0,
    livrePaye: 0,
    planificationRetour: 0,
    retourne: 0,
    enAttenteDEnlevement: 0,
    total: 0,
    enCoursDeTransfert: 0,
    retourEchange:0
  }
  public displayForm: boolean = false;
  public editColis: Colis;
  public deleteColis: Colis;
  public testColis: Colis;
  public testFournisseur: Fournisseur;
  public listFournisseur: Fournisseur[];
  private horizontalWizardStepper: Stepper;
  private bsStepper;
  public currentUser: User;
  private fournisseurID;

  public referenceVar;
  public nom_cVar;
  public prenom_cVar;
  public tel_c_1Var;
  public tel_c_2Var;
  public date_creationVar;
  public adresseVar;
  public gouvernoratVar;
  public delegationVar;
  public localiteVar;
  public code_postalVar;
  public codVar;
  public mode_paiementVar;
  public serviceVar;
  public designationVar;
  public remarqueVar;
  public etatVar;
  public anomalieVar;
  public nb_pVar;
  public longeurVar;
  public largeurVar;
  public hauteurVar;
  public tailleVar;
  public fragileVar;

  public poidsVar;
  public fournisseur_idVar;
  public fournisseurVar;
  barCodeAncienColis;
  listofEtat = [

    'cree', 'en Attente DEnlevement', 'enleve', 'enCoursDeTransfert', 'enStock', 'enCoursDeLivraison','livre','planificationRetour', 'retourEchange', 'retourne','livrePaye','planificationRetourEchange'


  ];
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
  public gouvernoratList = [
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

  public services = [
    { value: 'livraison', viewValue: 'Livraison' },
    { value: 'echange', viewValue: 'Echange' },
  ];
  mode_pay = [
    { value: 'traite', viewValue: 'Traite' },
    { value: 'cheque', viewValue: 'Chéque' },
    { value: 'virement', viewValue: 'Virement' },
    { value: 'espece', viewValue: 'Espèse' },
  ]
  listEtat = [

    { value: 'cree', viewValue: 'Crée' },{ value: 'aenleve', viewValue: 'a enlevé' }, { value: 'En stock', viewValue: 'enStock' }, { value: 'En stock', viewValue: 'enStock' }, { value: 'enAttenteDEnlevement', viewValue: 'En Attente D enlevement' },{ value: 'enleve', viewValue: 'enleve' }


    , { value: 'enCoursDeTransfert', viewValue: 'En Cours De Transfert' }, { value: 'enCoursDeTransfert', viewValue: 'En Cours De Transfert' }, { value: 'enCoursDeLivraison', viewValue: 'En Cours De Livraison' }
    , { value: 'planificationRetour', viewValue: 'Planification Retour' }, { value: 'retourEchange', viewValue: 'Retour Echange' }
    , { value: 'retourne', viewValue: 'Rétourné' }, { value: 'livre', viewValue: 'Livré' }, { value: 'livrePaye', viewValue: 'Livré Payé' }
  ];


  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  isAdmin: boolean;
  historiqueEtat: any;
  colisRef: any;
  searchValue: string;
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
  /**
     * Search (filter)
     *
     * @param event
     */
  filterUpdate(event) {

    const val = event.target.value.toLowerCase();
    if (val != "") {
      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.nom_c.toLowerCase().startsWith(val) || d.prenom_c.toLowerCase().startsWith(val) || d.etat.toLowerCase().startsWith(val) || d.service.toLowerCase().startsWith(val) || d.bar_code.toLowerCase().startsWith(val) || d.tel_c_1.toString().toLowerCase().startsWith(val) || d.cod.toString().toLowerCase().startsWith(val);
      });

      // update the rows
      this.kitchenSinkRows = temp;    // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else {
      this.ngOnInit();
    }
  }
  
  constructor(private modalService: NgbModal, private colisService: ColisService
    , private _toastrService: ToastrService, private serviceFournisseur: FournisseurService, private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this.currentUser.roleUser === "Admin";
    this.fournisseurID = this.currentUser.iduser;


  }

  ngOnInit() {
    if (this.isAdmin) {
      this.colisService.getAllColis().subscribe(response => {
        
        this.rows = response;
        this.kitchenSinkRows = this.rows
        this.tempData = this.rows;
        this.totalstate.total = response.length;
        this.countByEtat();

        //  this.countByEtatAndSociete ();
      });
    } else {
      this.colisService.getAllColisByFournisseur(this.fournisseurID).subscribe(response => {
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows
        this.totalstate.total = response.length;
        this.countByEtat();

        //  this.countByEtatAndSociete ();
      });
    }
    this.getListFournisseur();

    this.contentHeader = {
      headerTitle: 'Gestion Colis',
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
            name: 'Gestion Colis',
            isLink: false
          }
        ]
      }
    };
  }
  countByEtat() {
    const listOfStatus = ['cree',

    'aenleve',
    'enleve',


    'enStock',
    'enCoursDeLivraison',
    'livre',
    'livrePaye',
    'planificationRetour',
    'retourne',
    'enAttenteDEnlevement',
    'enCoursDeTransfert',
    'retourEchange'
  ];
    listOfStatus.forEach(status => {
      this.totalstate[status] = this.kitchenSinkRows.filter((element) => element.etat === status).length;
    })
  }
  filterColis(status) {

    if (status) {
      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.etat.toLowerCase() === status.toLowerCase();
      });

      // update the rows
      this.kitchenSinkRows = temp;    // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else {
      this.ngOnInit();
    }

  }

  setDisplayRows(num?: number) {
    this.displayRows = num;
    this.ngOnInit();
  }
  openUpdateModal(colis: Colis, modalUpdate) {
    this.modalService.open(modalUpdate, {
      centered: true,
      size: 'lg'
    });
    this.editColis = colis;
  }
  openDeleteModal(colis: Colis, modalDelete) {
    this.modalService.open(modalDelete, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
    this.deleteColis = colis;
  }
  openCreateModal(createModel) {
    this.modalService.open(createModel, {
      centered: true,
      size: 'lg'
    });
    setTimeout(() => {
      console.log(document.getElementById('horizontal-wizard-id'))                          // <<<---using ()=> syntax
      if (document.getElementById('horizontal-wizard-id')) {
        this.horizontalWizardStepper = new Stepper(document.getElementById('horizontal-wizard-id'), {});

      }

    });



  }
  closeModel() {
    this.modalService.dismissAll();
  }
  btnDisplayForm() {
    this.displayForm = true;
  };
  btnAnnulerForm() {
    this.displayForm = false;
  };
  public getListFournisseur() {
    this.serviceFournisseur.getAllFournisseur().subscribe(
      (response: any) => { this.listFournisseur = response.filter(item=> item.isDeleted === false) }
    )
  }
  public async onAddColis(HWForm: NgForm, HWForm2: NgForm): Promise<void> {
    if (HWForm2.form.valid === true) {
      this.testColis = Object.assign(HWForm.value, HWForm2.value);
      if (this.isAdmin) {
        this.fournisseurID = this.fournisseurVar;
      }
      await this.serviceFournisseur.getFournisseurById(this.fournisseurID).toPromise().then(
        (response: Fournisseur) => { ; this.testFournisseur = response; },
        (error: HttpErrorResponse) => { alert(error.message) });

      this.testColis.fournisseur = this.testFournisseur;



      await this.colisService.addColis(this.testColis).toPromise().then(
        (response: Colis) => {
          ;
          this._toastrService.success('Vous avez ajouté le colis ' + response.reference + ' avec succès ! ',
            'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 });
          this.ngOnInit()
          this.closeModel();
          HWForm.form.reset();
          HWForm2.form.reset();
        },

        (error: HttpErrorResponse) => { console.log(error.message); });
      // window.location.reload();
    }
    else {
      this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
        "Échec d'ajout !", { toastClass: 'toast ngx-toastr', closeButton: true, });
    }

  }
  public async onUpdateColis(colis: Colis): Promise<void> {

    await this.colisService.updateColis(this.editColis).toPromise().then(
      (response: Colis) => {
        ;
        this._toastrService.success('Vous avez modifié le colis ' + response.reference + ' avec succès ! ',
          'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, });
        document.getElementById('btnAnnulerUpdate').click();
        // window.location.reload();
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
        this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ', "Échec Modification !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
      });
  }
  public onDeleteColis(colisId: number): void {

    this.colisService.deleteColis(colisId).subscribe(

      (response: void) => {
        ;
        document.getElementById('btnAnnulerDelete').click();
        this._toastrService.success('Vous avez supprimé le colis ' + colisId + ' avec succès ! ',
          'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, });
        this.ngOnInit()
      }
      ,
      (error=> {
        this._toastrService.success('Vous avez supprimé le colis ' + colisId + ' avec succès ! ',
          'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, });
        this.ngOnInit()
      this.closeModel();

      }));

  }
  openHistory(ref,modal){
    this.colisRef = ref;
    this.colisService.getHistory(ref).subscribe((data)=> {
      this.modalService.open(modal, {
        centered: true,
        size: 'lg'
      });
      this.historiqueEtat = data;
      
    })
 
  }
}
