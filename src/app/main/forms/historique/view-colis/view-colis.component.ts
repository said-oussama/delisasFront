import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { AuthenticationService } from 'app/auth/service';
import { Colis } from 'app/Model/colis';
import { ColisService } from 'app/service/colis.service';
import { DebriefService } from 'app/service/debrief.service';
import { FournisseurService } from 'app/service/fournisseur.service';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-view-colis',
  templateUrl: './view-colis.component.html',
  styleUrls: ['./view-colis.component.scss']
})
export class ViewColisComponent implements OnInit {

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
  listofEtat = [
    'cree', 'en Attente DEnlevement', 'enCoursDeTransfert', 'enStock', 'enCoursDeLivraison','livre','planificationRetour', 'retourEchange', 'retourne','livrePaye','planificationRetourEchange'
  ];
  listEtat = [
    { value: 'cree', viewValue: 'Crée' }, { value: 'enStock', viewValue: 'En Stock' }, { value: 'enAttenteDEnlevement', viewValue: "En Attente D'enlevement" }
    , { value: 'enCoursDeTransfert', viewValue: 'En Cours De Transfert' }, { value: 'enCoursDeLivraison', viewValue: 'En Cours De Livraison' }
    , { value: 'planificationRetour', viewValue: 'Planification Retour' }, { value: 'retourEchange', viewValue: 'Retour Echange' }
    , { value: 'retourne', viewValue: 'Rétourné' }, { value: 'livre', viewValue: 'Livré' }, { value: 'livrePaye', viewValue: 'Livré Payé' }
  ];
  // private
  private horizontalWizardStepper: Stepper;
  private verticalWizardStepper: Stepper;
  private modernWizardStepper: Stepper;
  private modernVerticalWizardStepper: Stepper;
  private bsStepper;
  totalstate: any;
  colisRef: number;
  ref:number;
  barCodeColis:any;

  anomalies:any;
  historiqueEtat: any;
  displayForm: boolean;
  colis: any;
  bar_code: any;
  detail: any;

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

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private colisService: ColisService,private debriefService : DebriefService,
    private _toastrService: ToastrService, private serviceFournisseur: FournisseurService, private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
  }
    

  ngOnInit(): void {
    this.ref = this.route.snapshot.params['ref'];
    console.log(this.ref)

    this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    });

    this.bsStepper = document.querySelectorAll('.bs-stepper');
    
    

    this.debriefService.getAllAnomalies().subscribe((data) => {
      this.anomalies = data;
    });
    this.colisService.getColisByRef(this.ref).subscribe(data => {
      this.detail=data;
      this.etat = this.detail.etat
      console.log(data.nom_c)


    });
    console.log(this.ref)
    if(!this.ref){
      this.ref = this.barCodeColis;
    }
    this.colisRef = this.ref;
    if(this.colisRef)
    {
      this.colisService.getHistory(this.ref).subscribe((data) => {
        
        this.historiqueEtat = data;
      })
    }

      
    
    
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
  submit(){
    console.log(this.etat);
    console.log(this.anomaly)
    const body = {
      anomalieDescription: this.designation,
      anomalieId: this.anomaly && this.anomaly?.id ? this.anomaly?.id : 0,
      newColisEtat: this.etat,
      refrence: this.detail.reference
    };
    this.colisService.​forceModificationsColis(body).subscribe((data)=>{
      this._toastrService.success('Colis ' + body.refrence + ' est mis à jour avec succès ! ',
      'Mis à jour avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe((da)=> {
        this.closeModel();
        this.colisService.getColisByRef(this.ref).subscribe(data => {
          this.detail=data;
          this.etat = this.detail.etat
          console.log(data.nom_c)
    
    
        });
        this.designation = undefined;
        this.anomaly = undefined;
        this.etat = undefined;
        this.colisRef = undefined;
      });
    })
  }


}
