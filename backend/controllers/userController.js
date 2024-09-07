const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required!" });
    }

    const validPassword = password === process.env.PASSWORD;
    const validUsername = username === process.env.USERNAME;

    if (validPassword && validUsername) {
      return res.status(200).json({ username: username, message: "Success" });
    }

    res.status(401).json({ message: "Invalid username or password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong." });
  }
};

module.exports = {
  login,
};
