export default function handler(req, res) {
  res.status(200).json({
    username: "admin",
    email: "admin@edu.ece.fr",
  });
}
