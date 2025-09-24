// Dữ liệu mẫu để tùy chỉnh
import { LocalStorageService } from './localStorage'

// Dữ liệu mẫu cho người dùng - bạn có thể tùy chỉnh tại đây
const sampleUsers = [
  {
    name: 'Nguyễn Văn An',
    email: 'anvn@example.com',
    phone: '0123456789',
    gender: 'male'
  },
  {
    name: 'Trần Thị Bình',
    email: 'binhtt@example.com',
    phone: '0987654321',
    gender: 'female'
  },
  {
    name: 'Lê Hoàng Cường',
    email: 'cuonglh@example.com',
    phone: '0369852147',
    gender: 'male'
  },
  {
    name: 'Phạm Thị Dung',
    email: 'dungpt@example.com',
    phone: '0159753486',
    gender: 'female'
  },
  {
    name: 'Hoàng Văn Em',
    email: 'emhv@example.com',
    phone: '0741852963',
    gender: 'male'
  },
  {
    name: 'Võ Thị Hương',
    email: 'huongvt@example.com',
    phone: '0912345678',
    gender: 'female'
  },
  {
    name: 'Đặng Minh Khoa',
    email: 'khoadm@example.com',
    phone: '0923456789',
    gender: 'male'
  },
  {
    name: 'Bùi Thị Lan',
    email: 'lanbt@example.com',
    phone: '0934567890',
    gender: 'female'
  },
  {
    name: 'Ngô Văn Minh',
    email: 'minhnv@example.com',
    phone: '0945678901',
    gender: 'male'
  },
  {
    name: 'Lý Thị Nam',
    email: 'namlt@example.com',
    phone: '0956789012',
    gender: 'female'
  },
  {
    name: 'Phan Văn Oanh',
    email: 'oanhpv@example.com',
    phone: '0967890123',
    gender: 'male'
  },
  {
    name: 'Đinh Thị Phương',
    email: 'phuongdt@example.com',
    phone: '0978901234',
    gender: 'female'
  },
  {
    name: 'Vũ Văn Quang',
    email: 'quangvv@example.com',
    phone: '0989012345',
    gender: 'male'
  },
  {
    name: 'Đỗ Thị Rượu',
    email: 'ruoudt@example.com',
    phone: '0901234567',
    gender: 'female'
  },
  {
    name: 'Mai Văn Sơn',
    email: 'sonmv@example.com',
    phone: '0913456789',
    gender: 'male'
  },
  {
    name: 'Cao Thị Tuyết',
    email: 'tuyetct@example.com',
    phone: '0924567890',
    gender: 'female'
  },
  {
    name: 'Tô Văn Uy',
    email: 'uytv@example.com',
    phone: '0935678901',
    gender: 'male'
  },
  {
    name: 'Hồ Thị Vân',
    email: 'vanht@example.com',
    phone: '0946789012',
    gender: 'female'
  },
  {
    name: 'Trương Văn Xuân',
    email: 'xuantv@example.com',
    phone: '0957890123',
    gender: 'male'
  },
  {
    name: 'Lưu Thị Yến',
    email: 'yenlt@example.com',
    phone: '0968901234',
    gender: 'female'
  },
  {
    name: 'Châu Văn Zung',
    email: 'zungcv@example.com',
    phone: '0979012345',
    gender: 'male'
  },
  {
    name: 'Kiều Thị An',
    email: 'ankt@example.com',
    phone: '0990123456',
    gender: 'female'
  },
  {
    name: 'Lâm Văn Bình',
    email: 'binhlv@example.com',
    phone: '0901345678',
    gender: 'male'
  },
  {
    name: 'Ứng Thị Cầm',
    email: 'camut@example.com',
    phone: '0912456789',
    gender: 'female'
  },
  {
    name: 'Dương Văn Đạt',
    email: 'datdv@example.com',
    phone: '0923567890',
    gender: 'male'
  }
]

// Dữ liệu mẫu cho sản phẩm - bạn có thể tùy chỉnh tại đây
const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    category: 'electronics',
    price: 29990000,
    quantity: 50,
    status: 'active',
    description: 'Điện thoại thông minh cao cấp với chip A17 Pro và camera tiên tiến.'
  },
  {
    name: 'Áo polo nam',
    category: 'clothing',
    price: 299000,
    quantity: 100,
    status: 'active',
    description: 'Áo polo nam cotton cao cấp, thoáng mát và phong cách.'
  },
  {
    name: 'Sách lập trình React',
    category: 'books',
    price: 450000,
    quantity: 30,
    status: 'active',
    description: 'Cuốn sách hướng dẫn lập trình React từ cơ bản đến nâng cao.'
  },
  {
    name: 'Bàn làm việc gỗ',
    category: 'home-garden',
    price: 2500000,
    quantity: 15,
    status: 'active',
    description: 'Bàn làm việc bằng gỗ tự nhiên, thiết kế hiện đại và tiện dụng.'
  },
  {
    name: 'Giày thể thao Nike',
    category: 'sports',
    price: 1200000,
    quantity: 25,
    status: 'active',
    description: 'Giày thể thao Nike Air Max, êm ái và phù hợp cho mọi hoạt động.'
  },
  {
    name: 'Laptop Dell XPS 13',
    category: 'electronics',
    price: 35000000,
    quantity: 0,
    status: 'inactive',
    description: 'Laptop cao cấp Dell XPS 13 với màn hình cảm ứng 4K.'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    category: 'electronics',
    price: 31990000,
    quantity: 40,
    status: 'active',
    description: 'Smartphone Android cao cấp với S Pen và camera zoom 100x.'
  },
  {
    name: 'MacBook Pro M3',
    category: 'electronics',
    price: 45990000,
    quantity: 20,
    status: 'active',
    description: 'Laptop Apple với chip M3, hiệu suất vượt trội cho work và creative.'
  },
  {
    name: 'Tai nghe Sony WH-1000XM5',
    category: 'electronics',
    price: 8990000,
    quantity: 35,
    status: 'active',
    description: 'Tai nghe chống ồn cao cấp với chất lượng âm thanh tuyệt vời.'
  },
  {
    name: 'Apple Watch Series 9',
    category: 'electronics',
    price: 9990000,
    quantity: 60,
    status: 'active',
    description: 'Đồng hồ thông minh Apple với tính năng sức khỏe tiên tiến.'
  },
  {
    name: 'Áo khoác hoodie unisex',
    category: 'clothing',
    price: 650000,
    quantity: 80,
    status: 'active',
    description: 'Áo khoác hoodie chất liệu cotton blend, thiết kế trẻ trung.'
  },
  {
    name: 'Quần jeans nam',
    category: 'clothing',
    price: 890000,
    quantity: 45,
    status: 'active',
    description: 'Quần jeans nam slim fit, chất liệu denim cao cấp.'
  },
  {
    name: 'Đầm maxi nữ',
    category: 'clothing',
    price: 1200000,
    quantity: 30,
    status: 'active',
    description: 'Đầm maxi nữ họa tiết hoa, phù hợp đi dự tiệc hoặc đi chơi.'
  },
  {
    name: 'Áo sơ mi công sở nam',
    category: 'clothing',
    price: 450000,
    quantity: 70,
    status: 'active',
    description: 'Áo sơ mi nam trắng, phù hợp cho môi trường công sở.'
  },
  {
    name: 'Giày sneaker nữ',
    category: 'clothing',
    price: 980000,
    quantity: 25,
    status: 'active',
    description: 'Giày sneaker nữ màu trắng, thiết kế năng động và thời trang.'
  },
  {
    name: 'Sách JavaScript cơ bản',
    category: 'books',
    price: 320000,
    quantity: 50,
    status: 'active',
    description: 'Cuốn sách học JavaScript từ zero đến hero.'
  },
  {
    name: 'Sách Node.js thực chiến',
    category: 'books',
    price: 580000,
    quantity: 25,
    status: 'active',
    description: 'Hướng dẫn xây dựng ứng dụng backend với Node.js.'
  },
  {
    name: 'Sách thiết kế UI/UX',
    category: 'books',
    price: 680000,
    quantity: 20,
    status: 'active',
    description: 'Nguyên tắc và thực hành thiết kế giao diện người dùng.'
  },
  {
    name: 'Sách Python for Data Science',
    category: 'books',
    price: 750000,
    quantity: 15,
    status: 'active',
    description: 'Sử dụng Python để phân tích và xử lý dữ liệu.'
  },
  {
    name: 'Từ điển Anh-Việt',
    category: 'books',
    price: 280000,
    quantity: 40,
    status: 'active',
    description: 'Từ điển Anh-Việt phiên bản mới với 100,000 từ vựng.'
  },
  {
    name: 'Ghế gaming RGB',
    category: 'home-garden',
    price: 3500000,
    quantity: 12,
    status: 'active',
    description: 'Ghế gaming với đèn LED RGB, thiết kế ergonomic.'
  },
  {
    name: 'Tủ sách gỗ sồi',
    category: 'home-garden',
    price: 4200000,
    quantity: 8,
    status: 'active',
    description: 'Tủ sách 5 tầng bằng gỗ sồi tự nhiên, kiểu dáng hiện đại.'
  },
  {
    name: 'Đèn bàn LED thông minh',
    category: 'home-garden',
    price: 890000,
    quantity: 35,
    status: 'active',
    description: 'Đèn bàn LED có thể điều chỉnh độ sáng và màu ánh sáng.'
  },
  {
    name: 'Chậu cây cảnh ceramic',
    category: 'home-garden',
    price: 180000,
    quantity: 100,
    status: 'active',
    description: 'Chậu trồng cây cảnh bằng ceramic, nhiều màu sắc.'
  },
  {
    name: 'Bộ chăn ga gối cotton',
    category: 'home-garden',
    price: 1200000,
    quantity: 25,
    status: 'active',
    description: 'Bộ chăn ga gối 4 món chất liệu cotton 100% cao cấp.'
  },
  {
    name: 'Giày chạy bộ Adidas',
    category: 'sports',
    price: 2200000,
    quantity: 30,
    status: 'active',
    description: 'Giày chạy bộ Adidas Ultraboost với công nghệ đệm tiên tiến.'
  },
  {
    name: 'Bóng đá FIFA Quality',
    category: 'sports',
    price: 450000,
    quantity: 20,
    status: 'active',
    description: 'Bóng đá chính thức FIFA Quality cho thi đấu chuyên nghiệp.'
  }
]

// Hàm tạo dữ liệu mẫu ban đầu
export const initializeSampleData = (forceReload = false) => {
  const userService = new LocalStorageService('users')
  const productService = new LocalStorageService('products')

  // Chỉ tạo dữ liệu mẫu nếu chưa có dữ liệu hoặc force reload
  const existingUsers = userService.getAll()
  const existingProducts = productService.getAll()

  if (existingUsers.length === 0 || forceReload) {
    console.log('Creating sample users...')
    sampleUsers.forEach(user => {
      userService.create(user)
    })
  }

  if (existingProducts.length === 0 || forceReload) {
    console.log('Creating sample products...')
    sampleProducts.forEach(product => {
      productService.create(product)
    })
  }
}