import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import PostListItem from '../components/PostListItem';
import { formatDate } from '../utils/formatDate';

function MemberDetail() {
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`)
            .then(function (response) {
                setUserInfo(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/post/all`)
            .then(function (response) {
                setPosts(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="flex items-center h-[33px] bg-[#e2e3e5] text-[15px] text-[#23497c] px-[16px] md:px-[34.5px]">
                Member detail
            </div>
            <div className="px-[16px] md:px-[34.5px] mt-[12px] text-[#dce1e4] text-[16px] font-medium">
                <NavLink to="/">Forums</NavLink>
                <span className="mx-2">{'>'}</span>
                <NavLink to="/members">Members</NavLink>
                <span className="mx-2">{'>'}</span>
                <span>{userInfo.userName}</span>
            </div>
            <div className="xl:flex px-[16px] md:px-[34.5px] pt-[10px] pb-[24px] gap-x-[16px]">
                <div className="xl:flex-1">
                    <div className="flex flex-col items-center bg-[#ebeced] h-fit text-[#9a919b] p-[10px]">
                        <h3 className="text-[#5c7099] text-[28px] font-medium p-[10px]">Profile</h3>
                        <div className="w-[150px] h-[150px]">
                            <img className="w-full h-full object-cover rounded-full" src={userInfo.avatar} alt="" />
                        </div>
                        <h3 className="text-[24px] font-semibold">{userInfo.userName}</h3>
                        <p className="text-[18px]">
                            Joined: <span>{formatDate(userInfo.createdAt)}</span>
                        </p>
                    </div>
                </div>
                <div className="xl:flex-[3] h-fit mt-4 xl:mt-0">
                    <h3 className="text-[#ebeced] text-[21px] font-medium bg-[#5c7099] px-[10px] py-[6px]">
                        All posts list
                    </h3>
                    <ul className="bg-[#ebeced]">
                        {posts
                            .filter((post) => post.userId === userInfo._id)
                            .map((post, index) => {
                                return (
                                    <PostListItem
                                        key={index}
                                        id={post._id}
                                        img={userInfo.avatar}
                                        title={post.title}
                                        postDate={formatDate(post.createdAt)}
                                        username={userInfo.userName}
                                        dateTitle="Created at:"
                                        className="w-[190px] md:w-[500px] lg:w-[800px] truncate font-medium text-[#5c7099] cursor-pointer"
                                    />
                                );
                            })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MemberDetail;
