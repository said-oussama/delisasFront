import { NgModule } from '@angular/core';
import { ColisModule } from './colis/colis.module';

import { FournisseursModule } from './fournisseurs/fournisseurs.module';
import { PersonnelModule } from './personnel/personnel.module';
import { DispatchComponent } from './dispatch/dispatch/dispatch.component';

@NgModule({
  declarations: [
    DispatchComponent
  ],
  imports: [ColisModule, FournisseursModule,PersonnelModule]
})
export class appBackOfficeModule {}
