// Customer Data
// username
// cnpj
// bithday
// sex
// 

import Checker from './Checker';

function Customer(app, db) {
	let ruleFirstName = {
		field: "firstName",
		allowedChars: "a-zA-Z0-9 !@#$%^&*()_+=~`´'\"",
		len: "3,120",
		rules: [ /^.{1,2}[a]{1}/, ]
	};

	let ruleLastName = {
		field: "lastName",
		allowedChars: "a-zA-Z0-9!@#$%^&*()_+=~`´'\"",
		len: "3,120",
		rules: [ /^.{1,2}[a]{1}/, ]
	};

	let ruleEmail = {
		field: "email",
		allowedChars: "a-zA-Z0-9!@#$%^&*()_+=~`´'\"",
		len: "3,120",
		rules: [ /^.{1,2}[a]{1}/, ]
	};

	let rulePassword = {
		field: "password",
		allowedChars: "a-zA-Z0-9!@#$%^&*()_+=~`´'\"",
		len: "3,120",
		rules: [ /^.{1,2}[a]{1}/, ]
	};

	let ruleCPF = {
		field: "cpf",
		allowedChars: "a-zA-Z0-9!@#$%^&*()_+=~`´'\"",
		len: "3,120",
		rules: [ /^.{1,2}[a]{1}/, ]
	};

	let ruleGender = {
		field: "gender",
		allowedChars: "a-zA-Z0-9!@#$%^&*()_+=~`´'\"",
		len: "3,120",
		rules: [ /^.{1,2}[a]{1}/, ]
	};

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
		const checker = new Checker(req.body);

		const fields = [
			ruleFirstName,
			ruleLastName,
			ruleEmail,
			rulePassword,
			ruleCPF,
			ruleGender
		];

		checker.validateFields(fields);

		if(!checker.errors.length) {
			//insert in the DB
		}

		checker.sendStatus(res);
	});

	app.put('/customer/:id', async function(req, res) {

	});

	app.delete('/customer/:id', async function(req, res) {

	});
}

export default Customer;
