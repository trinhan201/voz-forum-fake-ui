import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function LoginForm({ setToggleLogin }) {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(false);
    let timeOutId;
    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8080/api/v1/auth/signin', {
                email: emailValue,
                password: passwordValue,
            })
            .then(function (response) {
                setAccessToken(response.data.accessToken);
                setLoading(true);
                timeOutId = setTimeout(() => {
                    setLoading(false);
                    setToggleLogin(false);
                    window.location.reload(true);
                }, 3000);
            })
            .catch(function (error) {
                console.log(error);
                alert('Email or password is wrong');
            });
    };

    useEffect(() => {
        return () => clearTimeout(timeOutId);
    }, [timeOutId]);

    useEffect(() => {
        localStorage.setItem('accessToken', accessToken);
    }, [accessToken]);

    return (
        <div
            className="flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 z-10"
            onClick={() => setToggleLogin(false)}
        >
            <div
                className="relative bg-[#e2e3e5] w-[500px] h-fit p-10 rounded animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="font-bold text-[32px] mb-8">Login Form</div>
                <form>
                    <Input
                        label="Email:"
                        type="email"
                        placeholder="Enter your email"
                        value={emailValue}
                        setValue={setEmailValue}
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        value={passwordValue}
                        setValue={setPasswordValue}
                    />
                    <div className="my-5 hover:text-[#23497c] cursor-pointer">Forgot password?</div>
                    <button
                        className="w-full bg-[#5c7099] px-[12px] py-[8px] text-white rounded mt-5"
                        onClick={handleLogin}
                    >
                        Login
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

export default LoginForm;
