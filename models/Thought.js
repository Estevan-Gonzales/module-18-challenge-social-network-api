// Define Mongoose
const {Schema, model} = require('mongoose');
const {ObjectId} = require('mongoose').Types;


const reactionSchema = new Schema({
  reactionId: {type: Schema.Types.ObjectId, default: () => new ObjectId()},
  reactionBody: {type: String, required: true, maxLenght: 280},
  username: {type: String, required: true},
  createdAt: {type: Date, default: Date.now()}
})

reactionSchema
  .virtual('modifiedDate')
  .get(function () {
    return `${this.createdAt}`; //Add formatting
  });

const thoughtSchema = new Schema({
  thoughtText: {type: String, required: true, minLength: 1, maxLength: 280},
  createdAt: {type: Date, default: Date.now()},
  username: {type: String, required: true},
  reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  });

thoughtSchema
  .virtual('modifiedDate')
  .get(function () {
    return `${this.createdAt}`; //Add formatting
  });

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
  

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

