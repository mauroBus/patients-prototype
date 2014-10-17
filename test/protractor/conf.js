// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['patientsHomePageSpec.js'],
  capabilities: {
  	browserName: 'chrome'
  },
  onPrepare: function() {
        browser.driver.manage().window().maximize();
    },
   jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
    isVerbose: true
  }
}