import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Fournisseur } from 'app/Model/fournisseur';
import { FournisseurService } from 'app/service/fournisseur.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-fournisseur-view',
  templateUrl: './fournisseur-view.component.html',
  styleUrls: ['./fournisseur-view.component.scss']
})
export class FournisseurViewComponent implements OnInit {
  public contentHeader: object;
   iduser: number
   fournisseur: any;
   private apiServerUrl = environment.apiBaseUrl;
   userFile;
   userFileName;
   public imagePath;
  imgURL: any;
  public message: string;
  userPatente;
  userPatenteName;
   constructor(private route: ActivatedRoute, private fourniseurService: FournisseurService ) {
   }
 
   ngOnInit(): void {
    this.iduser = this.route.snapshot.params['iduser'];
    
    this.fourniseurService.getFournisseurById(this.iduser).subscribe( data =>{
      this.fournisseur=data;
    })

    // content header
    this.contentHeader = {
      headerTitle: 'Détails Fournisseur',
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
            name: 'Gestion Fournisseur',
            isLink: true,
            link: '/fournisseurs/list-fournisseurs'
          },
          {
            name: 'Détail Fournisseur',
            isLink: false
          }
        ]
      }
    };

    
   }

  
  onSelectPatente(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userPatente = file;

      this.userPatenteName = file.name

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => { this.imgURL = reader.result; }
    }
  }
   downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };
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
    const type = this.fournisseur?.patente?.split('.')[1]
    link.download = `${fileName}.${type}`; document.body.appendChild(link);
    link.click(); document.body.removeChild(link);
  }
  downloadPatente(userId) {
    this.fourniseurService.getImage(userId).subscribe(val => {
      this.downloadFileInFrame(val,'patente')
    });
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
