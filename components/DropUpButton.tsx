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
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react-native";
import useCreatePost from "@/hooks/postHooks/useCreatePost";

export enum Location {
  MAIN = "MAIN",
  KBH = "KBH",
  KGH = "KGH",
  H1 = "H1",
  OTHER = "OTHER",
}

const LocationSelector = ({ options, handleOptionSelect }) => (
  <View
    className="absolute bottom-20 right-4 w-32 bg-white rounded-lg shadow-lg overflow-hidden"
    style={{ zIndex: 50 }}
  >
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
);

const DatePickerField = ({
  label,
  date,
  showPicker,
  setShowPicker,
  onChange,
}) => (
  <>
    <Text className="text-sm font-semibold text-gray-600 mb-2">{label}</Text>
    <Pressable onPress={() => setShowPicker(true)} className="relative">
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4 bg-white pl-10"
        value={format(date, "dd/MM/yyyy")}
        editable={false}
        placeholder={`Select ${label.toLowerCase()}`}
      />
      <Calendar className="absolute left-2 top-2" size={20} color="#6B7280" />
    </Pressable>
    {showPicker && (
      <DateTimePicker
        value={date}
        mode="date"
        onChange={onChange}
        minimumDate={new Date()}
      />
    )}
  </>
);

const TimePickerField = ({
  label,
  time,
  showPicker,
  setShowPicker,
  onChange,
}) => (
  <>
    <Text className="text-sm font-semibold text-gray-600 mb-2">{label}</Text>
    <Pressable onPress={() => setShowPicker(true)} className="relative">
      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4 bg-white pl-10"
        // Conditionally format the time or show a placeholder if `time` is undefined
        value={time ? format(time, "hh:mm a") : `Select ${label.toLowerCase()}`}
        editable={false}
        placeholder={`Select ${label.toLowerCase()}`}
      />
      <Clock className="absolute left-2 top-2" size={20} color="#6B7280" />
    </Pressable>
    {showPicker && (
      <DateTimePicker
        value={time || new Date()}
        mode="time"
        onChange={onChange}
        minuteInterval={15}
      />
    )}
  </>
);

const EntryForm = ({ visible, onClose, onSubmit, data, setData, loading }) => (
  <Modal
    animationType="slide"
    transparent
    visible={visible}
    onRequestClose={onClose}
  >
    <Pressable
      className="flex-1 justify-center items-center bg-black/50"
      onPress={onClose}
    >
      <Pressable
        className="bg-white p-6 rounded-lg w-[80%]"
        onPress={(e) => e.stopPropagation()}
      >
        <Text className="text-xl font-bold mb-4">New Entry</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4"
          value={data.name}
          placeholder="Name"
          onChangeText={(text) => setData({ ...data, name: text })}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4"
          value={data.purpose}
          placeholder="Purpose"
          onChangeText={(text) => setData({ ...data, purpose: text })}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-2 mb-4"
          value={data.description}
          placeholder="Description"
          onChangeText={(text) => setData({ ...data, description: text })}
        />

        <DatePickerField
          label="Date"
          date={data.date}
          showPicker={data.showDatePicker}
          setShowPicker={(value) => setData({ ...data, showDatePicker: value })}
          onChange={(e, selectedDate) => {
            setData({
              ...data,
              date: selectedDate || data.date,
              showDatePicker: Platform.OS === "ios",
            });
          }}
        />
        <TimePickerField
          label="In Time"
          time={data.inTime}
          showPicker={data.showInTimePicker}
          setShowPicker={(value) =>
            setData({ ...data, showInTimePicker: value })
          }
          onChange={(e, selectedTime) => {
            setData({
              ...data,
              inTime: selectedTime || data.inTime,
              showInTimePicker: Platform.OS === "ios",
            });
          }}
        />
        <TimePickerField
          label="Out Time"
          time={data.outTime}
          showPicker={data.showOutTimePicker}
          setShowPicker={(value) =>
            setData({ ...data, showOutTimePicker: value })
          }
          onChange={(e, selectedTime) => {
            setData({
              ...data,
              outTime: selectedTime,
              showOutTimePicker: Platform.OS === "ios",
            });
          }}
        />

        <TouchableOpacity
          onPress={onSubmit}
          className="bg-secondary py-2 px-4 rounded-md"
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  </Modal>
);

const DropUpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({
    name: "",
    purpose: "",
    description: "",
    date: new Date(),
    inTime: new Date(),
    outTime: undefined,
    showDatePicker: false,
    showInTimePicker: false,
    showOutTimePicker: false,
  });
  const { loading, createPost } = useCreatePost(() => {
    setShowForm(false);
    setData({
      ...data,
      name: "",
      purpose: "",
      description: "",
      outTime: undefined,
    });
    // Alert.alert("Success", "Entry added successfully");
  });
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const options = [Location.MAIN, Location.KBH, Location.KGH, Location.H1];

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.parallel([
      Animated.spring(rotateAnimation, {
        toValue,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.timing(fadeAnimation, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setData({ ...data, location: option });
    setIsOpen(false);
    setShowForm(true);
  };

  const handleSubmitEntry = async () => {
    if (!data.name || !data.purpose || !data.inTime || !data.location) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    const entryData = {
      name: data.name,
      purpose: data.purpose,
      inTime: data.inTime.toISOString(),
      outTime: data?.outTime?.toISOString(),
      location: data.location,
      description: data.description || "NA",
    };
    await createPost(entryData);
  };

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View className="relative">
      {isOpen && (
        <Animated.View
          style={{
            opacity: fadeAnimation,
            position: "absolute",
            top: -1000,
            left: -1000,
            right: -1000,
            bottom: -1000,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
          pointerEvents={isOpen ? "auto" : "none"}
          onTouchStart={toggleMenu}
        />
      )}

      <EntryForm
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmitEntry}
        data={data}
        setData={setData}
        loading={loading}
      />

      {isOpen && (
        <LocationSelector
          options={options}
          handleOptionSelect={handleOptionSelect}
        />
      )}

      <View className="justify-end flex flex-row" style={{ zIndex: 50 }}>
        <TouchableOpacity
          onPress={toggleMenu}
          className="bg-secondary h-14 w-14 rounded-full justify-center items-center shadow-lg"
          style={{ elevation: 4 }}
        >
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <View className="w-5 h-5">
              <View className="absolute top-[9] left-0 w-5 h-[1.5] bg-white" />
              <View className="absolute top-0 left-[9] h-5 w-[1.5] bg-white" />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DropUpButton;
