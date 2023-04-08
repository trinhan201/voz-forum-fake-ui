import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function ProfileForm({ setToggleEditProfile }) {
    const [userNameValue, setUserNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [genderValue, setGenderValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(false);
    let timeOutId;

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
                setUserNameValue(response.data.data.userName);
                setEmailValue(response.data.data.email);
                setGenderValue(response.data.data.gender);
                setPhoneValue(response.data.data.phone);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [accessToken]);

    const handleEditProfile = (e) => {
        e.preventDefault();
        const data = {
            userName: userNameValue,
            email: emailValue,
            gender: genderValue,
            phone: phoneValue,
        };
        if (!accessToken) return;
        axios
            .put('http://localhost:8080/api/v1/user/update', data, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(function (response) {
                setLoading(true);
                timeOutId = setTimeout(() => {
                    setLoading(false);
                    setToggleEditProfile(false);
                    alert(response.data.message);
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
            onClick={() => setToggleEditProfile(false)}
        >
            <div
                className="relative bg-[#e2e3e5] w-[500px] h-fit p-10 rounded animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="font-bold text-[32px] mb-8">Edit profile</div>
                <form>
                    <Input
                        label="Username:"
                        type="text"
                        placeholder="Enter your email"
                        value={userNameValue}
                        setValue={setUserNameValue}
                    />
                    <Input
                        label="Email:"
                        type="email"
                        placeholder="Enter your email"
                        value={emailValue}
                        setValue={setEmailValue}
                    />
                    <Input
                        label="Gender:"
                        type="text"
                        placeholder="Enter your gender"
                        value={genderValue}
                        setValue={setGenderValue}
                    />
                    <Input
                        label="Phone:"
                        type="text"
                        placeholder="Enter your phone"
                        value={phoneValue}
                        setValue={setPhoneValue}
                    />
                    <button
                        className="w-full bg-[#5c7099] px-[12px] py-[8px] text-white rounded mt-5"
                        onClick={handleEditProfile}
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

export default ProfileForm;
