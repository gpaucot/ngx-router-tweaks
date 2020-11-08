import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
})
export class BookComponent {
    bookAndOwner$ = this.route.data.pipe(map((d) => d.bookAndOwner));

    constructor(private route: ActivatedRoute) {}
}
