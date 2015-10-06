  Template.room.onRendered(function(){
    var room = this.data._id;
    Session.set(room,[]);
    Meteor.call('updateUserRoom',Meteor.userId(),room, function(e,d){
      Meteor.subscribe('RoomUserStatus',room);
    });

  });

  Template.room.helpers({
    onlineUsers: function(){
      var tmp = Meteor.users.find().fetch();
      Session.set(this._id,tmp);
      return _.filter(tmp, function(e){
       return e._id !== Meteor.userId();
     });
   },
   myStatus: function(){
     return Meteor.users.findOne({_id:Meteor.Meteor.userId()});

   }
  });


  Template.room.events({
    "click button": function(event, template){
      console.log(template.data);
      console.log(Session.get(template.data._id));
      // console.log(Meteor.userId());

    }
  });
