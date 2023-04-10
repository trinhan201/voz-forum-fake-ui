import { useState, useEffect } from 'react';
import axios from 'axios';

function EditCommentForm(props) {
    const [comment, setComment] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const handleUpdateComment = ({ setToggleEditComment }) => {
        if (!accessToken) return;
        axios
            .patch(
                `${process.env.REACT_APP_API_URL}/api/v1/comment/update/${props.commentId}`,
                { content: comment },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                },
            )
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
            .get(`${process.env.REACT_APP_API_URL}/api/v1/comment/${props.commentId}`)
            .then(function (response) {
                setComment(response.data.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props.commentId]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        setAccessToken(token);
    }, []);

    return (
        <div>
            <input
                className="w-full px-[18px] py-[8px] bg-[#e5eaf0] border border-[#c3c6c9] outline-none break-words"
                type="text"
                placeholder="Enter something..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex items-center">
                <button className="w-full bg-[#5c7099] px-[12px] py-[8px] text-white" onClick={handleUpdateComment}>
                    Save
                </button>
                <button
                    className="w-full bg-[red] px-[12px] py-[8px] text-white"
                    onClick={() => props.setToggleEditComment(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EditCommentForm;
