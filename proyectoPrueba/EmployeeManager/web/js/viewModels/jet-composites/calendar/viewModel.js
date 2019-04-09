
define(['knockout', 'ojs/ojknockout', 'ojs/ojavatar'],
  function (ko) {
    function model (context){
        var self = this;

        self.composite = context.element;
        self.properties = context.properties;

        $(
                
            function(){
                function c(){
                    debugger
                    printDaysOfTheWeek();
                    var daysOfTheMonth=getDaysOfTheMonth();
                    var r=0;
                    var outOfMonth=false;
                    content_container.empty();
                    /*
                     * Esta sección del código se encarga de la impresión de los contenedores que contienen los días de la semana.
                     * En primer lugar, imprime los días no correspondientes al mes por la izquierda. Es decir, si el mes de abril empieza en
                     * Jueves día 1, el bucle while imprimirá los días Lunes 29,Martes 30 y Miercoles 31 de marzo como cuadrados en gris.
                     */
                    while(!outOfMonth){
                        if(daysOfTheWeek[r]==daysOfTheMonth[0].weekday)
                            {outOfMonth=true}
                        else{
                            content_container.append('<div class="blank"></div>');
                            r++}
                    }
                    /*
                     * Este bucle se encarga de la impresión del resto de días.
                     * Toma como valor máximo 42 ya que sería el número mínimo de celdas necesario para cubrir el supuesto de que un mes de
                     * máxima longitud(31 días) empezará el día de la semana más tardío(domingo).
                     * 
                     */
                    for(var c=0;c<42-r;c++){
                        //Rellena con celdas en blanco los huecos restantes
                        if(c>=daysOfTheMonth.length){
                            content_container.append('<div class="blank"></div>')
                        }
                        /*
                         * 
                         * Imprime el resto de días de la semana.
                         * Comprueba el día de hoy y le agrega la clase "Today"
                         */
                        else{
                            var v=daysOfTheMonth[c].day;
                            var m="";
                            if(checkToday(new Date(currentYear,currentMonth-1,v)))m='<div class="today';
                            let workerName=checkVacationDay(new Date(currentYear,currentMonth-1,v),self.properties.employees);
                            if(workerName){
                                    if(m) m+=' vacation">';
                                    else m='<div class="vacation">';
                                }
                                else{
                                    if(!m) m="<div>";
                                    else m+='">';
                                }
                            content_container.append(m+""+"<span>"+v+"</span>"+"</div>");
                            for(let worker of self.properties.employees){
                                if(checkEmployeeVacation(new Date(currentYear,currentMonth-1,v),worker)){
                                    content_container.find(".vacation").append('<div class="'+worker.name+'"></div>')     
                                }
                        }
                        content_container.find(".vacation").addClass('checked').removeClass('vacation');
                        }
                    }

                    var y=coloursArray[currentMonth-1];
                    header_container.css("background-color",y).find("h1").text(monthsOfTheYear[currentMonth-1]+" "+currentYear);
                    weekdays_container.find("div").css("color",y);
                    content_container.find(".today").css({"color":"goldenrod"});

                    for(let worker of self.properties.employees){
                        content_container.find("."+worker.name).css({"background-color":worker.color,"position":"relative","display":"inline-block","float":"left","max-height":"100%","max-width":"100%"});
                    }

                    adjustSize();
                }
                /**
                 * Función que devuelve un array que contiene todos los días del mes actual.
                 * Dentro de cada posición del array se almacena un JSON que contiene el día del mes y su día de la semana correspondiente
                 * Por ejemplo, para abril de 2019, la primera posición del array contendrá el siguiente json
                 * {
                 *  day:1
                 *  weekday:"Monday"
                 * } 
                 * 
                 * @returns {Array}
                 */
                function getDaysOfTheMonth(){
                    var daysOfTheMonth=[];
                    for(var r=1;r<getNumDaysOfTheMonth(currentYear,currentMonth)+1;r++){
                        if(getDayOfTheWeek(currentYear,currentMonth,r)>0)
                            daysOfTheMonth.push({day:r,weekday:daysOfTheWeek[getDayOfTheWeek(currentYear,currentMonth,r)-1]})
                        else
                            daysOfTheMonth.push({day:r,weekday:daysOfTheWeek[6]})
                    }
                    return daysOfTheMonth
                }
                /**
                 * 
                 * Imprime las 3 primeras letras de los días de la semana en la parte superior del calendario.
                 */
                function printDaysOfTheWeek(){
                    weekdays_container.empty();
                    for(var e=0;e<7;e++){
                        weekdays_container.append("<div>"+daysOfTheWeek[e].substring(0,3)+"</div>")
                    }
                }
                function adjustSize(){

                    var t;
                    var n=$("#calendar").css("width",e+"px");
                    n.find(t="#calendar_weekdays, #calendar_content").css("width",e+"px").find("div").css({width:e/7+"px",height:e/7+"px","line-height":e/7+"px"});
                    n.find("#calendar_header").css({height:e*(1/7)+"px"}).find('i[class^="icon-chevron"]').css("line-height",e*(1/7)+"px")
                    //n.find(".checked").children().css({"width":"50%"})
                    for(let hijo of n.find(".checked")){
                        let childrenDiv=hijo.getElementsByTagName("div");
                        for(let div of childrenDiv){
                            div.style.height=100/(hijo.children.length-1)+"%";
                        }
                    }
                }
                /**
                 * Función que devuelve el número de días del mes solicitado en el año indicado. Esto quiere decir, que dependiendo si el año indicado
                 * es bisiesto o no, al indicar Febrero como mes(2) este devolverá 28 o 29 según corresponda.
                 * 
                 * @param {int} year ->Año actual
                 * @param {int} month -> Mes actual
                 * @returns {Number} ->Devuelve el número de días correspondientes al mes y al año pasados como parámetro.
                 */
                function getNumDaysOfTheMonth(year,month){
                    return(new Date(year,month,0)).getDate()
                }
                /**
                 * Función que devuelve el día de la semana correspondiente al día de la fecha introducida. Por ejemplo, si se introduce la fecha
                 * 4 de abril de 2019 (2019,4,4), que es Jueves, la función devolverá un 4 ya que es el cuarto día de la semana siguiendo el orden:
                 * Lunes-1;Martes-2;Miercoles-3;Jueves-4;Viernes-5;Sabado-6;Domingo-7;
                 * 
                 * @param {type} year 
                 * @param {type} month
                 * @param {type} day
                 * @returns {Number} Día de la semana correspondiente
                 */
                function getDayOfTheWeek(year,month,day){
                    return(new Date(year,month-1,day)).getDay()
                }
                /**
                 * Comprueba si la fecha introducida como parámetro es la fecha actual
                 * @param {type} date -> fecha que se quiere comprobar 
                 * @returns {Boolean} -> Si la fecha introducida es la del día de hoy, devolverá true. En caso contrario devolverá false.
                 */
                function checkToday(date){
                    return formatDate(new Date)==formatDate(date)
                }

                function checkVacationDay(date,employees){

                    for(let worker of employees){
                            for(let day of worker.days){
                                if(formatDate(date)==day) return worker.name;
                            }

                    }
                    return false;

                }
                function checkEmployeeVacation(date,employee){
                    for(let day of employee.days){
                        if(formatDate(date)==day) return true;
                    }
                    return false;
                }
                /**
                 * Pasa un objeto date a un string con el formato yyyy/mm/dd
                 * 
                 * @param {type} date -> fecha que se quiere formatear
                 * @returns {String} -> string de la fecha en formato yyyy/mm/dd
                 */
                function formatDate(date){
                    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()
                }
                /**
                 * 
                 * Función que inicializa el mes y el año actuales(recogidos del sistema).
                 */
                function init_currentDate(){
                    var currentDate=new Date;
                    currentYear=currentDate.getFullYear();
                    currentMonth=currentDate.getMonth()+1
                }
                var e=window.screen.width*0.9;
                var currentYear=2013;
                var currentMonth=9;
                var r=[];
                var monthsOfTheYear=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
                var daysOfTheWeek=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
                var coloursArray=["#16a085","#1abc9c","#c0392b","#27ae60","#FF6860","#f39c12","#f1c40f","#e67e22","#2ecc71","#e74c3c","#d35400","#2c3e50"];
                var u=$("#calendar");
                var header_container=u.find("#calendar_header");
                var weekdays_container=u.find("#calendar_weekdays");
                var content_container=u.find("#calendar_content");
                init_currentDate();
                c();
                console.log("esta funcionando");
                header_container.find('i[class^="icon-chevron"]').on("click",function(){
                    var e=$(this);
                    var r=function(e){
                        currentMonth=e=="next"?currentMonth+1:currentMonth-1;
                        if(currentMonth<1){currentMonth=12;currentYear--}
                        else if(currentMonth>12){currentMonth=1;currentYear++}
                        c()
                    };
                    if(e.attr("class").indexOf("left")!=-1){
                        r("previous")
                    }else{r("next")}
                })});
        }

    return model;
  }
)

