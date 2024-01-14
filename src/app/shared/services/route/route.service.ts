import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }

  private updateParamSubject = new Subject<string>();

  updateParam(param: string) {
    this.updateParamSubject.next(param);
  }

  getUpdateParamObservable() {
    return this.updateParamSubject.asObservable();
  }
}
