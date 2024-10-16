import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { login } from "../services/api";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Input Error", "Email and Password cannot be empty.");
      return;
    }
    setLoading(true);

    try {
      const response = await login(email, password);
      // Check if the user object has the role property correctly
      if (
        response.user &&
        response.user.role &&
        response.user.role.trim() === "student"
      ) {
        navigation.navigate("ViewAssignment", {
          user: {
            id: response.user.id,
            name: response.user.name,
            surname: response.user.surname,
            email: email,
          },
        });
      } else {
        Alert.alert("Access denied", "Only students are allowed to login.");
      }
    } catch (error) {
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="auto" />
        <Image
          source={require("../assets/LoginSloth.png")}
          style={styles.loginSlothImage}
        />
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputFields}>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/aticon.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#636363"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/lockedIcon.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#636363"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loginSlothImage: {
    width: 297,
    height: 308,
    marginBottom: 68,
  },
  loginText: {
    fontWeight: "700",
    fontSize: 45,
    lineHeight: 54,
    color: "#000000",
    marginBottom: 57,
  },
  inputFields: {
    width: 283,
    marginBottom: 68,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 9,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#636363",
    width: 250,
    paddingBottom: 5,
    zIndex: 1,
  },
  loginButton: {
    width: 276,
    height: 43,
    backgroundColor: "#705D56",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 20,
    color: "#F0F7F4",
  },
});

export default LoginScreen;
