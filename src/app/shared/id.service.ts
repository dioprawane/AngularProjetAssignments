import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  private dernierId = 1000;

  constructor() {
    console.log('IdService instance created');
  }

  obtenirProchainId(): number {
    this.dernierId++;
    console.log('Attribution du nouvel ID:', this.dernierId);
    return this.dernierId;
  }
  
}
