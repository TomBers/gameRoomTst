Router.configure({
layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('/', {
    path: '/',
    template: 'home',
  });


  this.route('room', {
    path: '/room/:_id',
    template: 'room',
    waitOn: function(){
      Meteor.subscribe('userStatus',this.params._id);
      return Meteor.subscribe('Rooms',this.params._id);
    },
    data: function() {
      return Rooms.findOne({name:this.params._id});
    }
  });
});
