import JoiConfig from '../JoiConfig';

import { StatusCodes } from 'http-status-codes';

function SchemaValidate(schema, tailor) {
  return (req, res, next) => {
    const tailoredSchema = schema.tailor(tailor);
    const result = tailoredSchema.validate({ ...req.params, ...req.body }, JoiConfig);

    if(result.error) {
      res.status(StatusCodes.BAD_REQUEST).json({detail: result.error.details});
      return;
    }

    req.validData = result.value;
    next();
  }
}

export default SchemaValidate;
