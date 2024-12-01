
/* eslint-disable react/prop-types */

const ImageSectionContent = ({bgImg, height, heading, description, bgColor, textColor}) => {
    return (
        <div style= {{ backgroundImage: `url(${bgImg})`}} className={`w-full ${height} px-20 py-24 bg-cover`}>
            <div className={`w-2/3 mx-auto ${bgColor ? bgColor : 'bg-white'} px-12 py-8`}>
                <h2 className={`text-center text-3xl uppercase ${textColor ? textColor : 'text-black'}`}>{heading}</h2>
                <p className={`my-4 text-center ${textColor ? textColor : 'text-black'}`}>{description}</p>
            </div>
        </div>
    );
};

export default ImageSectionContent;