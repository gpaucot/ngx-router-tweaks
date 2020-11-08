import { NgModule } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { getResolverCompleted, registerResolverCompleted, wrapResolver } from './resolvers';

@NgModule({})
export class NgxRouterTweaksModule {
    constructor(router: Router) {
        router.events.pipe(filter((e) => e instanceof ActivationStart)).subscribe((e: ActivationStart) => {
            const resolverCompleted$ = registerResolverCompleted(e.snapshot);
            const snapshot = e.snapshot as any;
            const resolversObject = snapshot._resolve;
            Object.keys(resolversObject).forEach((key) => {
                resolversObject[key] = wrapResolver(
                    () => {},
                    resolversObject[key],
                    (route, state, v) => {
                        route.data = { ...route.data, [key]: v };
                        queueMicrotask(() => resolverCompleted$.next(route.data));
                    }
                );
            });
        });

        router.events.pipe(filter((e) => e instanceof ActivationEnd)).subscribe((e: ActivationEnd) => {
            try {
                const resolverCompleted$ = getResolverCompleted(e.snapshot);
                resolverCompleted$.complete();
            } catch (e) {}
        });
    }
}
