import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Flex({ children, justifyBetween }) {
	return (
		<FlexStyled justifyBetween={justifyBetween}>
			{children}
		</FlexStyled>
	);
}

var FlexStyled = styled.div`
    display: flex;
    flex: 0 0 100%
	width: 100%;
	${({ justifyBetween }) => justifyBetween && `
		justify-content: space-between;
	`}
`;

Flex.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.node,
	]).isRequired,
	justifyBetween: PropTypes.bool,
};

Flex.defaultProps = {
	justifyBetween: false,
};

export default Flex;
