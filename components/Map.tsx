import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const Map: React.FunctionComponent = () => {

  // google maps api araştır
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      />
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%'
  }
})