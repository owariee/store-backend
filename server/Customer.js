// Customer Data
// username
// name
// last name
// email
// password
// cpf
// cnpj
// bithday
// sex
// gender
// 
import Validator from './Validator';

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
		//let error = {error: []};

		//const name = String(req.body.name);
		//const lastName = String(req.body.lastName);
		//const email = String(req.body.email);
		//const password = String(req.body.password);


		//value: String(req.body.name),

		let nameValidator = new Validator({
			name: {
				pt: "nome",
				en: "name"
			},
			allowed: {
				character: "abcdefghijklmnopqrstuvwxyz",
				message: {
					pt: "alfabeto",
					en: "alphabet"
				}
			},
			lenght: {
				min: 4,
				max: 4
			}
			rules: [
				{
					letter: "a",
					minOccurrences: 1,
					maxOccurrences: 1,
					atPos: [1]
				}
			]
		}, req);

		if(nameValidator.errors.length) {
			res.json({error: {field: {name: nameValidator.errors}}});
			return;
		}

		res.json({errors: null});

		// if(name.length < 3 || name.length > 70) {
		// 	error.error.push("Invalid 'name' lenght, should be more than 3 and less than 70!");
		// }

		// if(name.match(/\d+/g)) {
		// 	error.error.push("Field 'name' has invalid characters!");
		// }

		// if(lastName.length < 3 || lastName.length > 70) {
		// 	error.error.push("Invalid 'lastName' lenght, should be more than 3 and less than 70!")
		// }
		
		// if(name.match(/\d+/g)) {
		// 	error.error.push("Field 'lastName' has invalid characters!");
		// }

		// if(email.length < 6 || email.length > 254) {
		// 	error.error.push("Invalid 'email' lenght, should be more than 6 and less than 254 characters!");
		// }

		// if(0 > email.match(/@/g).length() > 1) {
		// 	error.error.push("Invalid 'email' format!");
		// }






	});

	app.put('/customer/:id', async function(req, res) {

	});

	app.delete('/customer/:id', async function(req, res) {

	});
}

export default Customer;
