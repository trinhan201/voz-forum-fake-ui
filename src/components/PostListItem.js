import { NavLink } from 'react-router-dom';

function PostListItem(props) {
    return (
        <li className="p-[10px] border-b-[1px] border-[#cccccc]">
            <div className="flex items-center">
                <NavLink to={`/${props.id}`}>
                    <div className="w-[40px] h-[40px]">
                        <img className="w-full h-full object-cover rounded-full" src={props.img} alt="" />
                    </div>
                </NavLink>
                <div className="ml-3">
                    <NavLink to={`/${props.id}`}>
                        <h3 className={props.className}>{props.title}</h3>
                    </NavLink>
                    <p className="text-[14px] text-[#9a919b]">
                        {props.dateTitle} <span>{props.postDate}</span>{' '}
                        <span className={props.postDate === props.postUpdateDate ? 'hidden' : ''}>
                            <span className={props.updateDateTitle === '' ? 'hidden' : ''}>-</span>
                            {' ' + props.updateDateTitle + ' '}
                        </span>
                        <span className={props.postDate === props.postUpdateDate ? 'hidden' : ''}>
                            {props.postUpdateDate}
                        </span>{' '}
                        - by
                        <NavLink to={props.path}>
                            <span className="text-[#5c7099] cursor-pointer"> {props.username}</span>
                        </NavLink>
                    </p>
                </div>
            </div>
        </li>
    );
}

export default PostListItem;
