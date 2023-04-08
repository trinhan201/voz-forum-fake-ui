import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { forumLogo } from '../../assets/img';
import LoginForm from '../../components/Form/LoginForm';
import RegisterForm from '../../components/Form/RegisterForm';

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleRegister, setToggleRegister] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [userInfo, setUserInfo] = useState({});

    const handleLogout = () => {
        if (!accessToken) return;
        localStorage.removeItem('accessToken');
        window.location.reload(true);
    };

    useEffect(() => {
        const scrollPage = () => {
            const windowHeight = window.scrollY;
            if (windowHeight >= 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', scrollPage);

        return () => window.removeEventListener('scroll', scrollPage);
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setAccessToken(accessToken);
        }
    }, [accessToken]);

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

    return (
        <>
            <header className="h-[57px] bg-[#343a40] px-[34.5px]">
                <div className="flex items-center justify-start h-full">
                    <div className="text-white">
                        <img src={forumLogo} alt="logo" />
                    </div>
                </div>
            </header>
            <div
                className={
                    scrolled
                        ? 'fixed top-0 left-0 right-0 h-[40px] bg-[#343a40] px-[34.5px] shadow-md'
                        : 'h-[40px] bg-[#343a40] px-[34.5px]'
                }
            >
                <div className="flex items-center justify-between h-full">
                    <ul className="flex text-white">
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-[18px] text-[#23497c] font-semibold bg-[#e2e3e5] px-[15px] py-[8px]'
                                        : 'text-[18px] text-[#e2e3e5] font-semibold px-[15px] py-[8px]'
                                }
                                to="/"
                            >
                                Forums
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-[18px] text-[#23497c] font-semibold bg-[#e2e3e5] px-[15px] py-[8px]'
                                        : 'text-[18px] text-[#e2e3e5] font-semibold px-[15px] py-[8px]'
                                }
                                to="/members"
                            >
                                Members
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-[18px] text-[#23497c] font-semibold bg-[#e2e3e5] px-[15px] py-[8px]'
                                        : 'text-[18px] text-[#e2e3e5] font-semibold px-[15px] py-[8px]'
                                }
                                to="/help"
                            >
                                Help
                            </NavLink>
                        </li>
                    </ul>
                    {accessToken === '' ? (
                        <>
                            <ul className="flex">
                                <li
                                    className="text-[18px] text-[#e2e3e5] font-semibold px-[15px] py-[8px] cursor-pointer"
                                    onClick={() => setToggleLogin(true)}
                                >
                                    Login
                                </li>
                                <li
                                    className="text-[18px] text-[#e2e3e5] font-semibold px-[15px] py-[8px] cursor-pointer"
                                    onClick={() => setToggleRegister(true)}
                                >
                                    Register
                                </li>
                            </ul>
                        </>
                    ) : (
                        <div className="relative">
                            <div
                                className="w-[40px] h-[40px] p-[4px] cursor-pointer"
                                onClick={() => setToggleMenu(!toggleMenu)}
                            >
                                <img className="w-full h-full object-cover rounded-full" src={userInfo.avatar} alt="" />
                            </div>
                            {toggleMenu && (
                                <div className="absolute top-[40px] right-0 w-[200px] h-fit bg-white shadow-2xl">
                                    <NavLink
                                        onClick={() => setToggleMenu(false)}
                                        className="p-3 block w-full hover:bg-[#cccccc]"
                                        to={`/profile`}
                                    >
                                        Profile
                                    </NavLink>
                                    <div className="p-3 hover:bg-[#cccccc] cursor-pointer">Change password</div>
                                    <div className="p-3 hover:bg-[#cccccc] cursor-pointer" onClick={handleLogout}>
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {toggleLogin && <LoginForm setToggleLogin={setToggleLogin} />}
            {toggleRegister && <RegisterForm setToggleRegister={setToggleRegister} />}
        </>
    );
}

export default Header;
