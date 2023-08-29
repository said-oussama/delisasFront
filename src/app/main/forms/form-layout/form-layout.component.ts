
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ColisService } from 'app/service/colis.service';
import { Colis } from 'app/Model/colis';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import readxlsxFile from 'read-excel-file';
import { DateRangeSnippetCode } from '../form-elements/flatpickr/flatpickr.snippetcode';
import { FournisseurService } from 'app/service/fournisseur.service';
import { Fournisseur } from 'app/Model/fournisseur';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { User } from 'app/auth/models';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormLayoutComponent implements OnInit {

  etat;
  listofEtat = [
    'cree','aenleve','en Attente DEnlevement', 'enleve', 'enStock', 'enCoursDeLivraison','livre','livrePaye','planificationRetour', 'retourne' ,'enCoursDeTransfert', 'retourEchange'
  ];
  listEtat = [
    { value: 'cree', viewValue: 'Crée' },{ value: 'aenleve', viewValue: 'a enlevé' }, { value: 'enAttenteDEnlevement', viewValue: "En Attente D'enlevement" }, { value: 'enleve', viewValue: "enlevé" }, { value: 'enStock', viewValue: 'En Stock' }
    ,{ value: 'enCoursDeLivraison', viewValue: 'En Cours De Livraison' }, { value: 'livre', viewValue: 'Livré' }, { value: 'livrePaye', viewValue: 'Livré Payé' }, { value: 'planificationRetour', viewValue: 'Planification Retour' } 
    , { value: 'retourne', viewValue: 'Rétourné' }, { value: 'enCoursDeTransfert', viewValue: 'En Cours De Transfert' }, { value: 'retourEchange', viewValue: 'Retour Echange' }
    
  ];
  anomalies:any;
  historiqueEtat: any;
  displayForm: boolean;
  colis: any;
  bar_code: any;
  detail: any;


  ref:number;
  colisRef: number;





  private fournisseurID = localStorage.getItem("userId");
  private _unsubscribeAll: Subject<any>;//
  private tempData = [];//

  // public
  public contentHeader: object;
  public rows: any;//
  public selected = [];
  public listColisCrees: any;//
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public exportCSVData;
  public chkBoxSelected = [];
  public bar_codeVar;
  public currentUser: User;
  public editColis: Colis;
  public deleteColis: Colis;
  public checkBoxVar;
  public isSelected: boolean = false;
  public listrowIndex: number[] = [];
  public listReferenceForPdf;
  public allRowsSelected: boolean = false;
  public test: number = 0;
  public colisRecords;
  barCodeAncienColis;
  public SelectionType = SelectionType;
  anomaly ;
  designation;

  

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
    { value: 'Livraison', viewValue: 'Livraison' },
    { value: 'Echange', viewValue: 'Echange' },
  ];
  mode_pay = [
    { value: 'traite', viewValue: 'Traite' },
    { value: 'cheque', viewValue: 'Chéque' },
    { value: 'virement', viewValue: 'Virement' },
    { value: 'espece', viewValue: 'Espèse' },
  ];


  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  file: any;
  arrayBuffer: any;
  filelist: any[];
  listFournisseur: Fournisseur[];
  fournisseur: Fournisseur;

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
        return d.nom_c.toLowerCase().startsWith(val) || d.prenom_c.toLowerCase().startsWith(val) || d.service.toLowerCase().startsWith(val) || d.bar_code.toLowerCase().startsWith(val) || d.tel_c_1.toString().toLowerCase().startsWith(val) || d.cod.toString().toLowerCase().startsWith(val);
      });

      // update the rows
      this.listColisCrees = temp;    // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else {
      this.ngOnInit();
    }
  }

  // private
  private toastRef: any;
  private options: GlobalConfig;

  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {ToastrService} _toastrService
   */

  constructor(private router: Router, private modalService: NgbModal,
    private colisService: ColisService, private _toastrService: ToastrService,

    private serviceFournisseur: FournisseurService, private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    

    this.colisService.getColisCree(this.fournisseurID).subscribe(response => {
      this.rows = response;
      
      this.tempData = this.rows;
      this.listColisCrees = this.rows;
      this.exportCSVData = this.rows;
    });
     this.serviceFournisseur.getFournisseurById(this.fournisseurID).subscribe(
      (response : Fournisseur)=> {this.fournisseur= response;},
      (error : HttpErrorResponse) => { alert ( error.message)});

      this.serviceFournisseur.getAllFournisseur().subscribe(
        (response: Fournisseur[]) => { this.listFournisseur = response }
      )
    
    // content header
    this.contentHeader = {
      headerTitle: 'Colis crées',
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
            name: 'Colis Creés',
            isLink: false
          }
        ]
      }
    };
  }

  /**
     * Custom Chkbox On Select
     *
     * @param { selected }
     */
   onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /**
   * For ref only, log activate events
   *
   * @param selected
   */
  onActivate(event) {
    // console.log('Activate Event', event);
  }

  /**
   * Custom Chkbox On Select
   *
   * @param { selected }
   */
   customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }

  downloadExemplaire() {

    let fileName: string = 'Exemplaire.xlsx';
    console.log(fileName);
    this.colisService.downloadExemplaire({ 'fileName': fileName })
      .subscribe(data => {
        saveAs(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet' }), fileName);
      })
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

  onTelechargerDecharge() {
    this.listReferenceForPdf = this.selected.map(item=> item.reference);

    if (!this.listReferenceForPdf) {
      this._toastrService.error('Aucun colis selectionné ! ', "Échec Téléchargement décharge!",
        { toastClass: 'toast ngx-toastr', closeButton: true, })
    }
    else {
      this.colisService.getDechargePdf(this.listReferenceForPdf).subscribe(x => {
        const blob = new Blob([x], { type: 'application/pdf' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `Manifeste.pdf`;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove
        }, 100);
      });
      for (let i = 0; i < this.rows.length; i++) {
        var element = <HTMLInputElement>document.getElementById(`rowChkbxRef${i}`);
        element.checked = false;
        this.chkBoxSelected.pop();
        this.listrowIndex.pop();
        this.listReferenceForPdf.pop();
      }
      var element = <HTMLInputElement>document.getElementById("headerChkbxRef");
      element.checked = false;
      this.test = 0;

      this._toastrService.success('Vous avez téléchargé le pdf avec succés ! ', "Téléchargement avec succés !",
        { toastClass: 'toast ngx-toastr', closeButton: true, })
    }

  }

//   colisAenlevee() {
//     this.listReferenceForPdf = this.selected.map(item=> item.reference);

//     if (!this.listReferenceForPdf) {
//       this._toastrService.error('Aucun colis selectionné ! ', "Échec Téléchargement décharge!",
//         { toastClass: 'toast ngx-toastr', closeButton: true, })
//     }
//     else {
//       this.colisService.getDechargePdf(this.listReferenceForPdf).subscribe(x => {
//         const blob = new Blob([x], { type: 'application/pdf' });
//         if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//           window.navigator.msSaveOrOpenBlob(blob);
//           return;
//         }
//         const data = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = data;
//         link.download = `Manifeste.pdf`;
//         link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
//         setTimeout(function () {
//           window.URL.revokeObjectURL(data);
//           link.remove
//         }, 100);
//       });
//       for (let i = 0; i < this.rows.length; i++) {
//         var element = <HTMLInputElement>document.getElementById(`rowChkbxRef${i}`);
//         element.checked = false;
//         this.chkBoxSelected.pop();
//         this.listrowIndex.pop();
//         this.listReferenceForPdf.pop();
//       }
//       var element = <HTMLInputElement>document.getElementById("headerChkbxRef");
//       element.checked = false;
//       this.test = 0;

//       this._toastrService.success('Vous avez téléchargé le pdf avec succés ! ', "Téléchargement avec succés !",
//         { toastClass: 'toast ngx-toastr', closeButton: true, })
//     }

// ///////////////////////////////////////////////////////////////
// console.log(this.etat);
//     const body = {
//       newColisEtat: this.etat ,
//       refrence: this.detail.reference
//     };
//     this.colisService.​forceModificationsColis(body).subscribe((data)=>{
//       this._toastrService.success('Colis ' + body.refrence + ' est mis à jour avec succès ! ',
//       'Mis à jour avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe((da)=> {
//         this.closeModel();
//         this.colisService.getColisByRef(this.ref).subscribe(data => {
//           this.detail=data;
//           this.etat = this.detail.etat
//           console.log(data.nom_c)
    
    
//         });
//         this.etat = undefined;
//         this.colisRef = undefined;
//       });
//     })




//   }

// colisAenlevee() {
//   this.listReferenceForPdf = this.selected.map(item => item.reference);

//   if (!this.listReferenceForPdf || this.listReferenceForPdf.length === 0) {
//     this._toastrService.error('Aucun colis sélectionné ! ', "Échec de la mise à jour !",
//       { toastClass: 'toast ngx-toastr', closeButton: true });
//     return;
//   }

//   const newState = 'aenleve'; // The new state you want to set for selected colis
//   this.colisService.aenleveecolis({
//     newColisEtat: newState,
//     refrence: this.listReferenceForPdf
//   }).subscribe(() => {
//     this._toastrService.success('Les colis sélectionnés ont été mis à jour avec succès ! ',
//       'Mise à jour réussie !', { toastClass: 'toast ngx-toastr', closeButton: true });
//     this.selected = []; // Clear the selected array after successful update
//     this.ngOnInit(); // Refresh the component data to reflect the updated states
//   }, (error) => {
//     this._toastrService.error('Une erreur s\'est produite lors de la mise à jour des colis ! ',
//       'Échec de la mise à jour !', { toastClass: 'toast ngx-toastr', closeButton: true });
//     console.error('Error:', error); // Log the error for debugging purposes
//   });
// }

selectAllColis() {
  // Sélectionnez tous les colis dans la liste 'rows'
  this.selected = [...this.rows];
}
changerEtatEnleve() {
  const colisIds = this.selected.map(colis => colis.id);

  // Appelez le service Angular pour changer l'état des colis sélectionnés
  this.colisService.forceModificationsColisList(colisIds).subscribe(
    response => {
      // Le statut a été changé avec succès, effectuez les autres actions ici si nécessaire
      console.log("État des colis sélectionnés a été changé en 'enlevé'.");
    },
    error => {
      // Gérez les erreurs ici
      console.error("Erreur lors du changement d'état des colis :", error);
    }
  );
}


modifyColisList() {
  // Récupère les IDs des colis sélectionnés et les stocke dans un tableau
  const colisIds = this.selected.map(item => item.reference);

  if (colisIds.length === 0) {
    this._toastrService.error('Aucun colis sélectionné !', "Échec Changement d'état !",
      { toastClass: 'toast ngx-toastr', closeButton: true });
  } else {
    // Appelle le service Angular 'colisService' pour changer l'état des colis sélectionnés
    this.colisService.forceModificationsColisList(colisIds).subscribe(
      response => {
        // Le statut a été changé avec succès, effectuez les autres actions ici si nécessaire
        console.log("État des colis sélectionnés a été changé en 'aenleve'.", response);

        // Mettre à jour les données des colis sélectionnés dans le composant
        this.selected.forEach(item => {
          item.state = 'aenleve';
        });

        // Réinitialise d'autres valeurs après le changement d'état réussi
        this.selected = [];
        this.chkBoxSelected = [];
        this.listrowIndex = [];
        this.test = 0;

        // Manually trigger change detection to update the view
        //this.cdr.detectChanges();

        // Affiche une notification de succès après le changement d'état réussi
        this._toastrService.success('État des colis sélectionnés a été changé en "aenleve" avec succès !', "Changement d'état avec succès",
          { toastClass: 'toast ngx-toastr', closeButton: true });
      },
      error => {
        // Gérez les erreurs ici
        console.error("Erreur lors du changement d'état des colis :", error);

        // Affiche une notification d'erreur en cas d'échec du changement d'état
        this._toastrService.error('Erreur lors du changement d\'état des colis !', "Échec Changement d'état !",
          { toastClass: 'toast ngx-toastr', closeButton: true });
      }
    );
  }
}




  onTelechargerBordereau() {
    this.listReferenceForPdf = this.selected.map(item=> item.reference);
    if (!this.listReferenceForPdf) {
      this._toastrService.error('Aucun colis selectionné ! ', "Échec Téléchargement bordereau!",
        { toastClass: 'toast ngx-toastr', closeButton: true, })
    }
    else {
      console.log(this.listReferenceForPdf)
      this.colisService.getBordereauPdf(this.listReferenceForPdf).subscribe(x => {
        const blob = new Blob([x], { type: 'application/pdf' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `Bordereau.pdf`;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove
        }, 100);
      }); for (let i = 0; i < this.rows.length; i++) {
        var element = <HTMLInputElement>document.getElementById(`rowChkbxRef${i}`);
        element.checked = false;
        this.chkBoxSelected.pop();//
        this.listrowIndex.pop();//
        this.listReferenceForPdf.pop();//

      }
      var element = <HTMLInputElement>document.getElementById("headerChkbxRef");
      element.checked = false;
      this.test = 0;

      this._toastrService.success('Vous avez téléchargé le pdf avec succés ! ', "Téléchargement avec succés !",
        { toastClass: 'toast ngx-toastr', closeButton: true, })
    }

  }


  excelRead(e){
    let fileReaded : any ; 
    fileReaded = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop(); 
    this.colisRecords = [];
    let fournisseur : Fournisseur; 
    const schema = {
      'Nom Client': {
        prop: 'nom_c',
        type: String,
        required : true
      },
      'Prénom Client': {
        prop: 'prenom_c',
        type: String,
        required : true
      },

      'N Téléphone 1': {
        prop: 'tel_c_1',
        type: Number,
        required : true
      },
      'N Téléphone 2': {
        prop: 'tel_c_2',
        type: Number,
        required : true
      },
      'Gouvernorat': {
        prop: 'gouvernorat',
        type: String,
        required : true
      },
      'Délégation': {
        prop: 'delegation',
        type: String,
        required : false
      },
      'Adresse': {
        prop: 'adresse',
        type: String,
        required : true
      },
      'Mode de paiement': {
        prop: 'mode_paiement',
        type: String,
        required : true
      },
      'Code postal': {
        prop: 'code_postal',
        type: String,
        required : true
      },
      'Désignation': {
        prop: 'designation',
        type: String,
        required : false
      },
      'Longeur': {
        prop: 'longeur',
        type: Number,
        required : false
      },
      'Largeur': {
        prop: 'largeur',
        type: Number,
        required : false
      },
      'Hauteur': {
        prop: 'hauteur',
        type: Number,
        required : false
      },
      'Nombre des produits': {
        prop: 'nb_p',
        type: Number,
        required : false
      },
      'Poids': {
        prop: 'poids',
        type: Number,
        required : false
      },
      'Remarque': {
        prop: 'remarque',
        type: String,
        required : false
      },
      'Service': {
        prop: 'service',
        type: String,
        required : true
      },
      'Cod': {
        prop: 'cod',
        type: String,
        required : true
      }
    }
    readxlsxFile(e.target.files[0], {schema}).then(async (data)=>
    { 
      if(data.rows)
        {
          for( let row of data.rows)
            {
              row["fournisseur"]= this.fournisseur;
              this.colisRecords.push(row);
            }
        }
       this.colisService.importColis(this.colisRecords).subscribe(data=>
     {  
       window.location.reload()
       }
       ,
       (error=> {
        this._toastrService.success('Import des colis avec succée ! ', " Import avec succès !",
        { toastClass: 'toast ngx-toastr', closeButton: true, timeOut:2000}).onHidden.subscribe(()=> {
          this.colisService.getColisCree(this.fournisseurID).subscribe(response => {
            this.rows = response;
            
            this.tempData = this.rows;
            this.listColisCrees = this.rows;
            this.exportCSVData = this.rows;
          }); 
        });

      
       }));
        
})
  }

  public async onUpdateColis(colis: Colis): Promise<void> {

    await this.colisService.updateColis(this.editColis).toPromise().then(
      (response: Colis) => {
        ;
        this._toastrService.success('Vous avez modifié le colis ' + response.reference + ' avec succès ! ',
          'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, });
        document.getElementById('btnAnnulerUpdate').click();
        window.location.reload();
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
        this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ', "Échec Modification !",
          { toastClass: 'toast ngx-toastr', closeButton: true, });
      });


  }
  public onDeleteColis(Id: number): void {

    this.colisService.deleteColis(Id).subscribe(

      (response: void) => { ; });
    document.getElementById('btnAnnulerDelete').click();
    this._toastrService.success('Vous avez supprimé le colis ' + Id + ' avec succès ! ',
      'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, });
    window.location.reload();
  }

  closeModel() {
    this.modalService.dismissAll();
  }

}
