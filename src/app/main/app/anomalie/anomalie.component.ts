import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import * as snippet from 'app/main/extensions/toastr/toastr.snippetcode';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Fournisseur } from 'app/Model/fournisseur';
import { FournisseurService } from 'app/service/fournisseur.service'
import Stepper from 'bs-stepper';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SocieteLivService } from 'app/service/societeLiv.service';
import { SocieteLiv } from 'app/Model/societeLiv';
import { ColisService } from 'app/service/colis.service';
import { Colis } from 'app/Model/colis';
import { NumberInput } from '@angular/cdk/coercion';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';
import { DOCUMENT } from '@angular/common';
import { environment } from 'environments/environment';
import { AnomalieService } from './anomalie.service';


;



@Component({
  selector: 'app-anomalie',
  templateUrl: './anomalie.component.html',
  styleUrls: ['./anomalie.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AnomalieService]
})
export class AnomalieComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  private apiServerUrl = environment.apiBaseUrl;

  public contentHeader: object;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public exportCSVData;
  public displayForm: boolean = false;

  public nom_societeVar: String;
  public nom_fVar: String;

  public prenom_fVar: String;
  public tel_fVar: number;
  public cinVar: number;
  public email_fVar: String;
  public date_fin_contratVar: string;
  public adresse_societeVar: String;
  public gouvernorat_societeVar: String;
  public localite_societeVar: String;
  public delegation_societeVar: String;
  public adresse_livraisonVar: String;
  public gouvernorat_livraisonVar: String;
  public localite_livraisonVar: String;
  public delegation_livraisonVar: String;
  public prix_livraisonVar: number;
  public prix_retourVar: number;
  public passwordVar: String;
  public currentUser: User;
  private fournisseurID;
  public editAnomalie: Fournisseur;
  viewFournisseur: Fournisseur;
  public deleteAnomalie;
  public testSocieteLiv: SocieteLiv;
  public testFournisseur: Fournisseur;
  public dateNow: Date = new Date();
  public problemDate: boolean;
  public disabledButton: boolean = false;
  addFormPersonal: FormGroup;
  addFormSociete: FormGroup;
  public typesList = [
    { value: 'retour', viewValue: 'Retour' },
    { value: 'checklist', viewValue: 'Checklist' },
    { value: 'enlevement', viewValue: 'Enlevement' },
    { value: 'vierge', viewValue: 'Vierge' }
  ];
  userFile;
  userPatente;
  userPatenteName;
  userFileName;
  public imagePath;
  imgURL: any;
  public message: string;


  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  submitted: boolean = false;
  submitted1: boolean = false;

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
        return d.nom_f.toLowerCase().startsWith(val) || d.prenom_f.toLowerCase().startsWith(val) || d.adresse_societe.toLowerCase().startsWith(val) || d.nom_societe.toLowerCase().startsWith(val) || d.tel_f.toString().toLowerCase().startsWith(val);
      });

      // update the rows
      this.kitchenSinkRows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
    else {
      this.ngOnInit();
    }
  }

  // private
  public _snippetCodeTypes = snippet.snippetCodeTypes;


  /**
  * Horizontal Wizard Stepper Next
  *
  * @param data
  *

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
  constructor(@Inject(DOCUMENT) private document: Document, private anomalieService: AnomalieService, private Http: HttpClient, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder,

    private fournisseurService: FournisseurService, private colisService: ColisService, private _toastrService: ToastrService,
    private societeLivraisonService: SocieteLivService, private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.fournisseurID = this.currentUser.iduser
  }


  ngOnInit() {
    this.addFormPersonal = this.formBuilder.group({
      nom_f: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z\s]{0,30}")
      ]),
      prenom_f: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z\s]{0,30}"),
      ]),
      tel_f: new FormControl(null, [
        Validators.required,
        Validators.pattern('[2,4,5,7,8,9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
      ]),
      email_f: new FormControl(null, [Validators.email]),
      cin: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{8,8}")]),

      date_fin_contrat: new FormControl(null, [Validators.required]),

      // logo: new FormControl(null, []),
      // patente: new FormControl(null, []),
    });
    this.addFormSociete = this.formBuilder.group({
      nom_societe: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z\s]{0,30}")
      ]),
      adresse_societe: new FormControl(null, [Validators.required]),
      gouvernorat_societe: new FormControl(null, [Validators.required]),
      delegation_societe: new FormControl(null, [Validators.required]),
      adresse_livraison: new FormControl(null, [Validators.required]),
      gouvernorat_livraison: new FormControl(null, [Validators.required]),
      delegation_livraison: new FormControl(null, [Validators.required]),
      prix_livraison: new FormControl(null, [Validators.required]),
      prix_retour: new FormControl(null, [Validators.required]),
    });

    this.anomalieService.findAll().subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.exportCSVData = this.rows;
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Gestion Anomalie',
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
            name: 'Gestion Anomalie',
            isLink: false
          }
        ]
      }
    };

  }

  openUpdateModal(anomalie, modalUpdate) {
    this.modalService.open(modalUpdate, {
      centered: true,
      size: 'lg'
    });
    this.editAnomalie = anomalie;
  }
  openDetailsModal(anomalie, modalView) {
    setTimeout(() => {
      this.modalService.open(modalView, {
        centered: true,
        size: 'xl'
      });
      this.viewFournisseur = anomalie;
    });

  }
  openDeleteModal(anomalie, modalDelete) {
    this.modalService.open(modalDelete, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
    this.deleteAnomalie = anomalie;
  }
  openCreateModal(createModel) {
    this.modalService.open(createModel, {
      centered: true,
      size: 'lg'
    });
  }
  btnDisplayForm = function () {
    this.displayForm = true;
  };



  btnAnnulerForm() {
    this.displayForm = false;
  };

  get f() {
    return this.addFormPersonal.controls;
  }
  get fs() {
    return this.addFormSociete.controls;
  }

  onSubmit() {
    this.submitted1 = true;
    if (this.addFormSociete.invalid) {
      return;
    }
    this.disabledButton = true;
    this.testFournisseur = this.addFormSociete.value
    if (this.userPatente || this.userFile) {

      const formData = new FormData();
      this.testFournisseur = Object.assign(this.addFormPersonal.value, this.addFormSociete.value);
      const fournisseur = this.testFournisseur;
      formData.append('fournisseur', JSON.stringify(fournisseur));
      formData.append('file', this.userFile);
      formData.append('patente', this.userPatente);


      this.fournisseurService.addFournisseurWithImage(formData).subscribe(data => {
        this._toastrService.success('Vous avez ajouté le fournisseur ' + ' avec succès ! ',
          'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, })
        this.closeModel()
        this.fournisseurService.getAllFournisseur().subscribe(response => {
          this.rows = response;
          this.tempData = this.rows;
          this.kitchenSinkRows = this.rows;
          this.exportCSVData = this.rows;
        });
      }

      ),
        (error) => {
          this._toastrService.error('Email existe déja ! ', "Échec Ajout !",
            { toastClass: 'toast ngx-toastr', closeButton: true, });
        }

    }
    else {
      this.fournisseurService.addFournisseur(Object.assign(this.addFormPersonal.value, this.addFormSociete.value)).subscribe(data => {
        this._toastrService.success('Vous avez ajouté le fournisseur ' + ' avec succès ! ',
          'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, })
        this.closeModel()
        this.fournisseurService.getAllFournisseur().subscribe(response => {
          this.rows = response;
          this.tempData = this.rows;
          this.kitchenSinkRows = this.rows;
          this.exportCSVData = this.rows;
        });
      }
      ),
        (error) => {
          this._toastrService.error('Email existe déja ! ', "Échec Ajout !",
            { toastClass: 'toast ngx-toastr', closeButton: true, });
        }

    }

  }
  closeModel() {
    this.modalService.dismissAll();
  }
  public async onUpdateFournisseur(fournisseur: Fournisseur): Promise<void> {
    let listColis: Colis[];
    await this.fournisseurService.updateFournisseur(this.editAnomalie, fournisseur.iduser).toPromise().then(
      (response: Fournisseur) => {
        this._toastrService.success('Vous avez modifié le fournisseur ' + response.iduser + ' avec succès ! ',
          'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.subscribe(res => {
            this.closeModel();
            this.fournisseurService.getAllFournisseur().subscribe(response => {
              this.rows = response;
              this.tempData = this.rows;
              this.kitchenSinkRows = this.rows;
              this.exportCSVData = this.rows;
            });
          }
          );



        document.getElementById('btnAnnulerUpdate').click();
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
        this._toastrService.error('Vérifier que vous avez bien rempli le formulaire ! ',
          "Échec Modification !", { toastClass: 'toast ngx-toastr', closeButton: true, });
      });
  }
  async updateFournisseurPhoto(fournisseur: Fournisseur) {

    if (this.userFile) {
      const formData = new FormData();;
      formData.append('fournisseur', JSON.stringify(this.editAnomalie));
      formData.append('file', this.userFile);

      await this.fournisseurService.updateFournisseurPhoto(formData).toPromise().then(
        data => {  });
      this.fournisseurService.getAllFournisseur().subscribe(response => {
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        this.exportCSVData = this.rows;
      });
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  uploadImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL = reader.result; }
      this.updateFournisseurPhoto(this.editAnomalie);
    }
  }
  onAddAnomalie(form) {
    this.anomalieService.addAnomalie(form.value).subscribe(data => {
      this._toastrService.success('Vous avez ajouté une anomalie ' + ' avec succès ! ',
        'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, })

      this.closeModel()

      this.anomalieService.findAll().subscribe(response => {
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        this.exportCSVData = this.rows;
      });
    });
  }
  public onDeleteAnomalie(anomalieId: number): void {

    this.anomalieService.deleteAnomalie(anomalieId).subscribe(
      (response: void) => {
        this._toastrService.success('Vous avez supprimé l anomalie  ' + anomalieId + ' avec succès ! ',
          'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 });

        this.closeModel();
        this.anomalieService.findAll().subscribe(response => {
          this.rows = response;
          this.tempData = this.rows;
          this.kitchenSinkRows = this.rows;
          this.exportCSVData = this.rows;
        });

      });




  }
  onUpdateAnomalie() {
    this.anomalieService.updateAnomalie(this.editAnomalie).subscribe(data => {
      this._toastrService.success('Vous avez modifié une anomalie ' + ' avec succès ! ',
        'Modifié avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, })

      this.closeModel()

      this.anomalieService.findAll().subscribe(response => {
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        this.exportCSVData = this.rows;
      });
    })
  }





}