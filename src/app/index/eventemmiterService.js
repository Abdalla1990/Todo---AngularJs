(function(){

    angular.module('app').service('eventemmiterService', function(){
        
        this.emit = function(eventName,$scope,item){
            console.log('I am here : in emit the event is : ', eventName);
            $scope.$emit(eventName, {item:item});
        };

        this.broadcast = function(eventName,$scope){
            if(eventName === 'itemUpdateDone'){
                $scope.$broadcast(eventName, {update:'done'});
            }
           
        };
        this.on = function(eventName,$scope){
            if(eventName === 'itemUpdateDone'){
                $scope.$on(eventName, function(event,args){
                    if(args.update === 'done'){
                        $scope.itemsExisting = false;
                        $scope.name = '' ;
                        $scope.description = '';
                    }});
            }
            else if(eventName === 'editItem'){
                    $scope.$on(eventName, function(event,args){
                        console.log('i received an event : ', args);
                        console.log('scope.todos : ', $scope.todos);
                       if($scope.todos.length !== 0){
                        $scope.todos.filter(function(todo,index){
                            todo.items.filter(function(item,index){
            
                                console.log('the item id : ', item.id);
                                console.log('the arg.item id : ', args.item.id);
                                if(item.id === args.item.id){
                                    console.log('i found it', item.name , 'is changed to : ', args.item.name);
                                    console.log('i found it', item.description , 'is changed to : ', args.item.description);
                                    item.name = args.item.name ;
                                    item.description = args.item.description;
                                    return item ;
                                }
                                return item ;
                            });
            
                            
                            $scope.$broadcast('itemUpdateDone', {update:'done'});
                            return todo ;
                        });
                        console.log('change has been done ! : ', $scope.todos );
                       }else{
                          
                        $scope.items.filter(function(item,index){
                            
                            console.log('the item id : ', item.id);
                            console.log('the arg.item id : ', args.item.id);
                            if(item.id === args.item.id){
                                console.log('i found it', item.name , 'is changed to : ', args.item.name);
                                console.log('i found it', item.description , 'is changed to : ', args.item.description);
                                item.name = args.item.name ;
                                item.description = args.item.description;
                                return item ;
                            }
                            return item ;
                            });

                            $scope.$broadcast('itemUpdateDone', {update:'done'});
                       }
                       
                    });
                }
            
        };

        });

})();


