import {Tasks} from '../imports/api/tasks.js';


Meteor.startup(() => {
  // code to run on server at startup
});
//search, you need to build a text index.
Meteor.startup(function(){

  // console.log(Tasks);
  // Tasks._ensureIndex({
  //  "value": "text",
  //   "title": "text"
  // });
  // // seed();
})


Meteor.publish('things', function(){});
