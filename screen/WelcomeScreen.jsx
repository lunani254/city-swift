import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [displayText, setDisplayText] = useState('');
  const carAnim = useRef(new Animated.Value(0)).current;
  const typingIntervalRef = useRef(null);

  const fullText = 'CITY SWIFT';

  useFocusEffect(
    React.useCallback(() => {
      let charIndex = 0;
      setDisplayText('');
      carAnim.setValue(0);

      const textWidth = fullText.length * 30; 
      typingIntervalRef.current = setInterval(() => {
        setDisplayText((prev) => prev + fullText[charIndex]);
        charIndex++;
        if (charIndex === fullText.length) {
          clearInterval(typingIntervalRef.current);
          Animated.timing(carAnim, {
            toValue: width,
            duration: 5000, 
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(carAnim, {
            toValue: (charIndex / fullText.length) * textWidth,
            duration: 300, 
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
        }
      }, 300); 

      return () => {
        clearInterval(typingIntervalRef.current);
      };
    }, [])
  );

  const carStyle = {
    transform: [{ translateX: carAnim }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.helloText}>{displayText}</Text>
          <Animated.Image
            source={require('../assets/images/car.png')} 
            style={[styles.carImage, carStyle]}
          />
        </View>
        <Text style={styles.signInText}>create new account</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.accountText}>
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },
  topImageContainer: {
    width: "100%",
    height: height * 0.25,
    position: "absolute",
    top: 0,
  },
  topImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helloText: {
    textAlign: "center",
    fontSize: 50,
    fontFamily: 'Roboto-Bold',
    color: "#FFFFFF",
    marginBottom: 20,
  },
  carImage: {
    width: 50,
    height: 30,
    position: 'absolute',
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#C95BA1",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 20,
  },
  loginLink: {
    fontWeight: "bold",
    color: "#E4B038",
  },
});
