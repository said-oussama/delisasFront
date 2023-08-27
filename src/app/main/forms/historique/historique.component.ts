import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { Colis, HistoStateOnly } from 'app/Model/colis';
import { HttpErrorResponse } from '@angular/common/http';
import { ColisService } from 'app/service/colis.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Fournisseur } from 'app/Model/fournisseur';
import { FournisseurService } from 'app/service/fournisseur.service';
import Stepper from 'bs-stepper';

import { AuthenticationService } from 'app/auth/service/authentication.service';
import { User } from 'app/auth/models';
import { DebriefService } from 'app/service/debrief.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoriqueComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  anomaly;
  public contentHeader: object;
  public rows: any;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public SelectionType = SelectionType;
  public displayRows: number = 0;
  public test: number = 0;
  etat;
  designation;
  public totalstate = {
    cree: 0,
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
    retourEchange:0,
    aenleve:0
  }
  public displayForm: boolean = false;
  barCodeColis;
  listofEtat = [
    'cree','aenleve','en Attente DEnlevement', 'enleve', 'enStock', 'enCoursDeLivraison','livre','livrePaye','planificationRetour', 'retourne' ,'enCoursDeTransfert', 'retourEchange'
  ];


  tailleList = [
    { value: 'petit', viewValue: 'Petit' },
    { value: 'moyen', viewValue: 'Moyen' },
    { value: 'grand', viewValue: 'Grand' },
    { value: 'extraLarge', viewValue: 'Extra Large' },


  ]



listEtat = [
  { value: 'cree', viewValue: 'Crée' },{ value: 'aenleve', viewValue: 'a enlevé' }, { value: 'enAttenteDEnlevement', viewValue: "En Attente D'enlevement" }, { value: 'enleve', viewValue: "enlevé" }, { value: 'enStock', viewValue: 'En Stock' }
  ,{ value: 'enCoursDeLivraison', viewValue: 'En Cours De Livraison' }, { value: 'livre', viewValue: 'Livré' }, { value: 'livrePaye', viewValue: 'Livré Payé' }, { value: 'planificationRetour', viewValue: 'Planification Retour' } 
  , { value: 'retourne', viewValue: 'Rétourné' }, { value: 'enCoursDeTransfert', viewValue: 'En Cours De Transfert' }, { value: 'retourEchange', viewValue: 'Retour Echange' }
  
];



  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  isAdmin: boolean;
  historiqueEtat: any;
  colisRef: number;
  anomalies: any;

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

   // private
   private verticalWizardStepper: Stepper;
   private modernWizardStepper: Stepper;
   private modernVerticalWizardStepper: Stepper;
   private horizontalWizardStepper: Stepper;
   private bsStepper;


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
    * Vertical Wizard Stepper Next
    */
   verticalWizardNext() {
     this.verticalWizardStepper.next();
   }
   /**
    * Vertical Wizard Stepper Previous
    */
   verticalWizardPrevious() {
     this.verticalWizardStepper.previous();
   }
   /**
    * Modern Horizontal Wizard Stepper Next
    */
   modernHorizontalNext() {
     this.modernWizardStepper.next();
   }
   /**
    * Modern Horizontal Wizard Stepper Previous
    */
   modernHorizontalPrevious() {
     this.modernWizardStepper.previous();
   }
   /**
    * Modern Vertical Wizard Stepper Next
    */
   modernVerticalNext() {
     this.modernVerticalWizardStepper.next();
   }
   /**
    * Modern Vertical Wizard Stepper Previous
    */
   modernVerticalPrevious() {
     this.modernVerticalWizardStepper.previous();
   }



  constructor(private modalService: NgbModal, private colisService: ColisService,private debriefService : DebriefService,private router : Router,
    private _toastrService: ToastrService, private serviceFournisseur: FournisseurService, private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
    this.modernWizardStepper




  }

  ngOnInit() {



    this.colisService.getAllColis().subscribe(response => {
      
      this.rows = response;
      this.kitchenSinkRows = this.rows
      this.tempData = this.rows;
      this.totalstate.total = response.length;

        //  this.countByEtatAndSociete ();
    });
    this.debriefService.getAllAnomalies().subscribe((data) => {
      this.anomalies = data;
    })



    this.contentHeader = {
      headerTitle: 'Tracking Colis',
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
            name: 'Tracking Colis',
            isLink: false
          }
        ]
      }
    };
  }


  setDisplayRows(num?: number) {
    this.displayRows = num;
    this.ngOnInit();
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



  openHistory(ref,modal){
    if(!ref){
      ref = this.barCodeColis;
    }
    this.colisRef = ref;
    if(this.colisRef)
    {
      this.colisService.getHistory(ref).subscribe((data) => {
        this.modalService.open(modal, {
          centered: true,
          size: 'lg'
        });
        this.historiqueEtat = data;
      })
    }
    setTimeout(() => {
      console.log(document.getElementById('modern-horizontal-wizard-id'))                          // <<<---using ()=> syntax
      if (document.getElementById('modern-horizontal-wizard-id')) {
        this.modernWizardStepper = new Stepper(document.getElementById('modern-horizontal-wizard-id'), {});

      }

    });


  }
  navigateToHistory(){
    this.router.navigate(['/historique/viewcolis/',this.barCodeColis]);
  }
  submit(){
    console.log(this.etat);
    console.log(this.anomaly)
    const body = {
      anomalieDescription: this.designation,
      anomalieId: this.anomaly && this.anomaly?.id ? this.anomaly?.id : 0,
      newColisEtat: this.etat,
      refrence: this.colisRef
    };
    this.colisService.​forceModificationsColis(body).subscribe((data)=>{
      this._toastrService.success('Colis ' + body.refrence + ' est mis à jour avec succès ! ',
      'Mis à jour avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe((da)=> {
        this.closeModel();
        this.colisService.getAllColis().subscribe(response => {
          
          this.rows = response;
          this.kitchenSinkRows = this.rows
          this.tempData = this.rows;
          this.totalstate.total = response.length;

          //  this.countByEtatAndSociete ();
        });
        this.designation = undefined;
        this.anomaly = undefined;
        this.etat = undefined;
        this.colisRef = undefined;
      });
    })
  }
  openForcer(ref,modal){
    if(!ref){
      ref = this.barCodeColis;
    }
    this.colisRef = ref;
    if(this.colisRef)
    {
        this.modalService.open(modal, {
          centered: true,
          size: 'lg'
        });
      }
    }


}
