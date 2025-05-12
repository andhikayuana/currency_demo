import { View, StyleSheet } from 'react-native'
import React from 'react'

export default function HorizontalSeparator() {
  return (
    <View style={styles.separator} />
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0'
  }
})
