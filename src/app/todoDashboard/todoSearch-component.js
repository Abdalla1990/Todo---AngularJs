


angular.module('app').directive('todoSearch',['todoListApi',function(todoListApi){
    
            
    return{
        restric : "E",
       scope:{
        filter : "&"
       },
        templateUrl: '/src/app/todoDashboard/todoSearch-partial.html' ,
        link: function ($scope, $element, $attr) {
           
            var filterSelected = ''
            $scope.$watch('search', function () {
                
                    if($scope.search == undefined) {
    
                        return;
                    }
    
                    var filter = {
                        text : $scope.search,
                        selectedFilter : filterSelected
                    }
                    $scope.filter({filter:filter});
    
            
               });

               $scope.setFilter= function(selectedFilter){

                console.log('set filter : ', selectedFilter);

                filterSelected = selectedFilter ;
                var filter = {
                    selectedFilter : filterSelected
                }
                $scope.filter({filter:filter});
               }
           
            //    $scope.sendSearch = function(searchText){
            //     console.log('sendSearch',searchText);
            //     var filter = {
            //         text : searchText
            //     }
            //     $scope.filterTodos(filter);
            //    }
              
         }     
        


    }
   
       
        
    
        
    
    }]);