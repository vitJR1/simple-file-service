import { validationResult } from "express-validator";

export default function (func) {
  return async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const result = await func({
        user: req.user,
        params: req.params,
        body: req.body,
        file: req.file,
        query: req.query,
        headers: req.headers,
      });
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      if (e.constructor.name === "RequestError") {
        res.status(e.code ?? 500).end(e.message);
      } else if (e.constructor.name === "ValidationError") {
        res.status(400).end(e.message);
      } else {
        res.status(500).end("Something went wrong");
      }
    }
  };
}
