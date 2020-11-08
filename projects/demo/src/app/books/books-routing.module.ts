import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';
import { BooksService } from './services/books.service';
import { AuthorsService } from './services/authors.service';
import { BookResolver } from './resolvers/book.resolver';
import { resolver, waitForResolvers } from 'ngx-router-tweaks';

const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
        resolve: {
            books: resolver(BooksService, (svc) => svc.loadBooks()),
        },
    },
    {
        path: ':bookId',
        component: BookComponent,
        resolve: {
            book: BookResolver,
            user: waitForResolvers(
                ['book'],
                resolver(AuthorsService, (svc, route) => {
                    return svc.loadAuthor(route.data.book.authorId);
                })
            ),
            bookAndOwner: waitForResolvers(
                ['user'],
                resolver((route) => ({
                    ...route.data.book,
                    author: route.data.user,
                }))
            ),
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BooksRoutingModule {}
