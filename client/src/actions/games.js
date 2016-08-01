import { CALL_API } from 'redux-api-middleware';

import { ActionTypes, API_ENDPOINT_URL, Schemas } from '../constants';


export const fetchGames = () => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games`,
		method: 'GET',
		types: [
			ActionTypes.FETCH_GAMES_REQUEST,
			{
				type: ActionTypes.FETCH_GAMES_SUCCESS,
				meta: { schema: Schemas.GAMES },
			},
			ActionTypes.FETCH_GAMES_FAILURE,
		],
	}
});


export const paginateGames = () => ({
	type: ActionTypes.PAGINATE_GAMES,
});


export const toggleGameOwnership = (id) => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/${id}/owners`,
		method: 'PATCH',
		credentials: 'include',
		types: [
			ActionTypes.TOGGLE_GAME_OWNERSHIP_REQUEST,
			{
				type: ActionTypes.TOGGLE_GAME_OWNERSHIP_SUCCESS,
				meta: { schema: Schemas.GAME },
			},
			ActionTypes.TOGGLE_GAME_OWNERSHIP_FAILURE,
		],
	}
});


export const toggleGameKnowledge = (id) => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/${id}/knowers`,
		method: 'PATCH',
		credentials: 'include',
		types: [
			ActionTypes.TOGGLE_GAME_KNOWLEDGE_REQUEST,
			{
				type: ActionTypes.TOGGLE_GAME_OWNERSHIP_SUCCESS,
				meta: { schema: Schemas.GAME },
			},
			ActionTypes.TOGGLE_GAME_KNOWLEDGE_FAILURE,
		],
	}
});