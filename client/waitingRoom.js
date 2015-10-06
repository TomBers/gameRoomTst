
  Template.waitingRoom.onRendered(function(){

    Meteor.subscribe('Invites',Meteor.userId());
    Meteor.subscribe('allOnlineUsers');


  });

  Template.waitingRoom.helpers({
    onlineUsers: function(){
      return _.filter(Meteor.users.find().fetch(), function(e){
        return e._id !== Meteor.userId();
      });
    },
    invites:function(){
      return Invites.find();
    }
  });


  Template.waitingRoom.events({
    "click .inviteUser": function(event, template){
      if(event.target.textContent !== Meteor.userId()){
        Meteor.call('createRoom', function(e,d){
          // console.log(d);
          Meteor.call('inviteUser',event.target.textContent,Meteor.userId(),d);
          Router.go('/room/'+d);
        });

      }
    }
  });
