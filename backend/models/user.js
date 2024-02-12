import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String], // Array of role names
    default: ['user'], // Default role for new users
  },
}, {
  timestamps: true, // Enable timestamps for createdAt and updatedAt
});

userSchema.methods.matchPassword = async function (enteredPassword)
{
  return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model('User', userSchema);

















// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
// }, {
//   timestamps: true, // Enable timestamps for createdAt and updatedAt
// });

// export default mongoose.model('User', userSchema);
