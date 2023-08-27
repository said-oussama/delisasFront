import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';
import { CommonModule } from '@angular/common';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from 'app/main/forms/forms.module';
import { ColisComponent } from './colis.component';
import { AEnleveComponent } from 'app/a-enleve/a-enleve.component';

const routes: Routes = [
  {
    path: 'list-colis',
    component: ColisComponent,
    canActivate: [AuthGuard],

   
    data: {roles: [Role.Admin], animation: 'datatables' }
  }
];


@NgModule({
  declarations: [ColisComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    CommonModule,
    FormsModule,
    CoreDirectivesModule,
    NgSelectModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule
  ],
  providers: []
})
export class ColisModule {}
