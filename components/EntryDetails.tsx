// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Animated,
//     Modal,
//     Dimensions,
//     Keyboard,
//     TextInput,
//     Pressable,
//   } from "react-native";
//   import React, { useRef, useState } from "react";
//   import { SafeAreaView, ScrollView } from "react-native";
//   import { GestureHandlerRootView } from "react-native-gesture-handler";
//   import { useAuth } from "@/context/AuthContext";
//   import { Feather } from "@expo/vector-icons";

// const EntryDetails = () =>{
//     const [activeGate, setActiveGate] = useState("Main");
//     const [selectedEntry, setSelectedEntry] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedEntry, setEditedEntry] = useState(null);

//     // Animation values
//     const slideAnim = useRef(new Animated.Value(0)).current;
//     const fadeAnim = useRef(new Animated.Value(0)).current;
//     const { height: SCREEN_HEIGHT } = Dimensions.get("window");

//     const entryData = {
//         Main: {
//           "2024-03-11": [
//             {
//               id: "1",
//               name: "Adarsh Kumar",
//               time: "9:00 AM - 9:05AM",
//               purpose: "DELIVERY",
//               description: "NA",
//             },
//             {
//               id: "2",
//               name: "Adarsh Kumar",
//               time: "9:00 AM - 9:05AM",
//               purpose: "PARENTS",
//               description: "FOR 3..",
//             },
//           ],
//           "2024-03-10": [
//             {
//               id: "3",
//               name: "John Doe",
//               time: "10:00 AM - 10:15AM",
//               purpose: "VISITOR",
//               description: "Meeting with department head",
//             },
//           ],
//         },
//         KBH: {
//           "2024-03-11": [
//             {
//               id: "4",
//               name: "Jane Smith",
//               time: "11:00 AM - 11:30AM",
//               purpose: "SERVICE",
//               description: "Maintenance work",
//             },
//           ],
//         },
//         KGC: {
//           "2024-03-09": [
//             {
//               id: "5",
//               name: "Mike Johnson",
//               time: "2:00 PM - 2:30PM",
//               purpose: "GUEST",
//               description: "Family visit",
//             },
//           ],
//         },
//         "Hostel-1": {
//           "2024-03-09": [
//             {
//               id: "5",
//               name: "Mike Johnson",
//               time: "2:00 PM - 2:30PM",
//               purpose: "GUEST",
//               description: "Family visit during college fest",
//             },
//           ],
//         },
//       };
    
//       const [localEntryData, setLocalEntryData] = useState(entryData);
//       const gates = ["Main", "KBH", "KGC", "Hostel-1"];
    
//       // Function to format date
//       const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const today = new Date();
//         const yesterday = new Date(today);
//         yesterday.setDate(yesterday.getDate() - 1);
    
//         if (dateString === today.toISOString().split("T")[0]) {
//           return "Today";
//         } else if (dateString === yesterday.toISOString().split("T")[0]) {
//           return "Yesterday";
//         } else {
//           return date.toLocaleDateString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           });
//         }
//       };
    
//       // Date Header Component
//       const DateHeader = ({ date }) => (
//         <View className="flex-row justify-center pt-2 px-4 items-center bg-white">
//           <Text className="bg-gray-100 rounded-xl px-2 text-sm font-semibold text-gray-600">
//             {formatDate(date)}
//           </Text>
//         </View>
//       );
    
//       // Animation functions
//       const animateIn = () => {
//         Animated.parallel([
//           Animated.timing(slideAnim, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//           Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: true,
//           }),
//         ]).start();
//       };
    
//       const animateOut = (callback) => {
//         Animated.parallel([
//           Animated.timing(slideAnim, {
//             toValue: 0,
//             duration: 250,
//             useNativeDriver: true,
//           }),
//           Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 250,
//             useNativeDriver: true,
//           }),
//         ]).start(callback);
//       };
    
//       const handleRowPress = (entry) => {
//         setSelectedEntry(entry);
//         setEditedEntry({ ...entry });
//         setModalVisible(true);
//       };
    
//       const handleCloseModal = () => {
//         if (isEditing) {
//           // Show confirmation dialog if there are unsaved changes
//           const hasChanges =
//             JSON.stringify(editedEntry) !== JSON.stringify(selectedEntry);
//           if (hasChanges) {
//             // You might want to add a confirmation dialog here
//             setIsEditing(false);
//             setEditedEntry({ ...selectedEntry });
//           } else {
//             animateOut(() => {
//               setModalVisible(false);
//               setIsEditing(false);
//               setEditedEntry(null);
//             });
//           }
//         } else {
//           animateOut(() => {
//             setModalVisible(false);
//             setEditedEntry(null);
//           });
//         }
//       };
    
//       const handleSave = () => {
//         setLocalEntryData((prevData) => {
//           const updatedGateData = { ...prevData[activeGate] };
    
//           // Find the date that contains the entry being edited
//           const dateWithEntry = Object.entries(updatedGateData).find(
//             ([date, entries]) =>
//               entries?.some((entry) => entry.id === editedEntry.id)
//           );
    
//           if (dateWithEntry) {
//             const [date, entries] = dateWithEntry;
//             updatedGateData[date] = entries.map((entry) =>
//               entry.id === editedEntry.id ? editedEntry : entry
//             );
//           }
    
//           return {
//             ...prevData,
//             [activeGate]: updatedGateData,
//           };
//         });
    
//         setSelectedEntry(editedEntry);
//         setIsEditing(false);
//         // Show success feedback (you can implement a toast here)
//       };
    
//       // Edit form component
//       const EditForm = ({ entry, onChange }) => (
//         <View className="space-y-4">
//           <View>
//             <Text className="text-sm font-semibold text-gray-500 mb-1">Name</Text>
//             <TextInput
//               className="border border-gray-200 rounded-md p-2 text-base"
//               value={entry.name}
//               onChangeText={(text) => onChange({ ...entry, name: text })}
//             />
//           </View>
    
//           <View>
//             <Text className="text-sm font-semibold text-gray-500 mb-1">Time</Text>
//             <TextInput
//               className="border border-gray-200 rounded-md p-2 text-base"
//               value={entry.time}
//               onChangeText={(text) => onChange({ ...entry, time: text })}
//             />
//           </View>
    
//           <View>
//             <Text className="text-sm font-semibold text-gray-500 mb-1">
//               Purpose
//             </Text>
//             <TextInput
//               className="border border-gray-200 rounded-md p-2 text-base"
//               value={entry.purpose}
//               onChangeText={(text) => onChange({ ...entry, purpose: text })}
//             />
//           </View>
    
//           <View>
//             <Text className="text-sm font-semibold text-gray-500 mb-1">
//               Description
//             </Text>
//             <TextInput
//               className="border border-gray-200 rounded-md p-2 text-base"
//               value={entry.description}
//               onChangeText={(text) => onChange({ ...entry, description: text })}
//               multiline
//               numberOfLines={3}
//             />
//           </View>
//         </View>
//       );
    
//       // Detail Modal Component
//       const DetailModal = () => (
//         <Modal
//           animationType="none"
//           transparent={true}
//           visible={modalVisible}
//           onShow={animateIn}
//           onRequestClose={handleCloseModal}
//         >
//           <Animated.View
//             className="flex-1 justify-center items-center bg-black/50"
//             style={{ opacity: fadeAnim }}
//           >
//             <Animated.View
//               className="bg-white rounded-lg w-[90%] max-h-[80%]"
//               style={{
//                 transform: [
//                   {
//                     translateY: slideAnim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [SCREEN_HEIGHT, 0],
//                     }),
//                   },
//                 ],
//               }}
//             >
//               {/* Modal Header */}
//               <View className="flex-row justify-between items-center p-4 bg-secondary">
//                 <Text className="text-lg font-semibold text-white">
//                   {isEditing ? "Edit Entry" : "Entry Details"}
//                 </Text>
//                 <TouchableOpacity onPress={handleCloseModal}>
//                   <Feather name="x" size={24} color="white" />
//                 </TouchableOpacity>
//               </View>
    
//               {/* Modal Content */}
//               <ScrollView className="p-4">
//                 {isEditing ? (
//                   <EditForm entry={editedEntry} onChange={setEditedEntry} />
//                 ) : (
//                   <View className="space-y-4">
//                     <View>
//                       <Text className="text-sm font-semibold text-gray-500">
//                         Name
//                       </Text>
//                       <Text className="text-base text-gray-700">
//                         {selectedEntry?.name}
//                       </Text>
//                     </View>
    
//                     <View>
//                       <Text className="text-sm font-semibold text-gray-500">
//                         Time
//                       </Text>
//                       <Text className="text-base text-gray-700">
//                         {selectedEntry?.time}
//                       </Text>
//                     </View>
    
//                     <View>
//                       <Text className="text-sm font-semibold text-gray-500">
//                         Purpose
//                       </Text>
//                       <Text className="text-base text-gray-700">
//                         {selectedEntry?.purpose}
//                       </Text>
//                     </View>
    
//                     <View>
//                       <Text className="text-sm font-semibold text-gray-500">
//                         Description
//                       </Text>
//                       <Text className="text-base text-gray-700">
//                         {selectedEntry?.description}
//                       </Text>
//                     </View>
//                   </View>
//                 )}
//               </ScrollView>
    
//               {/* Modal Footer */}
//               <View className="flex-row justify-end p-4 border-t border-gray-200 space-x-2">
//                 {isEditing ? (
//                   <>
//                     <TouchableOpacity
//                       onPress={() => {
//                         setIsEditing(false);
//                         setEditedEntry({ ...selectedEntry });
//                       }}
//                       className="px-4 py-2 bg-gray-100 rounded-md"
//                     >
//                       <Text className="text-gray-700">Cancel</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={handleSave}
//                       className="px-4 py-2 bg-secondary rounded-md flex-row items-center space-x-1"
//                     >
//                       <Feather name="check" size={16} color="white" />
//                       <Text className="text-white">Save</Text>
//                     </TouchableOpacity>
//                   </>
//                 ) : (
//                   <>
//                     <TouchableOpacity
//                       onPress={handleCloseModal}
//                       className="px-4 py-2 bg-gray-100 rounded-md"
//                     >
//                       <Text className="text-gray-700">Close</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => setIsEditing(true)}
//                       className="px-4 py-2 bg-secondary rounded-md flex-row items-center space-x-1"
//                     >
//                       <Feather name="edit-2" size={16} color="white" />
//                       <Text className="text-white">Edit</Text>
//                     </TouchableOpacity>
//                   </>
//                 )}
//               </View>
//             </Animated.View>
//           </Animated.View>
//         </Modal>
//       );
    
//       // Grid Row Component
//       // Grid Row Component
//       const GridRow = ({ data, isHeader = false }) => (
//         <TouchableOpacity
//           onPress={() => !isHeader && handleRowPress(data)}
//           className={`flex-row border-b border-gray-200 px-4 py-3 ${
//             isHeader ? "bg-gray-50" : "bg-white"
//           }`}
//           disabled={isHeader}
//         >
//           <View className="flex-1">
//             <Text
//               className={`text-sm ${isHeader ? "font-semibold" : "text-gray-700"}`}
//               numberOfLines={1}
//             >
//               {isHeader ? "NAME" : data.name}
//             </Text>
//           </View>
//           <View className="flex-1 mr-1">
//             <Text
//               className={`text-sm ${isHeader ? "font-semibold" : "text-gray-700"}`}
//               numberOfLines={1}
//             >
//               {isHeader ? "IN TIME - OUT TIME" : data.time}
//             </Text>
//           </View>
//           <View className="flex-1 flex-row items-center justify-between">
//             <Text
//               className={`text-sm ${isHeader ? "font-semibold" : "text-gray-700"}`}
//               numberOfLines={1}
//             >
//               {isHeader ? "PURPOSE" : data.purpose}
//             </Text>
//             {!isHeader && (
//               <TouchableOpacity
//                 onPress={(e) => {
//                   e.stopPropagation();
//                   handleRowPress(data);
//                 }}
//               >
//                 <Feather name="eye" size={16} color="#666" />
//               </TouchableOpacity>
//             )}
//           </View>
//         </TouchableOpacity>
//       );
//       return (
//         <SafeAreaView className="flex-1 bg-[#f2f2f2]">
//           <GestureHandlerRootView>
//             <ScrollView contentContainerClassName={{ height: "100%" }}>
//                     <View className="flex-row justify-between mb-4 space-x-2">
//                       {gates.map((gate) => (
//                         <TouchableOpacity
//                           key={gate}
//                           onPress={() => setActiveGate(gate)}
//                           className={`flex-1 p-2 rounded-md justify-center items-center
//                           ${activeGate === gate ? "bg-secondary" : "bg-gray-100"}`}
//                         >
//                           <Text
//                             className={`text-sm 
//                             ${
//                               activeGate === gate
//                                 ? "font-psemibold"
//                                 : "text-gray-700"
//                             }`}
//                           >
//                             {gate}
//                           </Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
    
//                     {/* Entries Grid */}
//                     <View className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
//                       {/* Header Row */}
//                       <GridRow isHeader={true} />
    
//                       {/* Scrollable Content with Date Groups */}
//                       <ScrollView className="flex-1">
//                         {Object.entries(localEntryData[activeGate] || {})
//                           .sort(
//                             ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
//                           )
//                           .map(([date, entries]) => (
//                             <View key={date}>
//                               <DateHeader date={date} />
//                               {(entries || []).map((entry) => (
//                                 <GridRow key={entry.id} data={entry} />
//                               ))}
//                             </View>
//                           ))}
//                       </ScrollView>
//                     </View>
//                     <DetailModal />
//             </ScrollView>
//           </GestureHandlerRootView>
//         </SafeAreaView>
//       );
// }

// export default EntryDetails;
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useCallback, useMemo } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import useFetchPosts from "@/hooks/postHooks/useFetchPosts";

interface Post {
  _id: string;
  name: string;
  purpose: string;
  inTime: string;
  outTime: string | null;
  userId: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const EntryDetails = () => {
  const { posts, loading, refetchPosts } = useFetchPosts();
  const [activeGate, setActiveGate] = useState("Main");
  const [selectedEntry, setSelectedEntry] = useState<Post | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  // Organize posts by gate and date
  const organizedPosts = useMemo(() => {
    const organized: Record<string, Record<string, Post[]>> = {};
    
    posts.forEach(post => {
      const gate = post.location || 'Main';
      const date = new Date(post.createdAt).toISOString().split('T')[0];
      
      if (!organized[gate]) {
        organized[gate] = {};
      }
      if (!organized[gate][date]) {
        organized[gate][date] = [];
      }
      
      organized[gate][date].push(post);
    });

    return organized;
  }, [posts]);

  // Get unique gates from posts
  const gates = useMemo(() => {
    return Array.from(new Set(posts.map(post => post.location || 'Main')));
  }, [posts]);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return organizedPosts[activeGate] || {};

    const searchLower = searchQuery.toLowerCase();
    const filtered: Record<string, Post[]> = {};

    Object.entries(organizedPosts[activeGate] || {}).forEach(([date, entries]) => {
      const matchedEntries = entries.filter(entry =>
        entry.name.toLowerCase().includes(searchLower) ||
        entry.purpose.toLowerCase().includes(searchLower) ||
        entry.description?.toLowerCase().includes(searchLower)
      );

      if (matchedEntries.length > 0) {
        filtered[date] = matchedEntries;
      }
    });

    return filtered;
  }, [organizedPosts, activeGate, searchQuery]);

  // Animation handlers
  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animateOut = useCallback((callback: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(callback);
  }, []);

  // Format time for display
  const formatTime = (inTime: string, outTime: string | null) => {
    const formatTimeString = (time: string) => {
      return new Date(time).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    };

    return `${formatTimeString(inTime)} - ${outTime ? formatTimeString(outTime) : 'Present'}`;
  };

  // Handler functions
  const handleRowPress = (entry: Post) => {
    setSelectedEntry(entry);
    setEditedEntry({ ...entry });
    setModalVisible(true);
    animateIn();
  };

  const handleCloseModal = () => {
    if (isEditing) {
      const hasChanges = JSON.stringify(editedEntry) !== JSON.stringify(selectedEntry);
      if (hasChanges) {
        setIsEditing(false);
        setEditedEntry(selectedEntry ? { ...selectedEntry } : null);
      } else {
        animateOut(() => {
          setModalVisible(false);
          setIsEditing(false);
          setEditedEntry(null);
        });
      }
    } else {
      animateOut(() => {
        setModalVisible(false);
        setEditedEntry(null);
      });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Gates Selector */}
        <View className="flex-row justify-center items-center w-full mx-auto mb-4">
          {gates.map((gate) => (
            <TouchableOpacity
              key={gate}
              onPress={() => setActiveGate(gate)}
              className={`mr-2 px-4 py-2 rounded-full ${
                activeGate === gate ? "bg-secondary" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  activeGate === gate ? "text-white" : "text-gray-600"
                }`}
              >
                {gate}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      {/* Search Bar */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center bg-white rounded-lg px-3 py-2 border border-gray-200">
          <Feather name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Search entries..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Entries List */}
      <ScrollView className=''>
        {Object.entries(filteredPosts).map(([date, entries]) => (
          <ScrollView key={date} className="">
            <View className="flex flex-row justify-center items-center bg-white py-2 px-4">
                 <Text className="rounded-xl bg-gray-100 text-center font-semibold text-gray-600 w-3/4">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
             
            </View>
            {entries.map((entry) => (
              <TouchableOpacity
                key={entry._id}
                onPress={() => handleRowPress(entry)}
                className="border rounded shadow-xl flex-row items-center bg-white p-4 border-b border-gray-200"
              >
                <View className="flex-1">
                  <Text className="font-medium">{entry.name}</Text>
                  <Text className="text-gray-600 text-sm">
                    {formatTime(entry.inTime, entry.outTime)}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-600 mr-2">{entry.purpose}</Text>
                  <Feather name="chevron-right" size={20} color="#666" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ))}
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Animated.View
          className="flex-1 justify-center items-center bg-black/50"
          style={{ opacity: fadeAnim }}
        >
          <Animated.View
            className="bg-white rounded-lg w-[90%] max-h-[80%]"
            style={{
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [SCREEN_HEIGHT, 0],
                  }),
                },
              ],
            }}
          >
            <View className="flex-row justify-between items-center p-4 bg-secondary">
              <Text className="text-lg font-semibold text-white">
                Entry Details
              </Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              {selectedEntry && (
                <View className="space-y-4">
                  <View>
                    <Text className="text-sm font-semibold text-gray-500">Name</Text>
                    <Text className="text-base">{selectedEntry.name}</Text>
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-gray-500">Time</Text>
                    <Text className="text-base">
                      {formatTime(selectedEntry.inTime, selectedEntry.outTime)}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-gray-500">Purpose</Text>
                    <Text className="text-base">{selectedEntry.purpose}</Text>
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-gray-500">Description</Text>
                    <Text className="text-base">{selectedEntry.description}</Text>
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-gray-500">Location</Text>
                    <Text className="text-base">{selectedEntry.location}</Text>
                  </View>
                </View>
              )}
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default EntryDetails;