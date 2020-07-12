import { Component, OnInit } from '@angular/core';
import { SystemDataService } from '../services/system-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  logoPrincipal = this._data.logoPrincipal;
  bootstrap = this._data.logoBootstrap;
  d3 = this._data.logoD3;
  node = this._data.logoNode;
  angular = this._data.logoAngular;
  uamc = this._data.logoUAMC;

  constructor(private _data: SystemDataService) { }

  ngOnInit(): void {
  }

}
