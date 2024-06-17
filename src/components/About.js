// import { useNavigate } from "react-router-dom";

const About = () => {
  return (
    <div className="products-container relative">
      <div className="relative">
        <div className="absolute -top-24 z-0 w-full h-[120%]">
          <img
            src="./about-bg.avif"
            alt=""
            className="w-full h-full object-cover shadow-2xl"
          />
        </div>
        <div className="p-10 z-1 relative flex flex-col items-center">
          <h1 className="text-center text-6xl font-dancing mb-20 font-black text-white border-b-2 pb-10 w-1/2">
            About Us
          </h1>
          <i className="fa-solid fa-utensils text-white text-7xl ss:text-8xl"></i>
          <p className="text-white text-center font-thin ss:mt-28 mt-20 tracking-wide ss:tracking-widest">
            THE RESTOGO IS OPEN MON - FRI, 7:00 AM TO 11:00 PM.{" "}
            <br className={`ss:block hidden`} /> SAT - SUN, 0:00 AM TO 0:00 PM
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 pt-20">
        <i className="fa-solid fa-shop text-6xl mb-4"></i>
        <h1 className="text-center text-4xl ss:text-6xl font-dancing font-black">
          Discover Our Story
        </h1>
        <h3 className="text-center font-thin mt-6 tracking-wide ss:tracking-widest sm:w-4/6 mx-10">
          AFTER MORE THAN TWO DECADES OF FINE-TUNING, WE HAVE WHAT YOU SEE TODAY
        </h3>
        <div className="flex sm:flex-row flex-col gap-8 justify-center items-center sm:w-4/6 mt-6 mx-10">
          <p className="tracking-wide font-thin text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta,
            animi modi! Voluptate sed id fugiat maxime. Officiis explicabo illo
            error amet rem praesentium, et, alias sapiente, ut mollitia impedit
            minima!
          </p>
          <p className="tracking-wide font-thin text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta,
            animi modi! Voluptate sed id fugiat maxime. Officiis explicabo illo
            error amet rem praesentium, et, alias sapiente, ut mollitia impedit
            minima!
          </p>
        </div>
        <div className="w-full relative mt-16 mb-16">
          <img
            src="./about-bg2.png"
            alt=""
            className="w-full h-full absolute shadow-2xl"
          />
          <div className="relative p-10 flex flex-col justify-center items-center h-full pt-16 ss:pt-28 ss:pb-40 pb-20">
            <i className="fa-regular fa-lightbulb text-white text-6xl mt-8 pb-10 border-b-2 w-1/3 text-center"></i>
            <h1 className="font-dancing text-center text-4xl sm:text-6xl text-white mt-10">
              Food Cooked And Made With All Our Hearts
            </h1>
            <i className="fa-solid fa-utensils text-white text-4xl mt-20"></i>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <i class="fa-solid fa-people-group text-4xl ss:text-6xl mb-10"></i>
          <h1 className="font-dancing text-center text-4xl sm:text-6xl mb-4">
            Testimonials
          </h1>
          <h3 className="text-center font-thin tracking-wide ss:tracking-widest mx-10 mb-10">
            WHAT OUR CLIENTS THINK ABOUT US
          </h3>
          <div className="flex items-center gap-8 md:gap-16 justify-center sm:mx-16 sm:flex-row flex-col">
            <div className="">
              <img src="./test1.png" alt="" className=" sm:w-full h-1/2" />
            </div>
            <div className="sm:w-1/3 mx-10 sm:mx-0">
              <p className="font-jura mt-3 mb-8">
                &quot;Arcu at dictum sapien, mollis. Vulputate sit id accumsan,
                ultricies. In ultrices malesuada elit mauris etiam odio. Duis
                tristique lacus, et blandit viverra nisl velit. Sed mattis
                rhoncus, diam suspendisse sit nunc, gravida eu. Lectus eget eget
                ac dolor neque lorem sapien, suspendisse aliquam.&quot;
              </p>
              <img src="./test2.png" alt="" className="sm:mb-10 mb-4" />
              <p className="font-jura font-black">Nick Jonas</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black p-10 flex flex-col text-white shadow-2xl mt-10 items-center">
        <img src="./logo.png" alt="" className="ss:w-60 ss:h-60 w-36 h-36" />
        <h1 className="font-archivo ss:text-6xl text-4xl">
          <i>RESTOGO</i>
        </h1>
        <div className="flex gap-6 ss:gap-16 mt-6 text-3xl border-b-2 pb-10 w-3/4 justify-center">
          <button >
            <i class="fa-brands fa-facebook"></i>
          </button>
          <button >
            <i class="fa-brands fa-twitter"></i>
          </button>
          <button >
            <i class="fa-brands fa-instagram"></i>
          </button>
        </div>
        <p className="font-thin mt-6">@ Copyright 2024 RestoGo All Rights Reserved</p>
      </div>
    </div>
  );
};
export default About;
