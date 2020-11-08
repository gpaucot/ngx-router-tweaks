import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const BOOKS = [
    { id: 1, name: 'Homo deus', authorId: 1 },
    { id: 2, name: 'Sapiens', authorId: 1 },
];

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    loadBooks(): Observable<any[]> {
        return of(BOOKS).pipe(delay(100));
    }

    loadBook(id: number): Observable<any> {
        return of(BOOKS.find((u) => u.id === id)).pipe(delay(100));
    }
}
