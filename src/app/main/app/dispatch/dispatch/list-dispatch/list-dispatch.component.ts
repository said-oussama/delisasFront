import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CoreTranslationService } from '@core/services/translation.service';
import { DispatchService } from 'app/service/dispatch.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';



@Component({
  selector: 'app-list-dispatch',
  templateUrl: './list-dispatch.component.html',
  styleUrls: ['./list-dispatch.component.scss']
})
export class ListDispatchComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  private tempData: any;

  // public
  public contentHeader: object;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;
  destroy$: Subject<boolean> = new Subject<boolean>()

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  data: any;
  selectedReferences: any;
  listLivreur: any;
  livreur;
  currentUser: any;
  listDispatch: any;
  listColis: any;

  // snippet code variables

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Inline editing Name
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateName(event, cell, rowIndex) {
    this.editingName[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Age
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateAge(event, cell, rowIndex) {
    this.editingAge[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Salary
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateSalary(event, cell, rowIndex) {
    this.editingSalary[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Status
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateStatus(event, cell, rowIndex) {
    this.editingStatus[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    this.dispatchService.getDispatchByDate(val).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.listDispatch = data;

    })
    // // filter our data
    // const temp = this.tempData.filter(function (d) {
    //   return d.date_creation.toLowerCase().indexOf(val) !== -1 || !val;
    // });

    // // update the rows
    // this.listColisCrees = temp;
    // // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  showColis(modal,listColis) {
    this.listColis = listColis;
    this.modalService.open(modal, {
      centered: true,
      size: 'xl'
    });
  }
  /**
   * Row Details Toggle
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  /**
   * For ref only, log selected values
   *
   * @param selected
   */
  onSelect({ selected }) {

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
  customChkboxOnSelect(selected) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(selected);
    this.selectedReferences = this.chkBoxSelected.map(item => item.reference);

  }

  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(private _authenticationService: AuthenticationService, private modalService: NgbModal, private dispatchService: DispatchService, private _coreTranslationService: CoreTranslationService) {
    this._authenticationService.currentUser.pipe(takeUntil(this.destroy$)).subscribe(x => (this.currentUser = x));

    this._unsubscribeAll = new Subject();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.dispatchService.getAllDispatchs().pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.listDispatch = response;
      this.tempData = response;
      // this.kitchenSinkRows = this.rows;
      // this.exportCSVData = this.rows;
    });
    this.dispatchService.getLivreurList().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => { this.listLivreur = response }
    )
    // content header
    this.contentHeader = {
      headerTitle: 'Dispatch',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/'
          }
        ]
      }
    };
  }
  openCreateModal(createModel) {
    this.modalService.open(createModel, {
      centered: true,
      size: 'lg'
    });
  }
  onDispatch(form) {
    const body = {
      colisReferences: this.selectedReferences,
      idDispatcher: this.currentUser.iduser,
      idLivreur: this.livreur
    }
    this.dispatchService.dispatch(body).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      
    })

  }
}
