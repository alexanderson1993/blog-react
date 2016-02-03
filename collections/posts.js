Posts = new Mongo.Collection( 'posts' );

Posts.allow({
  insert: () => false,
  update: () => true,
  remove: () => false
});

Posts.deny({
  insert: () => true,
  update: () => false,
  remove: () => true
});

function makeExerpt(html){
  let tester = new RegExp('^(.*?)\\n');
  if (tester.exec(html)){
    return tester.exec(html)[0];
  }
  return html.substr(0,50);
}
let PostsSchema = new SimpleSchema({
  "published": {
    type: Boolean,
    label: "Is this post published?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },
  "author": {
    type: String,
    label: "The ID of the author of this post.",
    autoValue() {
      let user = Meteor.users.findOne( { _id: this.userId } );
      if ( user ) {
        return `${ user.profile.name.first } ${ user.profile.name.last }`;
      }
    }
  },
  "updated": {
    type: String,
    label: "The date this post was last updated on.",
    autoValue() {
      if (!this.value){
        return ( new Date() ).toISOString();
      }
      return this.value;
    }
  },
  "title": {
    type: String,
    label: "The title of this post.",
    defaultValue: "Untitled Post"
  },
  "slug": {
    type: String,
    label: "The slug for this post.",
    autoValue() {
      let slug              = this.value,
      existingSlugCount = Posts.find( { _id: { $ne: this.docId }, slug: new RegExp( slug ) } ).count(),
      existingUntitled  = Posts.find( { slug: { $regex: /untitled-post/i } } ).count();

      if ( slug ) {
        return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
      } else {
        return existingUntitled > 0 ? `untitled-post-${ existingUntitled + 1 }` : 'untitled-post';
      }
    }
  },
  "exerpt": {
    type: String,
    label: "The short exerpt of this post.",
    optional:true,
    autoValue() {
      if (this.field('content').value){
        return makeExerpt(this.field('content').value);
      }
    }
  },
  "content": {
    type: String,
    label: "The content of this post.",
    optional: true
  },
  "tags": {
    type: [ String ],
    label: "The tags for this post.",
    optional: true
  }
});

Posts.attachSchema( PostsSchema );
