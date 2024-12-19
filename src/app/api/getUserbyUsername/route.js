import User from "../models/User"; // Your User model

export async function getUserByUsername(username) {
  try {
    const user = await User.findOne({ username })
      .populate("role", "name") // Populate role to fetch role name
      .exec();
    return user;
  } catch (error) {
    throw error;
  }
}
