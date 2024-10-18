import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const EventMapView = ({ events, style }) => {
  return (
    <MapView
      style={[styles.map, style]}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {events.map((event) => (
        <Marker
          key={event.id}
          coordinate={{ latitude: event.latitude, longitude: event.longitude }}
          title={event.name}
          description={event.description}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 200,
  },
});

export default EventMapView;
