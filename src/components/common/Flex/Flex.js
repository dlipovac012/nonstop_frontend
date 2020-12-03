import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Flex({ children, justifyBetween, justifyCenter }) {
	return (
		<FlexStyled justifyBetween={justifyBetween} justifyCenter={justifyCenter}>
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
	${({ justifyCenter }) => justifyCenter && `
		justify-content: center;
	`}
`;

Flex.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.node,
	]).isRequired,
	justifyBetween: PropTypes.bool,
	justifyCenter: PropTypes.bool,
};

Flex.defaultProps = {
	justifyBetween: false,
	justifyCenter: false,
};

export default Flex;
