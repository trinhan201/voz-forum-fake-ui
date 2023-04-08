import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import CommentListItem from '../components/CommentListItem';

function PostDetail() {
    return (
        <>
            <div className="flex items-center h-[33px] bg-[#e2e3e5] text-[15px] text-[#23497c] px-[34.5px]">
                Post detail
            </div>
            <div className=" px-[34.5px] mt-[12px] text-[#dce1e4] text-[16px] font-medium">
                <NavLink to="/">Forums</NavLink>
                <span className="ml-2">{'>'} 1</span>
            </div>
            <div class="px-[34.5px] pt-[10px] pb-[24px] gap-x-[16px]">
                <h3 className="w-full text-[28px] text-[#ebeced]">Phat card cho anh em</h3>
                <div className="text-[#8f9193] text-[15px]">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="ml-1">truonghan123</span> -
                    <FontAwesomeIcon className="ml-1" icon={faClock} />
                    <span className="ml-1">20/1/2023</span>
                </div>

                <div class="w-full flex bg-[#ebeced] h-fit mt-[12px]">
                    <div className="flex-1 flex flex-col items-center bg-[#e2e3e5] p-[10px]">
                        <div className="w-[100px] h-[100px]">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
                                alt=""
                            />
                        </div>
                        <h3 className="text-[#58497c] font-semibold break-words w-[114px]">truonghan123</h3>
                    </div>
                    <div className="flex-[10] p-[10px]">
                        <p className="text-[#aaaaaa] text-[14px] border-b-[1px] border-[#cccccc]">20/1/2023</p>
                        <img
                            className="mt-3 w-[2000px]"
                            src="https://cdn.naturettl.com/wp-content/uploads/2017/02/22014001/top-tips-improve-landscapes-ross-hoddinott-11-1200x675-cropped.jpg"
                            alt=""
                        />
                        <p className="mt-2">
                            Tại thời điểm này, quỹ tấm lòng vozer đang dư được một ít, một phần đóng góp từ các thành
                            viên không chặn quảng cáo, một phần tài trợ đến từ ngân hàng số Timo. Cho nên tôi xin thông
                            báo phát cạc cho một số thành viên có bài viết hay, chất lượng và có tâm trên diễn đàn chúng
                            ta, nội dung dài dòng như sau: Các bài kiến thức, đánh giá... được viết trong thời gian từ
                            01/06/2022 cho đến hết 31/07/2022 Đăng ký tham gia bằng cách thêm và bổ sung hashtag #timo
                            vào bài viết của bạn tại post 1 (trường hợp bài có nhiều post) Tác giả là những thành viên
                            của VOZ, post bài tại diễn đàn trong thời gian nói trên. Bài viết được chọn theo tiêu chí
                            riêng của BQT diễn đàn. Giá trị của cạc bạn nhận được có thế lên đến dưới 1 tỉ đồng, nó phụ
                            thuộc vào tâm huyết khi bạn thể hiện, như: nội dung chữ, hình ảnh, video... Bài viết được
                            chọn sẽ được BQT edit ở cuối bài, bằng cách thêm nội dung và thông tin của chương trình. Tại
                            thời điểm này, quỹ tấm lòng vozer đang dư được một ít, một phần đóng góp từ các thành viên
                            không chặn quảng cáo, một phần tài trợ đến từ ngân hàng số Timo. Cho nên tôi xin thông báo
                            phát cạc cho một số thành viên có bài viết hay, chất lượng và có tâm trên diễn đàn chúng ta,
                            nội dung dài dòng như sau: Các bài kiến thức, đánh giá... được viết trong thời gian từ
                            01/06/2022 cho đến hết 31/07/2022 Đăng ký tham gia bằng cách thêm và bổ sung hashtag #timo
                            vào bài viết của bạn tại post 1 (trường hợp bài có nhiều post) Tác giả là những thành viên
                            của VOZ, post bài tại diễn đàn trong thời gian nói trên. Bài viết được chọn theo tiêu chí
                            riêng của BQT diễn đàn. Giá trị của cạc bạn nhận được có thế lên đến dưới 1 tỉ đồng, nó phụ
                            thuộc vào tâm huyết khi bạn thể hiện, như: nội dung chữ, hình ảnh, video... Bài viết được
                            chọn sẽ được BQT edit ở cuối bài, bằng cách thêm nội dung và thông tin của chương trình. Tại
                            thời điểm này, quỹ tấm lòng vozer đang dư được một ít, một phần đóng góp từ các thành viên
                            không chặn quảng cáo, một phần tài trợ đến từ ngân hàng số Timo. Cho nên tôi xin thông báo
                            phát cạc cho một số thành viên có bài viết hay, chất lượng và có tâm trên diễn đàn chúng ta,
                            nội dung dài dòng như sau: Các bài kiến thức, đánh giá... được viết trong thời gian từ
                            01/06/2022 cho đến hết 31/07/2022 Đăng ký tham gia bằng cách thêm và bổ sung hashtag #timo
                            vào bài viết của bạn tại post 1 (trường hợp bài có nhiều post) Tác giả là những thành viên
                            của VOZ, post bài tại diễn đàn trong thời gian nói trên. Bài viết được chọn theo tiêu chí
                            riêng của BQT diễn đàn. Giá trị của cạc bạn nhận được có thế lên đến dưới 1 tỉ đồng, nó phụ
                            thuộc vào tâm huyết khi bạn thể hiện, như: nội dung chữ, hình ảnh, video... Bài viết được
                            chọn sẽ được BQT edit ở cuối bài, bằng cách thêm nội dung và thông tin của chương trình.
                        </p>
                    </div>
                </div>
                <div class="w-full h-fit mt-5">
                    <h3 className="text-[#ebeced] text-[21px] font-medium bg-[#5c7099] px-[10px] py-[6px]">Comment</h3>
                    <div>
                        <input
                            className="w-full px-[12px] py-[8px] outline-none"
                            type="text"
                            placeholder="Enter something..."
                        />
                    </div>
                    <ul>
                        <CommentListItem
                            img="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"
                            username="trinhan201"
                            content="Hay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vl"
                            cmtDate="35 minutes ago"
                        />
                        <CommentListItem
                            img="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"
                            username="trinhan201"
                            content="Hay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vl"
                            cmtDate="35 minutes ago"
                        />
                        <CommentListItem
                            img="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"
                            username="trinhan201"
                            content="Hay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vlHay vl"
                            cmtDate="35 minutes ago"
                        />
                    </ul>
                </div>
            </div>
        </>
    );
}

export default PostDetail;
