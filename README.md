# NgxRouterTweaks

ngx-router-tweaks brings the ability to write inline resovlers and to run them sequentially if needed. Typically in a pure REST environment where multiple cascade calls may be required to fetch what we need.  

## Installing

```bash
$ npm install --save ngx-router-tweaks
```

## Quickstart

Import **ngx-router-tweaks** module in Angular app.

```typescript
import { NgxRouterTweaksModule } from 'ngx-router-tweaks';

@NgModule({
    imports: [
        // ...
        NgxRouterTweaksModule
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
```

There is a demo project in the repository: https://github.com/gpaucot/ngx-router-tweaks
 
