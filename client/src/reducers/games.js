import { combineReducers } from 'redux';
import { ActionTypes, PER_PAGE } from '../constants';


const byID = (state={}, action) => {
	switch(action.type) {
		case ActionTypes.FETCH_GAMES_SUCCESS:
		case ActionTypes.FETCH_GAMES_I_KNOW_SUCCESS:
		case ActionTypes.FETCH_GAMES_I_OWN_SUCCESS:
		case ActionTypes.TOGGLE_GAME_OWNERSHIP_SUCCESS:
		case ActionTypes.TOGGLE_GAME_KNOWLEDGE_SUCCESS:
			if (action.payload)
				return {
					...state,
					...action.payload.entities.games
				}
			break;

		default:
			return state;
	}
}


const list = (state=[], action) => {
	switch(action.type) {
		case ActionTypes.FETCH_GAMES_SUCCESS:
		case ActionTypes.FETCH_GAMES_I_KNOW_SUCCESS:
		case ActionTypes.FETCH_GAMES_I_OWN_SUCCESS:
			return action.payload.result;

		default:
			return state;
	}
}


const page = (state=0, action) => {
	switch(action.type) {
		case ActionTypes.PAGINATE_GAMES:
			return state + 1;

		case ActionTypes.FILTER_GAMES:
			return 1;

		default:
			return state;
	}
}


const query = (state=null, action) => {
	switch(action.type) {
		case ActionTypes.FILTER_GAMES:
			return action.payload;

		default:
			return state;
	}
}


const isFetching = (state=false, action) => {
	switch(action.type) {
		case ActionTypes.FETCH_GAMES_SUCCESS:
		case ActionTypes.FETCH_GAMES_FAILURE:
		case ActionTypes.FETCH_GAMES_I_KNOW_SUCCESS:
		case ActionTypes.FETCH_GAMES_I_KNOW_FAILURE:
		case ActionTypes.FETCH_GAMES_I_OWN_SUCCESS:
		case ActionTypes.FETCH_GAMES_I_OWN_FAILURE:
			return false;

		case ActionTypes.FETCH_GAMES_REQUEST:
		case ActionTypes.FETCH_GAMES_I_KNOW_REQUEST:
		case ActionTypes.FETCH_GAMES_I_OWN_REQUEST:
			return true;

		default:
			return state;
	}
}


const isFiltered = (state=false, action) => {
	switch(action.type) {
		case ActionTypes.FETCH_GAMES_I_KNOW_SUCCESS:
		case ActionTypes.FETCH_GAMES_I_OWN_SUCCESS:
			return true;

		case ActionTypes.FETCH_GAMES_SUCCESS:
		case ActionTypes.FETCH_GAMES_FAILURE:
		case ActionTypes.FETCH_GAMES_I_OWN_FAILURE:
		case ActionTypes.FETCH_GAMES_I_KNOW_FAILURE:
			return false;

		default:
			return state;
	}
}


const usersByID = (state={}, action) => {
	switch(action.type) {
		case ActionTypes.FETCH_GAMES_SUCCESS:
		case ActionTypes.TOGGLE_GAME_OWNERSHIP_SUCCESS:
		case ActionTypes.TOGGLE_GAME_KNOWLEDGE_SUCCESS:
			if (action.payload) {
				return {
					...state,
					...action.payload.entities.users
				}
			}
			break;

		default:
			return state;
	}
}


const bggByID = (state={}, action) => {
	switch(action.type) {
		case ActionTypes.FETCH_BGG_GAMES_SUCCESS:
			if (action.payload)
				return action.payload.entities.bggGames || {};
			break;

		default:
			return state;
	}
}


const bggList = (state=[], action) => {
	switch(action.type) {
		case ActionTypes.FETCH_BGG_GAMES_SUCCESS:
			return action.payload.result;

		default:
			return state;
	}
}


export default combineReducers({
	byID,
	list,
	page,
	query,
	isFetching,
	isFiltered,
	usersByID,
	bggByID,
	bggList,
});


/* Selectors */

const normalize = (str) => {
	if (!str)
		return '';

	const [ a, e, i, o, u, c ] = 'aeiouc';
	const dict = {
		'â': a, 'à': a, 'ä': a,
		'é': e, 'è': e, 'ê': e, 'ë': e,
		'î': i, 'ï': i,
		'ô': o, 'œ': o + e,
		'û': u, 'ü': u,
		'ç': c,
	};

	return str
		.split('')
		.map(c => dict[c] ? dict[c] : c)
		.join('');
}


const getUsers = (state, ids) => (
	ids.map(id => state.usersByID[id])
)


export const getGames = (state) => {
	const n = state.page * PER_PAGE;
	const query = normalize(state.query)
	const pattern = new RegExp(query, 'i');

	const matchesFilter = (game) => {
		if (!query)
			return true;

		return game.sort_name.search(pattern) > -1;
	};

	const getGame = (id) => {
		const game = state.byID[id];
		return {
			...game,
			owners: getUsers(state, game.owners || []),
			knowers: getUsers(state, game.knowers || []),
		};
	}

	return state.list
		.map(getGame)
		.filter(matchesFilter)	// search
		.slice(0, n);  					// pagination
};

export const getBggGames = (state) => {
	return state.bggList.map(id => state.bggByID[id])
};