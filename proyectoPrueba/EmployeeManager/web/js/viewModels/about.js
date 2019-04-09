/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
var aboutModel=define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojknockout','ojs/ojcomposite', 'viewModels/jet-composites/demo-card/loader'],
 function(oj, ko, $) {
  
    function AboutViewModel() {
      var self = this;
      self.employees=ko.observable();
      
      function cargarDatos(){
          fetch("http://localhost:3000/data?opc=2",{
          
            header: {
              'Access-Control-Allow-Origin':'*'
            }
      }) // Call the fetch function passing the url of the API as a parameter
            .then(res => res.json())
            .then(data => {
                for(let empleado of data){
                    empleado.name=empleado[0];
                    delete empleado[0];
                    if(empleado[1]!=null){
                    empleado.avatar="http://localhost:8080/"+empleado[1];
                    delete empleado[1];
                }else{
                    empleado.avatar=empleado[1];
                    delete empleado[1];
                }
                    empleado.title=empleado[2];
                    delete empleado[2];
                    empleado.work=empleado[3];
                    delete empleado[3];
                    empleado.email=empleado[4];
                    delete empleado[4];
                    
                }
                console.log(data);
                self.employees(data);
                console.log("Empleados despues de recibir la peticion");
                console.log(self.employees);

           
    })
            .catch(function() {
                console.log("Error del fetch");
            });
    }
      document.addEventListener("connect", function () {
        cargarDatos();
        
       
    });
    
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        document.dispatchEvent(new Event("connect"));
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }
   
    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);

