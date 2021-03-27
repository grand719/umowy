const express = require('express')
const auth = require('../middleware/auth')
const Contract= require('../models/contract')
const router = new express.Router()

router.post('/contract-api/create', auth, async (req, res) => {
    const contract = new Contract(req.body)

    try {
        await contract.save()
        res.status(201).send(contract)
    }catch(e) {
        res.send(e)
    }
})

router.post('/contract-api/addInvoice/:id', auth, async (req, res) => {
    const invoice = {
        ...req.body,
        createdBy: req.user.name,
        modifiedBy: req.user.name,
        addAt: new Date(),
    }

    try {
       const contract = await Contract.findById(req.params.id)
       
       if(!contract) {
           throw new Error('Cant find contract')
       }
        contract.invoices = contract.invoices.concat(invoice)
        contract.save()
        res.status(201).send(contract.invoices[contract.invoices.findIndex((invoiceElement=> {
            return invoiceElement.title === invoice.title
        }))])
    }catch(e) {
        res.status(400).send(e)
    }

})

router.delete('/contract-api/:id', auth, async (req, res)=> {
    const _id = req.params.id
    
    try {
        if(!_id) {
            throw new Error('Pleas provide id')
        }

        await Contract.findByIdAndDelete({_id})

        res.status(200).send()
    }catch(e) {
        res.send(400).send(e)
    }
})

router.delete('/contract-api/invoice/:id/:invoiceid', auth, async (req, res)=> {
    const _id = req.params.id
    const invoiceId = req.params.invoiceid
    try {
     const contract = await Contract.findById({_id});
        contract.invoices = contract.invoices.filter(invoice => {
           return invoice._id != invoiceId
        })

    contract.save()
    res.status(200).send(contract)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/contract-api/invoiceUpdate/:id/:invoiceId', auth, async (req, res)=> {
    const _id = req.params.id
    const invoiceId = req.params.invoiceId
    const obj = {...req.body, modifiedBy: req.user.name}
    try {
        const contract = await Contract.findById({_id})

        if(!contract) {
            throw new Error('wrong id')
        }

        contract.findInvoiceAndUpdate(invoiceId, obj)
        contract.save()
        res.status(200).send(contract)
    }catch(e) {
        res.status(400).send()
    }
    
})

router.patch('/contract-api/:id', auth, async (req, res)=> {
    const _id = req.params.id

    try {
      await  Contract.findByIdAndUpdate({_id}, req.body)
      res.status(200).send()
    }catch(e) {
        res.status(400)
    }
})

router.get('/contract-api/findContracts/:year', auth,async (req, res) => {
    const year = req.params.year;

    try {
       const contracts = await Contract.find({year});
        if(!contracts){
            throw new Error('No contracts')
        }
       res.status(200).send(contracts)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.get('/contract-api/findContract/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
       const contract = await Contract.findOne({_id});
        if(!contract){
            throw new Error('No contract')
        }
       res.status(200).send(contract)
    }catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router