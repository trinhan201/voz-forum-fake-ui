function Input(props) {
    return (
        <div className="flex justify-between items-center mb-3">
            <label className="min-w-[160px] text-[18px]">{props.label}</label>
            <input
                className="flex-1 px-[18px] py-[8px] bg-[#e5eaf0] rounded border border-[#c3c6c9] outline-none"
                type={props.type}
                placeholder={props.placeholder}
                onChange={(e) => props.setValue(e.target.value)}
                value={props.value}
            />
        </div>
    );
}

export default Input;
