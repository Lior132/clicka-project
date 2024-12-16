import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Pressable ,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import openImg from "../imag/coffee.jpg";
import "react-native-gesture-handler";

const OpeningScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={openImg} // החלף בתמונה מהממת
      style={styles.background}
      pointerEvents="auto"
    >
      <LinearGradient
        pointerEvents="auto"
        colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.3)", "transparent"]}
        style={styles.overlay}
      />
      <View style={styles.content}>


        <Image
          pointerEvents="box-none"
          // source={{ uri: "https://your-logo-url.com/logo.png" }} // לוגו האפליקציה
          style={styles.logo}
        />
        <Text style={styles.title}>
          Welcome to <Text style={styles.clickText}>Click</Text>
        </Text>
        <Text style={styles.subtitle}>Discover connections that matter.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <LinearGradient
            colors={["#FF7E5F", "#FD297B"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Let's Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadow: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 25,
  },
  button: {
    borderRadius: 30,
    overflow: "hidden",
    elevation: 5, // הוספת צל לכפתור
    zIndex: 10, // הכפתור מעל כל רכיבי התמונה והרקע
    elevation: 5, // הוסף צל
    position: "relative", // הוסף כדי לוודא שהכפתור לא מוגבל למיקום
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadow: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  clickText: {
    fontSize: 50, // יותר גדול
    color: "#9B4DFF", // סגול
    fontWeight: "bold",
  },
});

export default OpeningScreen;
