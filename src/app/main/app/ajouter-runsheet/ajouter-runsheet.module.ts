import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule } from 'app/main/forms/forms.module';
import { HubService } from 'app/service/hub.service';
import { AjouterRunsheetComponent } from './ajouter-runsheet.component';

// routing
const routes: Routes = [
  {
    path: 'ajouter-runsheet',
    component: AjouterRunsheetComponent,
    data: { animation: 'maps' }
  }
];

@NgModule({
  declarations: [AjouterRunsheetComponent],
  imports: [
   
    GoogleMapsModule,
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
    SweetAlert2Module.forRoot()
  ],
  providers: [HubService]
})
export class AjouterRunsheetModule {}
