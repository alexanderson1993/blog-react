Meteor.publish( 'portfolio', () => {
  return Portfolio.find();
});
