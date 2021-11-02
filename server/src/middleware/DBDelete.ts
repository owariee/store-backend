import { ReasonPhrases, StatusCodes } from 'http-status-codes';

function DBDelete(collection) {
  return async (req, res) => {
		try {
			const result = await collection.deleteMany({id: req.validData.id});
      if(result.deletedCount > 0) {
        res.status(StatusCodes.OK).json({detail: ReasonPhrases.OK});
      } else {
        res.status(StatusCodes.NOT_FOUND).json({detail: ReasonPhrases.NOT_FOUND});
      }
		} catch(err) {
		  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({detail: 'Cannot delete from database!'});
		}
  }
}

export default DBDelete;
