import { getOrder, gettype, sum, addcar } from './dboperations';
import express, { Router } from 'express';
import { urlencoded, json } from 'body-parser';
var app = express();
var router = Router();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use('/api', router);

router.route('/transaction/:transactionId').get((request, response) => {
   getOrder(request.params.transactionId).then(result => {
      response.json(result[0]);
   })
})
router.route('/transactionservice/types/:type').get((request, response) => {
   gettype(request.params.type).then(result => {
      response.json(result[0]);
   })
})

router.route('/transactionservice/sum/:transaction_id').get((request, response) => {
   sum(request.params.transaction_id).then(result => {
      response(result);
   })
})

router.route('/transactionservice/transaction/:transaction_id').put((request, response) => {
   let order = { ...request.body }
   addcar(order, transaction_id).then(result => {
      response.status(201).json(result);
   })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('CAR API is runnning at ' + port);