export default function (func) {
  return async (req, res) => {
    try {
      res.status(200).send(
        await func({
          user: req.user,
          param: req.param,
          body: req.body,
          query: req.query,
        }),
      );
    } catch (e) {
      res.status(500).end("Something went wrong");
    }
  };
}
