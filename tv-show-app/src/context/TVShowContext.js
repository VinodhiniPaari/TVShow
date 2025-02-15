import React, { createContext, useReducer, useEffect } from "react";
import { fetchTVShows } from "../services/apiService";

// Initial State
const initialState = {
  tvShows: [],
  page: 0,
  totalPages: 1,
  totalRecords: 0,
  loading: false,
  error: null,
  filter: "",
  sortBy: "name",
  pageSize: 10,
  showAll: false,
};

// Actions
const ACTIONS = {
  SET_TV_SHOWS: "SET_TV_SHOWS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_PAGE: "SET_PAGE",
  SET_FILTER: "SET_FILTER",
  SET_SORT: "SET_SORT",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
  SET_SHOW_ALL: "SET_SHOW_ALL",
};

// Reducer function
const tvShowReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_TV_SHOWS:
      return {
        ...state,
        tvShows: state.showAll
          ? [...state.tvShows, ...action.payload.content]
          : action.payload.content,
        totalPages:
          action.payload.totalPages ||
          Math.ceil(action.payload.totalElements / state.pageSize),
        totalRecords:
          action.payload.totalElements || state.tvShows.length * state.pageSize,
        loading: false,
      };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload, page: 0, tvShows: [] };
    case ACTIONS.SET_SORT:
      return { ...state, sortBy: action.payload, page: 0, tvShows: [] };
    case ACTIONS.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload, page: 0, tvShows: [] };
    case ACTIONS.SET_SHOW_ALL:
      return {
        ...state,
        showAll: action.payload,
        page: 0,
        tvShows: [],
      };
    default:
      return state;
  }
};

export const TVShowContext = createContext();

export const TVShowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tvShowReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      try {
        const response = await fetchTVShows(
          state.page,
          state.pageSize,
          state.sortBy,
          state.filter
        );
        dispatch({ type: ACTIONS.SET_TV_SHOWS, payload: response });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    };

    fetchData();
  }, [state.page, state.pageSize, state.filter, state.sortBy, state.showAll]);

  return (
    <TVShowContext.Provider value={{ state, dispatch }}>
      {children}
    </TVShowContext.Provider>
  );
};
