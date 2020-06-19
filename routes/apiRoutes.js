const db = require("../models");

module.exports = function (app) {
  app.get("/api/workouts", function (req, res) {
    db.Workout.find()
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.status(400).json(error);
      })
  });

  app.post("/api/workouts", async (req, res)=> {
    try{
      const response = await db.Workout.create({type: "workout"})
      res.json(response);
    }
    catch(err){
      res.status(400).json(error);
    }
  })

  app.put("/api/workouts/:id", ({body, params}, res) => {
    const workoutId    = params.id;
    let savedExercises = [];

    db.Workout.find({_id: workoutId})
      .then(dbWorkout => {
        savedExercises   = dbWorkout[0].exercises;
        let allExercises = [...savedExercises, body];

        updateWorkout(allExercises);
        res.json(savedExercises);
      })
      .catch(error => {
        res.status(400).json(error);
      });

    function updateWorkout(exercises){
      db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(error, doc){
        if(error){
          res.status(400).json(error);
        }
      })
    }        
  })

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(error => {
      res.status(400).json(error);
    });
  }); 
};
