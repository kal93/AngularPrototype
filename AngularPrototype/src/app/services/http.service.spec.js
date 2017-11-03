"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var http_service_1 = require("./http.service");
describe('HttpService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [http_service_1.HttpService]
        });
    });
    it('should be created', testing_1.inject([http_service_1.HttpService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=http.service.spec.js.map