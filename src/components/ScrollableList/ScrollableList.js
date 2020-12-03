import React from 'react';
import styled from 'styled-components';
import { useContextReducer } from '../../context';
import { SET_ACTIVE_SLUG } from '../../reducers/constants';
import ScrollableListItem from './ListItem';

function ScrollableList() {
	const [{ slugs, activeSlug }, dispatch] = useContextReducer();
    
	return (
		<ListWrapperStyled>
			<UlStyled>
				{slugs?.map(data => {
					return <ScrollableListItem 
						key={data.slug}
						slug={data.slug}
						title={data.name}
						rating={data.rating}
						active={data.slug == activeSlug}
						handleClick={handleClick}
					/>;
				})}
			</UlStyled>
		</ListWrapperStyled>
	);
    
	function handleClick(slug) {
		dispatch({ type: SET_ACTIVE_SLUG, payload: slug });
	}
}

var ListWrapperStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	background-color: ${({ theme }) => theme.colors.background};
	border-left: 1px solid ${({ theme }) => theme.colors.borderPrimary};
	border-left: 1px solid ${({ theme }) => theme.colors.borderPrimary};
`;

var UlStyled = styled.ul`
	display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
	margin: 0;
	overflow: auto;
	list-style:none;
`;

export default ScrollableList;
