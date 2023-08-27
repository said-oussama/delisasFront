
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { HubService } from 'app/service/hub.service';
import { Hub } from 'app/Model/hub';
import { SocieteLiv } from 'app/Model/societeLiv';
import { SocieteLivService } from 'app/service/societeLiv.service';
import { ConsoleService } from 'app/service/console.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import * as snippet from 'app/main/extensions/swiper/swiper.snippetcode';
import { DebriefService } from 'app/service/debrief.service';
import * as _ from 'lodash'
import { AuthenticationService } from 'app/auth/service';
@Component({
  selector: 'app-list-debrief',
  templateUrl: './list-debrief.component.html',
  styleUrls: ['./list-debrief.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListDebriefComponent implements OnInit {
  listOfDebriefs: any = [];
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;

  contentHeader:any;
    /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {ToastrService} _toastrService
   */

     constructor(private router: Router, private hubService: HubService, private modalService: NgbModal, private debriefService: DebriefService,
      private _datatablesService: HubService, private societeLivraisonService: SocieteLivService,
      private _coreTranslationService: CoreTranslationService,
      private _authenticationService : AuthenticationService,
      private _toastrService: ToastrService,
      ) {
    }
  ngOnInit(): void {
    this.debriefService.findAll().subscribe((data)=>{
      this.listOfDebriefs = data;
    });
    this.modalService.dismissAll()
    this.contentHeader = {
      headerTitle: 'Gestion Debrief',
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
            name: 'Gestion Debrief',
            isLink: false
          }
        ]
      }
    };
  }
  updateDebrief(row) {
    
    this.router.navigate(['/debrief/debrief'], { queryParams: { debrief: row.id } });

  }
}
