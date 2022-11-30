import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface PropTypes {
  data: {
    title: string | undefined,
    description: string | undefined,
    price: string | undefined
  }
}

const CalloutInside = ({ data }: PropTypes) => {

  console.log(data)
  return (
    <View style={styles.container}>
      <View style={styles.infoContainers}>
        <Text style={styles.titleText}>
          {data.title}
        </Text>
      </View>
      <View style={styles.infoContainers}>
        <Text>
          {data.description}
        </Text>
      </View>
      <View style={styles.infoContainers}>
        <Text style={styles.priceText}>
          {data.price}
        </Text>
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
    margin: 10
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800'
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700'
  }

})