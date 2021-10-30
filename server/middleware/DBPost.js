import { ReasonPhrases, StatusCodes } from 'http-status-codes';

function DBPost(collection) {
  return async (req, res) => {
		let lastId = 0;

		try {
			const idArray = await collection.find({}).sort({id: -1}).limit(1).toArray();

			if(idArray[0]) {
				lastId = idArray[0].id;
			}

			await collection.insertOne({ id: ++lastId, ...req.validData });

			res.status(StatusCodes.CREATED).json({detail: ReasonPhrases.CREATED});
		} catch(err) {
		  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({detail: 'Cannot insert on database!'});
		}
  }
}

export default DBPost;
