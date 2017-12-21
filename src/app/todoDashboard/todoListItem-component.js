


angular.module('app').component('todoListItem',{



   
    templateUrl: '/src/app/todoDashboard/todoListItem-partial.html',
    controller: [ function(){

        var ctrl = this;
        
        
         console.log('todo :',this.todo);


        ctrl.todo = {};

       
    

        ctrl.$onChanges = function (payload) {


            
            console.log(payload);

            if(payload.data != undefined) {

                ctrl.todo = payload.data.currentValue;
               

            }
           

        }

        ctrl.showFrame = function(url){
            console.log('showFrame is clicked', url);
            ctrl.url = url ;
        }

    }],

    bindings: {

        data :'<',
        completedLabel : '<',
        delete : '&',
        completed : '&',
        
        
    }


});