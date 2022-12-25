export const initialState = {
  isRoomCode: false,
  RoomDetails: {
    RoomId: '',
    UserId: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ROOM_VARIABLE':
      return { ...state, isRoomCode: true };
    case 'UPDATE_ROOM_ID':
      return {
        ...state,
        RoomDetails: { ...state.RoomDetails, RoomId: action.payload },
      };
    case 'UPDATE_USER_ID':
      return {
        ...state,
        RoomDetails: { ...state.RoomDetails, UserId: action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
