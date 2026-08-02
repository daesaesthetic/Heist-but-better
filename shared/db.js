const fs = require('fs');
const FILE = './data/users.json';

function load() {
  try {
    const raw = fs.readFileSync(FILE, 'utf8').trim();
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function getUser(userId) {
  const data = load();
  if (!data[userId]) {
    data[userId] = { puffs: 0, battery: 50, name: 'Vaporella', skin: 'default' };
    save(data);
  }
  return { data, user: data[userId] };
}

module.exports = { load, save, getUser };
