Add Marionette Module
=====================

Automatic
---------

* Create 'Module' folder under app/
* Create _module.scss under app/Module/
* Add ../module/_module.scss to app.scss
* Create module.js under app/Module/
* Add app/module to require.app.js
* Add module/module to app.js 
* Add module:show Listener to App
* Add moduleLayout.html to app/Module

* Add module:show Trigger to Menu
* Add { src: 'app/manage/**', dest: appwww, expand: true }, to Gruntfile

Manual
------

* Create Model in module/module.js
