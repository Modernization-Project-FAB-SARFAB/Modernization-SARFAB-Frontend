const FormInput: React.FC<FormInputProps> = ({ label, placeholder, type = 'text', required = false }) => {
    return (
        <div className="w-full">
            <label className="mb-2.5 block text-black dark:text-white">
                {label} {required && <span className="text-meta-1">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
        </div>
    );
};

export default FormInput;