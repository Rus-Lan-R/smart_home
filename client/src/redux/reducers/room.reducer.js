import {
  ROOMS_LOADING_START,
  ROOMS_LOADING_ERROR,
  ROOMS_GET_SUCCESS,
  ROOM_ADD,
  ROOM_MARKER_UPDATE,
} from '../types/rooms.types';

export default function roomReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case ROOMS_LOADING_START: {
      return { ...state, isLoading: true };
    }
    case ROOMS_GET_SUCCESS: {
      return { items: payload, isLoading: false, error: null };
    }
    case ROOMS_LOADING_ERROR: {
      return { ...state, isLoading: false, error: payload };
    }
    case ROOM_ADD: {
      const { newRoom } = payload;
      return { items: [...state.items, newRoom] };
    }
    case ROOM_MARKER_UPDATE: {
      const { updatedMarker } = payload;
      return {
        ...state,
        items: [...state.items].map((el) => {
          if (el._id === updatedMarker._id) {
            return updatedMarker;
          }
          return el;
        }),
      };
    }

    case 'DELETE': {
      return { items: [] };
    }

    default: {
      return state;
    }
  }
}
