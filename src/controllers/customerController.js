const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')
const multer = require('multer')
const multerConfig = require('../config/multer')

router.get('/customer', async (req, res) => {
  try {
    const customer = await Customer.find()
    return res.status(200).send({ customer })
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao carregar os currículo.' })
  }
})

router.post('/customer', async (req, res) => {
  try {
    await Customer.create({
      name: req.body.name,
      about: req.body.about,
      skill: req.body.skill
    })
    return res.status(201).send({ success: 'Currículo criado' })
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao criar o currículo.' })
  }
})

router.put('/customer', async (req, res) => {
  try {
    await Customer.updateOne({ _id: req.body._id }, {
      name: req.body.name,
      about: req.body.about,
      skill: req.body.skill
    })
    return res.status(200).send({ success: 'Dados alterado.' })
  } catch (err) { return res.status(400).send({ error: err }) }
})

router.post('/customer/img', multer(multerConfig).single('file'), async (req, res) => {
  const { key, location: url = '' } = req.file
  const { id } = req.body
  const urls = req.body.urls.split(',')
  urls.push(url)
  console.log(urls)
  try {
    if (req.body.id) {
      await Customer.findOneAndUpdate({ _id: id }, { key, url: urls })
      return res.status(201).send({ success: 'Certificado adicionado' })
    }
  } catch (err) {
    return res.status(400).send({ error: 'Falha ao cadastrar o certificado.' })
  }
})

module.exports = app => app.use('/api', router)
