import { Menu, theme, Switch, Divider, Space, Typography } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  UserOutlined,
  ShoppingOutlined,
  SunOutlined,
  MoonOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
import { useThemeLanguage } from '../../contexts/ThemeLanguageContext'
import { t } from '../../utils/translations'

const { Text } = Typography

const AdminSideBar = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, language, toggleTheme, toggleLanguage } = useThemeLanguage()
  const {
    token: { borderRadiusLG },
  } = theme.useToken()

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('home.title', language),
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: t('users.title', language),
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: t('products.title', language),
    },
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Logo */}
      <div className="demo-logo-vertical" style={{ 
        height: 32, 
        margin: 16, 
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: borderRadiusLG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold'
      }}>
        {collapsed ? 'AD' : t('home.appTitle', language)}
      </div>
      
      {/* Menu */}
      <div style={{ flex: 1 }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>

      {/* Settings Section */}
      <div style={{ 
        marginTop: 'auto',
        padding: collapsed ? 4 : 16,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {!collapsed && (
          <>
            {/* Theme Toggle */}
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space justify="space-between" style={{ width: '100%' }}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 12 }}>
                  {isDark ? 'Dark' : 'Light'}
                </Text>
                <Switch
                  size="small"
                  checked={isDark}
                  onChange={toggleTheme}
                  checkedChildren={<MoonOutlined />}
                  unCheckedChildren={<SunOutlined />}
                />
              </Space>

              {/* Language Toggle */}
              <Space justify="space-between" style={{ width: '100%' }}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 12 }}>
                  {language === 'vi' ? 'Tiếng Việt' : 'English'}
                </Text>
                <Switch
                  size="small"
                  checked={language === 'en'}
                  onChange={toggleLanguage}
                  checkedChildren="EN"
                  unCheckedChildren="VI"
                />
              </Space>
            </Space>
          </>
        )}
        
        {collapsed && (
          <Space direction="vertical" style={{ width: '100%', alignItems: 'center' }}>
            <Switch
              size="small"
              checked={isDark}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              style={{ marginBottom: 8 }}
            />
            <Switch
              size="small"
              checked={language === 'en'}
              onChange={toggleLanguage}
              checkedChildren="EN"
              unCheckedChildren="VI"
            />
          </Space>
        )}
      </div>
    </div>
  )
}

export default AdminSideBar