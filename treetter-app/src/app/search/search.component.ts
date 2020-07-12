import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemDataService } from '../services/system-data.service';
import { TreetterService } from '../services/treetter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TreemapsService } from '../services/treemaps.service';
import { ResponseTreetter, TreetterObj } from '../models/response-treetter';
import { CredentialsService } from '../services/credentials.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  @Output() spinner: EventEmitter<boolean>;
  searchUser: FormGroup;
  title = this._data.title;
  logoPrincipal = this._data.logoPrincipal;
  isAuth: boolean;
  searching: boolean;

  constructor(
    private _formBuild: FormBuilder,
    private _data: SystemDataService,
    private _tretter: TreetterService,
    private _treemaps: TreemapsService,
    private _credentials: CredentialsService
  ) {
    this.isAuth = false;
    this.buildFrom();
    this.spinner = new EventEmitter<boolean>();
  }

  buildFrom() {
    this.searchUser = this._formBuild.group({
      user: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._credentials.isAuth$.subscribe(
      (state) => this.isAuth = true,
      (err) => { console.log(err) }
    );
  }

  search(event: Event) {
    event.preventDefault();
    if (this.searchUser.valid) {
      this.spinner.emit(true);
      this._tretter.consultTreemap(this.searchUser.value.user).subscribe(
        (response: ResponseTreetter) => {
          const { data } = response;
          this._treemaps.add((data as TreetterObj));
          this.searchUser.reset();
          this.spinner.emit(false);
        },
        (error: HttpErrorResponse) => { console.log(error) }
      );
    }
  }

}
