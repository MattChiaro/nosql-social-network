const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // get one thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true, runValidators: true }
            );
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // delete a thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}