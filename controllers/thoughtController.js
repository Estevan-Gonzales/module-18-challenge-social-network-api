const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            const thoughtObj = {
                thoughts
            };

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params._id });
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' })
          }
    
          res.json(thought);

        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with this ID!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params._id });
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
          }

          res.json(thought)
    
          //await User.deleteMany({ _id: { $in: course.students } }); ADD THIS
          //res.json({ message: 'Course and students deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
    
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidator: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'Cannot add reaction.' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidator: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({message: "Cannot remove reaction."});
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
      },

};