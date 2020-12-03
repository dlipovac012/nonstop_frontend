import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ScrollableListItem({ slug, title, rating, active, handleClick }) {
	return (
		<ListItemStyled active={active} onClick={() => handleClick(slug)}>
			<TitleWrapper>
				{title}
			</TitleWrapper>
			<RatingWrapper>
				{`Rating: ${rating.toFixed(2)}`}
			</RatingWrapper>
		</ListItemStyled>
	);
}

var ListItemStyled = styled.li`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-basis: 100%;
    min-height: 80px;
    position: relative;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};

    ${({ active, theme }) => active && `
        background: ${theme.colors.backgroundActive};
    `}

    &:hover {
        box-sizing: border-box;
        background-color: ${({ theme }) => theme.colors.backgroundHover};
        cursor: pointer;
    }
`;

var TitleWrapper = styled.p`
    display: flex;
    align-items: center;
    font-size: 1.15em;
    font-weight: 600;
    padding: 0 32px;
`;

var RatingWrapper = styled.span`
    display: inline-flex;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 4px 8px;
`;

ScrollableListItem.propTypes = {
	slug: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	rating: PropTypes.number,
	active: PropTypes.bool,
	handleClick: PropTypes.func,
};

ScrollableListItem.defaultProps = {
	rating: 0,
	active: false,
	handleClick: () => false,
};

export default ScrollableListItem;
