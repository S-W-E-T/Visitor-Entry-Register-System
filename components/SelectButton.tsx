import { View , Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

const SelectButton = ({title,handlePress,containerStyle,textStyle,isLoading,options,optionStyle}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectOption, setSelectOption] = useState(null);

  return (
    <View className={`space-y-2 ${containerStyle}`}>
        <Text className={`text-base text-gray-100 font-pmedium`}>{title}</Text>
      <TouchableOpacity
        className={`border-2 border-black-100 flex-row rounded-2xl w-full h-16 justify-between px-4 bg-black-100 focus:border-secondary items-center`}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text className={`text-white font-psemibold text-lg ${textStyle}`}>{selectOption || "Select an Option"}</Text>
        <Icon
          name={isOpen ? "arrow-drop-up" : "arrow-drop-down"}
          size={35}
          color="gray"
        />
      </TouchableOpacity>

      {isOpen && (
        <View className={`relative w-full mt-1 max-h-60 border border-gray-500 ${optionStyle} shadow rounded-lg`}>
          <ScrollView>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="items-center justify-center p-4 border-b border-black"
                onPress={() => {
                  setSelectOption(option);
                  setIsOpen(false);
                  console.log(`${option} selected`);
                }}
              >
                <Text className="font-psemibold text-gray-800">{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SelectButton;
