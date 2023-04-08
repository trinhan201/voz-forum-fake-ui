import { NavLink } from 'react-router-dom';

function CommentListItem(props) {
    return (
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
                    <p className="">{props.cmtDate}</p>
                </div>
            </div>
        </li>
    );
}

export default CommentListItem;
