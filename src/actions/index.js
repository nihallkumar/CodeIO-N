export const updatestatekeyword = (data) => {
  return {
    type: 'UPDATE_ROOM_VARIABLE',
    payload: data,
  };
};

export const updateroomid = (data) => {
  return {
    type: 'UPDATE_ROOM_ID',
    payload: data,
  };
};

export const updateuserid = (data) => {
  return {
    type: 'UPDATE_USER_ID',
    payload: data,
  };
};
