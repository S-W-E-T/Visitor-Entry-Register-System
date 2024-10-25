import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Reusable LocationButton component
const LocationButton: React.FC<{ title: string; navigateTo: string }> = ({ title, navigateTo }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(navigateTo)}>
      <Icon name="add-circle-outline" size={30} color="#000" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const create: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Location buttons embedded here */}
      <View style={styles.buttonsContainer}>
        <LocationButton title="Main Gate" navigateTo="MainGate" />
        <LocationButton title="Girls Hostel" navigateTo="GirlsHostel" />
        <LocationButton title="Boys Hostel" navigateTo="BoysHostel" />
      </View>
    </SafeAreaView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#fff',
    width: '80%',
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default create;
