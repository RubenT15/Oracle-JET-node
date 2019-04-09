/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojbutton','ojs/ojknockout', 
  'viewModels/jet-composites/calendar/loader','ojs/ojlegend'],
 function(oj, ko, $) {
  
  
    function IncidentsViewModel() {
      var self = this;
      self.data=[
    {
        name:"Ruben_Garcia_Tercero",
        days:[
            "2019/4/15",
            "2019/4/16",
            "2019/4/17",
            "2019/4/18",
            "2019/4/19",
            "2019/4/22"
        ],
        color:"#16a085"
    },
    {
        name:"David_Gonzalez",
        days:[
            "2019/4/15",
            "2019/4/23",
            "2019/4/24"
        ],
        color:"#1abc9c"
    },
    {
        name:"Andres",
        days:[
            "2019/4/15",
            "2019/4/23",
            "2019/4/24"
        ],
        color:"#27ae60"
    },
    {
        name:"Pepe_Perez",
        days:[
            "2019/4/15",
            "2019/4/23",
            "2019/4/24"
        ],
        color:"#e67e22"
    }
    
];
let legendItems=[{items: []}]

for(let employee of self.data){
    legendItems[0].items.push({text:employee.name,color:employee.color,markerShape:"square"});
}
this.legendSections = ko.observableArray(legendItems);
      document.addEventListener("connect",function(){
          document.dispatchEvent(new Event("displayCalendar"));
      })
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
    return new IncidentsViewModel();
  }
);
