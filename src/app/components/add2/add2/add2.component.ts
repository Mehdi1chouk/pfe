import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DataFormService } from 'src/app/services/data-form.service';
import { HousesService } from 'src/app/services/houses/houses.service';
import { Add1Component } from '../../add1/add1/add1.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add2',
  templateUrl: './add2.component.html',
  styleUrls: ['./add2.component.css'],
})
export class Add2Component {
  form: FormGroup;
  house: any = {};
  houses: any;
  imageUrl: any;
  uplodedfiles: Array<string> = [];

  uploadedImageUrls: any;

  constructor(private route: Router, private fb: FormBuilder,
    private DataFormService: DataFormService, private http: HttpClient, private HousesService: HousesService) {
    this.form = this.fb.group({
      surface: [''],
      chambre: [''],
      lits: [''],
      sdb: [''],
      prix: [''],
      photos: [[]],
      titre: [''],
      description: [''],
      icons: [''],
      owner: localStorage.getItem('userId')
    });

    this.uploadedImageUrls = [];
  }



  icons = [
    { src: 'assets/icons/machine.png', selected: false, name: 'machinealaver' },
    { src: 'assets/icons/frigidaire.png', selected: false, name: 'Réfrigérateur' },
    { src: 'assets/icons/micro_onde.png', selected: false, name: 'Micro_onde' },
    { src: 'assets/icons/vaisselle.png', selected: false, name: 'Vaisselle' },
    { src: 'assets/icons/four.png', selected: false, name: 'Four' },
    { src: 'assets/icons/chauffe_eau.png', selected: false, name: 'Chauffage' },
    { src: 'assets/icons/clim.png', selected: false, name: 'Climatiseur' },
    { src: 'assets/icons/camera.png', selected: false, name: 'Sécurité' },
    { src: 'assets/icons/tv.png', selected: false, name: 'Tv' },
    { src: 'assets/icons/wifi.png', selected: false, name: 'Wifi' },
    { src: 'assets/icons/garde.png', selected: false, name: 'Concierge' },
    { src: 'assets/icons/ascenseur.png', selected: false, name: 'Asenceur' },
    { src: 'assets/icons/balcon.png', selected: false, name: 'Balcon' },
    { src: 'assets/icons/fleur.png', selected: false, name: 'Jardin' },
    { src: 'assets/icons/piscine.png', selected: false, name: 'Piscine' }
  ];
  selectedIcons: any[] = [];

  onIconClick(index: number) {
    const selectedIcon = this.icons[index];
    selectedIcon.selected = !selectedIcon.selected;

    this.selectedIcons = this.icons
      .filter(icon => icon.selected)
      .map(icon => icon.name);

    //  console.log('selectedIcons', this.selectedIcons);

    this.form.controls['icons'].setValue({
      selectedIcons: this.selectedIcons
    });
  }

  selectfiles(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const files: File[] = Array.from(event.target.files);
      console.log('files', files);
      const uploadedImageUrls: string[] = [];

      const uploadPromises = files.map((file: File) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            const imageDataUrl = event.target.result;
            uploadedImageUrls.push(imageDataUrl);
            resolve(imageDataUrl);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(uploadPromises)
        .then(() => {
          console.log('uploadedImageUrls', uploadedImageUrls);

          this.uploadedImageUrls = this.uploadedImageUrls.concat(uploadedImageUrls);
          console.log('pho', this.uploadedImageUrls)
          this.form.patchValue({
            photos: this.uploadedImageUrls

          });

        })
        .catch((error) => {
          console.error('Error occurred while uploading:', error);
        });
    }

    console.log('hhghgkhgh')
  }



  add() {
    this.DataFormService.formData2 = this.form.value;

    const combinedData = this.DataFormService.gg();

    this.HousesService.AddHouse(combinedData).subscribe((data: any) => {
      console.log('obj', data);
      console.log('combineddata', combinedData)
      this.route.navigate(['']);
    });
  }

  number = 1;
  number2 = 1;
  number3 = 1;

  increase1() {
    this.number++;
  }

  decrease1() {
    if (this.number > 1) {
      this.number--;
    }
  }

  increase2() {
    this.number2++;
  }

  decrease2() {
    if (this.number2 > 1) {
      this.number2--;
    }
  }

  increase3() {
    this.number3++;
  }

  decrease3() {
    if (this.number3 > 1) {
      this.number3--;
    }
  }

  retour() {
    this.route.navigate(['/Add/Ajouter_annonce']);
  }
}



/*

  selectfiles(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const files: File[] = Array.from(event.target.files);
      if (files.length > 4) {
        // If more than 4 files are selected, consider only the first 4 files
        files.splice(4);
      }
      console.log('filzs', files)
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append('photos', files[i]);
        console.log('fhyh', files[i])
      }

      this.http.post('http://localhost:3030/AddHouse/', formData).subscribe((response: any) => {
        console.log('res', response);
        const uploadedImageUrls: string[] = response.fileUrls;

        console.log('uploadedImageUrls', uploadedImageUrls);

        this.uploadedImageUrls = this.uploadedImageUrls.concat(uploadedImageUrls.slice(0, 4 - this.uploadedImageUrls.length));

        this.form.patchValue({
          photos: this.uploadedImageUrls
        });
      },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
    }
  }
  
  
  
  
  
  
  
  
  
  
  
   if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
 
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('photos', file);
 
        this.http.post('http://localhost:3030/AddHouse', formData).subscribe(response => {
          console.log(response);
        });
      }
    }
    
    
    
    
    
    
    
    
    
    
    selectfiles(event: any): void {
  if (event.target.files && event.target.files.length > 0) {
    const file = (event.target.files[0] as File);
    const formData = new FormData();
    formData.append('photos', file);

    this.http.post('http://localhost:3030/AddHouse/', formData).subscribe(response => {
      console.log('res', response);
      this.uploadedImageUrls.push(response);

      console.log('uploadedImageUrls', this.uploadedImageUrls)

      this.form.patchValue({
        photos: this.uploadedImageUrls
      });
    });

  }
}*/

