const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercises: [ 
    {
      type: {
        type: String,
        trim: true,
        required: "Enter exercise type."
      },
      name: {
        type: String,
        trim: true,
        required: "Enter workout name."
      },
      duration: {
        type: String,
        trim: true,
        required: "Enter exercise duration."
      },
      weight: {
        type: String,
        trim: true
      },
      reps: {
        type: String,
        trim: true
      },
      sets: {
        type: String,
        trim: true
      },
      distance: {
        type: String,
        trim: true
      }
    }
  ],
  day: {
    type: Date,
    default: Date.now
  }
},
{
  toJSONFormat: {
    virtuals: true
  }
}
);

workoutSchema.virtual("totalDuration").get( () => { this.exercises.reduce((total, exercise) => {return total + exercise.duration;}, 0); });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;