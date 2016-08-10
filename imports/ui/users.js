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
import './search.js';
// import './users.js';
import './body.html';


Template.task.helpers({
    //Define helper to check ownership
    isOwner() {
        return this.owner === Meteor.userId();
        console.log(userId);
        Roles.addUsersToRoles(userId, ['admin', 'add-delete-tasks', 'add-read-tasks', 'read-tasks-only']);
        Roles.addUsersToRoles('admin', Roles.GLOBAL_GROUP);
    },
});
// After adding the accounts-password package to the project, a number of methods became available to us:
// Accounts.createUser()
// Accounts.changePassword()
// Accounts.forgotPassword()
// Accounts.resetPassword()
// Accounts.setPassword()
// Accounts.verifyEmail()
//There is also a loginWithPassword() method that we can use within the “login” event:

Template.register.events({
    'submit form': function(e) {
        e.preventDefault();
        var emailVar = $('[name=registerEmail]').val();
        var passwordVar = $('[name=registerPassword]').val();
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
        console.log(passwordVar, emailVar);
    },
});
Template.login.events({
    'submit form': function(e) {
        e.preventDefault();
        var emailVar = $('[name=loginEmail]').val();
        var passwordVar = $('[name=loginPassword]').val();
        //this is built into accounts-password
      //  Meteor.loginWithPassword(emailVar, passwordVar); //built in method
      //so taht it does not fail silently add callback below
        Meteor.loginWithPassword(emailVar, passwordVar, function(error) {
          // console.log(passwordVar, emailVar);
           console.log(error.reason);
         });
       },


});
Template.dashboard.events({
    'click .logout': function(e) {
        e.preventDefault();
         Meteor.logout();

    },
    'click .login-dashboard': function(e) {
        e.preventDefault();
        $("#modal").show();

    },
    'click .close': function(e) {
        e.preventDefault();
        $("#modal").hide();

    }

});

Template.modal.events({


})
