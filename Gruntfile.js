'use strict';

//  Grunt Module
module.exports = function(grunt) {

	// Time it!
	require('time-grunt')(grunt);

    require('load-grunt-tasks')(grunt);
	
	// Configuration
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['src/app/**/*.js'],
                tasks: []
            },

            html: {
                files: ['src/app/**/*.html'],
                tasks: []
            },

			gruntfile: {
			  	files: ['Gruntfile.js']
			}
        },

        // Browser Sync Config
        browserSync: {
            dev: {
                bsFiles: {
                    // Refresh on these changes...
                    src: [
                        'src/**/*.js',
                        'src/**/*.html'
                    ]
                },
                options: {
                    server: {
                        baseDir: './',
                        middleware: function (req, res, next) {

                            if(req.url.indexOf('/editor') == 0) {

                                req.url = "/index.html";

                            }

                            if(req.url.indexOf('/todos') == 0) {

                                req.url = "/index.html";

                            }
                            if(req.url.indexOf('/editor/:todoid') == 0) {
                                
                                req.url = "/index.html";

                            }
                           
                           

                            res.setHeader('Access-Control-Allow-Origin', '*');
                            next();
                        }
                    },
                    watchTask: true,
                    browser: "google chrome"
                }
            },
            // prod: {
            //     bsFiles: {
            //         // Refresh on these changes...
            //         dist: [
            //             'dist/*.min.js',
            //             'dist/*.html'
            //         ]
            //     },
            //     options: {
            //         server: {
            //             baseDir: './',
            //             middleware: function (req, res, next) {
            //                 res.setHeader('Access-Control-Allow-Origin', '*');
            //                 next();
            //             }
            //         },
            //         watchTask: true,
            //         browser: "google chrome"
            //     }
            // }
        },

        jshint: {
            jsFiles: ['src/**/*.js']                             
        },
        concat: {
            js: {
                files: {'dist/bundle.js': 'src/**/*.js'}
            },
            css:{
                files:{'dist/bundle.css': 'src/**/*.css'}
            },
            html:{
                files:{'dist/bundle.html': 'src/**/*.html'}
            }
        },
        uglify: {
            bundle: {
                files: {'dist/bundle.min.js': 'dist/bundle.js'}
            }
        },
        // cssmin: {
        //     options: {
        //       processImport : false,
        //       mergeIntoShorthands: false,
        //       roundingPrecision: -1
              
              
        //     },
        //     target: {
        //       files: {
        //         'dist/bundle.min.css': 'dist/bundle.css'
        //       }
        //     }
        //   },
        removelogging: {
            dist: {
              // Clean up all js file inside "dist" or its subfolders
              src: "dist/*.js",
            }
          }

        

	});

	// Load Tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-remove-logging");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
   
	// Task(s).
    grunt.registerTask('dev', [
        'browserSync',
        'watch',
        //'jshint:jsFiles',

        
    ]);
    // grunt.registerTask('prod', [
    //     'browserSync',
    //     'watch'

        
    // ]);
    
    grunt.registerTask('build', [
        
        //'jshint:jsFiles',
        'removelogging'  ,  
        'concat',
        'uglify:bundle'
        //,
        //'cssmin'
        
        
    ]);
    
    
};

