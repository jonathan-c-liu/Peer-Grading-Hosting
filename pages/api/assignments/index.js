const db = require("../../../models/index.js");
const Op = db.Sequelize.Op;
const responseHandler = require("../utils/responseHandler");

const assignmentsHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        if (!req.query.courseId) {
          throw new Error("Query parameter courseId required");
        }
        const params = { courseId: req.query.courseId };

        if (req.query.minReviewDueDate) {
          params.reviewDueDate = {
            [Op.gte]: new Date(req.query.minReviewDueDate),
          };
        }
        if (req.query.graded === "true") {
          params.graded = true;
        }
        if (req.query.reviewStatus) {
          params.reviewStatus = req.query.reviewStatus;
        }

        let assignments = await db.assignments.findAll({ where: params });
        responseHandler.response200(res, assignments);
        break;

      case "POST":
        if (req.query.type === "multiple") {
          await Promise.all(
            req.body.map(assignment => db.assignments.create(assignment)),
          );
        } else {
          await db.assignments.create(req.body);
        }
        responseHandler.msgResponse201(
          res,
          "Successfully created database entries.",
        );
        break;

      default:
        throw new Error("Invalid HTTP method");
    }
  } catch (err) {
    responseHandler.response400(res, err);
  }
};

export default assignmentsHandler;
