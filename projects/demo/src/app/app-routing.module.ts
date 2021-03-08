import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxRouterTweaksModule } from 'ngx-router-tweaks';

const routes: Routes = [
    { path: 'books', loadChildren: () => import('./books/books.module').then((m) => m.BooksModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), NgxRouterTweaksModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
