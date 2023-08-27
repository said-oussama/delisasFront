import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hub } from 'app/Model/hub';
import { Personnel } from 'app/Model/personnel';
import { HubService } from 'app/service/hub.service';
import { PersonnelService } from 'app/service/personnel.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-personnel-view',
  templateUrl: './personnel-view.component.html',
  styleUrls: ['./personnel-view.component.scss']
})
export class PersonnelViewComponent implements OnInit {

  public contentHeader: object;
   iduser: number
   personnel: any;
   id_hub: number
   hub: Hub
   apiServerUrl = environment.apiBaseUrl;
   userFile;
   userFileName;
   public imagePath;
   imgURL: any;
  public message: string;
  userPatente;
  userPatenteName;
   constructor(private route: ActivatedRoute, private personnelService: PersonnelService, private hubService: HubService ) {
   }
 
   ngOnInit(): void {
    this.iduser = this.route.snapshot.params['iduser'];
    this.personnelService.getPersonnelById(this.iduser).subscribe( data =>{
      this.personnel=data;
      

    })
    
    
    this.contentHeader = {
      headerTitle: 'Détails Personnel',
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
            name: 'Gestion Personnel',
            isLink: true,
            link: '/personnel/list-personnel'
          },
          {
            name: 'Détail Personnel',
            isLink: false
          }
        ]
      }
    };
   }
   blobToFile(blob: Blob, fileName: string): File {
    let file: any = blob;
    file.lastModifiedDate = new Date();
    file.name = fileName;
    console.log(file.type)
    return file as File;
  }
  createFile(res: any, uploadFileName: any): File {
    let file;
    console.log()
    if (!navigator.msSaveBlob) { // detect if not Edge
      
      file = new File(res ? [res.body] : [], uploadFileName, { type: 'text/octet-stream' });
      console.log(file.type)
    } else {
      file = this.blobToFile(new Blob(res ? [res.body] : [], { type: 'text/octet-stream' }), uploadFileName);
    }
    return file;
  }
  downloadFileInFrame(res: any, fileName: string) {
    console.log(res.body)
    const file =this.createFile({ body: res.body }, fileName);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
  
    const type = fileName === 'permis' ? this.personnel?.permis?.split('.')[1] : this.personnel?.carte_grise?.split('.')[1] 
    link.download = `${fileName}.${type}`; document.body.appendChild(link);
    link.click(); document.body.removeChild(link);
  }
  downloadPatente(userId,type) {
    if(type ==='permis') {
      this.personnelService.getPermis(userId).subscribe(val => {
        this.downloadFileInFrame(val,'permis')
      });
    }
    else {
      this.personnelService.getCarteGrise(userId).subscribe(val => {
        this.downloadFileInFrame(val,'carteGrise')
      });
    }
 
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
