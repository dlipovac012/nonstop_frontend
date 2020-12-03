import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Column({ children, noPadding }) {
	return (
		<ColumnWrapper noPadding={noPadding}>
			{children}
		</ColumnWrapper>
	);
}

var ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;${({ noPadding }) => noPadding ? 'padding: 0;' : 'padding: 8px;'}
    margin: 0;
`;

Column.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.node,
	]).isRequired,
	noPadding: PropTypes.bool,
};

Column.defaultProps = {
	noPadding: false,
};

export default Column;
