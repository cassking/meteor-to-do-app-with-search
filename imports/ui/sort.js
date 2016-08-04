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


Template.sort.events({
  var SessionGet = Session.get('searching');

  'click .sort_by_name': function () {
     SessionGet.set('sort_by', 'name');
  },
  'click .sort_by_date': function () {
     SessionGet.set('sort_by', 'date');
  },
});
