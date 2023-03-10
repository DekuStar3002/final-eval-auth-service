const joiValidation = (schema, type) => {
  return (req, res, next) => {
    if(type === 'body') {
      const { error } = schema.validate(req.body);
      if( error ) {
        console.log(error);
        res.status(400).json({ error: error.message });
        return;
      }
    } else if(type === 'headers') {
      const { error } = schema.validate(req.headers);
      if( error ) {
        console.log(error);
        res.status(400).json({ error: error.message });
        return;
      }
    }
    next();
  };
};

module.exports = joiValidation;