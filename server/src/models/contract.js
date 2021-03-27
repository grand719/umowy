const { ObjectId } = require('mongodb');
const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const contractSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    contract_number: {
        type: String,
        trim: true,
        require: true,
    },
    year: {
        type: String,
        trim: true,
        required: true,
    },
    budget: {
        type: Float,
        default: 0,
    },
    invoices: [{
        title: {
            type: String,
            trim: true,
            required: true
        },
        value: {
            type: Float,
            default: 0,
        },
        createdBy: {
            type: String,
            trim: true,
            required: true,
        },
        modifiedBy: {
            type: String,
            trim: true,
            required: true,
        },
        addAt: {
            type: Date,
            required: true,
            default: new Date(),
        }
        }]
},{
    timestamps: true
})

contractSchema.methods.findInvoiceAndUpdate = async function(invoiceId, obj={}){
    const contract = this

    if(!contract) {
        throw new Error('no data macht');
    }
   const findInvoiceToUpdate = contract.invoices.findIndex(invoice => invoice._id.toString() === invoiceId);

    if(findInvoiceToUpdate < 0) {
        throw new Error('There is no item with such id')
    }

    const {title, value, modifiedBy} = obj;

    contract.invoices[findInvoiceToUpdate].title = title ? title : contract.invoices[findInvoiceToUpdate].title
    contract.invoices[findInvoiceToUpdate].value = value ? value : contract.invoices[findInvoiceToUpdate].value
    contract.invoices[findInvoiceToUpdate].modifiedBy = modifiedBy
}

const Contract = mongoose.model('Contract', contractSchema)

module.exports = Contract



