import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  }
];

export default function App() {
  const [friends, setFriends] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    loadFriends();
  }, []);

  useEffect(() => {
    if (friends.length > 0) {
      saveFriends(friends);
    }
  }, [friends]);

  const loadFriends = async () => {
    try {
      const stored = await AsyncStorage.getItem('friends');
      if (stored) {
        setFriends(JSON.parse(stored));
      } else {
        setFriends(initialFriends);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveFriends = async (data) => {
    try {
      await AsyncStorage.setItem('friends', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFriend = (newFriend) => {
    setFriends(prev => [...prev, newFriend]);
    setShowAddFriend(false);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(current => (current?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  const handleSplitBill = (billValue, userExpense, whoPays) => {
    const friendExpense = billValue - userExpense;
    setFriends(prevFriends =>
      prevFriends.map(friend => {
        if (friend.id === selectedFriend.id) {
          let newBalance = friend.balance;
          if (whoPays === 'user') {
            newBalance = friend.balance + friendExpense;
          } else if (whoPays === 'friend') {
            newBalance = friend.balance - userExpense;
          }
          return { ...friend, balance: newBalance };
        }
        return friend;
      })
    );
    setSelectedFriend(null);
  };

  const closeSplitForm = () => {
    setSelectedFriend(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sidebar}>
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} onClose={() => setShowAddFriend(false)} />}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowAddFriend(prev => !prev)}
        >
          <Text style={styles.buttonText}>{showAddFriend ? "Close" : "Add Friend"}</Text>
        </TouchableOpacity>
      </View>
      {selectedFriend && (
        <SplitBillForm
          friend={selectedFriend}
          onSplitBill={handleSplitBill}
          onClose={closeSplitForm}
        />
      )}
    </ScrollView>
  );
}

function FriendsList({ friends, selectedFriend, onSelectFriend }) {
  const renderItem = ({ item }) => (
    <Friend
      friend={item}
      selectedFriend={selectedFriend}
      onSelectFriend={onSelectFriend}
    />
  );

  return (
    <FlatList
      data={friends}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
}

function Friend({ friend, selectedFriend, onSelectFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  let balanceText = '';
  if (friend.balance > 0) {
    balanceText = `${friend.name} owes you $${friend.balance}`;
  } else if (friend.balance < 0) {
    balanceText = `You owe ${friend.name} $${Math.abs(friend.balance)}`;
  } else {
    balanceText = `You and ${friend.name} are even`;
  }
  const balanceStyle = friend.balance > 0 ? styles.green : friend.balance < 0 ? styles.red : styles.black;

  return (
    <View style={[styles.friendItem, isSelected && styles.selected]}>
      <Image source={{ uri: friend.image }} style={styles.avatar} />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{friend.name}</Text>
        <Text style={[styles.balanceText, balanceStyle]}>{balanceText}</Text>
      </View>
      <TouchableOpacity
        style={styles.smallButton}
        onPress={() => onSelectFriend(friend)}
      >
        <Text style={styles.buttonText}>{isSelected ? "Close" : "Select"}</Text>
      </TouchableOpacity>
    </View>
  );
}

function AddFriendForm({ onAddFriend, onClose }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;
    const id = Date.now();
    const finalImage = imageUrl.trim() || `https://i.pravatar.cc/48?u=${id}`;
    const newFriend = {
      id: id,
      name: name.trim(),
      image: finalImage,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName('');
    setImageUrl('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Friend's name"
      />
      <Text style={styles.label}>Image:</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="Image URL (optional)"
      />
      <View style={styles.formButtonsRow}>
        <TouchableOpacity style={[styles.button, styles.formButton]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ADD FRIEND</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.formButton, styles.closeButton]} onPress={onClose}>
          <Text style={styles.buttonText}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SplitBillForm({ friend, onSplitBill, onClose }) {
  const [billValue, setBillValue] = useState('');
  const [userExpense, setUserExpense] = useState('');
  const [whoPays, setWhoPays] = useState('user');

  const friendExpense = billValue && userExpense ? Number(billValue) - Number(userExpense) : '';

  const handleSubmit = () => {
    const bill = Number(billValue);
    const user = Number(userExpense);
    if (!billValue || !userExpense) return;
    if (user > bill) {
      Alert.alert("Error", "Your expense cannot be more than the total bill!");
      return;
    }
    if (user < 0 || bill < 0) {
      Alert.alert("Error", "Please enter positive numbers");
      return;
    }
    onSplitBill(bill, user, whoPays);
    setBillValue('');
    setUserExpense('');
    setWhoPays('user');
  };

  return (
    <View style={styles.splitForm}>
      <Text style={styles.title}>Split a bill with {friend.name}</Text>
      <Text style={styles.label}>Bill value:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={billValue}
        onChangeText={setBillValue}
        placeholder="0"
      />
      <Text style={styles.label}>Your expense:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userExpense}
        onChangeText={setUserExpense}
        placeholder="0"
      />
      <Text style={styles.label}>{friend.name}'s expense:</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={friendExpense.toString()}
        editable={false}
        placeholder="0"
      />
      <Text style={styles.label}>Who is paying the bill?</Text>
      <View style={styles.pickerRow}>
        <TouchableOpacity
          style={[styles.pickerOption, whoPays === 'user' && styles.pickerSelected]}
          onPress={() => setWhoPays('user')}
        >
          <Text>You</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pickerOption, whoPays === 'friend' && styles.pickerSelected]}
          onPress={() => setWhoPays('friend')}
        >
          <Text>{friend.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formButtonsRow}>
        <TouchableOpacity style={[styles.button, styles.formButton]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SPLIT BILL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.formButton, styles.closeButton]} onPress={onClose}>
          <Text style={styles.buttonText}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}