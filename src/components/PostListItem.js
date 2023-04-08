import { NavLink } from 'react-router-dom';

function PostListItem(props) {
    return (
        <li className="p-[10px] border-b-[1px] border-[#cccccc]">
            <div className="flex items-center">
                <NavLink to="/123">
                    <div className="w-[40px] h-[40px]">
                        <img className="w-full h-full object-cover rounded-full" src={props.img} alt="" />
                    </div>
                </NavLink>
                <div className="ml-3">
                    <NavLink to="/1">
                        <h3 className={props.className}>{props.title}</h3>
                    </NavLink>
                    <p className="text-[14px] text-[#9a919b]">
                        {props.dateTitle} <span>{props.postDate}</span> - by{' '}
                        <span className="text-[#5c7099] cursor-pointer">{props.username}</span>
                    </p>
                </div>
            </div>
        </li>
    );
}

export default PostListItem;