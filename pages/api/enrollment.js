const db = require("../../models/index.js");
const Enrollment = db.enrollment;
const Op = db.Sequelize.Op;

export default (req, res) => {
  switch (req.method) {
    case "GET":
      db.enrollment
        .findByPk(req.body.enrollment_type)
        .then((result) => res.json(result));

      break;
    case "POST":
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
        break;
      }
      console.log("i made it");
      console.log(req.body);
      // Create an enrollment
      const enrollment = {
        enrollment_type: req.body.enrollment_type,

        // published: req.body.published ? req.body.published : false
      };
      // Save enrollment in the database
      Enrollment.create(enrollment)
        .then((data) => {
          res.send(data);
          res.json(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the enrollment.",
          });
        });

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};

/*
export default (req, res) => {
  consol;
  // Validate request
  if (!req.body.title) {
    console.log(req);
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create an enrollment
  const enrollment = {
    title: req.body.title,
    description: req.body.description,
    // published: req.body.published ? req.body.published : false
  };
  // Save enrollment in the database
  Enrollment.create(enrollment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the enrollment.",
      });
    });
};
*/
