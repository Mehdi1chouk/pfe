import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecondModalService {

  private showSecondModal = new BehaviorSubject<boolean>(false);


  constructor() { }

  getShowSecondModal() {
    return this.showSecondModal.asObservable();
  }

  setShowSecondModal(value: boolean) {
    this.showSecondModal.next(value);
  }
}
