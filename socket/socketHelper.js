let users = [];

const addUser = ({ id, name, rooms, userId }) => {
  const existingUser = users.find(
    user => user.rooms === rooms && user.name === name && user.userId === userId
  );

  if (existingUser) return { error: "user already added" };

  if (!name || (!rooms.room1 && !rooms.room2))
    return { eror: "username and rooms are required" };

  const user = { id, name, rooms, userId };

  users.push(user);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) return users.splice(index, 1);
};

const getUser = id => users.find(user => user.userId === id);

module.exports = { addUser, removeUser, getUser };
