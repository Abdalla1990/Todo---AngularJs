
    angular.module('app').service('localstorageService', function () {
        console.log(' localStorage ',localStorage); 
            this.save = function(todos){
                console.log('in localStorage save');
                localStorage.setItem( 'todos', JSON.stringify(todos) );
                console.log(' localStorage ',localStorage); 
            };

            this.fetch = function(){
                
                var aPromise = new Promise(function(resolve,reject) {
                    
                    if (JSON.parse( localStorage.getItem( 'todos' ) ) )
                    {
                        return  resolve(JSON.parse( localStorage.getItem( 'todos' ) ));

                    }
                    else {
                        return  reject('[] empty data found');
                    }
                });

                return aPromise;
            };
        
            
        });
