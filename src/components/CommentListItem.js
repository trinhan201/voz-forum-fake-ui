import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import EditCommentForm from './Form/EditCommentForm';

function CommentListItem(props) {
    const [toggleCommentMenu, setToggleCommentMenu] = useState(false);
    const [toggleEditComment, setToggleEditComment] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    const handleDeleteComment = () => {
        if (window.confirm('Are you sure want to delete this comment?') === false) return;
        axios
            .delete(`http://localhost:8080/api/v1/comment/delete/${props.commentId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(function (response) {
                alert(response.data.message);
                // navigate('/profile');
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

    return (
        <>
            <li className="p-[10px] bg-[#ebeced]">
                <div className="flex">
                    <NavLink to="/members/123">
                        <div className="w-[35px] h-[35px]">
                            <img className="w-full h-full object-cover rounded-full" src={props.img} alt="" />
                        </div>
                    </NavLink>
                    <div className="ml-3 text-[14px]">
                        <NavLink to="/members/123">
                            <h3 className="font-semibold">{props.username}</h3>
                        </NavLink>
                        <p className="text-[16px] text-[#9a919b]">{props.content}</p>
                        <div className="relative flex items-center">
                            <p className="text-[13px]">{props.cmtDate}</p>
                            <div className={props.className} onClick={() => setToggleCommentMenu(!toggleCommentMenu)}>
                                - More
                                {toggleCommentMenu && (
                                    <div className="absolute top-[-21px] right-[-72px] bg-white">
                                        <div
                                            className="px-[12px] py-[6px] cursor-pointer hover:bg-[#cccccc]"
                                            onClick={() => {
                                                setToggleEditComment(true);
                                                setToggleCommentMenu(false);
                                            }}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            className="px-[12px] py-[6px] cursor-pointer hover:bg-[#cccccc]"
                                            onClick={handleDeleteComment}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            {toggleEditComment && (
                <EditCommentForm commentId={props.commentId} setToggleEditComment={setToggleEditComment} />
            )}
        </>
    );
}

export default CommentListItem;
