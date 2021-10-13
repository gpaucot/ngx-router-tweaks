import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css'],
})
export class BooksComponent {
    books$ = this.route.data.pipe(map((d) => d.books));

    constructor(private route: ActivatedRoute) {}
}
