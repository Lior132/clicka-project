import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import {
  Text,
  TextInput,
  Button,
  HelperText,
  Menu,
  Provider,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function PersonalDetails({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mail: "",
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([null, null, null, null]); // 4 קוביות ריקות בהתחלה

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setError("");
  };

  const handleSubmit = () => {
    navigation.navigate("questions", { formData });
    if (!formData.name || !formData.age || !formData.gender) {
      setError("אנא מלא את כל השדות");
      return;
    }
  };

  const pickImage = async (index) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const updatedImages = [...images];
      updatedImages[index] = result.assets[0].uri; // שמירת כתובת התמונה
      setImages(updatedImages);
    }
  };

  const renderImageBox = ({ item, index }) => (
    <TouchableOpacity
      style={styles.imageBox}
      onPress={() => pickImage(index)}
    >
      {item ? (
        <Image source={{ uri: item }} style={styles.image} />
      ) : (
        <Text style={styles.addText}>+</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>נתחיל במילוי הפרטים</Text>

        <TextInput
          label="שם מלא"
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="גיל"
          value={formData.age}
          onChangeText={(value) => handleChange("age", value)}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          label="מייל"
          value={formData.mail}
          onChangeText={(value) => handleChange("mail", value)}
          mode="outlined"
          style={styles.input}
        />
        <View style={styles.dropdownContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TextInput
                label="מגדר"
                value={formData.gender}
                mode="outlined"
                style={styles.input}
                onFocus={openMenu}
                showSoftInputOnFocus={false}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                handleChange("gender", "זכר");
                closeMenu();
              }}
              title="זכר"
            />
            <Menu.Item
              onPress={() => {
                handleChange("gender", "נקבה");
                closeMenu();
              }}
              title="נקבה"
            />
            <Menu.Item
              onPress={() => {
                handleChange("gender", "אחר");
                closeMenu();
              }}
              title="אחר"
            />
          </Menu>
        </View>

        <Text style={styles.subtitle}>הוסף תמונות:</Text>
        <FlatList
          data={images}
          renderItem={renderImageBox}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          style={styles.imageList}
        />

        {error ? (
          <HelperText type="error" style={{ color: "#fff" }}>
            {error}
          </HelperText>
        ) : null}

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          הבא
        </Button>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fff",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#6200ea",
  },
  dropdownContainer: {
    position: "relative",
  },
  imageList: {
    marginVertical: 10,
  },
  imageBox: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  addText: {
    fontSize: 24,
    color: "#fff",
  },
});
