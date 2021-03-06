$(document).ready(function() {
   $('select').material_select();
 });

 $(document).ready(function() {
   $('select').material_select();
 });

 $(document).ready(function(){
   // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
   $('.modal').modal();
 });

 $(document).ready(function(){
   $('.tooltipped').tooltip({delay: 50});
 });

 $(document).ready(function(){
  $('ul.tabs').tabs();
});

$(document).ready(function(){
  $('ul.tabs').tabs('select_tab', 'tab_id');
});

var prod_rate = [4 , 7 , 13 , 25 , 50 ]
var prec = [ 6.20 , 4.96 , 3.27 , 2.48 , 1.24 , 0]
var flex = [5.07 , 4.05 , 3.04 , 2.03 , 2.03 , 0 ]
var risk = [7.07 , 5.65 , 4.24 , 2.83 , 1.41 , 0 ]
var team = [5.48  , 4.38 , 3.29 , 2.19 , 1.10 , 0]
var matu = [7.80 , 6.24 , 4.68 , 3.12 , 1.56 , 0]

var B = 1.17;
var A = 2.94;
var AP = 0;

function add_component(){
  AP += 10 * parseInt(document.getElementById("components").value);
  console.log(AP);
  document.getElementById("ap").innerHTML = "AP = "+AP;
}

function add_screen(){
  var screen_num = parseInt(document.getElementById("screen_num").value);
  var screen_server = parseInt(document.getElementById("screen_server").value);
  var screen_client = parseInt(document.getElementById("screen_client").value);

    if(screen_num < 3){
      if(screen_server > 3 && screen_client > 5){
        AP += 2
      }
      else {
          AP += 1
      }
    }
    else if(screen_num < 8){
      if(screen_server < 2 && screen_client < 2){
        AP += 1
      }
      else if(screen_server < 4 && screen_client < 6) {
          AP += 2
      }
      else {
        AP += 3
      }
    }
    else{
      if(screen_server < 2 && screen_client < 2){
        AP += 2
      }
      else {
        AP += 3
      }
    }
    document.getElementById("screen_num").value = 0
    document.getElementById("screen_server").value = 0
    document.getElementById("screen_client").value = 0
    console.log(AP);
    document.getElementById("ap").innerHTML = "AP = "+AP;

}


function add_report(){
  var report_num = parseInt(document.getElementById("report_num").value);
  var report_server = parseInt(document.getElementById("report_server").value);
  var report_client = parseInt(document.getElementById("report_client").value);

    if(report_num < 2){
      if(report_server > 3 && report_client > 5){
        AP += 5
      }
      else {
          AP += 2
      }
    }
    else if(report_num < 4){
      if(report_server < 2 && report_client < 2){
        AP += 2
      }
      else if(report_server < 4 && report_client < 6) {
          AP += 5
      }
      else {
        AP += 8
      }
    }
    else{
      if(report_server < 2 && report_client < 2){
        AP += 5
      }
      else {
        AP += 8
      }
    }
    document.getElementById("report_num").value = 0
    document.getElementById("report_server").value = 0
    document.getElementById("report_client").value = 0
    console.log(AP);
    document.getElementById("ap").innerHTML = "AP = "+AP;

}



function calculate_AP(){
    var NAP = Math.ceil( AP * ((100-document.getElementById("reuse_components").value)/100));
    var effort = Math.ceil( NAP/prod_rate[document.getElementById("prod").value]);
    var time = Math.ceil( 3 * Math.pow(effort , (0.33 + 0.2 * (B - 1.01))));
    var people = Math.ceil(effort / time );

    var temp = `
    <div class="row">
           <div class="col s12 m1"></div>
           <div class="col s12 m10">
                  <table >
                   <thead>
                     <tr>
                         <th>Name</th>
                         <th>Value</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td>Application Point (AP)</td>
                       <td>`+AP+` </td>
                     </tr>
                     <tr>
                       <td>New Application Point (NAP)</td>
                       <td>`+NAP+` OPs</td>
                     </tr>
                     <tr>
                       <td>Person Monthes (Effort)</td>
                       <td>`+effort+` PM</td>
                     </tr>
                     <tr>
                       <td>Productivity</td>
                       <td>`+prod_rate[document.getElementById("prod").value]+` DSI/MM</td>
                     </tr>
                     <tr>
                       <td>Average Staffing (People)</td>
                       <td>`+people+` Person/s</td>
                     </tr>
                     <tr>
                       <td>Time</td>
                       <td>`+time+` Monthes</td>
                     </tr>
                   </tbody>
                 </table>
            </div>
     </div>
    `
    document.getElementById("result").innerHTML = temp;
    console.log(AP);
    console.log(NAP);
    console.log(effort);
    console.log(time);
    console.log(people);
    console.log(B);
}

function calculate_B(){
  B = 0.91 + ((
          prec[document.getElementById("prec").value]
        + flex[document.getElementById("flex").value]
        + risk[document.getElementById("risk").value]
        + team[document.getElementById("team").value]
        + matu[document.getElementById("matu").value]
  )/100);
  console.log(B);
}


var RCPX = [0.73 , 0.81 ,  0.98 , 1.0 , 1.30 , 1.74 , 2.38]
var RUSE = [1 , 1 , 0.95 , 1.0 , 1.07 , 1.15 , 1.24]
var PDIF = [1 , 1 , 0.87 , 1.0 , 1.29 , 1.81 , 2.61]
var PERS = [2.12 , 1.62 , 1.26 , 1.0 , 0.83 , 0.63 , 0.50]
var PREX = [1.59 , 1.33 , 1.12 , 1.0 , 0.87 , 0.71 , 0.62]
var FCIL = [1.43 , 1.30 , 1.10 , 1.0 , 0.87 , 0.73 , 0.62 ]
var SCED = [1 , 1.43 , 1.14 , 1.0 , 1.0 , 1.01 , 1]

function calculate_ED(){
  var M = RCPX[document.getElementById("RCPX").value] *
          RUSE[document.getElementById("RUSE").value] *
          PDIF[document.getElementById("PDIF").value] *
          PERS[document.getElementById("PERS").value] *
          PREX[document.getElementById("PREX").value] *
          FCIL[document.getElementById("FCIL").value] *
          SCED[document.getElementById("SCED").value];
  var effort = Math.ceil(A * Math.pow(document.getElementById("size").value , B) * M);
  var time   = Math.ceil( 3 * Math.pow(effort , (0.33 + 0.2 * (B - 1.01))));
  var people = Math.ceil(effort / time );
  console.log(effort);
  console.log(time);
  console.log(people);
  var temp = `
  <div class="row">
         <div class="col s12 m1"></div>
         <div class="col s12 m10">
                <table >
                 <thead>
                   <tr>
                       <th>Name</th>
                       <th>Value</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Person Monthes (Effort)</td>
                     <td>`+effort+` PM</td>
                   </tr>
                   <tr>
                     <td>Average Staffing (People)</td>
                     <td>`+people+` Person/s</td>
                   </tr>
                   <tr>
                     <td>Time</td>
                     <td>`+time+` Monthes</td>
                   </tr>
                 </tbody>
               </table>
          </div>
   </div>
  `
  document.getElementById("result_ED").innerHTML = temp;
}


function calculate_BX(){
   var effort = Math.ceil((document.getElementById("ASLOC").value * (document.getElementById("AT").value/100))/document.getElementById("ATPROD").value);
   var time   = Math.ceil( 3 * Math.pow(effort , (0.33 + 0.2 * (B - 1.01))));
   var people = Math.ceil(effort / time );
   console.log(effort);
   console.log(time);
   console.log(people);
   var temp = `
   <div class="row">
          <div class="col s12 m1"></div>
          <div class="col s12 m10">
                 <table >
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Person Monthes (Effort)</td>
                      <td>`+effort+` PM</td>
                    </tr>
                    <tr>
                      <td>Average Staffing (People)</td>
                      <td>`+people+` Person/s</td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td>`+time+` Monthes</td>
                    </tr>
                  </tbody>
                </table>
           </div>
    </div>
   `
   document.getElementById("result_BX").innerHTML = temp;
}

function calculate_WX(){
  var effort = (document.getElementById("ASLOC1").value * (1- ((document.getElementById("AT1").value)/100)) * document.getElementById("AAM1").value);
  var time   = Math.ceil( 3 * Math.pow(effort , (0.33 + 0.2 * (B - 1.01))));
  var people = Math.ceil(effort / time );
  console.log(effort);
  console.log(time);
  console.log(people);
  var temp = `
  <div class="row">
         <div class="col s12 m1"></div>
         <div class="col s12 m10">
                <table >
                 <thead>
                   <tr>
                       <th>Name</th>
                       <th>Value</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Person Monthes (Effort)</td>
                     <td>`+effort+` PM</td>
                   </tr>
                   <tr>
                     <td>Average Staffing (People)</td>
                     <td>`+people+` Person/s</td>
                   </tr>
                   <tr>
                     <td>Time</td>
                     <td>`+time+` Monthes</td>
                   </tr>
                 </tbody>
               </table>
          </div>
   </div>
  `
  document.getElementById("result_WX").innerHTML = temp;
}



var RELY1 = [0.75 , 0.88 , 1.00 , 1.15 , 1.39 , 1]
var DATA1 = [1 ,  0.93 , 1.00 , 1.09 , 1.09 , 1 ]
var CPLX1 = [0.75 , 0.88 , 1.00 , 1.15 , 1.30 , 1.66]
var RUSE1 = [1 , 0.91 , 1.00 , 1.14 , 1.29 , 1.49]
var DOCU1 = [0.89 , 0.95 , 1.00 , 1.06 , 1.13 , 1]
var TIME1 = [1 , 1 , 1.00 , 1.11 , 1.31 , 1.67]
var STOR1 = [1, 1, 1.00 , 1.06 , 1.12 , 1.57]
var PVOL1 = [1 , 0.87 , 1.00 , 1.15 , 1.30 , 1]
var ACAP1 = [1.50 , 1.22 , 1.00 , 0.83 , 0.67 , 1]
var PCAP1 = [1.37 , 1.16 , 1.00 , 0.87 , 0.74 , 1]
var PCON1 = [1.24 , 1.10 , 1.00 , 0.92 , 0.84 , 1]
var AEXP1 = [1.22 , 1.10 , 1.00 , 0.89 , 0.81 , 1]
var PEXP1 = [1.25 , 1.12 , 1.00 , 0.88 , 0.81 , 1]
var LTEX1 = [1.22 , 1.10 , 1.00 , 0.91 , 0.84 , 1]
var TOOL1 = [1.24 , 1.12 , 1.00 , 0.86 , 0.72 , 1]
var SITE1 = [1.25 , 1.10 , 1.00 , 0.92 , 0.84 , 0.78]
var SCED1 = [1.29 , 1.10 , 1.00 , 1.00 , 1.00 , 1 ]



function calculate_PA(){
  var M = (
        RELY1[document.getElementById("RELY1").value] *
        DATA1[document.getElementById("DATA1").value] *
        CPLX1[document.getElementById("CPLX1").value] *
        RUSE1[document.getElementById("RUSE1").value] *
        DOCU1[document.getElementById("DOCU1").value] *
        TIME1[document.getElementById("TIME1").value] *
        STOR1[document.getElementById("STOR1").value] *
        PVOL1[document.getElementById("PVOL1").value] *
        ACAP1[document.getElementById("ACAP1").value] *
        PCAP1[document.getElementById("PCAP1").value] *
        PCON1[document.getElementById("PCON1").value] *
        AEXP1[document.getElementById("AEXP1").value] *
        PEXP1[document.getElementById("PEXP1").value] *
        LTEX1[document.getElementById("LTEX1").value] *
        TOOL1[document.getElementById("TOOL1").value] *
        SITE1[document.getElementById("SITE1").value] *
        SCED1[document.getElementById("SCED1").value]
  )
  var effort = Math.ceil(A * Math.pow(document.getElementById("size2").value , B) * M);
  var time   = Math.ceil( 3 * Math.pow(effort , (0.33 + 0.2 * (B - 1.01))));
  var people = Math.ceil(effort / time );
  console.log(M);
  console.log(effort);
  console.log(time);
  console.log(people);
  var temp = `
  <div class="row">
         <div class="col s12 m1"></div>
         <div class="col s12 m10">
                <table >
                 <thead>
                   <tr>
                       <th>Name</th>
                       <th>Value</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Person Monthes (Effort)</td>
                     <td>`+effort+` PM</td>
                   </tr>
                   <tr>
                     <td>Average Staffing (People)</td>
                     <td>`+people+` Person/s</td>
                   </tr>
                   <tr>
                     <td>Time</td>
                     <td>`+time+` Monthes</td>
                   </tr>
                 </tbody>
               </table>
          </div>
   </div>
  `
  document.getElementById("result_PA").innerHTML = temp;

}



function calculate_FP(){
    var DI = (
              parseInt(document.getElementById("DC").value)  +
              parseInt(document.getElementById("DDP").value) +
              parseInt(document.getElementById("PC").value)  +
              parseInt(document.getElementById("HUH").value) +
              parseInt(document.getElementById("HTR").value) +
              parseInt(document.getElementById("ODE").value) +
              parseInt(document.getElementById("OU").value)  +
              parseInt(document.getElementById("EUE").value) +
              parseInt(document.getElementById("CC").value)  +
              parseInt(document.getElementById("R").value)   +
              parseInt(document.getElementById("EOI").value) +
              parseInt(document.getElementById("EOO").value) +
              parseInt(document.getElementById("P").value)   +
              parseInt(document.getElementById("M").value)
            );
  console.log(DI);
  var UFP = (
              (parseInt(document.getElementById("EI").value) * parseInt(document.getElementById("EI_W").value)) +
              (parseInt(document.getElementById("EO").value) * parseInt(document.getElementById("EO_W").value)) +
              (parseInt(document.getElementById("EQ").value) * parseInt(document.getElementById("EQ_W").value)) +
              (parseInt(document.getElementById("ILF").value) * parseInt(document.getElementById("ILF_W").value)) +
              (parseInt(document.getElementById("EIF").value) * parseInt(document.getElementById("EIF_W").value))
            );
  console.log(UFP);
  var VAF = 0.65 + (0.01*DI);
  var FP = UFP*VAF;
  console.log(FP);
  console.log(VAF);

  var temp = `
  <div class="row">
         <div class="col s12 m1"></div>
         <div class="col s12 m10">
                <table >
                 <thead>
                   <tr>
                       <th>Name</th>
                       <th>Value</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>General System Characteristic Section GSC</td>
                     <td>`+DI+` </td>
                   </tr>
                   <tr>
                     <td>unadjusted function point UFP</td>
                     <td>`+UFP+` </td>
                   </tr>
                   <tr>
                     <td>value added factor VAF</td>
                     <td>`+VAF+` </td>
                   </tr>
                   <tr>
                     <td>Function Point</td>
                     <td>`+FP+` </td>
                   </tr>
                 </tbody>
               </table>
          </div>
   </div>
  `
  document.getElementById("result_FP").innerHTML = temp;


}
