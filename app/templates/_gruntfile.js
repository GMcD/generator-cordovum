module.exports = function (grunt) {
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
        src: [ 'js/*.js' ]
      },
    },

    /* Copy Built and Required files for App packaging */
    copy: {
        main: {
            files: [
                { src: 'css/*', dest: '../www/', expand: true },
                { src: 'js/**', dest: '../www/', expand: true },
                { src: 'tpl/**', dest: '../www/', expand: true },
                { src: 'img/**', dest: '../www/', expand: true },
                { src: 'app.html', dest: '../www/', expand: true },
                { src: 'require.app.js', dest: '../www/', expand: true },
                { src: 'bower_components/requirejs/require.js', dest: '../www/', expand: true },
                { src: 'bower_components/requirejs-text/text.js', dest: '../www/', expand: true },
                { src: 'bower_components/backbone/backbone.js', dest: '../www/', expand: true },
                { src: 'bower_components/jquery/jquery.js', dest: '../www/', expand: true },
                { src: 'bower_components/underscore/underscore.js', dest: '../www/', expand: true },
                { src: 'bower_components/fastclick/lib/fastclick.js', dest: '../www/', expand: true },
                { src: 'bower_components/backbone/backbone.js', dest: '../www/', expand: true },
                { src: 'bower_components/backbone.localstorage/backbone.localStorage.js', dest: '../www/', expand: true },
                { src: 'bower_components/bootstrap-sass/js/modal.js', dest: '../www/', expand: true },
                { src: 'bower_components/requirejs-text/text.js', dest: '../www/', expand: true },
                { src: 'bower_components/modernizr/modernizr.js', dest: '../www/', expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.core.js', dest: '../www/', expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.mouse.js', dest: '../www/', expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.widget.js', dest: '../www/', expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.draggable.js', dest: '../www/', expand: true },
                { src: 'bower_components/jquery-ui/ui/jquery.ui.droppable.js', dest: '../www/', expand: true },
                { src: 'bower_components/font-awesome/css/font-awesome.css', dest: '../www/', expand: true },
                { src: 'bower_components/font-awesome/fonts/*', dest: '../www/', expand: true },
                { src: 'bower_components/jscrollpane/style/jquery.jscrollpane.css', dest: '../www/', expand: true },
                { src: 'bower_components/jscrollpane/themes/lozenge/style/jquery.jscrollpane.lozenge.css', dest: '../www/', expand: true },
            ]
        }
    },
    /*
     * Build Out Cordova Instance
     */
    cordovacli: {
        options: {
            path: '../www/'
        },        
        cordova: {
            options: {
                command: ['prepare', 'build'],
            }
        },
        create: {
            options: {
                path: '../',
                command: 'create',
                id: 'com.projectscapa.app',
                name: 'App'
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
                'css/app.css' : 'scss/app.scss'
            }
        }
    },
    watch: {
        files: ['scss/*'],
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
