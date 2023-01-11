import { Parser } from "n3";

export function validate(turtleStream, callBack) {
  const parser = new Parser({ format: "text/turtle" });

  let feedback = { warnings: [], errors: [] };

  parser.parse(turtleStream, function (error, triple, prefixes) {
    if (error) {
      feedback.errors.push(error.message);
    }

    if (triple) {
      if (triple.object.termType === "literal") {
        let value = triple.object.value;
        let type = triple.object.datatype;

        type = type.replace("http://www.w3.org/2001/XMLSchema#", "");
        if (regexp[type] && !regexp[type].test(value)) {
          feedback.warnings.push(
            "xsd:",
            type,
            "does not validate for literal. {",
            triple.subject.value,
            triple.predicate.value,
            triple.object.value,
            "}"
          );
        }
      }
    } else {
      callBack(feedback);
    }
  });
}
