import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import viVN from 'antd/locale/vi_VN'
import enUS from 'antd/locale/en_US'
import { ThemeLanguageProvider, useThemeLanguage } from './contexts/ThemeLanguageContext'
import App from './App.jsx'
import './index.css'

/**
 * Ant Design ConfigProvider wrapper
 */
const AntdConfigWrapper = () => {
  const { isDark, language } = useThemeLanguage()
  
  const antdLocale = language === 'vi' ? viVN : enUS
  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
    },
  }
  
  return (
    <ConfigProvider locale={antdLocale} theme={themeConfig}>
      <App />
    </ConfigProvider>
  )
}

/**
 * Root application component
 */
const AppRoot = () => (
  <StrictMode>
    <BrowserRouter>
      <ThemeLanguageProvider>
        <AntdConfigWrapper />
      </ThemeLanguageProvider>
    </BrowserRouter>
  </StrictMode>
)

// Render application
createRoot(document.getElementById('root')).render(<AppRoot />)
