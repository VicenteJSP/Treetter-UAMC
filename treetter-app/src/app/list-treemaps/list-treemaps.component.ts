import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TreemapsService } from '../services/treemaps.service';
import { TreetterObj } from '../models/response-treetter';

declare var $:any

@Component({
  selector: 'app-list-treemaps',
  templateUrl: './list-treemaps.component.html',
  styleUrls: ['./list-treemaps.component.scss']
})
export class ListTreemapsComponent implements OnInit {

  treemap$: Observable<Array<TreetterObj>>;

  constructor(private _treemaps: TreemapsService) { }

  ngOnInit(): void {
    this.treemap$ = this._treemaps.treeters;
      $('[data-toggle="treemap"]').tooltip();
  }

  delete(index: number): void { this._treemaps.remove(index); }
}
