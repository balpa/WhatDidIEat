import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useRef, useCallback } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import BottomSheet from '@gorhom/bottom-sheet';

const Map: React.FunctionComponent = () => {

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['10%', '50%'], []) // two states-nothing between
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])



  // google maps api araştır
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
      </BottomSheet>
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