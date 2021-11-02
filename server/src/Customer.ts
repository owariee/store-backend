import CustomerSchema from './CustomerSchema';
import JoiConfig from './JoiConfig';
import DBPost from './middleware/DBPost';
import SchemaValidate from './middleware/SchemaValidate';
import DBGet from './middleware/DBGet';
import DBDelete from './middleware/DBDelete';
import DBPut from './middleware/DBPut';

function Customer(app, db) {
	const collection = db.collection('customers');

	app.get('/customer/', [
		SchemaValidate(CustomerSchema, 'get'),
		DBGet(collection)
	]);

	app.get('/customer/:id/', [
		SchemaValidate(CustomerSchema, 'get'),
		DBGet(collection)
	]);

	app.post('/customer/', [
		SchemaValidate(CustomerSchema, 'post'),
		DBPost(collection)
	]);

	app.put('/customer/:id/', [
		SchemaValidate(CustomerSchema, 'put'),
		DBPut(collection)
	]);

	app.delete('/customer/:id/', [
		SchemaValidate(CustomerSchema, 'delete'),
		DBDelete(collection)
	]);
}

export default Customer;
