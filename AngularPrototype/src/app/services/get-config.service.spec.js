"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var get_config_service_1 = require("./get-config.service");
describe('GetConfigService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [get_config_service_1.GetConfigService]
        });
    });
    it('should be created', testing_1.inject([get_config_service_1.GetConfigService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=get-config.service.spec.js.map