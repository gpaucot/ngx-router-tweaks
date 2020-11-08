import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxRouterTweaksModule } from 'ngx-router-tweaks';
import { Router } from '@angular/router';

describe('resolvers', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), NgxRouterTweaksModule],
        }).compileComponents();
    });

    it('should create a simple resolver', () => {
        const r: Router = TestBed.inject(Router);

        expect(r).toBeTruthy();
    });
});
