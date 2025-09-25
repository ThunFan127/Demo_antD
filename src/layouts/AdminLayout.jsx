import React, { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, theme } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import AdminSideBar from '../components/admin/AdminSideBar'
import Dashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users'
import Products from '../pages/admin/Products'
import { useThemeLanguage } from '../contexts/ThemeLanguageContext'
import { t } from '../utils/translations'

const { Header, Sider, Content } = Layout

// Layout constants
const SIDER_WIDTH = 200
const SIDER_COLLAPSED_WIDTH = 80

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { language } = useThemeLanguage()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const handleToggle = () => {
    setCollapsed(!collapsed)
  }

  // Common style for trigger buttons
  const triggerStyle = {
    fontSize: '16px', 
    padding: '0 24px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
    minHeight: 48
  }

  // Memoized margin calculation
  const mainLayoutStyle = useMemo(() => ({
    marginLeft: collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH
  }), [collapsed])

  // Memoized header style
  const headerStyle = useMemo(() => ({
    padding: 0,
    background: colorBgContainer,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  }), [colorBgContainer])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        collapsedWidth={SIDER_COLLAPSED_WIDTH}
        width={SIDER_WIDTH}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          zIndex: 1000,
        }}
      >
        <AdminSideBar collapsed={collapsed} />
      </Sider>

      {/* Main Layout */}
      <Layout style={mainLayoutStyle}>
        {/* Header */}
        <Header style={headerStyle}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: handleToggle,
              style: triggerStyle
            }
          )}
          <h2 style={{ 
            margin: 0, 
            marginLeft: 8,
            fontSize: '20px',
          }}>
            {t('home.appTitle', language)}
          </h2>
        </Header>
        
        {/* Content with Routes */}
        <Content style={{ 
          padding: '24px', 
          minHeight: 'calc(100vh - 64px)',
        }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout