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
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { SocieteLivService } from 'app/service/societeLiv.service';
import { SocieteLiv } from 'app/Model/societeLiv';
import { ColisService } from 'app/service/colis.service';
import { Colis } from 'app/Model/colis';
import { NumberInput } from '@angular/cdk/coercion';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';
import { DOCUMENT } from '@angular/common';
import { environment } from 'environments/environment';


;



@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FournisseursComponent implements OnInit {
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
  public telVar: number;
  public cinVar: number;
  public emailVar: String;
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
  public editFournisseur: Fournisseur;
  viewFournisseur:Fournisseur;
  public deleteFournisseur: Fournisseur;
  public testSocieteLiv: SocieteLiv;
  public testFournisseur: Fournisseur;
  public dateNow: Date = new Date();
  public problemDate: boolean;
  public disabledButton: boolean = false;
  addFormPersonal: FormGroup;
  addFormSociete: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>()

  userFile;
  userPatente;
  userPatenteName;
  userFileName;
  public imagePath;
  imgURL: any;
  public message: string;
  booleanConnect= {
    
    false:'Oui',
    true:'Non'
    
}
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
        return d.nom_f.toLowerCase().startsWith(val) || d.prenom_f.toLowerCase().startsWith(val) || d.adresse_societe.toLowerCase().startsWith(val) || d.nom_societe.toLowerCase().startsWith(val) || d.tel.toString().toLowerCase().startsWith(val);
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
  private horizontalWizardStepper: Stepper;
  public _snippetCodeTypes = snippet.snippetCodeTypes;


  /**
  * Horizontal Wizard Stepper Next
  *
  * @param data
  */
  horizontalWizardStepperNext() {
    this.submitted = true;

    let newDate = new Date(this.addFormPersonal.get('date_fin_contrat').value)
    if (this.dateNow > newDate) { //data.form.valid = false;
      this.problemDate = true;
    } else {
      this.problemDate = false;
    }
    if (this.addFormPersonal.valid === true && this.problemDate === false) {
      this.horizontalWizardStepper.next();

    }


    //this.problemDate=false;
    if (this.addFormPersonal.valid) {
      this.horizontalWizardStepper.next();
    }

  }
  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
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
  constructor(@Inject(DOCUMENT) private document: Document,private Http : HttpClient, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder,

    private fournisseurService: FournisseurService, private colisService: ColisService, private _toastrService: ToastrService,
    private societeLivraisonService: SocieteLivService, private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();
    this.horizontalWizardStepper
    this._authenticationService.currentUser.pipe(takeUntil(this.destroy$)).subscribe(x => (this.currentUser = x));
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
      tel: new FormControl(null, [
        Validators.required,
        Validators.pattern('[2,4,5,7,8,9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
      ]),
      email: new FormControl(null, [Validators.email]),
      cin: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{8,8}")]),
      nom_societe: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z\s]{0,30}")
      ]),
      date_fin_contrat: new FormControl(null, [Validators.required]),

      // logo: new FormControl(null, []),
      // patente: new FormControl(null, []),
    });
    this.addFormSociete = this.formBuilder.group({
  
      adresse_societe: new FormControl(null, [Validators.required]),
      gouvernorat_societe: new FormControl(null, [Validators.required]),
      delegation_societe: new FormControl(null, [Validators.required]),
      adresse_livraison: new FormControl(null, [Validators.required]),
      gouvernorat_livraison: new FormControl(null, [Validators.required]),
      delegation_livraison: new FormControl(null, [Validators.required]),
      prix_livraison: new FormControl(null, [Validators.required]),
      prix_retour: new FormControl(null, [Validators.required]),
    });


    // content header
    this.contentHeader = {
      headerTitle: 'Gestion Fournisseur',
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
            name: 'Gestion Fournisseur',
            isLink: false
          }
        ]
      }
    };
    this.loadData();
  }
  loadData(){
    
    this.fournisseurService.getAllFournisseur().pipe(takeUntil(this.destroy$)).subscribe(response => {
      response = response.filter((item)=> item.isDeleted !== true)
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.exportCSVData = this.rows;
    });
  }
  openUpdateModal(fournisseur: Fournisseur, modalUpdate) {
    this.modalService.open(modalUpdate, {
      centered: true,
      size: 'lg'
    });
    this.editFournisseur = fournisseur;
  }
  openDetailsModal(fournisseur: Fournisseur, modalView) {
    setTimeout(() => {
      this.modalService.open(modalView, {
        centered: true,
        size: 'xl'
      });
      this.viewFournisseur = fournisseur;
      });

  }
  openDeleteModal(fournisseur: Fournisseur, modalDelete) {
    this.modalService.open(modalDelete, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
    this.deleteFournisseur = fournisseur;
  }
  openCreateModal(createModel) {
    this.modalService.open(createModel, {
      centered: true,
      size: 'lg'
    });
    setTimeout(() => {
      if (document.getElementById('horizontal-wizard-id')) {
        this.horizontalWizardStepper = new Stepper(document.getElementById('horizontal-wizard-id'), {});

      }

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


      this.fournisseurService.addFournisseurWithImage(formData).pipe(takeUntil(this.destroy$)).subscribe(data => {
        this._toastrService.success('Vous avez ajouté le fournisseur ' + ' avec succès ! ',
          'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, })
        this.closeModel()
        this.loadData();

      }
,
      (error=> {
        this._toastrService.error('Email existe déja ! ', "Échec d'ajout !",
        { toastClass: 'toast ngx-toastr', closeButton: true, });
        this.disabledButton = false;

      }));
      
    }
    else {
      this.fournisseurService.addFournisseur(Object.assign(this.addFormPersonal.value, this.addFormSociete.value)).pipe(takeUntil(this.destroy$)).subscribe(data => {
        this._toastrService.success('Vous avez ajouté le fournisseur ' + ' avec succès ! ',
          'Ajout avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, })
        this.closeModel()
        this.loadData();

      },
      (error=> {
        this._toastrService.error('Email existe déja ! ', "Échec d'ajout !",
        { toastClass: 'toast ngx-toastr', closeButton: true, });
        this.disabledButton = false;

      }));

    }

  }
  closeModel() {
    this.modalService.dismissAll();
  }
  public async onUpdateFournisseur(fournisseur: Fournisseur): Promise<void> {
    let listColis: Colis[];
    await this.fournisseurService.updateFournisseur(this.editFournisseur,fournisseur.iduser).toPromise().then(
      (response: Fournisseur) => {
        this._toastrService.success('Vous avez modifié le fournisseur ' + response.iduser + ' avec succès ! ',
          'Modification avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 }).onHidden.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.closeModel();
            this.loadData();

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
      formData.append('fournisseur', JSON.stringify(this.editFournisseur));
      formData.append('file', this.userFile);

      await this.fournisseurService.updateFournisseurPhoto(formData).toPromise().then(
        data => {  });
        this.loadData();

    }
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
      this.updateFournisseurPhoto(this.editFournisseur);
    }
  }
  public onDeleteFournisseur(fournisseurId: number): void {

    this.fournisseurService.deleteFournisseur(fournisseurId).pipe(takeUntil(this.destroy$)).subscribe(
      (response: void) => { ; });

    document.getElementById('btnAnnulerDelete').click();
    this._toastrService.success('Vous avez supprimé le fournisseur ' + fournisseurId + ' avec succès ! ',
      'Suppression avec succès !', { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2000 })
        this.loadData();



  }

  onSelectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      this.userFileName = file.name

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL = reader.result; }
    }
  }

  onSelectPatente(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userPatente = file;

      this.userPatenteName = file.name

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL = reader.result; }
    }
  }

  update() {
    //this.editFournisseur.delegation_livraison=this.editFournisseur.delegation_societe;
  }
   downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };
   downloadPatente(userId) {
    this.fournisseurService.getImage(userId).pipe(takeUntil(this.destroy$)).subscribe(val => {
      console.log(val);
      const zz = val.blob()
      const url = URL.createObjectURL(zz);
      this.downloadUrl(url, 'image.jpg');
      URL.revokeObjectURL(url);
    });
  //  let patenteFile;
  //   this.fournisseurService.getImage(userId).subscribe(data=> {
  //    console.log()
  //   var fileURL = URL.createObjectURL(data);
  //   window.open(fileURL);
  //   var link=document.createElement('a');
  //   link.href=fileURL;
  //   link.download="patente.jpg";
  //   link.click();
        
    
  //   });
   
  }
}