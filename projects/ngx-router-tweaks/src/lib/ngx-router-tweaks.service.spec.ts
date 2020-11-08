import { TestBed } from '@angular/core/testing';

import { NgxRouterTweaksService } from './ngx-router-tweaks.service';

describe('NgxRouterTweaksService', () => {
    let service: NgxRouterTweaksService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxRouterTweaksService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
