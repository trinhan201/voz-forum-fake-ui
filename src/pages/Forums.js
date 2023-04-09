import { useState, useEffect } from 'react';
import axios from 'axios';
import PostListItem from '../components/PostListItem';
import { formatDate } from '../utils/formatDate';
import TimeAgo from 'javascript-time-ago';
// import en from 'javascript-time-ago/locale/en';
// TimeAgo.addDefaultLocale(en);

function Forums() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [limitInc, setLimitInc] = useState(5);
    const [limit, setLimit] = useState(Number);
    const timeAgo = new TimeAgo('en-US');

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/post/all?limit=${limitInc}`)
            .then(function (response) {
                setPosts(response.data.data);
                setLimit(response.data.length);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [limitInc]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/user/all')
            .then(function (response) {
                setUsers(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="flex items-center h-[33px] bg-[#e2e3e5] text-[15px] text-[#23497c] px-[16px] md:px-[34.5px]">
                All posts
            </div>
            <div className="xl:flex px-[16px] md:px-[34.5px] pt-[10px] pb-[24px] gap-x-[16px]">
                <div className="xl:flex-[3] h-fit">
                    <h3 className="text-[#ebeced] text-[21px] font-medium bg-[#5c7099] px-[10px] py-[6px]">Đại sảnh</h3>
                    <ul className="bg-[#ebeced]">
                        {posts.map((post, index) => {
                            const user = users.find((user) => {
                                return user._id === post.userId;
                            });
                            return (
                                <PostListItem
                                    key={index}
                                    id={post._id}
                                    img={
                                        user
                                            ? user.avatar
                                            : 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg'
                                    }
                                    title={post.title}
                                    postDate={formatDate(post.createdAt)}
                                    username={user ? user.userName : 'Unknown'}
                                    dateTitle="Created at:"
                                    className="w-[190px] md:w-[500px] lg:w-[800px] truncate font-medium text-[#5c7099] cursor-pointer"
                                />
                            );
                        })}
                        <button
                            onClick={() => setLimitInc(limitInc + 5)}
                            className={
                                limitInc >= limit ? 'hidden' : 'w-full bg-[#5c7099] text-[#ffffff] px-[12px] py-[4px]'
                            }
                        >
                            Load more
                        </button>
                    </ul>
                </div>
                <div className="xl:flex-1 bg-[#ebeced] h-fit mt-4 xl:mt-0">
                    <h3 className="text-[#5c7099] font-medium p-[10px]">Latest posts</h3>
                    <ul>
                        {posts.slice(0, 5).map((post, index) => {
                            const user = users.find((user) => {
                                return user._id === post.userId;
                            });
                            return (
                                <PostListItem
                                    key={index}
                                    id={post._id}
                                    img={
                                        user
                                            ? user.avatar
                                            : 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg'
                                    }
                                    title={post.title}
                                    postDate={timeAgo.format(new Date(post.createdAt))}
                                    username={user ? user.userName : 'Unknown'}
                                    dateTitle="Latest:"
                                    className="w-[190px] md:w-[500px] lg:w-[315px] truncate font-medium text-[#5c7099] cursor-pointer"
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Forums;
