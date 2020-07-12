import { Component, OnInit } from '@angular/core';
import { SystemDataService } from '../services/system-data.service';

@Component({
  selector: 'app-infographic',
  templateUrl: './infographic.component.html',
  styleUrls: ['./infographic.component.scss']
})
export class InfographicComponent implements OnInit {

  title = this._data.title;

  constructor(private _data: SystemDataService) { }

  ngOnInit(): void {
  }

}
