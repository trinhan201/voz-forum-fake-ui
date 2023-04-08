import { NavLink } from 'react-router-dom';

function MemberListItem(props) {
    return (
        <li className="p-[10px] border-b-[1px] border-[#cccccc]">
            <div className="flex items-center justify-between text-[#9a919b]">
                <div className="flex items-center">
                    <NavLink to={`/members/${props.id}`}>
                        <div className="w-[60px] h-[60px]">
                            <img className="w-full h-full object-cover rounded-full" src={props.img} alt="" />
                        </div>
                    </NavLink>
                    <div className="ml-3">
                        <NavLink to={`/members/${props.id}`}>
                            <h3 className="w-[200px] text-[18px] truncate font-medium text-[#5c7099] cursor-pointer">
                                {props.username}
                            </h3>
                        </NavLink>
                        <p className="text-[16px] text-[#9a919b]">
                            From: <span>{props.joinDate}</span>
                        </p>
                    </div>
                </div>
                <p>
                    <span>{props.qtyPost}</span> posts
                </p>
            </div>
        </li>
    );
}

export default MemberListItem;
