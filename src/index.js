import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AppProvider } from './context';
import AppReducer, { initialState } from './reducers/reducer';
import Home from './scenes/home';

import theme from './theme';

function App() {
	return (
		<StrictMode>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<AppProvider initialState={initialState} reducer={AppReducer}>
					<Home />
				</AppProvider>
			</ThemeProvider>
		</StrictMode>
	);
}

var GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0 auto;
        padding: 0;
    }
    *, *::after, *::before {
        font-family: Arial, Helvetica, sans-serif;
        box-sizing: border-box;
    }
    body {
        width: ${({ theme }) => theme.screenWidths.xl.width}px;
        background-color: ${({ theme }) => theme.colors.backgroundSecondary};
        color: ${({ theme }) => theme.colors.text};
    }
`;

render(<App />, document.getElementById('app'));