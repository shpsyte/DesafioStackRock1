const express = require('express')
const nunjuck = require('nunjucks')
const app = express()

app.use(
  express.urlencoded({
    extended: false
  })
)
app.set('view engine', 'njk')

nunjuck.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const middleCheckAge = (req, res, next) => {
  console.warn('No age info')
  return req.query.age ? next() : res.redirect('/')
}

// Rota inicial que renderiza uma página com um formulário com um único campo "age" que representa a idade do usuário
app.get('/', (req, res) => res.render('form'))

app.post('/check', (req, res) => {
  let age = req.body.age

  if (age > 18) {
    return res.redirect(`/major/?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor/?age=${req.body.age}`)
  }
})

app.get('/major', middleCheckAge, (req, res) => {
  return res.render('major', {
    age: req.query.age
  })
})

app.get('/minor', middleCheckAge, (req, res) => {
  return res.render('minor', {
    age: req.query.age
  })
})

app.listen(3000)
