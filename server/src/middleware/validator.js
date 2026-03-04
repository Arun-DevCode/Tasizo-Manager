import validate from "express-validator";

function ValidatorHandler(req, res, next) {
  const errors = validate.validationResult(req);

  if (errors && !errors.isEmpty()) {
    return res.json({ error: true, reason: errors });
  }

  // Req pass to route handler or next fun
  next();
}

export default ValidatorHandler;
