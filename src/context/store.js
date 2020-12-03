import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export const AppProvider = ({ reducer, initialState, children }) => (
	<AppContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</AppContext.Provider>
);

AppProvider.propTypes = {
	reducer: PropTypes.func.isRequired,
	initialState: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export const useContextReducer = () => useContext(AppContext);