require.config({
  baseUrl: '../',
  urlArgs: 'cb=' + Math.random(),
  paths: {
    config          : 'app/js/libs/config',
    jasmine         : 'bower_components/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html'  : 'bower_components/jasmine/lib/jasmine-core/jasmine-html',
  },
  shim: {
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});

require(['require.app'], function(){
  require(['jasmine', 'jasmine-html'], function(jasmine){
   
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
   
    var htmlReporter = new jasmine.HtmlReporter();
   
    jasmineEnv.addReporter(htmlReporter);
   
    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };
   
    var specs = [];
   
    specs.push('app/modules/home/test_home');
/*** Yeoman Placeholder ***/
   
    $(function(){
      require(specs, function(){
        jasmineEnv.execute();
      });
    });
   
  });
});