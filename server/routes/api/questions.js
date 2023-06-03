const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


//Get Posts
router.get('/', async (req, res)=>{
    const questions = await loadQuestionsCollection();
    res.send(await questions.find({}).toArray());
})

//Add Post
router.post('/', async (req, res)=>{
    const questions = await loadQuestionsCollection();
    await questions.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});


//Delete Post
router.delete('/:id', async (req, res)=>{
    const questions = await loadQuestionsCollection();
    await questions.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


const url = process.env.MONGO_URL;


async function  loadQuestionsCollection() {
    const client = await mongodb.MongoClient.connect(url, {
        useNewUrlParser: true
    });

    return client.db('allquestions').collection('quests');
    
}

module.exports = router;