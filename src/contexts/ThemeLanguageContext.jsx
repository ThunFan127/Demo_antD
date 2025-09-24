import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeLanguageContext = createContext()

export const useThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext)
  if (!context) {
    throw new Error('useThemeLanguage must be used within ThemeLanguageProvider')
  }
  return context
}

export const ThemeLanguageProvider = ({ children }) => {
  // Theme state (light/dark)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : false
  })

  // Language state (vi/en)
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language')
    return saved || 'vi'
  })

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Save language to localStorage  
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleTheme = () => setIsDark(!isDark)
  const toggleLanguage = () => setLanguage(lang => lang === 'vi' ? 'en' : 'vi')

  const value = {
    isDark,
    language,
    toggleTheme,
    toggleLanguage,
    setLanguage,
    setIsDark
  }

  return (
    <ThemeLanguageContext.Provider value={value}>
      {children}
    </ThemeLanguageContext.Provider>
  )
}