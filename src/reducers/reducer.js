import { 
	STORE_ALL_SLUGS,
	SET_ACTIVE_SLUG,
	STORE_PLACE_DATA,
} from './constants';

export const initialState = {};

const reducer = (state, action) => {
	switch(action.type) {
	case STORE_ALL_SLUGS:
		return {
			...state,
			slugs: action.payload,
		};
	case SET_ACTIVE_SLUG: {
		return {
			...state,
			activeSlug: action.payload
		};
	}
	case STORE_PLACE_DATA: {
		return {
			...state,
			place: action.payload,
		};
	}
	default:
		return {
			...state,
		};
	}
}; 

export default reducer;