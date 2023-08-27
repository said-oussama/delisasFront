import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreCommonModule } from '@core/common.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { FormLayoutComponent } from 'app/main/forms/form-layout/form-layout.component';
import { ColisService } from 'app/service/colis.service';

const routes: Routes = [
  {
    path: 'form-layout',
    component: FormLayoutComponent,
    data: { animation: 'layout' }
  }
];

@NgModule({
  declarations: [FormLayoutComponent],
  imports: [
    RouterModule.forChild(routes), 
    ContentHeaderModule, 
    CardSnippetModule, 
    FormsModule, 
    CoreCommonModule,
    CommonModule,  
    NgbModule,
    NgxDatatableModule,
    NgSelectModule,
    CsvModule,
    CoreDirectivesModule,
    SweetAlert2Module.forRoot()
  ]
})
export class FormLayoutModule {}
