export const fetchUsers = () => async dispatch => {
  // fetch all the users for messaging
};

export const fetchMessage = receiverId => async dispatch => {
  // fetch the message of a particular chat
};

export const fetchLastMessage = receiverId => async dispatch => {
  // fetch last message sent to particular receiver
};

export const sendMessage = (receiverId, text) => async dispatch => {
  //   send message to particular user
};
