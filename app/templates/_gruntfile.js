module.exports = function (grunt) {

    var app = '<%= _.slugify(appName) %>';
    var appwww = app + '/www/';

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
            module : true
        }
      },
      files: {
        src: [ app + '/js/*.js' ]
      },
    },

    /* Copy Built and Required files for App packaging */
    copy: {
        main: {
            files: [
                { src: app + '/css/*', dest: appwww, expand: true },
                { src: app + '/js/**', dest: appwww, expand: true },
                { src: app + '/tpl/**', dest: appwww, expand: true },
                { src: app + '/img/**', dest: appwww, expand: true },
                { src: app + '/fonts/**', dest: appwww, expand: true },
                { src: app + '/config.xml', dest: appwww, expand: true },
                { src: app + '/app.html', dest: appwww, expand: true },
                { src: app + '/require.app.js', dest: appwww, expand: true },
                { src: 'bower_components/requirejs/require.js', dest: appwww, expand: true },
                { src: 'bower_components/requirejs-text/text.js', dest: appwww, expand: true },
                { src: 'bower_components/backbone/backbone.js', dest: appwww, expand: true },
                { src: 'bower_components/jquery/jquery.js', dest: appwww, expand: true },
                { src: 'bower_components/underscore/underscore.js', dest: appwww, expand: true },
                { src: 'bower_components/fastclick/lib/fastclick.js', dest: appwww, expand: true },
                { src: 'bower_components/backbone/backbone.js', dest: appwww, expand: true },
                { src: 'bower_components/backbone.localstorage/backbone.localStorage.js', dest: appwww, expand: true },
                { src: 'bower_components/bootstrap-sass/js/modal.js', dest: appwww, expand: true },
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
                { src: 'bower_components/jscrollpane/style/jquery.jscrollpane.css', dest: appwww, expand: true },
                { src: 'bower_components/jscrollpane/themes/lozenge/style/jquery.jscrollpane.lozenge.css', dest: appwww, expand: true },
                { src: 'bower_components/jasmine/lib/jasmine-core/*.js', dest: appwww, expand: true },
                { src: 'bower_components/jasmine/lib/jasmine-core/jasmine.css', dest: appwww, expand: true },
                { src: app + '/jasmine.html', dest: appwww, expand: true },
                { src: app + '/require.jasmine.js', dest: appwww, expand: true },
                { src: app + '/tests/**', dest: appwww, expand: true },
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
                command: ['prepare', 'build'],
            }
        },
        create: {
            options: {
                path: app,
                command: 'create',
                id: '<%= appBundle %>',
                name: app
            }
        },
        add_platforms: {
            options: {
                command: 'platform',
                action: 'add',
                platforms: ['ios', 'android']
            }
        },
    },
    // Web server to test against
    connect: {
        test : {
            port : 8000,
            base : ''
        }
    },
    // Test requires and their specs
    jasmine: {
        all: {
            src: [ 'jquery','underscore', 'home' ],
            options: {
                keepRunner: false,
                specs: ['tests/*.js'],
                host : 'http://127.0.0.1:8000/',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: [ 'require.app.js', 'require.jasmine.js' ]
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
        files: ['app/scss/*'],
        tasks: ['sass'],
    },
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-cordovacli');

/* SPA build test and push task */
grunt.registerTask('default', [ 'jshint', 'sass', 'connect', 'jasmine', 'copy' ]);
/* Task to build device packages */
grunt.registerTask('cordova', [ 'sass', 'copy', 'cordovacli:cordova' ]);
/* Initial Setup Task - Create Cordova App and add ios and android */
grunt.registerTask('setup', [ 'cordovacli:create', 'cordovacli:add_platforms' ]);

};
