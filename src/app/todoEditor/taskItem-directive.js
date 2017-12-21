
    
    angular.module('app').directive('taskItem',['uuid',function (uuid){
    
        return { 
        restric : "E",
        scope : {
            update :"&",
            aTaskItem : "<"
        },
        templateUrl: "src/app/todoEditor/taskItem-partial.html",
        link: function ($scope, $element, $attr) {
            

            $scope.taskItem = {};

            $scope.name = "";
            $scope.description = "";
            $scope.theurl="";
            var validUrl = "";
           
           $scope.$watch('aTaskItem', function () {
            
                if($scope.aTaskItem == undefined) {

                    return;
                }

                $scope.name = $scope.aTaskItem.name;
                $scope.description = $scope.aTaskItem.description;
                $scope.theurl = $scope.aTaskItem.url;
        
           });

           // watch for the url and save it in the validUrl variable.
           $scope.$watch('theurl', function () {

                if($scope.theurl === undefined) {

                    return ; 

                }else {

                    console.log('url : ',$scope.theurl );

                    validUrl = $scope.theurl;

                }

           });
           
           $scope.hideSave = false ;
            //when edit item button is clicked 
            $scope.updateHandler= function(){
                
                // if validUrl variable has a url save it with the item object 
            if(validUrl){
                $scope.update({data:{
                    
                    action : 'update' ,
                    id: $scope.aTaskItem.id,
                    name :$scope.name,
                    description :$scope.description,
                    url: validUrl
                }});
                
                 $scope.name ='';
                 $scope.description='';
                // if not , ignore the url entered
            }else { 
                $scope.update({data:{
                    
                    action : 'update' ,
                    id: $scope.aTaskItem.id,
                    name :$scope.name,
                    description :$scope.description,
                }});
                
                 $scope.name ='';
                 $scope.description='';
            }
            

            }

       
            
            
           
          

           
           
           
           
            

        }
        
        
    };
    
}]);
