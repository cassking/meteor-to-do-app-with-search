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
    // Template.search.tasks = function() {
    //     return Tasks.find({}, {
    //         sort: Session.get("sort_by_name")
    //     });
    // };
    Session.set("sort_by_name", {
       username: 1
    });

    //client stuff
    Template.search.events({

        "click  #search": function(e) {
          console.log("Searching...");
            //here i set a session for the evetn
            e.preventDefault();
            //set variable to get text/search input   value
            Session.set('searching', $('input[data-action="search"]').val());
        },
        "click  #sort_by_name": function(e) {
          e.preventDefault();
          var order;
          var origValue = Session.get("sort_by_name")

          if(origValue.username === 1) {
            order = -1;
          }
          else {
            order = 1;
          }
          Session.set("sort_by_name", {username: order});
        },
    });
    Template.search.helpers({

        // return session with a helper (helpers are reactive)
        results: function() {
            //get the session from form submit event and set it to variable
            var keyword = Session.get('searching');
            var sorted_name = Session.get("sort_by_name");
            var query = new RegExp(keyword, 'i');
            var query_meta = {}
            var results = null;

            console.log(sorted_name);

            if (sorted_name) {
              query_meta = {sort: sorted_name}
            }

            results = Tasks.find({
                $or: [{
                    text: query
                }, {
                    username: query
                }, {
                    CreatedAt: query
                }]
            }, query_meta);
            return results;
        },

  

    });


} //end client
