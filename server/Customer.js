// Customer Data
// username
// cnpj
// bithday
// sex
// 

//import Checker from './Checker';
import CustomerSchema from './CustomerSchema';
import JoiConfig from './JoiConfig';

function Customer(app, db) {
	app.get('/customer/:id', async function(req, res) {
		const col = await db.getCollection('customers', res);
		if(!col) return;

		const results = await col.findOne({id: Number(req.params.id)});
		if(!results) {
			res.json({error: "Cannot find this id!"});
			return;
		}
		res.json(results);
	});

	app.post('/customer', async function(req, res) {
		const postSchema = CustomerSchema.tailor('post');
		const result = postSchema.validate(req.body, JoiConfig);

		if(result.error) {
			req.res.json({error: result.error.details});
			return;
		}

		const col = await db.getCollection('customers', res)
		if(!col) {
			req.res.json({error: 'unable to contact database'});
			return;
		}

		const query = await col.find().sort({id: -1}).limit(1).toArray();
		let lastId = -1;

		if(query[0] !== undefined) {
			lastId = query[0].id;
		}
		
		delete result.value.repeatPassword;
		col.insertOne({ id: ++lastId, ...result.value });
		req.res.json({error: 'success'});
		return;
	});

	app.put('/customer/:id', async function(req, res) {

	});

	app.delete('/customer/:id', async function(req, res) {

	});
}

export default Customer;
