import { Component } from '@angular/core';
import { MinValidator } from '@angular/forms';
import { mixinDisabled, mixinTabIndex } from '@angular/material/core';
import { ImgMaxSizeService } from 'ng2-img-max';

@Component({
  selector: 'app-add2',
  templateUrl: './add2.component.html',
  styleUrls: ['./add2.component.css']
})
export class Add2Component {
  constructor(private imgMaxSizeService: ImgMaxSizeService) { }

  number = 1
  number2 = 1
  number3 = 1

  zid() {
    this.number++
  }
  na9es() {

    if (this.number < 1) {
      this.number == - 1
    }
    else {
      this.number--
    }
  }



  zid2() {
    this.number2++
  }
  na9es2() {

    if (this.number2 < 1) {
      this.number2 == - 1
    }
    else {
      this.number2--
    }
  }


  zid3() {
    this.number3++
  }
  na9es3() {

    if (this.number3 < 1) {
      this.number3 == - 1
    }
    else {
      this.number3--
    }
  }


  imageUrl: any;

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        console.log(reader.result);
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 200;
          let width = image.width;
          let height = image.height;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d')!.drawImage(image, 0, 0, width, height);
          this.imageUrl = canvas.toDataURL();
        };
      };
    }


  }
  icons = [
    { src: 'assets/icons/machine.png', selected: false },
    { src: 'assets/icons/frigidaire.png', selected: false },
    { src: 'assets/icons/micro_onde.png', selected: false },
    { src: 'assets/icons/vaisselle.png', selected: false },
    { src: 'assets/icons/four.png', selected: false },
    { src: 'assets/icons/chauffe_eau.png', selected: false },
    { src: 'assets/icons/clim.png', selected: false },
    { src: 'assets/icons/camera.png', selected: false },
    { src: 'assets/icons/tv.png', selected: false },
    { src: 'assets/icons/wifi.png', selected: false },
    { src: 'assets/icons/garde.png', selected: false },
    { src: 'assets/icons/ascenseur.png', selected: false },
    { src: 'assets/icons/balcon.png', selected: false },
    { src: 'assets/icons/fleur.png', selected: false },
    { src: 'assets/icons/piscine.png', selected: false }
  ];


  selectedIconIndex: any
  onIconClick(index: number) {
    this.icons[index].selected = !this.icons[index].selected;
  }



















  /*
    isIconSelected = false;
  
    onIconClick() {
      this.isIconSelected = !this.isIconSelected;
    }*/


  /*
    selectedIconId: string;
    iconId: string
  
    onIconClick(iconId) {
      this.selectedIconId = iconId;
    }*/


  /*
    icons = [
      { id: 1, selected: false },
      { id: 2, selected: false },
      { id: 3, selected: false },
      { id: 4, selected: false },
      { id: 5, selected: false },
      { id: 6, selected: false },
      { id: 7, selected: false },
      { id: 8, selected: false },
      { id: 9, selected: false },
      { id: 10, selected: false },
      { id: 11, selected: false },
      { id: 12, selected: false },
      { id: 13, selected: false },
      { id: 14, selected: false },
      { id: 15, selected: false },
  
    ];
  
    onIconClick(icon) {
      icon.selected = this.icons;
    }*/
}
