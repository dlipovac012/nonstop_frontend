import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapComponent({ location, zoom, width, height }) {
	const [, setMap] = useState(null);

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, []);
     
	const onUnmount = useCallback(function callback() {
		setMap(null);
	}, []);

	return (
		<MapWrapper>
			<LoadScript
				googleMapsApiKey={process.env.GOOGLE_API_KEY}
			>
				<GoogleMap
					mapContainerStyle={{
						width,
						height,
					}}
					center={{
						lat: location?.lat || 0,
						lng: location?.lon || 0,
					}}
					zoom={zoom}
					onLoad={onLoad}
					onUnmount={onUnmount}
				/>
			</LoadScript>
		</MapWrapper>
	);
}

var MapWrapper = styled.div`
    display: flex;
    padding: 16px;
`;

MapComponent.propTypes = {
	location: PropTypes.object.isRequired,
	zoom: PropTypes.number,
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
};

MapComponent.defaultProps = {
	zoom: 10,
};

export default MapComponent;
