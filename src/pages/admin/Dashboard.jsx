import { Card, Row, Col, Statistic, Typography } from 'antd'
import { UserOutlined, ShoppingOutlined, HomeOutlined, DatabaseOutlined } from '@ant-design/icons'
import { LocalStorageService } from '../utils/localStorage'
import { initializeSampleData } from '../utils/dataGenerator'
import { useThemeLanguage } from '../contexts/ThemeLanguageContext'
import { t } from '../utils/translations'
import { useEffect, useState } from 'react'

const { Title, Paragraph } = Typography

const Home = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { language } = useThemeLanguage()

  const userService = new LocalStorageService('users')
  const productService = new LocalStorageService('products')

  // Calculate active products count
  const activeProductsCount = products.filter(p => p.status === 'active').length

  // Load data from localStorage
  const loadData = () => {
    setLoading(true)
    const userData = userService.getAll()
    const productData = productService.getAll()
    setUsers(userData)
    setProducts(productData)
    setLoading(false)
  }

  // Khởi tạo dữ liệu mẫu và reload khi component mount lần đầu
  useEffect(() => {
    // Initialize sample data first
    initializeSampleData()
    // Then load the data
    loadData()
  }, [])

  return (
    <div>
      <Title level={2}>
        <HomeOutlined /> {t('home.title', language)}
      </Title>
      
      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('home.totalUsers', language)}
              value={users.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('home.totalProducts', language)}
              value={products.length}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#cf1322' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title={t('home.activeProducts', language)}
              value={activeProductsCount}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: '#1890ff' }}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      {/* Welcome Card */}
      <Card style={{ marginTop: 24 }}>
        <Title level={3}>{t('home.welcome', language)}</Title>
        <Paragraph>
          {t('home.description', language)}
        </Paragraph>
        <Paragraph>
          {t('home.dataStorage', language)}
        </Paragraph>
        <ul>
          <li><strong>{t('home.features.userManagement', language)}</strong></li>
          <li><strong>{t('home.features.productManagement', language)}</strong></li>
          <li><strong>{t('home.features.responsive', language)}</strong></li>
          <li><strong>{t('home.features.localStorage', language)}</strong></li>
        </ul>
      </Card>
    </div>
  )
}

export default Home