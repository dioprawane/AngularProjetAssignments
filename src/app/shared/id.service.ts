import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  private dernierId = this.getNewId() + 1000;

  constructor() {
    console.log('IdService instance created');
    this.dernierId++;
  }

  obtenirProchainId(): number {
    this.dernierId++;
    console.log('Attribution du nouvel ID:', this.dernierId);
    return this.dernierId;
  }

  getNewId(): number {
    return Date.now();
}

}
