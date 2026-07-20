# Lab 06 — Redux Toolkit trong ReactJS (Counter · Todos · Posts)

Dự án thực hành Lab 06 sử dụng Redux Toolkit kết hợp với React-Bootstrap để xây dựng ứng dụng gồm 3 tính năng chính:
1. **Counter** — Quản lý state đồng bộ đơn giản (số đếm).
2. **Todos** — Thao tác trên mảng (thêm, xoá, và toggle trạng thái hoàn thành).
3. **Posts** — Gọi API bất đồng bộ sử dụng `createAsyncThunk` để fetch bài viết từ JSONPlaceholder.

## Công nghệ sử dụng
- React 19 + Vite + JavaScript
- `@reduxjs/toolkit`
- `react-redux`
- `react-bootstrap`
- `bootstrap`

---

## Hướng dẫn chạy chương trình

### 1. Cài đặt các gói phụ thuộc (Dependencies)
Mở terminal tại thư mục `redux-rtk-demo` và chạy lệnh:
```bash
cd redux-rtk-demo
npm install
```

### 2. Chạy ứng dụng ở môi trường phát triển (Development Mode)
```bash
npm run dev
```
Sau đó truy cập: [http://localhost:5173](http://localhost:5173)

### 3. Xây dựng bản Production (Build)
```bash
npm run build
```
Thư mục `dist` chứa code đã tối ưu sẽ được tạo ra.

---

## Cấu trúc thư mục của dự án
```text
redux-rtk-demo/src/
├── app/
│   └── store.js             # Cấu hình store chính của Redux
├── features/
│   ├── counter/
│   │   ├── Counter.jsx      # Component giao diện Counter
│   │   └── counterSlice.js  # Slice xử lý state & action Counter
│   ├── todos/
│   │   ├── Todos.jsx        # Component giao diện Todos
│   │   └── todosSlice.js    # Slice xử lý danh sách việc cần làm
│   └── posts/
│       ├── Posts.jsx        # Component hiển thị các bài viết từ API
│       └── postsSlice.js    # Slice xử lý async thunk & extraReducers
├── App.jsx                  # Component gốc hiển thị 3 tính năng
├── main.jsx                 # Điểm khởi chạy ứng dụng (Provider, Bootstrap CSS)
└── index.css                # CSS tùy chỉnh
```
