// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    allScriptsTimeout: 100000,
    params: require('./e2e/TestData.json'),
    specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
    capabilities: {
      'browserName': 'chrome'
    },
    directConnect: true,

    //capabilities:{
    //        seleniumAddress: 'http://localhost:5555/',
    //        'browserName': 'internet explorer',            
    //        'platform': 'windows 10',
    //        'version': '11',
    //        'ignoreProtectedModeSettings': true,
    //        },

      baseUrl: 'http://sqivf-test/PatientInquiryPrototype/#/login',
      framework: 'jasmine',
      jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function() {}
      },
      onPrepare() {
        require('ts-node').register({
          project: 'e2e/tsconfig.e2e.json'
        });
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
            savePath: './test/reports/',
            screenshotsFolder: 'images',
            takeScreenshots: true,
            cleanDestination: false,
            fileNameDateSuffix: true,
        })
      );
      }
};
 