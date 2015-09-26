module.exports = function (grunt) {

    var appwww = 'cordovum/www/';

    grunt.initConfig({

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        devel: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
            Backbone : true,
            _ : true,
            define : true,
            require : true,
            $ : true,
            jQuery : true,
            JSONForm : true,
            console : true,
            module : true,
            App : true,
            hello : true,
            device : true,
            cordova : true
        }
      },
      files: {
        /*
         * Exclude some older libs plugins, and tests, for now
         */
        src: [ 'app/**/*.js', 
                '!app/js/libs/jquery.jscrollpane.js', '!app/js/libs/jquery.tinysort.js', '!app/js/libs/jsonform.js', '!app/js/libs/jsv.js',
                '!app/modules/**/test_*.js' ]
      },
    },

    /* Copy Built and Required files for App packaging */
    copy: {
        main: {
            files: [
                { src: 'app/css/*', dest: appwww, expand: true },
                { src: 'app/js/**', dest: appwww, expand: true },
                { src: 'app/img/**', dest: appwww, expand: true },
                { src: 'app/fonts/**', dest: appwww, expand: true },
                { src: 'app/app.html', dest: appwww, expand: true },
                { src: 'app/modules/**', dest: appwww, expand: true },
                { src: 'app/require.app.js', dest: appwww, expand: true },
                { src: 'bower_components/requirejs/require.js', dest: appwww, expand: true },
                { src: 'bower_components/requirejs-text/text.js', dest: appwww, expand: true },
                { src: 'bower_components/backbone/backbone.js', dest: appwww, expand: true },
                { src: 'bower_components/jquery/jquery.js', dest: appwww, expand: true },
                { src: 'bower_components/underscore/underscore.js', dest: appwww, expand: true },
                { src: 'bower_components/fastclick/lib/fastclick.js', dest: appwww, expand: true },
                { src: 'bower_components/backbone/backbone.js', dest: appwww, expand: true },
                { src: 'bower_components/backbone.localstorage/backbone.localStorage.js', dest: appwww, expand: true },
                { src: 'bower_components/backbone.marionette/lib/backbone.marionette.js', dest: appwww, expand: true },
                { src: 'bower_components/bootstrap-sass/vendor/assets/**', dest: appwww, expand: true },
                { src: 'bower_components/requirejs-text/text.js', dest: appwww, expand: true },
                { src: 'bower_components/modernizr/modernizr.js', dest: appwww, expand: true },
                { src: 'bower_components/momentjs/moment.js', dest: appwww, expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.core.js', dest: appwww, expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.mouse.js', dest: appwww, expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.widget.js', dest: appwww, expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.draggable.js', dest: appwww, expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.droppable.js', dest: appwww, expand: true },
                { src: 'bower_components/font-awesome/css/font-awesome.css', dest: appwww, expand: true },
                { src: 'bower_components/font-awesome/fonts/*', dest: appwww, expand: true },
                { src: 'bower_components/leaflet-dist/**', dest: appwww, expand: true },
                { src: 'bower_components/leaflet.markerclusterer/dist/**', dest: appwww, expand: true },
                { src: 'bower_components/hello/dist/hello.all.js', dest: appwww, expand: true },
                { src: 'bower_components/imgcache.js/js/imgcache.js', dest: appwww, expand: true },
                { src: 'bower_components/jscrollpane/style/jquery.jscrollpane.css', dest: appwww, expand: true },
                { src: 'bower_components/jscrollpane/themes/lozenge/style/jquery.jscrollpane.lozenge.css', dest: appwww, expand: true },
                { src: 'bower_components/jasmine/lib/jasmine-core/*.js', dest: appwww, expand: true },
                { src: 'bower_components/jasmine/lib/jasmine-core/jasmine.css', dest: appwww, expand: true },
                { src: 'bower_components/hammerjs/hammer.js', dest: appwww, expand: true },
                { src: 'app/jasmine.html', dest: appwww, expand: true },
                { src: 'app/require.jasmine.js', dest: appwww, expand: true },
                { src: 'app/tests/**', dest: appwww, expand: true },
            ]
        }
    },
    /*
     * Build Out Cordova Instance
     */
    cordovacli: {
        options: {
            path: appwww
        },        
        cordova: {
            options: {
                command: ['prepare'],
            }
        },
        build: {
            options: {
                command: ['build'],
            }
        },
        create: {
            options: {
                path: 'cordovum',
                command: 'create',
                id: '<%= appBundle %>',
                name: '<%= _.slugify(appName) %>'
            }
        },
        add_platforms: {
            options: {
                command: 'platform',
                action: 'add',
                platforms: ['ios', 'android', 'browser']
            }
        },
        add_plugins: {
        options: {
            command: 'plugin',
            action: 'add',
            plugins: [
                'file',
            ]
        }
    },
    },
    // Web server to test against
    connect: {
        test : {
            options : {
                port : 8001,
                base : ''
            }
        }
    },
    // Test requires and their specs
    jasmine: {
        options : {
          '--web-security' : false,
          '--local-to-remote-url-access' : true,
          '--ignore-ssl-errors' : true
        },
        all: {
            src: [ 'jquery','underscore', 'home' ],
            options: {
                keepRunner: true,
                specs: ['app/**/test_*.js'],
                host : 'http://127.0.0.1:8001/',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: [ 'app/require.app.js', 'app/require.jasmine.js' ]
                }
            }
        }
    },
    // Sass compile
    sass: {
        dist: {
            files: {
                'app/css/app.css' : 'app/scss/app.scss'
            }
        }
    },
    watch: {
        files: ['app/**', '*.js', 'cordovum/config.xml', '!app/css/**'],
        tasks: ['cordova'],
        options: {
            livereload: true,
        },
    },
    clean: {
        prep: {
                src: ["cordovum/platforms/ios/www/**", "cordovum/platforms/android/assets/www/**"],
                force: true
            },
        once: ["cordovum/www/*", "!cordovum/www/app", "!cordovum/www/bower_components"],
        twice: ["cordovum/www/*", "!cordovum/www/bower_components"],
        all: ["cordovum/www/*"]
    },
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-cordovacli');

/* Jasmine test  */
grunt.registerTask('test', [ 'jshint', 'sass', 'connect', 'jasmine' ]);
/* SPA build test and push task */
grunt.registerTask('default', [ 'jshint', 'sass', 'connect', 'jasmine', 'copy' ]);
/* Task to build device packages */
grunt.registerTask('cordova', [ 'clean:prep', 'jshint', 'sass', 'copy', 'cordovacli:cordova' ]);
/* Task to rebuild device packages */
grunt.registerTask('release', [ 'clean:all', 'sass', 'copy', 'cordovacli:cordova', 'cordovacli:build' ]);
/* Initial Setup Task - Create Cordova App and add ios and android */
grunt.registerTask('setup', [ 'cordovacli:create', 'cordovacli:add_platforms' ]);

};
