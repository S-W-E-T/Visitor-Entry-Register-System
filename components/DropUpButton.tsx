import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react-native";

const DropUpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Animation value for rotation
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const options = ["Hostel-1","Kautilya", "Girls", "Main"];

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(rotateAnimation, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
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
      tension: 40,
    }).start();
    setShowForm(true);
  };

  // Create interpolated rotation value
  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });
  const [date, setDate] = useState(new Date());
  const [inTime, setInTime] = useState(new Date());
  const [outTime, setOutTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showInTimePicker, setShowInTimePicker] = useState(false);
  const [showOutTimePicker, setShowOutTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleInTimeChange = (event, selectedTime) => {
    setShowInTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setInTime(selectedTime);
    }
  };

  const handleOutTimeChange = (event, selectedTime) => {
    setShowOutTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setOutTime(selectedTime);
    }
  };

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
            <Text className="text-xl font-bold mb-4">New Entry</Text>
            <Text className="text-lg font-plight ">
              Kindly fill the details correctly.
            </Text>
            <Text className="text-lg font-plight mb-4">
              kripya saari ......
            </Text>

            <Text className="text-sm font-psemibold text-gray-600 mb-2">
              Selected Gate
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-4"
              value={selectedOption}
              editable={false}
            />
            <Text className="text-sm font-psemibold text-gray-600 mb-2">
              Name
            </Text>
            <TextInput className="border border-gray-300 rounded-md p-2 mb-4" />
            <Text className="text-sm font-semibold text-gray-600 mb-2">
              Date
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="relative"
            >
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-4 bg-white pl-10"
                value={format(date, "dd/MM/yyyy")}
                editable={false}
                placeholder="Select date"
              />
              <Calendar
                className="absolute left-2 top-2"
                size={20}
                color="#6B7280"
              />
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}

            <Text className="text-sm font-semibold text-gray-600 mb-2">
              In Time
            </Text>
            <Pressable
              onPress={() => setShowInTimePicker(true)}
              className="relative"
            >
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-4 bg-white pl-10"
                value={format(inTime, "hh:mm a")}
                editable={false}
                placeholder="Select in time"
              />
              <Clock
                className="absolute left-2 top-2"
                size={20}
                color="#6B7280"
              />
            </Pressable>
            {showInTimePicker && (
              <DateTimePicker
                value={inTime}
                mode="time"
                onChange={handleInTimeChange}
                minuteInterval={15}
              />
            )}

            <Text className="text-sm font-semibold text-gray-600 mb-2">
              Out Time
            </Text>
            <Pressable
              onPress={() => setShowOutTimePicker(true)}
              className="relative"
            >
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-4 bg-white pl-10"
                value={format(outTime, "hh:mm a")}
                editable={false}
                placeholder="Select out time"
              />
              <Clock
                className="absolute left-2 top-2"
                size={20}
                color="#6B7280"
              />
            </Pressable>
            {showOutTimePicker && (
              <DateTimePicker
                value={outTime}
                mode="time"
                onChange={handleOutTimeChange}
                minuteInterval={15}
              />
            )}

            <TouchableOpacity
              onPress={() => {setShowForm(false);
                setDate(new Date());
                setInTime(new Date());
                setOutTime(new Date());
                setSelectedOption("");
                setShowDatePicker(false);
                setShowInTimePicker(false);
                setShowOutTimePicker(false);}}
              className="bg-secondary py-2 px-4 rounded-md"
            >
              <Text className="text-white text-center font-semibold">
                Submit
              </Text>
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
              <Text className="text-gray-800 capitalize text-center">
                {option}
              </Text>
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
