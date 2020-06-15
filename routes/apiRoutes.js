var Workout = require("../models/workout.js");

module.exports = function(app) {
  app.get("/api/workouts", function(req, res) {
    Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  });

  app.post("/api/workouts", function({ body }, res) {
    Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  });

  app.put("/api/workouts/:id", function(req, res) {
    Workout.updateOne({ _id: req.params.id }, { exercises: req.body })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  });
};
