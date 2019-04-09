/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojdatagrid','ojs/ojarraydatagriddatasource','ojs/ojbutton',
  'ojs/ojpopup','ojs/ojinputtext','ojs/ojinputnumber','ojs/ojdatetimepicker','ojs/ojselectcombobox','ojs/ojtimezonedata','ojs/ojlabel',
  'ojs/ojfilepicker'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      var files;
      self.nomValue="Nombre";
      self.dateValue=ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2014, 1, 1)));
      self.puValue=2;
      self.nomEmpValue="Nombre del empleado";
      self.tituloValue="Puesto de trabajo";
      self.tlfValue=000000000;
      self.correoValue="empleado@motiva2.net";
      self.acceptStr = ko.observable("image/*");
      self.acceptArr = ko.pureComputed(function () {
          var accept = self.acceptStr();
          return accept ? accept.split(",") : [];
        }, self);
        self.fileNames = ko.observableArray([]);
      self.clickProducto = function(event){
        if(document.getElementById("formEmpleado").style.display="block"){
            document.getElementById("formEmpleado").style.display="none";
        }
        if(document.getElementById("formProducto").style.display="none"){
            document.getElementById("formProducto").style.display="block";
        }
    };
    self.clickEmpleado = function(event){
        if(document.getElementById("formProducto").style.display="block"){
            document.getElementById("formProducto").style.display="none";
        }
        if(document.getElementById("formEmpleado").style.display="none"){
            document.getElementById("formEmpleado").style.display="block";
        }
    };
    self.avatarListener = function (event) {
          files = event.detail.files;
          for (var i = 0; i < files.length; i++) {
            self.fileNames.pop();
            self.fileNames.push(files[i].name);
            
          }
        }
      self.submitListener = function (event)
      {
        var popup = document.getElementById('popup1');
        popup.open('submit');    
      };
      self.registerListener = function (event)
      {
        var popup = document.getElementById('popup2');
        popup.open('register');    
      };
      document.addEventListener("connect", function () {


    document.getElementById("submit").addEventListener("click", addItem);
    document.getElementById("register").addEventListener("click", addEmployee);
    function addItem() {

        let nombreValue = self.nomValue;
        let puValue = self.puValue;
        let fecfabValue = self.dateValue._latestValue;
        let todo = {
            nombre: nombreValue,
            pu: puValue,
            fecfab: fecfabValue
        };
        console.log(todo);
        fetch("http://172.1.0.112:3000/insertar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }
    function addEmployee() {

        let nombreValue = self.nomEmpValue;
        let tituloValue = self.tituloValue;
        let tlfValue = self.tlfValue;
        let correoValue = self.correoValue;
        let todo = {
            nombre: nombreValue,
            titulo: tituloValue,
            tlf: tlfValue,
            correo: correoValue
        };
        var input = document.querySelector('input[type="file"]');
        let data=new FormData();
        for(var name in todo) {
            data.append(name, todo[name]);
        }
        console.log(input.files);
        data.append('file',input.files[0]);
                for(var dato of data){console.log(dato)};

        fetch("http://172.1.0.112:3000/registrar", {
                method: 'POST',
                
                body: data
            }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

});
      // Below are a set of the ViewModel methods invoked by the oj-module component.
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
    return new DashboardViewModel();
  }
);
