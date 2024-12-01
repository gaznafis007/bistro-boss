
/* eslint-disable react/prop-types */

const ImageSectionContent = ({bgImg, height, heading, description}) => {
    return (
        <div style= {{ backgroundImage: `url(${bgImg})`}} className={`w-full ${height} my-8 p-20`}>
            <div className="w-2/3 mx-auto bg-white px-12 py-8">
                <h2 className="text-center text-3xl uppercase">{heading}</h2>
                <p className="my-4">{description}</p>
            </div>
        </div>
    );
};

export default ImageSectionContent;