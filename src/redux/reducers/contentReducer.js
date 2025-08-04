import { SET_CONTENT, CONTENT_FETCH_FAIL } from '../types';

const initialState = {
  currentContent: 'Lütfen giriş yapın veya bir içerik seçin.',
  error: null,
};

export default function content(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT:
      return {
        ...state,
        currentContent: action.payload,
        error: null,
      };
    case CONTENT_FETCH_FAIL:
      return {
        ...state,
        error: 'İçerik çekilirken bir hata oluştu.',
      };
    default:
      return state;
  }
}