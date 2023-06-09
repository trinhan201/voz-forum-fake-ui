import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';

function RegisterForm({ setToggleRegister }) {
    const [usernameValue, setUsernameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [genderValue, setGenderValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [loading, setLoading] = useState(false);
    let timeOutId;
    const genderList = ['Male', 'Female'];

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            userName: usernameValue,
            email: emailValue,
            gender: genderValue,
            phone: phoneValue,
            password: passwordValue,
        };
        if (passwordValue !== confirmPasswordValue) return alert('Password is not match');
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/v1/auth/signup`, data)
            .then(function (response) {
                setLoading(true);
                timeOutId = setTimeout(() => {
                    setLoading(false);
                    alert(response.data.message);
                    setUsernameValue('');
                    setEmailValue('');
                    setGenderValue('');
                    setPhoneValue('');
                    setPasswordValue('');
                    setConfirmPasswordValue('');
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
            onClick={() => setToggleRegister(false)}
        >
            <div
                className="relative bg-[#e2e3e5] w-[340px] md:w-[500px] h-fit p-10 rounded animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="font-bold text-[32px] mb-8">Register Form</div>
                <div
                    onClick={() => setToggleRegister(false)}
                    className="absolute top-0 right-0 p-4 text-[20px] cursor-pointer"
                >
                    <FontAwesomeIcon icon={faClose} />
                </div>
                <form>
                    <Input
                        label="Username:"
                        type="text"
                        placeholder="Enter your username"
                        value={usernameValue}
                        setValue={setUsernameValue}
                    />
                    <Input
                        label="Email:"
                        type="email"
                        placeholder="Enter your email"
                        value={emailValue}
                        setValue={setEmailValue}
                    />
                    <div className="flex mb-[12px]">
                        <label className="hidden md:block min-w-[160px] text-[18px]">Gender:</label>
                        {genderList.map((gender, index) => {
                            return (
                                <div key={index} className="flex items-center mr-3">
                                    <input
                                        type="radio"
                                        checked={genderValue === gender}
                                        onChange={() => setGenderValue(gender)}
                                    />
                                    <span className="ml-1">{gender}</span>
                                </div>
                            );
                        })}
                    </div>
                    <Input
                        label="Phone:"
                        type="text"
                        placeholder="Enter your phone"
                        value={phoneValue}
                        setValue={setPhoneValue}
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        value={passwordValue}
                        setValue={setPasswordValue}
                    />
                    <Input
                        label="Confirm password:"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPasswordValue}
                        setValue={setConfirmPasswordValue}
                    />
                    <button
                        className="w-full bg-[#5c7099] px-[12px] py-[8px] text-white rounded mt-5"
                        onClick={handleRegister}
                    >
                        Register
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

export default RegisterForm;
