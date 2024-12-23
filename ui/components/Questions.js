import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { HoverEffect } from "react-native-gesture-handler";
import { Text, Button, ProgressBar } from "react-native-paper";

export default function Questions({ route, navigation }) {
  //   const { formData } = route.params; // קבלת הפרטים האישיים מהמסך הקודם
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // שאלה נוכחית
  const [answers, setAnswers] = useState([]); // תשובות שנבחרו

  // רשימת שאלות ותשובות
  const questions = [
    {
      question: "מה התחביבים שלך?",
      options: ["ספורט", "קריאה", "טיולים"],
    },
    {
      question: "מה הכי חשוב לך בקשר?",
      options: ["כנות", "כימיה", "תמיכה הדדית"],
    },
    {
      question: "מה המקום האהוב עליך?",
      options: ["ים", "יער", "עיר גדולה"],
    },
    {
      question: "איך אתה מבלה את סופי השבוע?",
      options: ["עם חברים", "בבית", "בטיולים"],
    },
    {
      question: "מה התכונה הכי חשובה בבן/בת זוג?",
      options: ["הומור", "חכמה", "רגישות"],
    },
  ];

  const handleAnswer = (answer) => {
    // שמירת תשובה
    setAnswers([...answers, answer]);

    // מעבר לשאלה הבאה או סיום
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate("Summary", { answers }); // מעבר למסך סיכום
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length; // חישוב ההתקדמות

  return (
    <View style={styles.container}>
      <Text style={styles.title}>שאלות התאמה</Text>
      <Text style={styles.greeting}>שלום , בוא נתחיל!</Text>

      {/* השאלה והתשובות */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            mode="outlined"
            onPress={() => handleAnswer(option)}
            style={styles.optionButton}
          >
            {option}
          </Button>
        ))}
      </View>
      {/* מד התקדמות */}
      <Text style={styles.progressText}>
        שאלה {currentQuestionIndex + 1} מתוך {questions.length}
      </Text>
      <ProgressBar
        progress={progress}
        color="#6200ea"
        style={styles.progressBar}
      />
    </View>
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
    color: "#6200ea",
  },
  greeting: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  progressBar: {
    height: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  progressText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    color: "#fff",
  },
  questionContainer: {
    marginBottom: 100,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderColor: "#6200ea",
  },
});
