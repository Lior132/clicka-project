import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import axios from 'axios';
import facebook from "../imag/facebook.png";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithPopup ,GoogleAuthProvider
} from "firebase/auth";
import { useAuthRequest } from "expo-auth-session";
const { width, height } = Dimensions.get("window");

const isSmallScreen = width < 400;

const SignUpScreen = ({ onSignUp, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [auth, setAuth] = useState(null);
  const [userData, setUserData] = useState({
    email,
    password,
    confirmPassword
  });

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "512493055142219", // הכנס את ה-Facebook App ID שלך כאן
    redirectUri: Platform.select({
      ios: 'https://clicka-50280.firebaseapp.com/__/auth/handler',
      android: 'https://clicka-50280.firebaseapp.com/__/auth/handler',
      default: 'https://clicka-50280.firebaseapp.com/__/auth/handler',
    }),
    permissions: ['public_profile', 'email'],
  });

  const handleFacebookLogin = async () => {
    try {
      // מבצע את ההתחברות לפייסבוק
      const { type, params } = await promptAsync();
      
      if (type === "success") {
        const token = params.access_token;

        // התחברות ל-Firebase
        const credential = FacebookAuthProvider.credential(token);
        const auth = getAuth();
        await signInWithCredential(auth, credential); // התחברות ל-Firebase

        alert("Logged in with Facebook!");
      } else {
        alert("Facebook login was cancelled");
      }
    } catch (error) {
      alert("Error with Facebook login: " + error.message);
    }
  };
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log("Facebook login successful", access_token);
      const credential = FacebookAuthProvider.credential(access_token);
      const auth = getAuth();
      signInWithCredential(auth, credential); // התחברות ל-Firebase
      alert("Logged in with Facebook!");
    } else if (response?.type === "error") {
      console.log("Facebook login error", response.error);
      alert("Error with Facebook login: " + response.error);
    }
  }, [response]);
  

  const [googleRequest, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
    clientId: '868613634026-boge0msthqseaskve4genkviiv3ps50j.apps.googleusercontent.com', // Web Client ID
    redirectUri: 'https://clicka-50280.firebaseapp.com/__/auth/handler',
    scopes: ['profile', 'email'],  // Redirect URI ב-Firebase
  });


  const handleGoogleLogin = async () => {
    try {
      if (!googleRequest ) {
        alert("Request not ready yet");
        return;
      }

      const { type, params } = await promptGoogleAsync();

      if (type === "success") {
        const { id_token } = params;
        const credential = GoogleAuthProvider.credential(id_token);
        const auth = getAuth();
        await signInWithCredential(auth, credential);
        alert("Logged in with Google!");
      } else {
        alert("Google login was cancelled");
      }
    } catch (error) {
      alert("Error with Google login: " + error.message);
    }
  };

  const handleSighUp = async () => {
    const { email, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
        alert("The passwords do not match");
        return;
    }

    try {
        // עדכון כתובת ה-API לכתובת ב-Vercel
        const response = await axios.post('https://clicka-project.vercel.app/singUpUser', { email, password });
        console.log(response);

        if (response.data.error) {
            alert(response.data.error);
        } else {
            setUserData({ email: '', password: '', confirmPassword: '' }); // איפוס שדות לאחר ההרשמה
            console.log('Hello');
            navigation.navigate('Login'); // ניווט למסך ההתחברות
        }
    } catch (error) {
        console.log(error);
    }
};

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#9313e8", "#e81328"]} style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={userData.email}
            onChangeText={text => setUserData({ ...userData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={userData.password}
            onChangeText={text => setUserData({ ...userData, password: text })}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            value={userData.confirmPassword} // עדכון הערך לשדה confirmPassword
            onChangeText={text => setUserData({ ...userData, confirmPassword: text })} // עדכון confirmPassword
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSighUp}
          >
            <LinearGradient
              colors={["#4CAF50", "#00C853"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleLogin}
            >
              <Image
                source={require("../imag/google.png")} // עדכן את הנתיב בהתאם למיקום האייקון שלך
                style={styles.socialIcon}
                // disabled={!isRequestReady}
              />
              <Text style={styles.socialText}>Sign Up with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleFacebookLogin}
            >
              <Image
                source={facebook} // עדכן את הנתיב בהתאם למיקום האייקון שלך
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Sign Up with Facebook</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={styles.loginLink}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    width: "100%",
  },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: Platform.OS === "ios" ? 50 : 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FD297B",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
  },
  loginLink: {
    color: "#FD297B",
    fontWeight: "bold",
  },
  socialIcon: {
    width: 40,
    height: 30,
    marginRight: 10,
    borderRadius: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "120%",
    marginTop: 20,
    alignItems: "center",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  socialText: {
    fontSize: 10,
    color: "#333",
  },
});

export default SignUpScreen;
