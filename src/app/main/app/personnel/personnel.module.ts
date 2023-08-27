import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreCommonModule } from '@core/common.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelComponent } from './personnel.component';
import { PersonnelViewComponent } from './personnel-view/personnel-view.component';
import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'list-personnel',
    component: PersonnelComponent,
    data: { animation: 'repeater' }
  },
  {
    path: 'personnel-view/:iduser',
    component: PersonnelViewComponent
    
    
  }
];

@NgModule({
  declarations: [PersonnelComponent, PersonnelViewComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    CardSnippetModule,
    ContentHeaderModule, 
    FormsModule, 
    NgbModule,
    NgxDatatableModule,
    CoreCommonModule,
    NgSelectModule,
    CsvModule,
    CoreDirectivesModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
 providers: [InvoiceListService]
})
export class PersonnelModule {}