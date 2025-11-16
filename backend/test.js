import sql from './db.js';

async function main() {
    const result = await sql`SELECT NOW()`;
    console.log("Database time:", result);
    process.exit(0);
}

main();
