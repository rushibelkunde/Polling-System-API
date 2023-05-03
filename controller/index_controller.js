const Question = require('../models/question');

// to view all the questions
module.exports.viewAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        if (questions) {
            return res.json(200, {
                Questions: questions
            });
        }

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

 // Create a question
module.exports.createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        let savedQuestion = await question.save()
        if (savedQuestion) {
            return res.json(savedQuestion);
        }
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

// Add an option to a question
module.exports.createOption = async (req, res) => {
    try {
        let question = await Question.findById(req.params.id)
        if (question) {
            question.options.push(req.body);
            let savedQuestion = await question.save()
            return res.json(savedQuestion);
        }
    }
    catch (err) {
        return res.status(400).json({ error: err })
    }
}


 // Delete a question
module.exports.deleteQuestion = async (req, res) => {
   try{
       let question = await Question.findById(req.params.id)

   if (question.options.some(option => option.votes > 0)) {
       return res.status(400).json({ error: 'Cannot delete question with votes on an option' });
   } else {
       await question.deleteOne()
       return res.sendStatus(204);
   }
   }catch(err){
       return res.status(400).json({ error: err })
   } 
}


// Delete an option
module.exports.deleteOption = async (req, res) => {
   try{
   let question = await Question.findOneAndUpdate(
       { 'options._id': req.params.id },
       { $pull: { options: { _id: req.params.id, votes: 0 } } },
       { new: true })
   if (!question) {
       res.status(404).json({ error: 'Option not found' });
   } else {
       return res.json(question);
   }
}catch(err){
   return res.status(400).json({ error: err })

}
}


// Add a vote to an option
module.exports.addVote = async (req, res) => {
    try{
    let question = await Question.findOneAndUpdate(
        { 'options._id': req.params.id },
        { $inc: { 'options.$.votes': 1 } },
        { new: true })
    if (!question) {
        res.status(404).json({ error: 'Option not found' });
    } else {
        const option = question.options.find(option => option.id === req.params.id);
        const linkToVote = `https://localhost:3000/options/${req.params.id}/add_vote`;
        return res.json({
            question: question.question,
            option: option.option,
            votes: option.votes,
            link_to_vote: linkToVote
        });
    }
}catch(err){
    return res.status(400).json({ error: err })

}
}




// View a question and its options
module.exports.viewQuestion = async (req, res) => {
    try{
    let question = await Question.findById(req.params.id)
    if (!question) {
        return res.status(404).json({ error: 'Question not found' });
    } else {
        const options = question.options.map(option => {
            const linkToVote = `https://localhost:3000/options/${option._id}/add_vote`;
            return {
                option: option.option,
                votes: option.votes,
                link_to_vote: linkToVote
            };
        });
        return res.json({
            question: question.question,
            options: options
        });
    }

}catch(err){
    return res.status(400).json({ error: err })
}
}