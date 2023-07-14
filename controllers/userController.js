const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // get one user by id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // update a user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, runValidators: true });
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // delete a user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true });
                res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true });
                res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}
