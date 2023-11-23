const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params._id });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
          }
    
          res.json(user);

        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            res.status(404).json({ message: 'No user with this ID!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params._id });
    
          if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
          }
    
          res.json(user);

          //await User.deleteMany({ _id: { $in: course.students } }); ADD THIS
          //res.json({ message: 'Course and students deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: friend}},
                {runValidator: true, new: true}
            );
    
            if (!user) {
                return res.status(404).json({message: "Cannot add friend"});
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {runValidator: true, new: true}
            );
    
            if (!user) {
                return res.status(404).json({message: "Cannot remove friend"});
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
      },

};