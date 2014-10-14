// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['patientsHomePageSpec.js'],
  capabilities: {
  	browserName: 'chrome'
  }
}