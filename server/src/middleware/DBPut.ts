import { ReasonPhrases, StatusCodes } from 'http-status-codes';

function DBPut(collection) {
  return async (req, res) => {
		try {
			const result = await collection.updateMany({ id: req.validData.id }, { $set: req.validData });

      if(result.matchedCount == 0) {
        res.status(StatusCodes.NOT_FOUND).json({detail: ReasonPhrases.NOT_FOUND});
      } else {
        res.status(StatusCodes.OK).json({detail: ReasonPhrases.OK});
      }
		} catch(err) {
		  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({detail: 'Cannot update from database!'});
		}
  }
}

export default DBPut;

