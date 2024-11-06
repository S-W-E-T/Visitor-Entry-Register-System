import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, Pressable, Animated } from 'react-native';

const DropUpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // Animation value for rotation
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const options = ['boys', 'girls', 'main'];

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(rotateAnimation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Reset rotation when closing menu
    Animated.spring(rotateAnimation, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
    setShowForm(true);
  };

  // Create interpolated rotation value
  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg']
  });

  return (
    <View>
      {/* Form Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showForm}
        onRequestClose={() => setShowForm(false)}
      >
        <Pressable 
          className="flex-1 justify-center items-center bg-black/50"
          onPress={() => setShowForm(false)}
        >
          <Pressable 
            className="bg-white p-6 rounded-lg w-[80%]"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-xl font-bold mb-4">Form</Text>
            
            <Text className="text-sm text-gray-600 mb-2">Selected Option</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-4"
              value={selectedOption}
              editable={false}
            />
            
            <TouchableOpacity
              onPress={() => setShowForm(false)}
              className="bg-secondary py-2 px-4 rounded-md"
            >
              <Text className="text-white text-center font-semibold">Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Dropup Menu */}
      {isOpen && (
        <View className="absolute bottom-20 right-4 w-32 bg-white rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleOptionSelect(option)}
              className="py-3 px-4 border-b border-gray-200"
            >
              <Text className="text-gray-800 capitalize text-center">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Main Button */}
      <View className="justify-end flex flex-row">
        <TouchableOpacity
          onPress={toggleMenu}
          className="bg-secondary h-14 w-14 rounded-full justify-center items-center shadow-lg"
          style={{ elevation: 4 }}
        >
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <View className="w-5 h-5">
              {/* Plus/Cross Icon */}
              <View 
                className="absolute top-[9] left-0 w-5 h-[2] bg-white rounded-full"
                style={{ opacity: isOpen ? 0 : 1 }} 
              />
              <View 
                className="absolute top-0 left-[9] w-[2] h-5 bg-white rounded-full" 
                style={{ opacity: isOpen ? 0 : 1 }}
              />
              <View 
                className="absolute rotate-[45deg] top-0 left-[9] w-[2] h-5 bg-white rounded-full" 
                style={{ opacity: isOpen ? 1 : 0 }}
              />
              <View 
                className="absolute rotate-[-45deg] top-0 left-[9] w-[2] h-5 bg-white rounded-full" 
                style={{ opacity: isOpen ? 1 : 0 }}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DropUpButton;