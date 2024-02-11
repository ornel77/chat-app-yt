import User from "../models/user.model.js";

export const getUsersForSiderbar = async (req, res) => {
  try {
    // get the current person logged in ID
    const loggedInUserId = req.user._id

    // fetch all user from the database except me
    // the option $ne : not equal
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

    res.status(200).json(filteredUsers)

  } catch (error) {
    console.error('error in getUsersForSiderbar controller', error.message);
    res.status(500).json({ error: 'internal server error' });
  }
};
