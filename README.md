# Demo Ant Design CRUD

Ứng dụng demo CRUD đơn giản với React + Ant Design + LocalStorage

## 🚀 Công nghệ

- **React 19** + **Vite** 
- **Ant Design** - UI Components
- **React Router DOM** - Routing
- **LocalStorage** - Lưu trữ dữ liệu

## ⚡ Cài đặt & Chạy

```bash
npm install
npm run dev
```

## 📱 Tính năng

### 🏠 Dashboard
- Thống kê tổng quan
- Dữ liệu mẫu tự động

### 👥 Quản lý Users
- CRUD đầy đủ (Thêm/Sửa/Xóa/Xem)
- Tìm kiếm theo tên, email, SĐT
- Lọc theo giới tính
- Responsive table

### 🛍️ Quản lý Products  
- CRUD đầy đủ
- Lọc theo danh mục
- Chuyển đổi tiền tệ VND/USD
- Quản lý trạng thái sản phẩm

### 🎨 UI/UX
- **Theme switching** (Light/Dark mode)
- **Multi-language** (Tiếng Việt/English)
- **Responsive design** (Mobile-first)
- **Ant Design components**

## 📂 Cấu trúc

```
src/
├── layouts/
│   └── AdminLayout.jsx     # Layout chính
├── pages/
│   ├── Home.jsx           # Dashboard  
│   ├── Users.jsx          # Quản lý users
│   └── Products.jsx       # Quản lý products
├── components/
│   └── AdminSideBar.jsx   # Sidebar menu
├── contexts/
│   └── ThemeLanguageContext.js  # Theme & Language context
├── utils/
│   ├── localStorage.js     # CRUD LocalStorage service
│   ├── dataGenerator.js   # Dữ liệu mẫu  
│   └── translations.js    # Đa ngôn ngữ
└── App.jsx
```

## 💾 Dữ liệu

- **25 Users mẫu** - Tự động tạo lần đầu
- **27 Products mẫu** - 5 categories khác nhau  
- **LocalStorage** - Dữ liệu lưu trữ cục bộ
- **Auto-generated IDs** - Timestamp + random

## � Demo Features

### CRUD Operations
- ✅ Create với validation
- ✅ Read với pagination 
- ✅ Update inline & modal
- ✅ Delete với confirmation

### Advanced Features
- 🔍 **Real-time search**
- 🏷️ **Category filtering** 
- 💱 **Currency conversion**
- 📊 **Sort & pagination**
- 📱 **Mobile responsive**

## 🎨 Theme & Language

- **Dark/Light theme** toggle
- **Vietnamese/English** switch
- **Persistent preferences** (LocalStorage)
- **Ant Design ConfigProvider**

## � Build & Deploy

```bash
npm run build  # Build production
npm run preview # Preview build
```

## 📝 Ghi chú

Dự án học tập với:
- React hooks (useState, useEffect, useContext)
- LocalStorage operations
- Responsive design patterns
- Ant Design best practices

