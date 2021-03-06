import { Template } from 'meteor/templating';
import { EJSON } from 'meteor/ejson';
 
import { CampingCars } from '../api/campingcars.js';
import { Reservations } from '../api/reservations.js';
 

import './userbooking.html';

 Template.userbooking.onCreated(function() {

  Tracker.autorun(function () {
    Meteor.subscribe("campingcars");
    Meteor.subscribe('Images');
    Meteor.subscribe('addons');
    Meteor.subscribe('reservations');
    Meteor.subscribe('usersdata');
});

});


 Template.userbooking.helpers({

 reservations(){
  var reservations = Reservations.find({"user_id": Meteor.userId(),"status" : { $in: ["newbooking", "owner_valid"] }});
  //console.log("length: "+reservations.fetch().length);
var reservations_nf =[];
reservations.forEach(function (book) {
  var st = moment(book.start_time, 'YYYY-MM-DD');
  var et = moment(book.end_time, 'YYYY-MM-DD');
  book.start_time = st.format('DD MMMM YYYY', 'fr');
  book.end_time = et.format('DD MMMM YYYY', 'fr');
reservations_nf.push(book);
});

return reservations_nf;
  },

 campingcars(){
    //const instance = Template.instance();
    //console.log("helper route id : "+FlowRouter.getParam("_id")); "userid": Meteor.userId()
    //console.log("campingcar find! vue nombre: "+CampingCars.find({}).count());
return CampingCars.find({"userid": Meteor.userId()});
  },

});
  Template.userbooking.events({


  'click .user-listing-item':function(event, template){

//console.log("click user id : "+Meteor.userId());
//console.log("click current value: "+event.currentTarget.value);
//console.log("click current tag id: "+event.currentTarget.id);
 FlowRouter.go('book', { _id: event.currentTarget.id });
  }

   });