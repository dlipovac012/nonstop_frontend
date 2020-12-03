import React, { useEffect } from 'react';
import styled from 'styled-components';
import Details from '../../components/Details';
import ScrollableList from '../../components/ScrollableList';
import NetworkManager from '../../utils/api';
import { useContextReducer } from '../../context';
import { SET_ACTIVE_SLUG, STORE_ALL_SLUGS } from '../../reducers/constants';

function Home() {
	const [, dispatch] = useContextReducer();

	useEffect(() => {
		(async () => {
			try {
				const data = (await NetworkManager.get('/places/all')).data;

				dispatch({ type: STORE_ALL_SLUGS, payload: data });
				dispatch({ type: SET_ACTIVE_SLUG, payload: data ? data[0]?.slug : undefined });
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<HomeStyled>
			<ListWrapper>
				<ScrollableList />
			</ListWrapper>
			<DetailsWrapper>
				<Details />
			</DetailsWrapper>
		</HomeStyled>
	);
}

var HomeStyled = styled.div`
    display: flex;
	margin: 0 auto;
	height: 100vh;
`;

var ListWrapper = styled.div`
	display: flex;
	flex: 1;
`;

var DetailsWrapper = styled.div`
	display: flex;
	flex: 2;
`;

export default Home;