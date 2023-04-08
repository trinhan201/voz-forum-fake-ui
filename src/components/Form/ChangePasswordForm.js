import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Input from './Input';

function ChangePasswordForm({ setToggleChangePassword }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(false);
    let timeOutId;

    const handleChangePassword = (e) => {
        e.preventDefault();

        if (!accessToken) return;
        if (confirmPassword !== newPassword) return alert('Password not match');
        axios
            .patch(
                'http://localhost:8080/api/v1/user/change-password',
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                },
            )
            .then(function (response) {
                // setAccessToken(response.data.accessToken);
                setLoading(true);
                timeOutId = setTimeout(() => {
                    setLoading(false);
                    setToggleChangePassword(false);
                    alert(response.data.message);
                    window.location.reload(true);
                }, 3000);
            })
            .catch(function (error) {
                alert(error.response.data.message);
            });
    };

    useEffect(() => {
        return () => clearTimeout(timeOutId);
    }, [timeOutId]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        setAccessToken(token);
    }, []);

    return (
        <div
            className="flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 z-10"
            onClick={() => setToggleChangePassword(false)}
        >
            <div
                className="relative bg-[#e2e3e5] w-[500px] h-fit p-10 rounded animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="font-bold text-[32px] mb-8">Change password</div>
                <form>
                    <Input
                        label="Old password:"
                        type="password"
                        placeholder="Enter your old password"
                        value={oldPassword}
                        setValue={setOldPassword}
                    />
                    <Input
                        label="New password:"
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        setValue={setNewPassword}
                    />
                    <Input
                        label="Confirm password:"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                    />
                    <button
                        className="w-full bg-[#5c7099] px-[12px] py-[8px] text-white rounded mt-5"
                        onClick={handleChangePassword}
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

export default ChangePasswordForm;
