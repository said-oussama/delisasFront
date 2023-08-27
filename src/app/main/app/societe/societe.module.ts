import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SocieteComponent } from './societe.component';

const routes: Routes = [
  {
    path: 'societe',
    component: SocieteComponent,
    data: { animation: 'wizard' }
  }
];

@NgModule({
  declarations: [SocieteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    FormsModule,
    CoreDirectivesModule,
    NgSelectModule,
    SweetAlert2Module.forRoot()
  ]
})
export class SocieteModule {}
