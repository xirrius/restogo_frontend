import {useNavigate} from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen text-beige relative bg-black">
      <div className="home w-full h-[120%] absolute -top-24">
        <div className="mt-60 flex flex-col items-center justify-center">
          <h1 className="font-dancing font-black text-6xl drop-shadow-lg text-center mx-10">
            Welcome to <br /> Our Delicious Corner
          </h1>
          <p className="font-thin tracking-wide sm:tracking-widest text-center mx-16 mt-10 ">
            We have proper passion for cooking. Love is the secret ingredient
            that makes all our meals taste better and magical.
          </p>
          <p className="font-thin tracking-wide sm:tracking-widest text-center mx-16 mt-10 ">
            See what's on now!
          </p>
          <button className="mt-16 border-2 border-solid border-beige py-2 px-6 rounded transition-all duration-500 hover:bg-beige hover:text-black font-thin" onClick={() => navigate('./products')}>View More</button>
        </div>
      </div>
    </div>
  );
}
export default Home