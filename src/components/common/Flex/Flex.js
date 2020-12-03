import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Flex({ children, }) {
	return (
		<FlexStyled>
			{children}
		</FlexStyled>
	);
}

var FlexStyled = styled.div`
    display: flex;
    flex: 0 0 100%
    width: 100%;
`;

Flex.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.node,
	]).isRequired,
};

export default Flex;
