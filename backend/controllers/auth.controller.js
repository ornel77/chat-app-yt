import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const login = (req, res) => {
  console.log('loginUser');
};
export const logout = (req, res) => {
  console.log('logoutUser');
};

/* -------------------------------------------------------------------------- */
/*                                   SIGN UP                                  */
/* -------------------------------------------------------------------------- */
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, gender, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.send(400).json({ error: "Passwords don't match" });
    }

    // check if the username is in the db
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the pwd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // create user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // save the user to the DB
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'invalid user data' });
    }
  } catch (error) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
