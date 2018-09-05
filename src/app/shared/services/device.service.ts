import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  
  public exists: Subject<boolean> = new Subject();

  constructor(
    private _tokenService: Angular2TokenService
  ) { }

  checkIfDeviceExists(sld_number: string): Observable<any> {
    this._tokenService.get(`devices/exists/${sld_number}`).pipe(take(1)).subscribe(res => {
      this.exists.next(true);
    }, err => {
      this.exists.next(false);
    });
    return this.exists.asObservable();
  }
}
