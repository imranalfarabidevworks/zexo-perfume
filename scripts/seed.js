require("dotenv").config();
const mysql = require("mysql2/promise");
const { products } = require("../data/products");

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  for (const p of products) {
    await connection.execute(
      `INSERT INTO products (slug, name, subtitle, description, price, image_url, accent)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price)`,
      [p.slug, p.name, p.subtitle, p.description, p.price, p.image_url, p.accent]
    );
    console.log(`Seeded: ${p.name}`);
  }

  await connection.end();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
