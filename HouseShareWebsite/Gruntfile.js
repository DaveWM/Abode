
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        notify: {
            done: {
                options: {
                    message: 'Grunt Completed'
                }
            }
        },
        ngAnnotate: {
            all: {
                files: {
                    'Scripts/angular-combined.js': [
                        'Angular/**/*.js'
                    ]
                }
            }
        },
        uglify: {
            all: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    }
                    //beautify: true
                },
                files: {
                    'Scripts/combined-strict.js': [
                        "Scripts/jquery-*.js",
                        "!Scripts/jquery-*{intellisense,validate}.js",
                        "Scripts/toastr.js",
                        "Scripts/ajaxEndpoints.js",
                        "Scripts/bootstrap.js",
                        "Scripts/angular-file-upload-html5-shim.js",
                        "Scripts/angular.js",
                        "Scripts/angular-animate.js",
                        "Scripts/angular-touch.js",
                        "Scripts/angular-ui/ui-utils.js",
                        "Scripts/angular-ui/ui-bootstrap-tpls.js",
                        "Scripts/angular-ui-router.js",
                        "Scripts/angular-file-upload.js",
                        "Scripts/bootflat/*.js",
                        "Scripts/angular-local-storage.js",
                        "Scripts/angular-breakpoint.js",
                        "Scripts/jquery.signalR-2.1.1.min.js",
                        "Scripts/hammer.js",
                        "Scripts/angular-hammer.js",
                        'Scripts/angular-combined.js'
                    ]
                }
            }
        },
        lenient: {
            src: 'Scripts/combined-strict.js',
            dest: 'Scripts/combined.js'
        },
        cssmin: {
            all: {
                files: {
                    "Content/combined.css": [
                        "Content/*.css",
                        "!Content/*.min.css",
                        "!Content/combined.css",
                        "Content/bootstrap/bootstrap.css",
                        "Content/bootflat/css/bootflat.css"
                    ]
                }
            }
        },
        zip: {
            all: {
                src: ['Scripts/combined.js', "Content/combined.css", "Angular/Views/**/*.html", 'Phonegap/*', 'Views/App/Index.cshtml', 'Content/images/*'],
                dest: 'Phonegap.zip',
                router: function(filepath) {
                    if (filepath.indexOf('Phonegap/') >= 0) {
                        filepath = filepath.replace('Phonegap/', '');
                    }
                    else if (filepath == 'Views/App/Index.cshtml') {
                        filepath = "index.html";
                    }

                    return filepath;
                }
            }
        },
        "phonegap-build": {
            build: {
                options: {
                    archive: "Phonegap.zip",
                    appId: 1041904,
                    user: {
                        token: 'vx-SxN67RuqSjxt956u-'
                    },
                    pollRate: 5,
                    download: {
                        android: 'dist/android.apk',
                        winphone: 'dist/wp.xap' 
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-lenient');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('Release', ['ngAnnotate', 'uglify', 'cssmin', 'lenient', 'zip']);
    grunt.registerTask('Release_Test', ['ngAnnotate', 'uglify', 'cssmin', 'lenient', 'zip']);
    grunt.registerTask('Phonegap', ['ngAnnotate', 'uglify', 'cssmin', 'lenient', 'zip', 'phonegap-build', 'notify:done']);
    grunt.registerTask('Debug', []);
}



