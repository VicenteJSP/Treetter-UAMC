import { Injectable } from '@angular/core';
import { TreetterObj } from '../models/response-treetter';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreemapsService {

  treeters: Subject<Array<TreetterObj>>;
  private arrayTreetters: Array<TreetterObj>;

  constructor() {
    this.arrayTreetters = [];
    this.treeters = new Subject<Array<TreetterObj>>();
    this.treeters.next(this.arrayTreetters);
  }

  add(element: TreetterObj): void {
    this.arrayTreetters.push(element);
    this.update()
  }

  remove(index: number): void {
    this.arrayTreetters.splice(index, 1);
    this.update()
  }

  private update(): void {
    this.treeters.next(this.arrayTreetters);
  }

  clean(): void {
    this.arrayTreetters = [];
    this.update();
  }

  destroy(): void { this.treeters.complete() }
}
