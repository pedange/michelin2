import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PoiRestService} from '../../services/poi.rest.service';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import {from, of} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public keyCtl: FormControl = new FormControl('', Validators.required);
  public isLoading: boolean;

  constructor(
    private router: Router,
    private poiRestService: PoiRestService
  ) {
    console.log('LOGIN');
    this.checkApiKey();
  }

  ngOnInit(): void {
  }

  private checkApiKey(): void {
    const authKey: string = localStorage.getItem('michelinApiKey');
    if (authKey) {
      of({})
        .pipe(tap(() => this.isLoading = true))
        .pipe(mergeMap(() => this.poiRestService.testApi()))
        .pipe(mergeMap((result: boolean) => {
          if (result) {
            return from(this.router.navigate(['search']));
          } else {
            alert('Clé incorrecte !');
            localStorage.removeItem('michelinApiKey');
            this.keyCtl.reset();
            return of({});
          }
        }))
        .pipe(tap(() => this.isLoading = false))
        .pipe(catchError((err) => {
          this.isLoading = false;
          throw err;
        }))
        .subscribe();
    }
  }

  public submit(): void {
    localStorage.setItem('michelinApiKey', this.keyCtl.value);
    this.checkApiKey();
  }
}
