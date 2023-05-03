const express = require('express')
const router = express.Router()
const indexController = require('../controller/index_controller')


router.get('/questions', indexController.viewAllQuestions)

router.post('/questions/create', indexController.createQuestion)

router.post('/questions/:id/options/create', indexController.createOption)

router.delete('/questions/:id/delete', indexController.deleteQuestion)

router.delete('/options/:id/delete', indexController.deleteOption)

router.post('/options/:id/add_vote', indexController.addVote)

router.get('/questions/:id', indexController.viewQuestion)

module.exports = router;








