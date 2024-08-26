import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import {icons} from '../../constants'
import { Image } from 'react-native';

const TabIcon = ({icons,color,name,focused}) => {
    return(
        <View className='items-center justify-center h-full w-full gap-2'>
            <Image source={icons}
            tintColor={color}
            resizeMode='contain'
            className='w-6 h-6' />
            <Text className={`${focused?'font-psemibold':'font-pregular'} text-xs`} style={{color:color}}>{name}</Text>
        </View>
    )
}

const TabsLayout= () => {
  return (
    <>
        <Tabs screenOptions={{tabBarShowLabel:false,
            tabBarActiveTintColor:'#FFA001',
            tabBarInactiveTintColor:'#CDCDE0',
            tabBarStyle:{
                backgroundColor:'#161622',
                borderTopColor:'#232533',
                borderTopWidth:1,
                height:64,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
            },
        }}>
            <Tabs.Screen name='home'
            options={{
                title:'Home',
                headerShown: false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                    icons={icons.home}
                    color={color}
                    name='Home'
                    focused={focused} />
                ),
            }}/>
            <Tabs.Screen name='create'
            options={{
                title:'Create',
                headerShown: false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                    icons={icons.plus}
                    color={color}
                    name='Create'
                    focused={focused} />
                )
            }} />
            <Tabs.Screen name='bookmark'
            options={{
                title:'Bookmarks',
                headerShown: false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                    icons={icons.bookmark}
                    color={color}
                    name='Bookmarks'
                    focused={focused} />
                )
            }} />
            <Tabs.Screen name='profile'
            options={{
                title:'Profile',
                headerShown: false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                    icons={icons.profile}
                    color={color}
                    name='Profile'
                    focused={focused} />
                )
            }} />
        </Tabs>
    </>
  )
}

export default TabsLayout;