import { View, Text } from 'react-native'
import React from 'react'

interface PropTypes {
  data: Object
}

const CalloutInside = ({ data }: PropTypes) => {
  return (
    <View>
      <Text>CalloutInside</Text>
    </View>
  )
}

export default CalloutInside