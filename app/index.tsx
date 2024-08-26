import { Image, ScrollViewBase, ScrollViewComponent, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font';
import { Redirect, router  } from 'expo-router';
import { Link, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
SplashScreen.preventAutoHideAsync(); // to prevent hiding before all of the assests are loaded.

const index = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  //useEffect: allow us to perform some action while the page is loading
  useEffect(()=>{
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded,error])

  if(!fontsLoaded && !error) return null;

  return (
    <SafeAreaView className='bg-primary h-full'>
      <GestureHandlerRootView>
      <ScrollView contentContainerStyle={{height:'100%'
        }}>
        <View className='w-full justify-center items-center min-h-[100vh] p-4'>
          <Image source={images.logo} 
          className='w-[230px] h-[100px]'
          resizeMode='contain' />
          <Image source={images.cards} 
          className='w-[500px] h-[400px]'
          resizeMode='contain' />
          <View className='relative w-full px-10'>
            <Text className='text-3xl text-white font-bold text-center'>Start Registering entries with{` `} <Text className='text-secondary-200'>Vers</Text></Text>
            <Image source={images.path}
            className='w-[136px] h-[15px] absolute -bottom-2 right-20' 
            resizeMode='contain'/>
          </View>
          {/* <View className='w-full'><Text className='text-sm font-pregular mt-7 w-full text-gray-100 text-center'>Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text></View> */}
          <CustomButton 
          title="Continue with Email"
          handlePress={()=>router.push('/signin')}
          containerStyle='w-full mt-7' />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
      </GestureHandlerRootView>
      
    </SafeAreaView>
  )
}

export default index

// const styles = StyleSheet.create({
//     titleContainer:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center',
//         gap:8,
//     }
// })