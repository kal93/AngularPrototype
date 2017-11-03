"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var patient_list_service_1 = require("./patient-list.service");
describe('PatientListService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [patient_list_service_1.PatientListService]
        });
    });
    it('should be created', testing_1.inject([patient_list_service_1.PatientListService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=patient-list.service.spec.js.map