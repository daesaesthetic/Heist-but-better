const Database = require('@replit/database');
const db = new Database();

const DEFAULTS = { puffs: 0, battery: 50, name: 'Vaporella', skin: 'default' };

async function getUser(userId) {
  let user = await db.get(userId);
  if (!user) {
    user = { ...DEFAULTS };
    await db.set(userId, user);
  }
  return user;
}

async function saveUser(userId, user) {
  await db.set(userId, user);
}

module.exports = { getUser, saveUser };
