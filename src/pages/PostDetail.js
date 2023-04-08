import { useState, useEffect } from 'react';
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentListItem from '../components/CommentListItem';
import { formatDate } from '../utils/formatDate';

function PostDetail() {
    const [postInfo, setPostInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [accessToken, setAccessToken] = useState('');

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/post/${id}`)
            .then(function (response) {
                setPostInfo(response.data.data);
                axios
                    .get(`http://localhost:8080/api/v1/user/${response.data.data.userId}`)
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
            .get('http://localhost:8080/api/v1/auth/current-user', {
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
            <div className="flex items-center h-[33px] bg-[#e2e3e5] text-[15px] text-[#23497c] px-[34.5px]">
                Post detail
            </div>
            <div className=" px-[34.5px] mt-[12px] text-[#dce1e4] text-[16px] font-medium">
                <NavLink to="/">Forums</NavLink>
                <span className="ml-2">
                    {'>'} {postInfo.title}
                </span>
            </div>
            <div className="px-[34.5px] pt-[10px] pb-[24px] gap-x-[16px]">
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

                <div className="w-full flex bg-[#ebeced] h-fit mt-[12px]">
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
                        <button
                            // onClick={() => setToggleEditPost(true)}
                            className="bg-[#5c7099] text-[#ffffff] rounded px-3 py-2 mt-3"
                        >
                            Edit
                        </button>
                        <button
                            // onClick={() => setToggleEditPost(true)}
                            className="ml-3 bg-[red] text-[#ffffff] rounded px-3 py-2 mt-3"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="w-full h-fit mt-5">
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
