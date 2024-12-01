import {FaFacebookF, FaInstagram, FaTwitter} from 'react-icons/fa'
const Footer = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="bg-sky-900 p-8 w-1/2 text-white">
          <h2 className="tex-xl capitalize text-center">contact us</h2>
          <div className="flex flex-col mt-4 gap-2 text-center items-center">
            <p>
              123 ABS Street, Uni 21, Bangladesh 
            </p>
            <p>
            +88 123456789 
            </p>
            <p>
            Mon - Fri: 08:00 - 22:00 
            </p>
            <p>
            Sat - Sun: 10:00 - 23:00
            </p>
          </div>
        </div>
        <div className="bg-blue-950 w-1/2 p-8 text-white">
        <h2 className="tex-xl capitalize text-center">contact us</h2>
        <p className="mt-4 text-center">
        Join us on social media
        </p>
        <div className="flex flex-row gap-4 mt-3 justify-center">
            <a href="">
            <FaFacebookF size={24}/>
            </a>
            <a href="">
            <FaInstagram size={24}/>
            </a>
            <a href="">
            <FaTwitter size={24}/>
            </a>
        </div>
        </div>
      </div>
      <div className="bg-black p-2 text-white">
        <h3 className="text-center">
          Copyright © CulinaryCloud. All rights reserved.
        </h3>
      </div>
    </div>
  );
};

export default Footer;
