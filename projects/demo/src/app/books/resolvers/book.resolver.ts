import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<any> {
    constructor(private svc: BooksService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.svc.loadBook(+route.params.bookId);
    }
}
