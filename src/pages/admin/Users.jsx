import { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  message,
  Card,
  Typography,
  Row,
  Col,
} from 'antd'
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { LocalStorageService, formatDateTime } from '../../utils/localStorage'
import { useThemeLanguage } from '../../contexts/ThemeLanguageContext'
import { t } from '../../utils/translations'

const { Title } = Typography
const { Option } = Select

const Users = () => {
  const { language } = useThemeLanguage()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [form] = Form.useForm()

  const userService = new LocalStorageService('users')

  // Load users from localStorage
  const loadUsers = () => {
    setLoading(true)
    const userData = userService.getAll()
    setUsers(userData)
    setLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // Filter users based on search text
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.phone.includes(searchText)
  )

  // Handle create/update user
  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        // Update existing user
        userService.update(editingUser.id, values)
        message.success(t('users.updateSuccess', language))
      } else {
        // Create new user
        userService.create(values)
        message.success(t('users.addSuccess', language))
      }
      
      loadUsers()
      setModalVisible(false)
      setEditingUser(null)
      form.resetFields()
    } catch (error) {
      message.error(t('users.error', language))
    }
  }

  // Handle delete user
  const handleDelete = (id) => {
    try {
      userService.delete(id)
      message.success(t('users.deleteSuccess', language))
      loadUsers()
    } catch (error) {
      message.error(t('users.error', language))
    }
  }

  // Handle edit user
  const handleEdit = (user) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setModalVisible(true)
  }

  // Handle add new user
  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setModalVisible(true)
  }

  // Close modal
  const handleCancel = () => {
    setModalVisible(false)
    setEditingUser(null)
    form.resetFields()
  }

  // Handle pagination change
  const handlePaginationChange = (page, size) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  const columns = [
    {
      title: t('users.name', language),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('users.email', language),
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: t('users.phone', language),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('users.gender', language),
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => t(`users.${gender}`, language),
      filters: [
        { text: t('users.male', language), value: 'male' },
        { text: t('users.female', language), value: 'female' },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: t('users.createdAt', language),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDateTime(date),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: t('users.actions', language),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            {t('users.edit', language)}
          </Button>
          <Popconfirm
            title={t('users.confirmDelete', language)}
            onConfirm={() => handleDelete(record.id)}
            okText={t('users.yes', language)}
            cancelText={t('users.no', language)}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              {t('users.delete', language)}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>
        <UserOutlined /> {t('users.title', language)}
      </Title>

      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder={t('users.searchPlaceholder', language)}
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={16} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              {t('users.addUser', language)}
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          scroll={{ x: 800 }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredUsers.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => t('users.totalUsers', language, { total, start: range[0], end: range[1] }),
            pageSizeOptions: ['10', '20', '50', '100'],
            responsive: true,
            size: 'small',
            onChange: handlePaginationChange,
            onShowSizeChange: handlePaginationChange,
          }}
        />
      </Card>

      <Modal
        title={editingUser ? t('users.editUser', language) : t('users.addUser', language)}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        style={{ top: 20 }}
        styles={{ body: { maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label={t('users.name', language)}
            rules={[
              { required: true, message: t('users.validation.nameRequired', language) },
              { min: 2, message: t('users.validation.nameMin', language) }
            ]}
          >
            <Input placeholder={t('users.validation.nameRequired', language)} />
          </Form.Item>

          <Form.Item
            name="email"
            label={t('users.email', language)}
            rules={[
              { required: true, message: t('users.validation.emailRequired', language) },
              { type: 'email', message: t('users.validation.emailInvalid', language) }
            ]}
          >
            <Input placeholder={t('users.validation.emailRequired', language)} />
          </Form.Item>

          <Form.Item
            name="phone"
            label={t('users.phone', language)}
            rules={[
              { required: true, message: t('users.validation.phoneRequired', language) },
              { pattern: /^[0-9]{10,11}$/, message: t('users.validation.phoneInvalid', language) }
            ]}
          >
            <Input placeholder={t('users.validation.phoneRequired', language)} />
          </Form.Item>

          <Form.Item
            name="gender"
            label={t('users.gender', language)}
            rules={[{ required: true, message: t('users.validation.genderRequired', language) }]}
          >
            <Select placeholder={t('users.validation.genderRequired', language)}>
              <Option value="male">{t('users.male', language)}</Option>
              <Option value="female">{t('users.female', language)}</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingUser ? t('users.update', language) : t('users.add', language)}
              </Button>
              <Button onClick={handleCancel}>
                {t('users.cancel', language)}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Users