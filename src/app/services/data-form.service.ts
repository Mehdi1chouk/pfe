import { Injectable } from '@angular/core';
import { VillaService } from './villa/villa.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataFormService {
  houses: Observable<any[]>;
  formData1: any;
  formData2: any;
  house: Array<any> = [];
  filteredHouses: any[] = [];

  private baseUrl = 'http://localhost:3030';

  constructor(private http: HttpClient, private VillaService: VillaService) { }

  /* addHouse(formData1: any, formData2: any) {
     const houseData = { ...formData1, ...formData2 };
     return this.http.post('http://localhost:3030/AddHouse/', houseData);
   }*/

  getHouses(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3030/HousesList');
  }

  gg() {
    return { ...this.formData1, ...this.formData2 };
  }





  updateFilteredHouses(houses: any[]): void {
    this.filteredHouses = houses;
  }

  getFilteredHouses(): any[] {
    return this.filteredHouses;
  }

  getUser(userId: string) {
    return this.http.get(`http://localhost:3030/getUser/${userId}`);
  }


}