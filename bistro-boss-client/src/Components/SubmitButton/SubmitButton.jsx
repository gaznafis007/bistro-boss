/* eslint-disable react/prop-types */


const SubmitButton = ({name, boolean}) => {
    return (
        <input disabled={boolean} type="submit" value={name} className='bg-[#D1A054] px-6 py-4 w-full cursor-pointer capitalize font-semibold text-white rounded-md' />
    );
};

export default SubmitButton;