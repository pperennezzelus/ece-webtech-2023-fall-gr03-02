import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // JSON file containing all the users informations
  const filePath = path.join(process.cwd(), "data", "users.json");

  // Read the file asynchronously
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Error reading user data" });
    }

    // Parse the data
    const users = JSON.parse(data);

    // Get the current user's data
    const email = req.query.email;

    // Find the user by email
    const user = users.find((u) => u.email === email);

    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
}
