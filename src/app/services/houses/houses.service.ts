import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataFormService } from '../data-form.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  constructor(private http: HttpClient) { }

  AddHouse(house: any) {
    console.log('houseservice', house)
    return this.http.post('http://localhost:3030/AddHouse/', house)
  }
  HousesList() {
    return this.http.get('http://localhost:3030/HousesList/');
  }
  GetHouse(id: any) {
    return this.http.get('http://localhost:3030/GetHouse/' + id);

  }
  UpdateHouse(id: any, house: any) {
    return this.http.put('http://localhost:3030/UpdateHouse/' + id, house);
  }

  DeleteHouse(id: any) {
    return this.http.delete('http://localhost:3030/DeleteHouse/' + id);
  }
}


