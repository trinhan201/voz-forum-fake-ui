function Help() {
    return (
        <>
            <div className="flex items-center h-[33px] bg-[#e2e3e5] text-[15px] text-[#23497c] px-[16px] md:px-[34.5px]">
                Helps
            </div>
            <div className="px-[16px] md:px-[34.5px] py-[10px]">
                <div className="bg-[#e2e3e5] h-fit text-[14px] text-[#000000] p-7">
                    <h3 className="text-[24px] font-bold">Cách tải và chạy back-end trên localhost</h3>
                    <p>
                        <span className="font-semibold">Bước 1:</span> Tải source code back-end từ github
                    </p>
                    <p>
                        <span className="font-semibold">Bước 2:</span> Mở thư mục source code trong VS Code hoặc IDE
                        khác và mở Terminal tại thư mục đó
                    </p>
                    <p>
                        <span className="font-semibold">Bước 3:</span> Tạo file .env tại thư mục góc của source code
                    </p>
                    <p>{'// .env'}</p>
                    <p>PORT={'<your port>'}</p>
                    <p>MONGO={'<your MongoDB URI>'}</p>
                    <p>ACCESS_SECRET={'<your random string>'}</p>
                    <p>
                        <span className="font-semibold">Bước 4:</span> Tại terminal chạy lệnh npm install để tải tất cả
                        các module cần thiết
                    </p>
                    <p>
                        <span className="font-semibold">Bước 5:</span> Tại terminal chạy lệnh npm start để khởi chạy
                        server
                    </p>
                </div>
                <div className="bg-[red] h-fit text-[14px] text-[#ffffff] p-7">
                    <h3 className="text-[24px] font-bold">Cách tải và chạy front-end trên localhost</h3>
                    <p>
                        <span className="font-semibold">Bước 1:</span> Tải source code front-end từ github
                    </p>
                    <p>
                        <span className="font-semibold">Bước 2:</span> Mở thư mục source code trong VS Code hoặc IDE
                        khác và mở Terminal tại thư mục đó
                    </p>
                    <p>
                        <span className="font-semibold">Bước 3:</span> Tạo file .env tại thư mục góc của source code
                    </p>
                    <p>{'// .env'}</p>
                    <p>REACT_APP_API_URL={'<your api(back-end) URL>'}</p>
                    <p>
                        <span className="font-semibold">Bước 4:</span> Tại terminal chạy lệnh npm install để tải tất cả
                        các module cần thiết
                    </p>
                    <p>
                        <span className="font-semibold">Bước 5:</span> Tại terminal chạy lệnh npm start để khởi chạy
                        react app
                    </p>
                </div>
                <div className="bg-[green] h-fit text-[14px] text-[#ffffff] p-7">
                    <h3 className="text-[24px] font-bold">Cách sử dụng fullstack app trên localhost</h3>
                    <p className="font-medium text-[17px]">1. Trước khi đăng nhập</p>
                    <p>- Có thể đọc các bài post, đọc comment, và xem thông tin user</p>
                    <p>- Đăng ký tài khoản, đăng nhập</p>
                    <p className="font-medium text-[17px]">2. Sau khi đăng nhập</p>
                    <p>- Đổi mật khẩu</p>
                    <p>- Đăng xuất</p>
                    <p>- Sửa thông tin user</p>
                    <p>- Change avatar</p>
                    <p>- Thêm/xóa/sửa bài post</p>
                    <p>- Thêm/xóa sửa comment</p>
                </div>
            </div>
        </>
    );
}

export default Help;
