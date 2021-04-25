import config from './dbconfig';
import { connect, Int, long, double, NVarChar } from 'mssql'

async function getOrder(transactionId) {
    try {
        let pool = await connect(config);
        let product = await pool.request()
            .input('input_parameter', long, transactionId)
            .query("SELECT * from Products where transactionId = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function gettype(type) {
    try {
        let pool = await connect(config);
        let product = await pool.request()
            .input('input_parameter', NVarChar, type)
            .query("SELECT * from Products where Type = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function sum(transaction_id) {
    try {
        let pool = await connect(config);
        let product = await pool.request()
            .input('input_parameter', long, transaction_id)
            .query("SELECT sum(Amounts) from Products where transaction_id >= @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function addcar(order, transaction_id) {

    try {
        let pool = await connect(config);
        let insertProduct = await pool.request()
            .input('transaction_id', long, transaction_id)
            .input('Amount', double, order.Amount)
            .input('Type', NVarChar, order.Type)
            .input('Parent_ID', long, order.Parent_ID)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

export const getOrder = getOrder;
export const gettype = gettype;
export const sum = sum;
export const addcar = addcar;