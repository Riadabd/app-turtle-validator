import { app, errorHandler } from "mu";
import { validate } from "./validator";
import bodyParser from "body-parser";

var textParser = bodyParser.text();

app.get("/", function (req, res) {
  res.send("Hello turtle validator!");
});

app.post("/validate", textParser, (req, res) => {
  validate(req.body, function (feedback) {
    res.send(JSON.stringify(feedback));
  });
});

app.use(errorHandler);
