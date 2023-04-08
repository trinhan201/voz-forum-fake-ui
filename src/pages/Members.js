import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import MemberListItem from '../components/MemberListItem';
import { formatDate } from '../utils/formatDate';

function Members() {
    const [members, setMembers] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/user/all')
            .then(function (response) {
                setMembers(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

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
                setCurrentUser(response.data.data._id);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [accessToken]);

    return (
        <>
            <div className="flex items-center h-[33px] bg-[#e2e3e5] text-[15px] text-[#23497c] px-[34.5px]">
                All members
            </div>
            <div className=" px-[34.5px] mt-[12px] text-[#dce1e4] text-[16px] font-medium">
                <NavLink to="/">Forums</NavLink>
                <span className="ml-2">{'>'} Members</span>
            </div>
            <div className="text-[#ebeced] text-[28px] px-[34.5px]">Notable members</div>
            <div className="flex px-[34.5px] pt-[10px] pb-[24px] gap-x-[16px]">
                <div className="flex-1">
                    <div className="bg-[#ebeced] h-fit">
                        <h3 className="text-[#5c7099] text-[18px] font-medium p-[10px]">Find member</h3>
                        <div className="p-[10px]">
                            <input
                                className="w-full px-[12px] py-[8px] outline-none"
                                type="text"
                                placeholder="Name..."
                            />
                        </div>
                    </div>
                    <div className="bg-[#ebeced] h-fit mt-[16px]">
                        <h3 className="text-[#5c7099] text-[18px] font-medium p-[10px]">Newest members</h3>
                        <ul className="flex flex-wrap">
                            {members
                                .slice(0, 10)
                                .filter((item) => item._id !== currentUser)
                                .map((member, index) => {
                                    return (
                                        <li key={index} className="p-[10px]">
                                            <div className="flex items-center">
                                                <div className="w-[50px] h-[50px]">
                                                    <img
                                                        className="w-full h-full object-cover rounded-full"
                                                        src={member.avatar}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
                <div className="flex-[3] h-fit">
                    <h3 className="text-[#ebeced] text-[21px] font-medium bg-[#5c7099] px-[10px] py-[6px]">
                        Members list
                    </h3>
                    <ul className="bg-[#ebeced]">
                        {members
                            .filter((item) => item._id !== currentUser)
                            .map((member, index) => {
                                return (
                                    <MemberListItem
                                        key={index}
                                        id={member._id}
                                        img={member.avatar}
                                        username={member.userName}
                                        joinDate={formatDate(member.createdAt)}
                                        qtyPost="234"
                                    />
                                );
                            })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Members;
