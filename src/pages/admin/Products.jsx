import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, Select,
    Space, Popconfirm, message, Card, Typography, Row, Col, Tag } from 'antd'
import {
    ShoppingOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { LocalStorageService, formatDateTime } from '../utils/localStorage'
import { useThemeLanguage } from '../contexts/ThemeLanguageContext'
import { t } from '../utils/translations'

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

// Currency conversion rate (VND to USD)
const USD_TO_VND_RATE = 24000

const Products = () => {
    const { language } = useThemeLanguage()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [form] = Form.useForm()

    const productService = new LocalStorageService('products')

    // Load products from localStorage
    const loadProducts = () => {
        setLoading(true)
        const productData = productService.getAll()
        setProducts(productData)
        setLoading(false)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    // Filter products based on search text
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
    )

    // Handle create/update product
    const handleSubmit = async (values) => {
        try {
            // Convert price to VND if entering in USD
            const processedValues = { ...values }
            if (language === 'en' && values.price) {
                // Convert USD to VND
                processedValues.price = values.price * USD_TO_VND_RATE
            }

            if (editingProduct) {
                // Update existing product
                productService.update(editingProduct.id, processedValues)
                message.success(t('products.updateSuccess', language))
            } else {
                // Create new product
                productService.create(processedValues)
                message.success(t('products.addSuccess', language))
            }

            loadProducts()
            setModalVisible(false)
            setEditingProduct(null)
            form.resetFields()
        } catch (error) {
            message.error(t('products.error', language))
        }
    }

    // Handle delete product
    const handleDelete = (id) => {
        try {
            productService.delete(id)
            message.success(t('products.deleteSuccess', language))
            loadProducts()
        } catch (error) {
            message.error(t('products.error', language))
        }
    }

    // Handle edit product
    const handleEdit = (product) => {
        setEditingProduct(product)
        
        // Convert price for display if in English
        const formData = { ...product }
        if (language === 'en') {
            formData.price = product.price / USD_TO_VND_RATE // Convert VND to USD for display
        }
        
        form.setFieldsValue(formData)
        setModalVisible(true)
    }

    // Handle add new product
    const handleAdd = () => {
        setEditingProduct(null)
        form.resetFields()
        setModalVisible(true)
    }

    // Close modal
    const handleCancel = () => {
        setModalVisible(false)
        setEditingProduct(null)
        form.resetFields()
    }

    // Handle pagination change
    const handlePaginationChange = (page, size) => {
        setCurrentPage(page)
        setPageSize(size)
    }

    // Format price based on locale
    const formatPrice = (price) => {
        if (language === 'vi') {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(price)
        } else {
            // Convert VND to USD for display
            const usdPrice = price / USD_TO_VND_RATE
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(usdPrice)
        }
    }

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'green'
            case 'inactive': return 'red'
            default: return 'default'
        }
    }

    const columns = [
        {
            title: t('products.name', language),
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: t('products.category', language),
            dataIndex: 'category',
            key: 'category',
            render: (category) => t(`products.categories.${category}`, language),
            filters: [
                { text: t('products.categories.electronics', language), value: 'electronics' },
                { text: t('products.categories.clothing', language), value: 'clothing' },
                { text: t('products.categories.books', language), value: 'books' },
                { text: t('products.categories.home-garden', language), value: 'home-garden' },
                { text: t('products.categories.sports', language), value: 'sports' },
            ],
            onFilter: (value, record) => record.category === value,
        },
        {
            title: t('products.price', language),
            dataIndex: 'price',
            key: 'price',
            render: (price) => formatPrice(price),
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: t('products.quantity', language),
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: t('products.status', language),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)}>
                    {t(`products.${status}`, language)}
                </Tag>
            ),
            filters: [
                { text: t('products.active', language), value: 'active' },
                { text: t('products.inactive', language), value: 'inactive' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: t('products.createdAt', language),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => formatDateTime(date),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: t('products.actions', language),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                    >
                        {t('products.edit', language)}
                    </Button>
                    <Popconfirm
                        title={t('products.confirmDelete', language)}
                        onConfirm={() => handleDelete(record.id)}
                        okText={t('products.yes', language)}
                        cancelText={t('products.no', language)}
                    >
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        >
                            {t('products.delete', language)}
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <Title level={2}>
                <ShoppingOutlined /> {t('products.title', language)}
            </Title>

            <Card>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                    <Col xs={24} sm={12} md={8}>
                        <Input
                            placeholder={t('products.searchPlaceholder', language)}
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
                            {t('products.addProduct', language)}
                        </Button>
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={filteredProducts}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1000 }}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: filteredProducts.length,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => t('products.totalProducts', language, { total, start: range[0], end: range[1] }),
                        pageSizeOptions: ['10', '20', '50', '100'],
                        responsive: true,
                        size: 'small',
                        onChange: handlePaginationChange,
                        onShowSizeChange: handlePaginationChange,
                    }}
                />
            </Card>

            <Modal
                title={editingProduct ? t('products.editProduct', language) : t('products.addProduct', language)}
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
                        label={t('products.name', language)}
                        rules={[
                            { required: true, message: t('products.validation.nameRequired', language) },
                            { min: 2, message: t('products.validation.nameMin', language) }
                        ]}
                    >
                        <Input placeholder={t('products.validation.nameRequired', language)} />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label={t('products.category', language)}
                                rules={[{ required: true, message: t('products.validation.categoryRequired', language) }]}
                            >
                                <Select placeholder={t('products.validation.categoryRequired', language)}>
                                    <Option value="electronics">{t('products.categories.electronics', language)}</Option>
                                    <Option value="clothing">{t('products.categories.clothing', language)}</Option>
                                    <Option value="books">{t('products.categories.books', language)}</Option>
                                    <Option value="home-garden">{t('products.categories.home-garden', language)}</Option>
                                    <Option value="sports">{t('products.categories.sports', language)}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label={t('products.status', language)}
                                rules={[{ required: true, message: t('products.validation.statusRequired', language) }]}
                            >
                                <Select placeholder={t('products.validation.statusRequired', language)}>
                                    <Option value="active">{t('products.active', language)}</Option>
                                    <Option value="inactive">{t('products.inactive', language)}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label={t('products.priceLabel', language)}
                                rules={[
                                    { required: true, message: t('products.validation.priceRequired', language) },
                                    { type: 'number', min: 0, message: t('products.validation.priceMin', language) }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={language === 'vi' ? 'Nhập giá (VND)' : 'Enter price (USD)'}
                                    formatter={(value) => {
                                        if (!value) return ''
                                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }}
                                    parser={(value) => {
                                        return value.replace(/[,\s]/g, '')
                                    }}
                                    addonAfter={language === 'vi' ? 'VND' : 'USD'}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="quantity"
                                label={t('products.quantity', language)}
                                rules={[
                                    { required: true, message: t('products.validation.quantityRequired', language) },
                                    { type: 'number', min: 0, message: t('products.validation.quantityMin', language) }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={t('products.validation.quantityRequired', language)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="description"
                        label={t('products.description', language)}
                        rules={[{ required: true, message: t('products.validation.descriptionRequired', language) }]}
                    >
                        <TextArea
                            rows={4}
                            placeholder={t('products.validation.descriptionRequired', language)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {editingProduct ? t('products.update', language) : t('products.add', language)}
                            </Button>
                            <Button onClick={handleCancel}>
                                {t('products.cancel', language)}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Products