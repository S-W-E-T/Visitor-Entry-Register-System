import { View, Text, SafeAreaView, ScrollViewComponent, ViewComponent, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import {images} from '../../constants'
import FormFeild from '@/components/FormFeild'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
// import { signIn } from '../../lib/appwrite'
const signin = () => {
 const [form,setForm] = useState({email:'',password:''});
 const [isSubmitting, setIsSubmitting] = useState(false);

//  const submit= async () =>{
//   if(!form.email||!form.password){
//     Alert.alert('Error','Please fill in all the feilds')
//   }
//   setIsSubmitting(true);
//   try {
//     await signIn(form.email,form.password)

//     router.replace('/home')

//   } catch (error) {
//     Alert.alert('Error',error.message)
//   }finally{
//     setIsSubmitting(false);
//   }
    
//  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      <GestureHandlerRootView>
      <ScrollView>
        <View className='w-full min-h-[85vh] justify-center px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[200px] h-[85px]' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Vers</Text>

          <FormFeild 
          title='Email'
          value={form.email} 
          handleChangeText={(e)=>setForm({...form,email:e})} 
          otherStyles='mt-7' 
          keyboardType='email-address' />
          <FormFeild 
          title='Password'
          value={form.password} 
          handleChangeText={(e)=>setForm({...form,password:e})} 
          otherStyles='mt-7' />
          <CustomButton title='Sign In' containerStyle='mt-7' 
          isLoading={isSubmitting} />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg font-pregular text-gray-100'>
                Don't have account?
            </Text>
            <Link href='/signup' className='text-secondary font-psemibold text-lg'>SignUp</Link>
          </View>
        </View>
      </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default signin