import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native'
import React, { useMemo, useRef, useCallback, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import BottomSheet from '@gorhom/bottom-sheet'
import CalloutInside from './CalloutInside'
import { AirbnbRating, Input, Icon } from '@rneui/themed';



const Map: React.FunctionComponent = () => {

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo((): string[] => ['10%', '50%'], [])
  const handleSheetChanges = useCallback((index: number) => { console.log('handleSheetChanges', index) }, [])

  const [markersArray, setMarkersArray] = useState<React.ReactElement[]>([])
  const [tappedLatLng, setTappedLatLon] = useState<{ latitude: number, longitude: number }>({
    latitude: 0,
    longitude: 0
  })

  const TappedMarkerCalloutInside: React.FunctionComponent = () => {

    const [placeTitle, setPlaceTitle] = useState<string>()
    const [placeDescription, setPlaceDescription] = useState<string>()

    return (
      <>
        <View style={styles.shadowContainer}>
          <View style={styles.tappedMarkerCalloutInsideContainer}>
            <Input
              leftIcon={<Icon name='place' />}
              placeholder='Place'
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                setPlaceTitle(e.nativeEvent.text)
              }}
            />
            <Input
              leftIcon={<Icon name='info-outline' />}
              placeholder='Description'
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                setPlaceDescription(e.nativeEvent.text)
              }}
            />
            <AirbnbRating
              size={25}
              reviewSize={15}
              defaultRating={4}
              showRating={true}
            />
            <TouchableOpacity
              style={styles.saveButtonContainer}
              onPress={() => { console.log('bastik') }}
            >
              <Text style={styles.saveButtonText}>save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }


  function setTappedLocationInfo(e: any) {

    let arrayLen = markersArray.length
    let lat = e.nativeEvent.coordinate.latitude
    let lon = e.nativeEvent.coordinate.longitude

    setTappedLatLon({
      latitude: lat,
      longitude: lon
    })

    setMarkersArray([
      ...markersArray,
      <Marker
        key={arrayLen}
        coordinate={{
          latitude: lat,
          longitude: lon
        }}
        pinColor={'crimson'}>
        <Callout>
          <CalloutInside />
        </Callout>
      </Marker>
    ])

  }


  return (
    <View style={styles.container}>
      <TappedMarkerCalloutInside />
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
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >

      </BottomSheet>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  tappedMarkerCalloutInsideContainer: {
    zIndex: 100,
    width: '90%',
    height: 300,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 20,
    paddingBottom: 30,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  saveButtonText: {
    color: 'crimson',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1
  },
  saveButtonContainer: {
    bottom: 10,
    position: 'absolute'
  },
  shadowContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  }

})