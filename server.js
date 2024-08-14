// Menjalankan server
const app = require("./auth_backend/app");
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
