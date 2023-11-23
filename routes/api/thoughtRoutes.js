const router = require('express').Router();

const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,

    addReaction,
    removeReaction

} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought);
router.route('/:_id').get(getThought).put(updateThought);
router.route('/:_id').delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;