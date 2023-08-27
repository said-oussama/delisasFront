import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';

import { Role, User } from 'app/auth/models';
import { colors } from 'app/colors.const';
import { AuthenticationService } from 'app/auth/service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';

import { locale as english } from 'app/main/dashboard/i18n/en';
import { locale as french } from 'app/main/dashboard/i18n/fr';
import { locale as german } from 'app/main/dashboard/i18n/de';
import { locale as portuguese } from 'app/main/dashboard/i18n/pt';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { Colis } from 'app/Model/colis';
import { Fournisseur } from 'app/Model/fournisseur';
import { ColisService } from 'app/service/colis.service';
import { FournisseurService } from 'app/service/fournisseur.service';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceComponent implements OnInit {
  // Decorator
  @ViewChild('statisticsBarChartRef') statisticsBarChartRef: any;
  @ViewChild('statisticsLineChartRef') statisticsLineChartRef: any;
  @ViewChild('earningChartRef') earningChartRef: any;
  @ViewChild('revenueReportChartRef') revenueReportChartRef: any;
  @ViewChild('budgetChartRef') budgetChartRef: any;
  @ViewChild('statePrimaryChartRef') statePrimaryChartRef: any;
  @ViewChild('stateWarningChartRef') stateWarningChartRef: any;
  @ViewChild('stateSecondaryChartRef') stateSecondaryChartRef: any;
  @ViewChild('stateInfoChartRef') stateInfoChartRef: any;
  @ViewChild('stateDangerChartRef') stateDangerChartRef: any;
  @ViewChild('goalChartRef') goalChartRef: any;

  // Public
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
  public totalstate = {
    cree: 0,
    enStock: 0,
    enCoursDeLivraison: 0,
    livre: 0,
    livrePaye: 0,
    planificationRetour: 0,
    retourne: 0,
    enAttenteDEnlevement: 0,
    total: 0,
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
  selectedFournisseur;
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
  public poidsVar;
  public fournisseur_idVar;
  public fournisseurVar;
  barCodeAncienColis;

  destroy$: Subject<boolean> = new Subject<boolean>()

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
  ];
  listEtat = ['Crée', 'En stock', 'En cours de livraison',
    'Livré', 'Livré payé', 'Planifié retour', 'Retourné'];
  consoleStatistics = {}

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  isAdmin: boolean;
  isFournisseur: boolean;
  debriefStatistics = {};
  filteredColis: Colis[];
  status: any;
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
    if (event && event.iduser) {
      this.colisService.findColisByFournisseurAndEtat(event.iduser, this.status).pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.filteredColis = response;

        //  this.countByEtatAndSociete ();
      });
    }
    else {
      this.colisService.findColisByEtat(this.status).pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.filteredColis = response;


        //  this.countByEtatAndSociete ();
      });
    }
  }
  constructor(private modalService: NgbModal, private colisService: ColisService
    , private _toastrService: ToastrService, private serviceFournisseur: FournisseurService, private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this.currentUser.roleUser === "Admin";
    this.fournisseurID = this.currentUser.iduser;
    this.isFournisseur = this._authenticationService.isFournisseur;



  }

  ngOnInit() {
    if (this.isAdmin) {
      this.colisService.getAllColis().pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          
          this.rows = response;
          this.kitchenSinkRows = this.rows
          this.tempData = this.rows;
          this.totalstate.total = response.length;
          this.countByEtat();

          //  this.countByEtatAndSociete ();
        });
      this.colisService.getConsoleStatistics().pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.consoleStatistics = response
      });
      this.colisService.getDebriefStatistics().pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.debriefStatistics = response;
      });
    } else {
      this.colisService.getAllColisByFournisseur(this.fournisseurID).pipe(takeUntil(this.destroy$)).subscribe(response => {
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
      'enStock',
      'enCoursDeLivraison',
      'livre',
      'livrePaye',
      'planificationRetour',
      'retourne',
      'enAttenteDEnlevement',
      'enCoursDeTransfert'
    ]
    listOfStatus.forEach(status => {
      this.totalstate[status] = this.kitchenSinkRows.filter((element) => element.etat === status).length;
    })
  }
  filterColis(status, listColisModal) {
    if (this.isAdmin) {
      this.colisService.findColisByEtat(status).pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.filteredColis = response;
        this.status = status;
        console.log(this.filteredColis)
        this.modalService.open(listColisModal, {
          centered: true,
          size: 'xl'
        });

        //  this.countByEtatAndSociete ();
      });

    } else {
      this.colisService.findColisByFournisseurAndEtat(this.fournisseurID, status).pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.filteredColis = response;
        this.modalService.open(listColisModal, {
          centered: true,
          size: 'xl'
        });
        //  this.countByEtatAndSociete ();
      });
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
    this.serviceFournisseur.getAllFournisseur().pipe(takeUntil(this.destroy$)).subscribe(
      (response: Fournisseur[]) => { this.listFournisseur = response }
    )
  }
  public async onAddColis(HWForm: NgForm, HWForm2: NgForm): Promise<void> {
    if (HWForm2.form.valid === true) {
      this.testColis = Object.assign(HWForm.value, HWForm2.value);
      if (this.isAdmin) {
        this.fournisseurID = this.fournisseurVar;
      }
      await this.serviceFournisseur.getFournisseurById(this.fournisseurID).pipe(takeUntil(this.destroy$)).toPromise().then(
        (response: Fournisseur) => { ; this.testFournisseur = response; },
        (error: HttpErrorResponse) => { alert(error.message) });

      this.testColis.fournisseur = this.testFournisseur;



      await this.colisService.addColis(this.testColis).pipe(takeUntil(this.destroy$)).toPromise().then(
        (response: Colis) => {
          ;
          this._toastrService.success('Vous avez ajouté le colis ' + response.reference + ' avec succès ! ',
            'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 });
          this.ngOnInit()
          this.closeModel();
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

    await this.colisService.updateColis(this.editColis).pipe(takeUntil(this.destroy$)).toPromise().then(
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

    this.colisService.deleteColis(colisId).pipe(takeUntil(this.destroy$)).subscribe(

      (response: void) => {
        ;
        document.getElementById('btnAnnulerDelete').click();
        this._toastrService.success('Vous avez supprimé le colis ' + colisId + ' avec succès ! ',
          'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, });
        this.ngOnInit()
      });

  }
}
