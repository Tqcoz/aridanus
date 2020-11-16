const { get } = require('http');
const mongoose = require('mongoose'),
      express = require('express'),
      ejs = require('ejs')
const app = express()
mongoose.connect('mongodb://localhost/jeopardy', {useNewUrlParser: true, useUnifiedTopology: true,});


// Database Model //
app.use(express.urlencoded({ extended: true }))
const database = mongoose.model('Boards', { 
    boardName: String,
    categories: Object,
    questions: Object
})


app.set('view engine', 'ejs')
app.use('/public', express.static(require('path').join(__dirname, 'public')))
app.get('/view/:id', async (req, res) =>{
    try {
        const board = await database.findOne({_id: req.params.id})
        res.render('page', { board })
    } catch (error) {
        
    }
})
app.get('/', (req, res)=>{
    res.render('index')
})
app.get('/create', async (req, res)=>{
    const createBoard = await database.create({
        boardName: "Board Name"
    })
    res.redirect(`/create/${createBoard._id}`)
})
app.post('/post/api/getAnswers', async (req, res)=>{
    const getAnswers = await database.findOne({_id: req.body.id})
    console.log(eval("getAnswers.questions." + req.body.question));
    res.send(eval("getAnswers.questions." + req.body.question) + "#####" + eval("getAnswers.questions." + req.body.answer))
})
app.post('/post/create/:id', async(req, res)=>{
    let details = req.body
    console.log(details);
    const splitQandA = function (i) {
        return i.split('#151516611#')
    }
    
    let questions =
            {
                "q200a": splitQandA(details.q200a)[0],
                "a200a": splitQandA(details.q200a)[1],
                "q200b": splitQandA(details.q200b)[0],
                "a200b": splitQandA(details.q200b)[1],
                "q200c": splitQandA(details.q200c)[0],
                "a200c": splitQandA(details.q200c)[1],
                "q200d": splitQandA(details.q200d)[0],
                "a200d": splitQandA(details.q200d)[1],
                "q200e": splitQandA(details.q200e)[0],
                "a200e": splitQandA(details.q200e)[1],
                "q200f": splitQandA(details.q200f)[0],
                "a200f": splitQandA(details.q200f)[1],
                // 300
                "a300a": splitQandA(details.q300a)[1],
                "q300b": splitQandA(details.q300b)[0],
                "a300b": splitQandA(details.q300b)[1],
                "q300c": splitQandA(details.q300c)[0],
                "a300c": splitQandA(details.q300c)[1],
                "q300d": splitQandA(details.q300d)[0],
                "a300d": splitQandA(details.q300d)[1],
                "q300e": splitQandA(details.q300e)[0],
                "a300e": splitQandA(details.q300e)[1],
                "q300f": splitQandA(details.q300f)[0],
                "a300f": splitQandA(details.q300f)[1],
                // 400
                "a400a": splitQandA(details.q400a)[1],
                "q400b": splitQandA(details.q400b)[0],
                "a400b": splitQandA(details.q400b)[1],
                "q400c": splitQandA(details.q400c)[0],
                "a400c": splitQandA(details.q400c)[1],
                "q400d": splitQandA(details.q400d)[0],
                "a400d": splitQandA(details.q400d)[1],
                "q400e": splitQandA(details.q400e)[0],
                "a400e": splitQandA(details.q400e)[1],
                "q400f": splitQandA(details.q400f)[0],
                "a400f": splitQandA(details.q400f)[1],
                // 500
                "a500a": splitQandA(details.q500a)[1],
                "q500b": splitQandA(details.q500b)[0],
                "a500b": splitQandA(details.q500b)[1],
                "q500c": splitQandA(details.q500c)[0],
                "a500c": splitQandA(details.q500c)[1],
                "q500d": splitQandA(details.q500d)[0],
                "a500d": splitQandA(details.q500d)[1],
                "q500e": splitQandA(details.q500e)[0],
                "a500e": splitQandA(details.q500e)[1],
                "q500f": splitQandA(details.q500f)[0],
                "a500f": splitQandA(details.q500f)[1],
            }
    
            try {
        const categories = {
            "cola": details.cola,
            "colb": details.colb,
            "colc": details.colc,
            "cold": details.cold,
            "cole": details.cole,
            "colf": details.colf
        }
        
        
        
        const updateBoard = await database.updateOne({_id: req.params.id}, {
            boardName: details.boardname,
            categories,
            questions
        })
        res.redirect(`/view/${req.params.id}`)
    } catch (error) {
        console.log(error);
    }
})
app.get('/create/:id', async (req, res) =>{
    try {
        const board = await database.findOne({_id: req.params.id})
            res.render('create', { board })
        } catch (error) {
            res.render('text', { html: 'Invalid ID Provided, \n <a role="button" style="color: blue" href="http://aridanus.com/self/jeopardy/create">Create Board?</a>' })
        
    }
})

app.listen(80)