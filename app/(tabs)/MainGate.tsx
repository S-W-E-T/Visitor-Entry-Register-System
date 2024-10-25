import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

interface Entry {
  date: string;
  inTime: string;
  outTime: string;
  purpose: string;
  elaboration?: string;
  showElaboration: boolean;
}

const MainGate: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [manualDate, setManualDate] = useState(date.toLocaleDateString());
  const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [elaboration, setElaboration] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [showElaborationInput, setShowElaborationInput] = useState(false);
  const [showSearchPicker, setShowSearchPicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setManualDate(currentDate.toLocaleDateString());
  };

  const addEntry = () => {
    if (inTime && outTime && purpose && manualDate) {
      const newEntry: Entry = {
        date: manualDate,
        inTime,
        outTime,
        purpose,
        elaboration: elaboration || '',
        showElaboration: false,
      };
      setEntries([...entries, newEntry]);
      setInTime('');
      setOutTime('');
      setPurpose('');
      setElaboration('');
      setManualDate(date.toLocaleDateString());
      setShowElaborationInput(false);
    } else {
      alert('Please fill in all details.');
    }
  };

  const onSearchDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowSearchPicker(false);
    setSearchDate(currentDate.toLocaleDateString());
  };

  const searchEntriesByDate = () => {
    const results = entries.filter(entry => entry.date === (searchDate || new Date().toLocaleDateString()));
    setFilteredEntries(results.length > 0 ? results : []);
  };

  const toggleElaboration = (index: number) => {
    const updatedEntries = [...entries];
    updatedEntries[index].showElaboration = !updatedEntries[index].showElaboration;
    setEntries(updatedEntries);
  };

  const renderItem = ({ item, index }: { item: Entry; index: number }) => (
    <View>
      <View style={styles.row}>
        <Text style={styles.dateCell}>{item.date}</Text>
        <Text style={styles.cell}>{item.inTime}</Text>
        <Text style={styles.cell}>{item.outTime}</Text>
        <View style={styles.purposeRow}>
          <TextInput style={styles.purposeInput} value={item.purpose} editable={false} />
          {item.elaboration && (
            <TouchableOpacity onPress={() => toggleElaboration(index)}>
              <Ionicons
                name={item.showElaboration ? 'remove-circle-outline' : 'add-circle-outline'}
                size={24}
                color="blue"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {item.showElaboration && item.elaboration ? (
        <View style={styles.elaborationRow}>
          <Text>{item.elaboration}</Text>
        </View>
      ) : null}
    </View>
  );

  const clearSearch = () => {
    setSearchDate('');
    setFilteredEntries([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Entry Details</Text>

      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="DATE"
          value={manualDate}
          onChangeText={setManualDate}
        />
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="IN TIME" value={inTime} onChangeText={setInTime} />
        <TextInput style={styles.input} placeholder="OUT TIME" value={outTime} onChangeText={setOutTime} />
        <View style={styles.purposeContainer}>
          <TextInput
            style={styles.inputPurpose}
            placeholder="PURPOSE"
            value={purpose}
            onChangeText={setPurpose}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => setShowElaborationInput(!showElaborationInput)}>
            <Ionicons name="add-circle-outline" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>

      {showElaborationInput && (
        <TextInput
          style={styles.input}
          placeholder="Elaboration (optional)"
          value={elaboration}
          onChangeText={setElaboration}
        />
      )}

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={onChangeDate}
        />
      )}

      <Button title="Submit" onPress={addEntry} />

      <View style={styles.searchRow}>
        <TextInput style={styles.input} placeholder="Search by Date" value={searchDate} editable={false} />
        <TouchableOpacity onPress={() => setShowSearchPicker(true)}>
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
        <Button title="Search" onPress={searchEntriesByDate} />
        <Button title="Back" onPress={clearSearch} />
      </View>

      {showSearchPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="calendar"
          onChange={onSearchDateChange}
        />
      )}

      <View style={styles.headerRow}>
        <Text style={styles.headerDateCell}>DATE</Text>
        <Text style={styles.headerCell}>IN TIME</Text>
        <Text style={styles.headerCell}>OUT TIME</Text>
        <Text style={styles.headerCell}>PURPOSE</Text>
      </View>

      <FlatList
        data={searchDate ? filteredEntries : entries.filter(entry => entry.date === new Date().toLocaleDateString())}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  purposeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputPurpose: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  purposeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  headerCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerDateCell: {
    flex: 1.2,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
  },
  dateCell: {
    flex: 1.2,
    textAlign: 'center',
    paddingVertical: 8,
  },
  elaborationRow: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default MainGate;
