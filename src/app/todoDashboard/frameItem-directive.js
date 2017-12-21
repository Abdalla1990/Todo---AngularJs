
    
    angular.module('app').directive('frameItem', [ '$sce',function ($sce){
        
            return { 
            restric : "E",
            scope : {
               data : '<'
            },
            templateUrl: "src/app/todoDashboard/frameItem-partial.html",
            link: function ($scope, $element, $attr) {
                
                console.log(' i am in frame controller');
               
                $scope.url ="";
    
                
               
               $scope.$watch('data', function () {
                
                    if($scope.data == undefined) {
    
                        return;
                    }

                    
                 // $scope.data = $sce.trustAsResourceUrl("https://www.google.com")+ "&output=embed";
                    console.log('data in frame is : ', $scope.data);
                    $scope.url = $sce.trustAsResourceUrl($scope.data);
                    
                    console.log('my url : ', $scope.url.toString());
                   
            
               });
    
               
               
               
    
           
                
                
               
              
    
               
               
               
               
                
    
            }
            
            
        };
        
    }]);
    