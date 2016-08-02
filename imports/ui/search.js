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
    Meteor.methods({
        // searchResults: function () {
        //       return searchResults.find().fetch();
        //   }
    });
}

if (Meteor.isClient) {


    //client stuff

    Template.search.events({
        "keyup input#searchValue": function() {
            // // var query = $('input[data-action="search"]').val();
            // Session.set('searching', $('input[data-action="search"]').val());
            // var search = Session.get('searching');
            // console.log('search:', search);
            //  return Session.get('searching');
        },

        "click  #search": function(e) {
            //here i set a session for the evetn
            e.preventDefault();
            //set variable to get text/search input   value
            Session.set('searching', $('input[data-action="search"]').val());
            // var keyword = Session.get('searching');
            //  var query = new RegExp(keyword, 'i');
            //  var results = Tasks.find({
            //   name : query,
            //  }, { });
            // console.log(query, results);
            //  return {
            //      results: results
            //  };


        },
    });

    Template.search.helpers({
        // return session with a helper (helpers are reactive)
        results: function() {
            //get the session from form submit event and set it to variable
            var keyword = Session.get('searching');
            // var results = Session.get('searching');
            var query = new RegExp(keyword, 'i');
            var results = Tasks.find({
                text: query,
            });
            console.log(query, results.count());
            // console.log('query:',query,'results:', results );

            return results;
        },

    });

} //end client
