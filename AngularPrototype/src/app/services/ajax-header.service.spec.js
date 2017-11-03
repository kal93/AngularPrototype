"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ajax_header_service_1 = require("./ajax-header.service");
describe('AjaxHeaderService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [ajax_header_service_1.AjaxHeaderService]
        });
    });
    it('should be created', testing_1.inject([ajax_header_service_1.AjaxHeaderService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=ajax-header.service.spec.js.map