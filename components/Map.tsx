import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout, MapMarker } from 'react-native-maps'
import BottomSheet from '@gorhom/bottom-sheet'


const Map: React.FunctionComponent = () => {

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo((): string[] => ['10%', '50%'], [])
  const handleSheetChanges = useCallback((index: number) => { console.log('handleSheetChanges', index) }, [])

  const [tappedLatLng, setTappedLatLng] = useState<{ latitude: number | null, longitude: number | null }>({
    latitude: null,
    longitude: null
  })

  let markers = [
    {
      latitude: 41.05,
      longitude: 29.90,
      title: 'Foo Place',
      subtitle: '1234 Foo Drive'
    }
  ];

  // google maps api araştır / tasarım çiz
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: 41,
          longitude: 29.015,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2
        }}
        onPress={(e) => {
          setTappedLatLng({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.latitude
          })
        }}
      >
        <Marker
          coordinate={{
            latitude: 41,
            longitude: 29
          }}
          pinColor={'crimson'}
          title={"Test"}
          description={"Test description"}
        />

      </MapView>
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >

      </BottomSheet> */}
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