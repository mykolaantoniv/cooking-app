import app from "./app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`\n🍽  Cooking Assistant API running on http://localhost:${PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET  /recipes`);
  console.log(`  GET  /recipes/:id`);
  console.log(`  POST /recipes/match`);
  console.log(`  POST /shopping-list/from-recipe`);
  console.log(`\n`);
});

server.on("error", (error: any) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error(error);
  }
  process.exit(1);
});
