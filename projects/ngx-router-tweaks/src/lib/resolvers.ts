import { Injectable, Injector, Type, ɵisObservable as isObservable, ɵisPromise as isPromise } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { concat, from, Observable, of, Subject } from 'rxjs';
import { filter, map, mergeMap, startWith, switchMap, take, tap } from 'rxjs/operators';

export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
    if (isObservable(value)) {
        return value;
    }

    if (isPromise(value)) {
        // Use `Promise.resolve()` to wrap promise-like instances.
        // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
        // change detection.
        return from(Promise.resolve(value));
    }

    return of(value);
}

export function resolver<Z>(
    resolve: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<Z> | Promise<Z> | Z
): Type<Resolve<Z>>;
export function resolver<A, Z>(
    a: Type<A>,
    resolve: (a: A, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<Z> | Promise<Z> | Z
): Type<Resolve<Z>>;
export function resolver<A, B, Z>(
    a: Type<A>,
    b: Type<B>,
    resolve: (a: A, b: B, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<Z> | Promise<Z> | Z
): Type<Resolve<Z>>;
export function resolver<A, B, C, Z>(
    a: Type<A>,
    b: Type<B>,
    c: Type<C>,
    resolve: (
        a: A,
        b: B,
        c: C,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => Observable<Z> | Promise<Z> | Z
): Type<Resolve<Z>>;
export function resolver<A, B, C, D, Z>(
    a: Type<A>,
    b: Type<B>,
    c: Type<C>,
    d: Type<D>,
    resolve: (
        a: A,
        b: B,
        c: C,
        d: D,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => Observable<Z> | Promise<Z> | Z
): Type<Resolve<Z>>;
export function resolver<A, B, C, D, E, Z>(
    a: Type<A>,
    b: Type<B>,
    c: Type<C>,
    d: Type<D>,
    e: Type<E>,
    resolve: (
        a: A,
        b: B,
        c: C,
        d: D,
        e: E,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => Observable<Z> | Promise<Z> | Z
): Type<Resolve<Z>>;
export function resolver<A, B, C, D, E, F, Z>(
    a: Type<A>,
    b: Type<B>,
    c: Type<C>,
    d: Type<D>,
    e: Type<E>,
    f: Type<F>,
    resolve: (
        a: A,
        b: B,
        c: C,
        d: D,
        e: E,
        f: F,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => Observable<Z> | Promise<Z> | Z
): Type<Resolve<Z>>;

export function resolver<A>(...args: any[]): Type<Resolve<A>> {
    const deps = args.slice(0, args.length - 1);
    const handler = args[args.length - 1];

    @Injectable({ providedIn: 'root' })
    class Q implements Resolve<any> {
        constructor(private injector: Injector) {}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<A> | Promise<A> | A {
            const instances = deps.map((d) => this.injector.get(d));
            return handler(...instances, route, state);
        }
    }
    return Q;
}

export function waitForResolvers<A = unknown>(keys: string[], R: Type<Resolve<A>>): Type<Resolve<A>> {
    return wrapResolver(
        (route) => {
            const resolverCompleted$ = getResolverCompleted(route);
            return concat(of(null), resolverCompleted$).pipe(
                filter((data) => {
                    const loadedKeys = Object.keys(data || {});
                    return keys.every((k) => loadedKeys.includes(k));
                }),
                take(1)
            );
        },
        R,
        null
    );
}

export function wrapResolver<A = unknown>(
    before: (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => Observable<unknown> | Promise<unknown> | unknown | null,
    R: Type<Resolve<A>>,
    after: (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        v: A
    ) => Observable<unknown> | Promise<unknown> | unknown | null
): Type<Resolve<A>> {
    if (!before) {
        before = () => of(null);
    }
    if (!after) {
        after = () => of(null);
    }

    @Injectable({ providedIn: 'root' })
    class Q extends R {
        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<A> | Promise<A> | A {
            return wrapIntoObservable(before(route, state)).pipe(
                switchMap(() => wrapIntoObservable(super.resolve(route, state))),
                switchMap((v) => {
                    return wrapIntoObservable(after(route, state, v)).pipe(map(() => v));
                })
            );
        }
    }
    return Q;
}

export function registerResolverCompleted(route: ActivatedRouteSnapshot): Subject<any> {
    const resolverCompleted$ = new Subject<any>();
    const snapshot = route as any;
    snapshot.__resolverCompleted$ = resolverCompleted$;
    return resolverCompleted$;
}

export function getResolverCompleted(route: ActivatedRouteSnapshot): Subject<any> {
    const routeObj = route as any;
    const resolverCompleted$ = routeObj.__resolverCompleted$ as Subject<any>;

    if (!resolverCompleted$) {
        throw new Error('waitForResolvers requires the RouterTweaksModule to be imported');
    }
    return resolverCompleted$;
}
