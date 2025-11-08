const signUpController = async (req, res) => {
  const { name, email, username, password, confirmPassword } = req.body;

  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from signUpController" });
  }
};

const loginController = async (req, res) => {
  const { identifier, password } = req.body;

  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from loginController" });
  }
};

module.exports = { signUpController, loginController };
