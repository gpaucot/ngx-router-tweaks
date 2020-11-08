import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const AUTHORS = [{ id: 1, name: 'Yuval Noah Harari' }];

@Injectable({
    providedIn: 'root',
})
export class AuthorsService {
    loadAuthors(): Observable<any[]> {
        return of(AUTHORS).pipe(delay(100));
    }

    loadAuthor(id: number): Observable<any> {
        return of(AUTHORS.find((u) => u.id === id)).pipe(delay(100));
    }
}
