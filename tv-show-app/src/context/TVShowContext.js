import React, { createContext, useReducer, useEffect, useRef, useCallback } from "react";
import { fetchTVShows } from "../services/apiService";

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
  isFetching: false,
  hasMoreData: true,
};

const ACTIONS = {
  SET_TV_SHOWS: "SET_TV_SHOWS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_PAGE: "SET_PAGE",
  SET_FILTER: "SET_FILTER",
  SET_SORT: "SET_SORT",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
  SET_SHOW_ALL: "SET_SHOW_ALL",
  SET_FETCHING: "SET_FETCHING",
  SET_HAS_MORE: "SET_HAS_MORE",
};

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
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.totalElements,
        loading: false,
        isFetching: false,
      };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false, isFetching: false };
    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload, page: 0, tvShows: [] };
    case ACTIONS.SET_SORT:
      return { ...state, sortBy: action.payload, page: 0, tvShows: [] };
    case ACTIONS.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload, page: 0, tvShows: [] };
    case ACTIONS.SET_SHOW_ALL:
      return { ...state, showAll: action.payload, page: 0, tvShows: [] };
    case ACTIONS.SET_FETCHING:
      return { ...state, isFetching: action.payload };
    case ACTIONS.SET_HAS_MORE:
      return { ...state, hasMoreData: action.payload };
    default:
      return state;
  }
};

export const TVShowContext = createContext();

export const TVShowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tvShowReducer, initialState);
  const observer = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (state.isFetching || !state.hasMoreData) return; // Prevent duplicate calls
      dispatch({ type: ACTIONS.SET_FETCHING, payload: true });

      try {
        const response = await fetchTVShows(
          state.page,
          state.pageSize,
          state.sortBy,
          state.filter
        );

        dispatch({ type: ACTIONS.SET_TV_SHOWS, payload: response });
        dispatch({ type: ACTIONS.SET_HAS_MORE, payload: response.content.length > 0 });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    };

    fetchData();
  }, [state.page, state.pageSize, state.filter, state.sortBy, state.showAll]);

  const lastElementRef = useCallback((node) => {
    if (state.loading || !state.hasMoreData) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch({ type: ACTIONS.SET_PAGE, payload: state.page + 1 });
      }
    });

    if (node) observer.current.observe(node);
  }, [state.page, state.loading, state.hasMoreData]);

  return (
    <TVShowContext.Provider value={{ state, dispatch, lastElementRef }}>
      {children}
    </TVShowContext.Provider>
  );
};
