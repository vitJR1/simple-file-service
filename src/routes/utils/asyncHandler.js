import { validationResult } from "express-validator";
import { RequestError } from "./RequestError.js";

export default function (func) {
  return async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      res.status(200).send(
        await func({
          user: req.user,
          param: req.param,
          body: req.body,
          query: req.query,
          headers: req.headers,
        }),
      );
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
