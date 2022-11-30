import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'
import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import BottomSheet from '@gorhom/bottom-sheet'
import CalloutInside from './CalloutInside'
import { AirbnbRating, Input, Icon } from '@rneui/themed';


// backgroundColor: backgroundAnim.interpolate({
//   inputRange: [0, 1],
//   outputRange: [
//     'rgba(0,0,0,0)',
//     'rgba(0,0,0,1)'
//   ]
// })


const Map: React.FunctionComponent = () => {

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo((): string[] => ['10%', '50%'], [])
  const handleSheetChanges = useCallback((index: number) => { console.log('handleSheetChanges', index) }, [])
  const shadowBackgroundAnim = useRef<any>(new Animated.Value(0)).current

  const [showCreateMarkerModal, setShowCreateMarkerModal] = useState<boolean>(false)
  const [markersArray, setMarkersArray] = useState<React.ReactElement[]>([])
  const [tappedLatLng, setTappedLatLon] = useState<{ latitude: number, longitude: number }>({
    latitude: 0,
    longitude: 0
  })

  //********************************* */
  // CREATE MARKER DATA MODAL
  const TappedMarkerCreatorModal: React.FunctionComponent = () => {

    const [placeTitle, setPlaceTitle] = useState<string>()
    const [placeDescription, setPlaceDescription] = useState<string>()
    const [placeAvgPrice, setPlaceAvgPrice] = useState<string>()

    useEffect(() => {     //shadow animation on modal opening
      Animated.timing(shadowBackgroundAnim, {
        toValue: 0.3,
        duration: 700,
        useNativeDriver: false
      }).start()
    }, [])

    function closeModal() {
      Animated.timing(shadowBackgroundAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false
      }).start()
      setTimeout(() => {
        setShowCreateMarkerModal(false)
      }, 750)
    }
    function createMarker() {

      let data = {
        title: placeTitle,
        description: placeDescription,
        price: placeAvgPrice
      }

      setMarkersArray([...markersArray,
      <Marker
        key={markersArray.length}
        coordinate={{ latitude: tappedLatLng.latitude, longitude: tappedLatLng.longitude }}
        pinColor={'crimson'}>
        <Callout>
          <CalloutInside data={data} />
        </Callout>
      </Marker>
      ])

      setShowCreateMarkerModal(false)
    }
    return (
      <>
        <Animated.View style={[
          styles.shadowContainer,
          {
            backgroundColor: shadowBackgroundAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,1)']
            })
          }
        ]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.touchableInsideShadowContainer}
            onPress={() => closeModal()}>
            <TouchableWithoutFeedback style={styles.touchableWOFeedbackInsideTO}>
              <View style={styles.tappedMarkerCreatorContainer}>
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
                <Input
                  leftIcon={<Icon name='monetization-on' />}
                  placeholder='Avg. Price'
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                    setPlaceAvgPrice(e.nativeEvent.text)
                  }}
                />
                <AirbnbRating
                  size={20}
                  reviewSize={15}
                  defaultRating={4}
                  showRating={true}
                />
                <TouchableOpacity
                  style={styles.saveButtonContainer}
                  onPress={() => { createMarker() }}
                >
                  <Text style={styles.saveButtonText}>save</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Animated.View>
      </>
    )
  }

  function setTappedLocationInfo(e: any) {
    setShowCreateMarkerModal(true)

    let lat = e.nativeEvent.coordinate.latitude
    let lon = e.nativeEvent.coordinate.longitude

    setTappedLatLon({ latitude: lat, longitude: lon })
  }
  //********************************* */

  return (
    <View style={styles.container}>
      {showCreateMarkerModal && <TappedMarkerCreatorModal />}
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
        index={0}
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
    height: '100%',
  },
  tappedMarkerCreatorContainer: {
    zIndex: 100,
    width: '90%',
    height: 350,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  saveButtonText: {
    color: 'crimson',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1
  },
  saveButtonContainer: {
    bottom: 0,
    position: 'absolute',
    width: '50%',
    height: 35,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadowContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    //backgroundColor: 'rgba(0,0,0,0.2)'
  },
  touchableInsideShadowContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -100
  },
  touchableWOFeedbackInsideTO: {
    width: '90%',
    height: 350
  }

})