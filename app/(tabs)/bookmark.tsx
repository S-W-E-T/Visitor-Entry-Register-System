import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useFetchAccessRequests from '@/hooks/accessHooks/useFetchAccessRequest'
const bookmark = () => {
  const {loading,accessRequests}=useFetchAccessRequests();
  console.log(accessRequests);
  return (
    <SafeAreaView>
      {/* You must start your coding after this */}
      <View>
        <Text>Bookmarks</Text>
      </View>
    </SafeAreaView>
  )
}

export default bookmark