import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const authLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='signin' options={{headerShown:false}}/>
        <Stack.Screen name='signup' options={{headerShown:false}}/>
        
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default authLayout