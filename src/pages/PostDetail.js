import { useState, useEffect } from 'react';
import { faClock, faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentListItem from '../components/CommentListItem';
import { formatDate } from '../utils/formatDate';
import CreatePostForm from '../components/Form/CreatePostForm';
import TimeAgo from 'javascript-time-ago';

function PostDetail() {
    const [postInfo, setPostInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [users, setUsers] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [toggleEditPost, setToggleEditPost] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const timeAgo = new TimeAgo('en-US');

    const { id } = useParams();
    const navigate = useNavigate();

    const handleDeletePost = () => {
        if (window.confirm('Are you sure want to delete this post?') === false) return;
        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/v1/post/delete/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(function (response) {
                alert(response.data.message);
                navigate('/profile');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleCreateComment = () => {
        if (!accessToken) return alert('Login to comment this post');
        const data = {
            postId: id,
            content: comment,
        };
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/v1/comment/create`, data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(function (response) {
                alert(response.data.message);
                window.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/comment/all`)
            .then(function (response) {
                setComments(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/user/all`)
            .then(function (response) {
                setUsers(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/post/${id}`)
            .then(function (response) {
                setPostInfo(response.data.data);
                axios
                    .get(`${process.env.REACT_APP_API_URL}/api/v1/user/${response.data.data.userId}`)
                    .then(function (response) {
                        setUserInfo(response.data.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        setAccessToken(token);
    }, []);

    useEffect(() => {
        if (!accessToken) return;
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/auth/current-user`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(function (response) {
                setCurrentUser(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [accessToken]);

    const redirect = (id) => {
        if (userInfo._id === currentUser._id) {
            return '/profile';
        } else {
            return `/members/${id}`;
        }
    };

    return (
        <>
            <div className="flex items-center h-[33px] bg-[#e2e3e5] text-[15px] text-[#23497c] px-[16px] md:px-[34.5px]">
                Post detail
            </div>
            <div className="px-[16px] md:px-[34.5px] mt-[12px] text-[#dce1e4] text-[16px] font-medium">
                <NavLink to="/">Forums</NavLink>
                <span className="ml-2">
                    {'>'} {postInfo.title}
                </span>
            </div>
            <div className="px-[16px] md:px-[34.5px] pt-[10px] pb-[24px] gap-x-[16px]">
                <h3 className="w-full text-[28px] text-[#ebeced]">{postInfo.title}</h3>
                <div className="text-[#8f9193] text-[15px]">
                    <FontAwesomeIcon icon={faUser} />
                    <NavLink to={redirect(userInfo._id)}>
                        <span className="ml-1">{userInfo.userName}</span>
                    </NavLink>{' '}
                    -
                    <FontAwesomeIcon className="ml-1" icon={faClock} />
                    <span className="ml-1">{formatDate(postInfo.createdAt)}</span>
                </div>

                <div className="w-full md:flex bg-[#ebeced] h-fit mt-[12px]">
                    <div className="flex-1 flex flex-col items-center bg-[#e2e3e5] p-[10px]">
                        <NavLink to={redirect(userInfo._id)}>
                            <div className="w-[100px] h-[100px]">
                                <img className="w-full h-full object-cover rounded-full" src={userInfo.avatar} alt="" />
                            </div>
                        </NavLink>
                        <NavLink to={redirect(userInfo._id)}>
                            <h3 className="text-center text-[#58497c] font-semibold break-words w-[114px] mt-3">
                                {userInfo.userName}
                            </h3>
                        </NavLink>
                    </div>
                    <div className="flex-[10] p-[10px]">
                        <p className="text-[#aaaaaa] text-[14px] border-b-[1px] border-[#cccccc]">
                            {formatDate(postInfo.createdAt)}
                        </p>
                        {postInfo.img?.map((item, index) => {
                            return <img key={index} className="mt-3 w-full" src={item} alt="" />;
                        })}
                        <p className="mt-2">{postInfo.content}</p>
                        {postInfo.userId === currentUser._id ? (
                            <>
                                <button
                                    onClick={() => setToggleEditPost(true)}
                                    className="bg-[#5c7099] text-[#ffffff] rounded px-3 py-2 mt-3"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                    className="ml-3 bg-[red] text-[#ffffff] rounded px-3 py-2 mt-3"
                                >
                                    Delete
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="w-full h-fit mt-5">
                    <h3 className="text-[#ebeced] text-[21px] font-medium bg-[#5c7099] px-[10px] py-[6px]">Comment</h3>
                    <form>
                        <div className="flex">
                            <input
                                className="w-full px-[12px] py-[8px] outline-none"
                                type="text"
                                placeholder="Enter something..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button className="px-[18px] bg-[#aaaaaa]" onClick={handleCreateComment}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </form>
                    <ul>
                        {comments
                            .filter((comment) => comment.postId === id)
                            .map((comment, index) => {
                                const user = users.find((user) => {
                                    return user._id === comment.userId;
                                });
                                return (
                                    <CommentListItem
                                        key={index}
                                        img={
                                            user
                                                ? user.avatar
                                                : 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg'
                                        }
                                        username={user ? user.userName : 'Unknown'}
                                        content={comment.content}
                                        cmtDate={timeAgo.format(new Date(comment.createdAt))}
                                        className={
                                            comment.userId === currentUser._id
                                                ? 'relative text-[13px] ml-1 cursor-pointer'
                                                : 'hidden'
                                        }
                                        commentId={comment._id}
                                        path={
                                            user && (user._id === currentUser._id ? '/profile' : `/members/${user._id}`)
                                        }
                                    />
                                );
                            })}
                    </ul>
                </div>
            </div>
            {toggleEditPost && (
                <CreatePostForm setToggleCreatePost={setToggleEditPost} titleForm="Edit post" postId={postInfo._id} />
            )}
        </>
    );
}

export default PostDetail;
