import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native'
import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import BottomSheet from '@gorhom/bottom-sheet'


const Map: React.FunctionComponent = () => {

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo((): string[] => ['10%', '50%'], [])
  const handleSheetChanges = useCallback((index: number) => { console.log('handleSheetChanges', index) }, [])

  const [tappedLatLng, setTappedLatLon] = useState<{ latitude: number, longitude: number }>({
    latitude: 0,
    longitude: 0
  })

  const [markersArray, setMarkersArray] = useState<React.ReactElement[]>([])

  function setTappedLocationInfo(e: any) {

    let lat = e.nativeEvent.coordinate.latitude
    let lon = e.nativeEvent.coordinate.longitude

    setTappedLatLon({
      latitude: lat,
      longitude: lon
    })

    setMarkersArray([...markersArray,
    <Marker
      key={lat}
      coordinate={{
        latitude: lat,
        longitude: lon
      }}
      pinColor={'crimson'}
      title={"Test"}
      description={"Test description"} />
    ])
  }


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
        onPress={(e) => { setTappedLocationInfo(e) }}
      >

        {markersArray.length > 0 && markersArray.map((item) => {
          return item
        })}

        {/* <Marker
          coordinate={{
            latitude: tappedLatLng.latitude,
            longitude: tappedLatLng.longitude
          }}
          pinColor={'crimson'}
          title={"Test"}
          description={"Test description"}
        /> */}

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