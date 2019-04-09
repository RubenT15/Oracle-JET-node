/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojknockout','ojs/ojdatagrid','ojs/ojarraydatagriddatasource'],
 function(oj, ko, $) {
  
    function CustomerViewModel() {
      var self = this;
      var dataArray;
      self.columnHeaderStyle = function(headerContext) 
        {
            var column = headerContext['key'];
            if (column === '3')
            {
                return 'width:180px;';
            }
            return 'width:160px;';
        };
      function cargarDatos(){
          fetch("http://localhost:3000/data?opc=1",{
          
            header: {
              'Access-Control-Allow-Origin':'*'
            }
      }) // Call the fetch function passing the url of the API as a parameter
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log(document.getElementById("datagrid"));
                newData = new oj.ArrayDataGridDataSource(data);
                document.getElementById("datagrid").data=newData;
                
    })
            .catch(function() {
                console.log("Error");
            });
    }
      document.addEventListener("connect", function () {
      dataArray = [];
        cargarDatos();
        
       
        self.dataSource = new oj.ArrayDataGridDataSource(dataArray);
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
    return new CustomerViewModel();
  }
);
