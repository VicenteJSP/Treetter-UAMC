import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SystemDataService {

  constructor(public sanitizer: DomSanitizer) { }

  get title() {
    return [
      { chart: 't', clase: 'name-t' },
      { chart: 'r', clase: 'name-r' },
      { chart: 'e', clase: 'name-e' },
      { chart: 'e', clase: 'name-e' },
      { chart: 't', clase: 'name-t' },
      { chart: 't', clase: 'name-t' },
      { chart: 'e', clase: 'name-e' },
      { chart: 'r', clase: 'name-r' },
    ];
  }

  sanitizarImage(image: string) { return this.sanitizer.bypassSecurityTrustResourceUrl(image); }

  get logoPrincipal() {
    const image = '../assets/icon/treetter.png';
    return this.sanitizarImage(image);
  }

  get logoBootstrap () {
    const image = '../assets/icon/bootstrap.png';
    return this.sanitizarImage(image);
  }
  get logoD3 () {
    const image = '../assets/icon/d3js.png';
    return this.sanitizarImage(image);
  }
  get logoAngular () {
    const image = '../assets/icon/angular.png';
    return this.sanitizarImage(image);
  }
  get logoNode () {
    const image = '../assets/icon/nodejs.png';
    return this.sanitizarImage(image);
  }
  get logoUAMC () {
    const image = '../assets/icon/cuajimalpa.png';
    return this.sanitizarImage(image);
  }
}
