import {
    Meteor
} from 'meteor/meteor';
import {
    Template
} from 'meteor/templating';
// import { Tasks } from '../api/tasks.js';
import './task.html';
import {
    ReactiveDict
} from 'meteor/reactive-dict';
import {
    Tasks
} from '../api/tasks.js';
import './body.html';

if (Meteor.isServer) {
    Meteor.startup(function() {
        Tasks._ensureIndex({
            "$**": "text"
        }, {
            "name": "searchIndex"
        });
    });
}
if (Meteor.isClient) {
    //client stuff
    Template.search.events({

        "click  #search": function(e) {
            //here i set a session for the evetn
            e.preventDefault();
            //set variable to get text/search input   value
            Session.set('searching', $('input[data-action="search"]').val());
        },
        "click #name": function(e) {
            //here i set a session for the evetn
            e.preventDefault();
            //set variable to get text/search input   value
            Session.set('searchingname', $('input[data-action="searchname"]').val());
        },
    });
    Template.search.helpers({

  'isTrue': function(){
    return true;
  },

        // return session with a helper (helpers are reactive)
        results: function() {
            //get the session from form submit event and set it to variable
            var keyword = Session.get('searching');
            // var results = Session.get('searching');
            var query = new RegExp(keyword, 'i');
            var results = Tasks.find({
                $or: [
                  {text: query},
                  {username: query},
                  {CreatedAt: query}
                ]
              },
              {
                sort: {
                  username: -1
                }
              }
            );

            return  results ;

        },


    });

} //end client
