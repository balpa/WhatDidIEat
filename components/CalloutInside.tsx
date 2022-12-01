import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Icon } from '@rneui/themed';

interface PropTypes {
  data: {
    title: string | undefined,
    description: string | undefined,
    price: string | undefined
  },
  setIsCalloutOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CalloutInside = ({ data, setIsCalloutOpen }: PropTypes) => {


  return (
    <View style={styles.container}>
      <View style={styles.infoContainers}>
        <Icon name='place' />
        <Text style={styles.titleText}>{data.title}</Text>
      </View>
      <View style={styles.infoContainers}>
        <Icon name='description' />
        <Text>{data.description}</Text>
      </View>
      <View style={styles.infoContainers}>
        <Icon name='monetization-on' />
        <Text style={styles.priceText}>{data.price}</Text>
      </View>
      {/* <View><Text>image mb</Text></View> */}
    </View>
  )
}

export default CalloutInside

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  infoContainers: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
  }

})