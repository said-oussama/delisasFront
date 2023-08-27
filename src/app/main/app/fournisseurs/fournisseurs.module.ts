import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Role } from 'app/auth/models';
import { AuthGuard } from 'app/auth/helpers';
import { FournisseursComponent } from './fournisseurs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FournisseurViewComponent } from './fournisseur-view/fournisseur-view.component';

const routes: Routes = [
  {
    path: 'list-fournisseurs',
    component: FournisseursComponent,
    canActivate: [AuthGuard],
  
    data: { roles: [Role.Admin],animation: 'table' }
  },
  {
    path: 'fournisseur-view/:iduser',
    component: FournisseurViewComponent
    
    
  }
];

@NgModule({
  declarations: [FournisseursComponent, FournisseurViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    FormsModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    CoreDirectivesModule,
    NgSelectModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: []
})
export class FournisseursModule {}