// context/ThemeContext.js
import React, {createContext, useState, useContext} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{isDark, colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

const lightColors = {
  background: '#ffffff',
  text: '#333333',
  cardBackground: '#f5f5f5',
  tabBarBackground: '#ffffff',
  tabBarActiveTint: '#6A3093',
  tabBarInactiveTint: '#888888',
  headerBackground: '#ffffff',
  headerText: '#333333',
  messageBubbleCurrent: '#D6B5F9',
  messageBubbleOther: '#F0F0F0',
  inputBackground: '#f9f9f9',
  inputText: '#000000',
  placeholder: '#000000',
};

const darkColors = {
  background: '#121212',
  text: '#ffffff',
  cardBackground: '#1e1e1e',
  tabBarBackground: '#1e1e1e',
  tabBarActiveTint: '#B388FF',
  tabBarInactiveTint: '#888888',
  headerBackground: '#1e1e1e',
  headerText: '#ffffff',
  messageBubbleCurrent: '#6A3093',
  messageBubbleOther: '#2d2d2d',
  inputBackground: '#2d2d2d',
  inputText: '#ffffff',
  placeholder: '#ffffff',
};

export const useTheme = () => useContext(ThemeContext);
