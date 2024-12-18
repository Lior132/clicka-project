import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, signInWithEmailAndPassword } from '../firebase'; // ייבוא הפונקציה המודולרית
import axios from 'axios';

const { width, height } = Dimensions.get('window'); // קבלת גודל המסך

const LoginScreen = ({ onLogin, navigation }) => {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // מצב של שגיאה
  const userToken = localStorage.getItem("userToken")
  // פונקציה להתחברות
  const handleLogin = async () => {
    if (!mail || !password) {
      setError('אנא מלא את כל השדות');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, mail, password);
      // קבלת המשתמש המוזן
      const user = userCredential.user;

      // הוצאת ה-token
      const idToken = await user.getIdToken();

      // הדפסת ה-token
      console.log('User token:', idToken);

      const response = axios.post('http://localhost:5001/SignUpUserToken', {
       token: idToken, 
       mail: mail 
      })
      console.log(response);

      setEmail('');
      setPassword('');
      setError('');
      navigation.navigate("personal-details"); // ניווט אחרי התחברות מוצלחת
    } catch (error) {
      console.error("שגיאה בהתחברות:", error);
      setError('שם משתמש או סיסמה שגויים'); // הצגת הודעת שגיאה
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#9313e8', '#e81328']}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your account</Text>

          {/* הצגת שגיאה אם קיימת */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="mail"
            placeholderTextColor="#aaa"
            value={mail}
            onChangeText={setEmail}
            keyboardType="mail-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient
              colors={['#4CAF50', '#00C853']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>
              Don’t have an account?
              <Text style={styles.signupLink}> Sign Up</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0, // 0 כדי למנוע רווחים צדדים מיותרים
    width: '100%',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    width: '90%', // נעשה שימוש ב-90% מהמסך כדי למנוע רווחים בצדדים
    maxWidth: 400, // הגבלת הרוחב כך שזה לא יגדל יותר מידי
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: Platform.OS === 'ios' ? 50 : 30, // התאמת המיקום על פי מערכת ההפעלה
  },
  title: {
    fontSize: 28, // אפשר להקטין מעט את הגודל עבור מכשירים קטנים
    fontWeight: 'bold',
    color: '#FD297B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 15,
    fontSize: 14,
    color: '#555',
  },
  signupLink: {
    color: '#FD297B',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
