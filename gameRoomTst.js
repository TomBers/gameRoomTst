if (Meteor.isClient) {
  // counter starts at 0
  Template.room.onRendered(function(){
    // console.log(this);
    Meteor.subscribe('Invites',Meteor.userId());
  });

  Template.room.helpers({
    onlineUsers: function(){
       return _.filter(Meteor.users.find({ "status.online": true }).fetch(), function(e){
         return e._id !== Meteor.userId();
       });
    },
    invites:function(){
      return Invites.find();
    }
  });


  Template.room.events({
    "click .inviteUser": function(event, template){

      if(event.target.textContent !== Meteor.userId()){
        Meteor.call('inviteUser',event.target.textContent,Meteor.userId());
      }


    }
  });





}

if (Meteor.isServer) {

  Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true }, {});
});

Meteor.publish("Invites", function(me) {
return Invites.find({you:me});
});


  Meteor.publish("Rooms", function (nme) {
    var tmp = Rooms.find({name:nme});
    if(tmp.fetch().length === 0){
       Rooms.insert({name:nme,rnd:Math.random()});
       return Rooms.find({name:nme});
    }else{
      return tmp;
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    inviteUser: function(you,me){
      Invites.insert({you:you,me:me});
    }
  });
}
