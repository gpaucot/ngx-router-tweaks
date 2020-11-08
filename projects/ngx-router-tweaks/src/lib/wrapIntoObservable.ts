import {from, Observable, of} from "rxjs";
import {ɵisObservable as isObservable, ɵisPromise as isPromise} from "@angular/core";

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
