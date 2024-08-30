import { View, Text, SafeAreaView, ScrollViewComponent, ViewComponent, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import {images} from '../../constants'
import FormFeild from '@/components/FormFeild'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import SelectButton from '@/components/SelectButton'

// import { createUser } from '../../lib/appwrite'
const signup = () => {
 const [form,setForm] = useState({username:'',email:'',password:''});
 const [isSubmitting, setIsSubmitting] = useState(false);

//  const submit= async () =>{
//   if(!form.email||!form.username||!form.password){
//     Alert.alert('Error','Please fill in all the feilds')
//   }
//   setIsSubmitting(true);
//   try {
//     const result= await createUser(form.email,form.password,form.username)

//     router.replace('/home')

//   } catch (error) {
//     Alert.alert('Error',error.message)
//   }finally{
//     setIsSubmitting(false);
//   }
    
//  }
  const options = ['Admin', 'Guard'];

  return (
    <SafeAreaView className='bg-primary h-full'>
      <GestureHandlerRootView>
      <ScrollView>
        <View className='w-full min-h-[100vh] justify-center px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[200px] h-[85px]' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Register to Vers</Text>

          <FormFeild 
          title='Username'
          value={form.username} 
          handleChangeText={(e)=>setForm({...form,username:e})} 
          otherStyles='mt-7' />
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
          <SelectButton title='Select your Role' containerStyle='mt-7' options={options} optionStyle='bg-secondary'/>
          <CustomButton title='Sign Up' containerStyle='mt-7' 
          handlePress={()=>router.push('/home')} />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg font-pregular text-gray-100'>
                Already have an account?
            </Text>
            <Link href='/signin' className='text-secondary font-psemibold text-lg'>SignIn</Link>
          </View>
        </View>
      </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default signup




// com.aman.aora