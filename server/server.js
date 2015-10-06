if (Meteor.isServer) {

  Meteor.publish("RoomUserStatus", function(room) {
    return Meteor.users.find({ "status.online": true, room:room }, {});
  });

  Meteor.publish("allOnlineUsers", function() {
    return Meteor.users.find({ "status.online": true }, {});
  });

  Meteor.publish("Invites", function(me) {
    return Invites.find({you:me});
  });


  Meteor.publish("Rooms", function (nme) {
    return Rooms.find({_id:nme});

    // var tmp = Rooms.find({_id:nme});
    // if(tmp.fetch().length === 0){
    //   Rooms.insert({rnd:Math.random()});
    //   return Rooms.find({_id:nme});
    // }else{
    //   return tmp;
    // }
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    createRoom:function(){
      return Rooms.insert({rnd:Math.random()});
    },
    inviteUser: function(you,me,room){
      Invites.insert({you:you,me:me,room:room});
    },
    updateUserRoom:function(me,room){
      return Meteor.users.update({_id:me}, {$set:{room:room}} );
    }
  });
}
