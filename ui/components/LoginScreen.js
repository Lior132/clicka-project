import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window'); // קבלת גודל המסך

// אם רוחב המסך קטן מ-400, אפשר להניח שמדובר במכשירים קטנים יותר (כמו אייפון 12)
const isSmallScreen = width < 400;

const LoginScreen = ({ onLogin, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nextPage = () => {
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#9313e8', '#e81328']}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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

          <TouchableOpacity style={styles.button} onPress={() => onLogin(email, password)}>
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
