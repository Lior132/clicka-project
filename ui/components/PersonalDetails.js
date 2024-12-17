import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  HelperText,
  Menu,
  Provider,
} from "react-native-paper";

export default function PersonalDetails({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mail: "",
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [error, setError] = useState("");

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
                onFocus={openMenu} // פותח את התפריט בלחיצה
                showSoftInputOnFocus={false} // מונע פתיחת מקלדת
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
  error: {
    color: "red",
    marginTop: 10,
  },
});
