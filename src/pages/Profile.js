import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data';
import PostListItem from '../components/PostListItem';
import { formatDate } from '../utils/formatDate';
import ProfileForm from '../components/Form/ProfileForm';
import CreatePostForm from '../components/Form/CreatePostForm';

function Profile() {
    const [accessToken, setAccessToken] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [toggleEditProfile, setToggleEditProfile] = useState(false);
    const [toggleCreatePost, setToggleCreatePost] = useState(false);
    const [posts, setPosts] = useState([]);

    const uploadFile = (e) => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('myFile', file);
        data.append('userId', userInfo._id);
        if (!file) return;
        if (!accessToken) return;
        axios
            .post('http://localhost:8080/api/v1/user/upload', data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(function (response) {
                alert(response.data);
                window.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

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
                setUserInfo(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [accessToken]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/post/all')
            .then(function (response) {
                setPosts(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="flex items-center h-[33px] bg-[#e2e3e5] text-[15px] text-[#23497c] px-[34.5px]">
                My profile
            </div>
            <div className=" px-[34.5px] mt-[12px] text-[#dce1e4] text-[16px] font-medium">
                <NavLink to="/">Forums</NavLink>
                <span className="mx-2">{'>'}</span>
                <span>Profile</span>
            </div>
            <div className="flex px-[34.5px] pt-[10px] pb-[24px] gap-x-[16px]">
                <div className="flex-1">
                    <div className="flex flex-col items-center bg-[#ebeced] h-fit text-[#9a919b] p-[10px]">
                        <h3 className="text-[#5c7099] text-[28px] font-medium p-[10px]">Profile</h3>
                        <div className="text-center">
                            <label className="label">
                                <input className="hidden" type="file" name="myFile" onChange={(e) => uploadFile(e)} />
                                <figure className="relative w-[150px] h-[150px]">
                                    <img
                                        src={userInfo.avatar}
                                        className="w-[150px] h-[150px] box-border rounded-full border-2 border-solid border-[#ccc] shadow-md transition-all hover:shadow-xl cursor-pointer"
                                        alt="avatar"
                                    />
                                    <figcaption className="flex cursor-pointer absolute top-0 w-full h-full rounded-full transition-all bg-[#000] opacity-0 hover:bg-[#000] hover:opacity-40">
                                        <img
                                            className="w-[50px] h-[50px] m-auto"
                                            src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                                            alt=""
                                        />
                                    </figcaption>
                                </figure>
                            </label>
                        </div>
                        <h3 className="text-[24px] font-semibold">{userInfo.userName}</h3>
                        <p>{userInfo.email}</p>
                        <p>{userInfo.gender}</p>
                        <p>{userInfo.phone}</p>
                        <p className="text-[18px]">
                            Joined: <span>{formatDate(userInfo.createdAt)}</span>
                        </p>
                        <button
                            onClick={() => setToggleEditProfile(true)}
                            className="bg-[#5c7099] text-[#ffffff] rounded px-3 py-2 mt-3"
                        >
                            Edit infomation
                        </button>
                    </div>
                </div>
                <div className="flex-[3] flex flex-col h-fit">
                    <button
                        className="self-end bg-[#5c7099] text-[#ffffff] rounded px-3 py-2 mb-4"
                        onClick={() => setToggleCreatePost(true)}
                    >
                        Create new post
                    </button>
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
                                        className="w-[800px] truncate font-medium text-[#5c7099] cursor-pointer"
                                    />
                                );
                            })}
                    </ul>
                </div>
            </div>
            {toggleEditProfile && <ProfileForm setToggleEditProfile={setToggleEditProfile} />}
            {toggleCreatePost && <CreatePostForm setToggleCreatePost={setToggleCreatePost} />}
        </>
    );
}

export default Profile;
