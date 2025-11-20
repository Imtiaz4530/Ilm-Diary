const Ilm = require("../models/ilm.model");
const User = require("../models/user.model");

const profileRecords = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const records = await Ilm.find({ creator: user.username }).sort({
      createdAt: -1,
    });

    res.status(200).json(records);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from profileRecords" });
  }
};

module.exports = { profileRecords };
