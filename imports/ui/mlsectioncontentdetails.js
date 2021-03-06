import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 

import { Tasks } from '../api/tasks.js';
import { CampingCars } from '../api/campingcars.js';
 

import './mlsectioncontentdetails.html';
var metanbr;
Template.mlsectioncontentdetails.onRendered(function() {

 var linkInfo = {rel: "icon", sizes:"16x16 32x32", href: "/favicon.ico?v=3"};
 DocHead.addLink(linkInfo);
 metanbr=0;

}); 

Template.mlsectioncontentdetails.helpers({

campingcars: function(){

      if(Meteor.userId()!==CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0].userid)
      {
         FlowRouter.go("index");
         return true;
      }
      else
      {

          metanbr++;

          if(metanbr==1){
          var bdd = CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];
          DocHead.setTitle(bdd.name+"|Détails|Le Bon Camping-car");
          var cont = "Marque "+bdd.make+" modèle "+bdd.model;
          var metaInfo = {name: "description", content: cont};
          DocHead.addMeta(metaInfo);  

          }
          else
          {

          }

          return CampingCars.find({_id:FlowRouter.getParam("_id")}).fetch()[0];

      }
}
});

Template.mlsectioncontentdetails.events({

'click #outpoupselect': function(event, template){

  event.preventDefault();
  //console.log("event type : "+event.type);
  //console.log("event target : "+event.target);
  var fueltypeselect = template.find('#fueltypeselect');
  var transmissionselect = template.find('#transmissionselect');
//var appcont = template.find('.app-container-view');
  var popupselect = template.find('.popupselect');

if(fueltypeselect.style.display == 'inline-block'||transmissionselect.style.display == 'inline-block')
{ 
  console.log("fueltypeselect :"+fueltypeselect.style.display);
  fueltypeselect.style.display = 'none';
  transmissionselect.style.display = 'none';
  event.currentTarget.style.display = 'none';
  //appcont.style.overflowY = 'scroll';
}
else
{

  console.log("else fueltypeselect :"+fueltypeselect.style.display);
}
//appcont.style.overflowY = 'scroll';

},

'click .transmissiontype': function(event, template){
      event.preventDefault();

var dig = '{"transmissiontype":"'+event.currentTarget.innerHTML+'"}';
var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
        var outpoupselect = template.find('#outpoupselect');
        outpoupselect.style.display = 'none';
        var transmissionselect = template.find('#transmissionselect');
          transmissionselect.style.display = 'none';
      
},

'click #transmissiontype': function(event, template){
      event.preventDefault();
var transmissionselect = template.find('#transmissionselect');
var outpoupselect = template.find('#outpoupselect');
outpoupselect.style.display = "inline-block";

transmissionselect.style.display = "inline-block";

transmissionselect.style.top = event.clientY+'px';
transmissionselect.style.left = event.clientX+'px';
},

'click .fueltype':function(event, template){
      event.preventDefault();
var dig = '{"fueltype":"'+event.currentTarget.innerHTML+'"}';
var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
                var outpoupselect = template.find('#outpoupselect');
        outpoupselect.style.display = 'none';
        var fueltypeselect = template.find('#fueltypeselect');
          fueltypeselect.style.display = 'none';
},

'click #fueltype': function(event, template){
    event.preventDefault();
var fueltypeselect = template.find('#fueltypeselect');
var outpoupselect = template.find('#outpoupselect');
outpoupselect.style.display = "inline-block";

fueltypeselect.style.display = "inline-block";

fueltypeselect.style.top = event.clientY+'px';
fueltypeselect.style.left = event.clientX+'px';
},

  'keyup .new-task': function(event, template) {
    //console.log("event "+event);
    // Prevent default browser form submit
//
   // 
    console.log("event type : "+event.type);
    console.log("event target : "+event.target);
    console.log("event target text: "+event.target.text.value);
    //console.log("event current target : "+EJSON.stringify(event.currentTarget.hr.style));
       var Restask = template.find('.new-task');


    // Get value from form element

    //const target = event.target;

    const text = Restask.text.value;
    console.log("text value: "+text);
 

    // Clear form #mui-id-98

    Restask.text.value = '';

  },

  'input .data-item': function (event, template) {
//event.preventDefault(); 
console.log("event: "+event.type);
    var routeid = FlowRouter.getParam('_id');
var dig = '{"'+event.currentTarget.name+'":"'+event.currentTarget.value+'"}';
console.log("DIG: "+dig);
var js = JSON.parse(dig);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });
  },

'click .text-item': function(event, template){
//console.log("click current text-item label style width: "+event.currentTarget.children[0].style.position);
var lab = event.currentTarget.children[0];
var inp = event.currentTarget.children[1];
var hli = event.currentTarget.children[3];
//console.log("Label: "+lab.innerHTML);
inp.style.display = "inline-block";

var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
lab.style = nstyle;
//lab.style.;
lab.style.top = "38px";
lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
//lab.style.;
lab.style.cursor = "text";
//lab.style.; 244, 67, 54
lab.style.color ="rgba(86,90,92,0.5)";
//lab.innerHTML = "Vehicle Model";

var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
hli.style.transform = "scaleX(1)";

//console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag name: "+event.currentTarget.tagName);

},

'click .select-item': function(event, template){
//console.log("click current text-item label style width: "+event.currentTarget.children[0].style.position);
var lab = event.currentTarget.children[0];
var inp = event.currentTarget.children[1];
var hli = event.currentTarget.children[3];
//console.log("Label: "+lab.innerHTML);
inp.style.display = "inline-block";

var nstyle = {"font-size":"","line-height" : "22px","z-index": "1", "transform-origin" :"left top 0px","transform":"perspective(1px) scale(0.75) translate3d(2px, -28px, 0px)"};
lab.style = nstyle;
//lab.style.;
lab.style.top = "38px";
lab.style.transition = "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms";
//lab.style.;
lab.style.cursor = "text";
//lab.style.; 244, 67, 54
lab.style.color ="rgba(86,90,92,0.5)";
//lab.innerHTML = "Vehicle Model";

var hrstyle = {"border-color":"rgb(36,97,130)" ,"bottom":"8px","box-sizing" : "content-bo","margin": "0px", "position" :"absolute","width":"100%","transform":"scaleX(1)","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms","border-width":"medium medium 2px","border-style":"none none solid"};
hli.style.transform = "scaleX(1)";

//console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag name: "+event.currentTarget.tagName);

},


  'click .flex-grid-item':function(event, template){
    event.preventDefault();
//console.log("click input nameœ: "+event.target.name);
//console.log("click input value: "+event.target.value);
//console.log("click tag name: "+event.target.tagName);

console.log("click current nameœ: "+event.currentTarget.name);
console.log("click current value: "+event.currentTarget.value);
console.log("click current tag name: "+event.currentTarget.tagName);

var key = event.target.name;
 var tar = event.target;
//var req = Json.parse('{_id:"'+FlowRouter.getParam('_id')'",'+key+':null}');
var routeid = FlowRouter.getParam('_id');
var dig = '{_id:"'+routeid+'",'+key+':"on"}';
console.log("av parser: "+dig);
console.log("fetch key: "+CampingCars.find({_id:FlowRouter.getParam('_id')}).fetch()[0]);
if (event.target.value=="on")
{

 //tar.value="off"; 
console.log("bdd on: "+tar.value);
var dig0 = '{"'+key+'":false  }';

var js = JSON.parse(dig0);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js
        }, {
          upsert: true
        });

}
else
{
console.log("else value : ");
var dig2 = '{"'+key+'":"on"}';
console.log("dig2 : "+dig2);
var js2 = JSON.parse(dig2);
        CampingCars.update({
            _id: FlowRouter.getParam('_id')
        }, {
            $set: js2
        }, {
          upsert: true
        });

}

var transm = '{"transmission":[{"automatic":"on"},{"manuel":false}]}';
var jstr = JSON.parse(transm);
CampingCars.update({_id: FlowRouter.getParam('_id')
},{
  $set:jstr
},{
  upsert: true
});

var val = null;

  }

   });