import { getStatusCode, ReasonPhrases, StatusCodes } from 'http-status-codes';

function DBGet(collection) {
  return async (req, res) => {
    try {
      let result = null;

      if(req.validData.id) {
        result = await collection.findOne({id: req.validData.id});
        if(result === null) {
          res.status(StatusCodes.NOT_FOUND).json({detail: 'Unable to find this id!'});
          return;
        }
        delete result._id;
        delete result.id;
      } else {
        const itemsPerPage = 2;
        if(req.query.page) {
          const greaterThan = itemsPerPage * (Number(req.query.page) - 1);
          result = await collection.find({}).skip(greaterThan).limit(itemsPerPage).toArray();
        } else {
          result = await collection.find({}).toArray();
        }
        if(result.length == 0) {
          res.status(StatusCodes.NOT_FOUND).json({detail: 'Page not exist!'});
          return;
        }
        result.forEach(element => {
          delete element._id;
          delete element.id;
        });
        result = {count: result.length, next: null, previous: null, result: result};
      }

      res.status(StatusCodes.OK).json(result);
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({detail: 'Cannot get from database!'});
    };
  }
}

export default DBGet;
