const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");

const connections = new Map();

async function createConnection(config) {
  const conn = await mysql.createConnection(config);
  const token = uuidv4();
  connections.set(token, conn);
  return { token };
}

function getConnection(token) {
  return connections.get(token);
}

module.exports = {
  createConnection,
  getConnection,
};
