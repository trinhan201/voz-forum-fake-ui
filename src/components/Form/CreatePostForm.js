import { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function CreatePostForm({ setToggleCreatePost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState();
    const [accessToken, setAccessToken] = useState('');

    const [loading, setLoading] = useState(false);
    let timeOutId;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        setAccessToken(token);
    }, []);

    const handleCreatePost = (e) => {
        e.preventDefault();

        if (!accessToken) return;
        const data = {
            title: title,
            content: content,
        };
        axios
            .post('http://localhost:8080/api/v1/post/create', data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(function (response) {
                setLoading(true);
                if (!image) return;
                const fomrData = new FormData();
                for (let i = 0; i < image.length; i++) {
                    fomrData.append('myFile', image[i]);
                }
                fomrData.append('postId', response.data.data._id);
                axios
                    .post('http://localhost:8080/api/v1/post/upload', fomrData, {
                        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
                    })
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                timeOutId = setTimeout(() => {
                    setLoading(false);
                    alert(response.data.message);
                    setTitle('');
                    setContent('');
                    setToggleCreatePost(false);
                    window.location.reload(true);
                }, 3000);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        return () => clearTimeout(timeOutId);
    }, [timeOutId]);

    return (
        <div
            className="flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 z-10"
            onClick={() => setToggleCreatePost(false)}
        >
            <div
                className="relative bg-[#e2e3e5] w-[500px] h-fit p-10 rounded animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="font-bold text-[32px] mb-8">Create new post</div>
                <form>
                    <Input label="Title:" type="text" placeholder="Title here" value={title} setValue={setTitle} />
                    <input type="file" name="myFile" multiple onChange={(e) => setImage(e.target.files)} />
                    <textarea
                        className="w-full outline-none px-[18px] py-[8px] bg-[#e5eaf0] border border-[#c3c6c9] mt-3"
                        name="content"
                        rows="8"
                        cols="50"
                        placeholder="Write something..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <button
                        className="w-full bg-[#5c7099] px-[12px] py-[8px] text-white rounded mt-5"
                        onClick={handleCreatePost}
                    >
                        Save
                    </button>
                </form>
                {loading ? (
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[32px]">
                        <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default CreatePostForm;
