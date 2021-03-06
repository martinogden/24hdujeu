import { CALL_API } from 'redux-api-middleware';

import { ActionTypes, API_ENDPOINT_URL, Schemas } from '../constants';


export const fetchGames = () => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/`,
		method: 'GET',
		credentials: 'include',
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

// sort the games in alphabetical order
export const sortAlpha = () => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/?sort=alpha`,
		method: 'GET',
		credentials: 'include',
		types: [
			ActionTypes.FETCH_GAMES_SORTED_ALPHA_REQUEST,
			{
				type: ActionTypes.FETCH_GAMES_SORTED_ALPHA_SUCCESS,
				meta: { schema: Schemas.GAMES },
			},
			ActionTypes.FETCH_GAMES_SORTED_ALPHA_FAILURE,
		],
	}
});

export const fetchBroughtGames = () => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/brought/`,
		method: 'GET',
		credentials: 'include',
		types: [
			ActionTypes.FETCH_BROUGHT_GAMES_REQUEST,
			{
				type: ActionTypes.FETCH_BROUGHT_GAMES_SUCCESS,
				meta: { schema: Schemas.GAMES },
			},
			ActionTypes.FETCH_BROUGHT_GAMES_FAILURE,
		],
	}
});

export const fetchBroughtGamesSortAlpha = () => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/brought/?sort=alpha`,
		method: 'GET',
		credentials: 'include',
		types: [
			ActionTypes.FETCH_BROUGHT_GAMES_SORTED_ALPHA_REQUEST,
			{
				type: ActionTypes.FETCH_BROUGHT_GAMES_SORTED_ALPHA_SUCCESS,
				meta: { schema: Schemas.GAMES },
			},
			ActionTypes.FETCH_BROUGHT_GAMES_SORTED_ALPHA_FAILURE,
		],
	}
});

export const fetchGamesIKnow = () => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/iknow/`,
		method: 'GET',
		credentials: 'include',
		types: [
			ActionTypes.FETCH_GAMES_I_KNOW_REQUEST,
			{
				type: ActionTypes.FETCH_GAMES_I_KNOW_SUCCESS,
				meta: { schema: Schemas.GAMES },
			},
			ActionTypes.FETCH_GAMES_I_KNOW_FAILURE,
		],
	}
});

export const fetchGamesIOwn = () => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/iown/`,
		method: 'GET',
		credentials: 'include',
		types: [
			ActionTypes.FETCH_GAMES_I_OWN_REQUEST,
			{
				type: ActionTypes.FETCH_GAMES_I_OWN_SUCCESS,
				meta: { schema: Schemas.GAMES },
			},
			ActionTypes.FETCH_GAMES_I_OWN_FAILURE,
		],
	}
});

export const paginateGames = () => ({
	type: ActionTypes.PAGINATE_GAMES,
});


export const toggleDisplay = () => ({
	type: ActionTypes.TOGGLE_DISPLAY,
});

export const filterGames = (query) => ({
	type: ActionTypes.FILTER_GAMES,
	payload: query,
});


export const toggleGameOwnership = (id) => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/${id}/owners/`,
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
		endpoint: `${API_ENDPOINT_URL}/games/${id}/knowers/`,
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

export const fetchBGGGames = (query) => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/bgg/?q=${encodeURIComponent(query)}`,
		method: 'GET',
		credentials: 'include',
		types: [
			ActionTypes.FETCH_BGG_GAMES_REQUEST,
			{
				type: ActionTypes.FETCH_BGG_GAMES_SUCCESS,
				meta: { schema: Schemas.BGG_GAMES },
			},
			ActionTypes.FETCH_BGG_GAMES_FAILURE,
		],
	}
});

export const fetchBGGGame = (bgg_id) => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/bgg/${bgg_id}/`,
		method: 'GET',
		credentials: 'include',
		types: [
			ActionTypes.FETCH_BGG_GAME_REQUEST,
			{
				type: ActionTypes.FETCH_BGG_GAME_SUCCESS,
				meta: { schema: Schemas.BGG_GAME },
			},
			{
				type: ActionTypes.FETCH_BGG_GAME_FAILURE,
				meta: { schema: Schemas.ERRORS },
			},
		],
	}
});

export const addGame = (formData) => ({
	[CALL_API]: {
		endpoint: `${API_ENDPOINT_URL}/games/game/`,
		method: 'POST',
		body: formData2JSON(formData),
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		credentials: 'include',
		types: [
			ActionTypes.ADD_GAME_REQUEST,
			{
				type: ActionTypes.ADD_GAME_SUCCESS,
				meta: { schema: Schemas.GAMES }
			},
			{
				type: ActionTypes.ADD_GAME_FAILURE,
				meta: { schema: Schemas.ERRORS },
			},
		],
	}
});


const formData2JSON = (formData) => {
	const data = {};
	for (const kv of formData.entries())
		data[ kv[0] ] = kv[1].trim();
	return JSON.stringify(data);
};