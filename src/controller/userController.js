import User from "../model/user.js";

export const getUser = async (req, res) => {
  await User.getAllUsers()
    .then(([rows]) => {
      // Destructuring the rows from the result
      return res.status(200).json(rows); // Sending only the rows to the client
    })
    .catch((err) => {
      return res.status(500).json({
        message: `Database ${err.message}`,
      });
    });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "ID is not found" });
  }

  try {
    const result = await User.userByIdGet(id);

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: `Database ${err.message}` });
  }
};

export const postUser = async (req, res) => {
  const { firstname, lastname, address, username } = req.body;

  try {
    if (!firstname || !lastname || !address || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await User.userPost({ firstname, lastname, address, username });
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    return res.status(500).json({ error: `Database ${err.message}` });
  }
};

export const updateUserById = async (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, address, username } = req.body;

  try {
    if (!firstname || !lastname || !address || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await User.updateByIduser(id, { firstname, lastname, address, username });
    res.status(201).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: `Database ${err.message}` });
  }
};

export const deleteUserById = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    await User.userDelete(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: `Database ${err.message}` });
  }
};
