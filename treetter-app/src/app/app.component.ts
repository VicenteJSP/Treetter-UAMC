import { Component } from '@angular/core';
import { SystemDataService } from './services/system-data.service';
import { TreemapsService } from './services/treemaps.service';
import { TreetterObj } from './models/response-treetter';
import { CredentialsService } from './services/credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAuth: boolean;
  countTreetters: number
  showSpinner: boolean;
  title = this._data.title;

  constructor(
    private _data: SystemDataService,
    private _treemaps: TreemapsService,
    private _credentials: CredentialsService
  ) {
    this.showSpinner = false;
    this.countTreetters = -1;
    this._treemaps.treeters.subscribe(
      (treemaps: Array<TreetterObj>) => this.countTreetters = treemaps.length,
      err => console.log(err)
    );
    this._credentials.isAuth$.subscribe(
      (state) => this.isAuth = true,
      (err) => { console.log(err) }
    );
  }

  spinner(event: boolean) {
    this.showSpinner = event;
  }

  get showMe(): boolean { return this.countTreetters > -1 ? true : false }

}
