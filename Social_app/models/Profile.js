const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 23
  },
  website: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  status:{
    type: String,
    required:true
  },
  bio: {
    type: String
  },
  githubProfile: {
    type: String
  },
  experience: [
    {
      position: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: String
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],

  social: {
    linkedin: {
      type: String
    },

    youtube: {
      type: String
    },

    facebook: {
      type: String
    }
  },

date:{
    type:Date,
    default:Date.now 
}
});


module.exports=  mongoose.model('profile',ProfileSchema)