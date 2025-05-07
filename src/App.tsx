import { IoIosArrowForward } from "react-icons/io";
import React, { useState } from "react";
import { SimpleMap } from "./components/SimpleMap";

type ipAddressData = {
  ip: string;
  country: string;
  location: {
    country: string;
    region: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  org: string;
  isp: string;
};

const App = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [ipAddressData, setIpAddressData] = useState<ipAddressData | null>(
    null
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setIpAddress(event.target.value);
  };

  const fetchingIpAddress = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_QUJo41E37FFQCkmrvBSZOWw3WzKxA&ipAddress=${ipAddress}`
      );
      const data = await res.json();
      console.log("data", data);
      setIpAddressData(data);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };

  return (
    <main className="relative">
      <img
        src="./src/assets/images/pattern-bg-desktop.png"
        alt=""
        className="w-full h-60 object-cover"
      />
      <div>
        <div className="absolute top-0 mt-10 mx-auto w-full flex flex-col justify-center items-center">
          <h1 className="text-white text-lg text center mb-5">
            IP Address Tracker
          </h1>
          <form
            onSubmit={fetchingIpAddress}
            className="flex flex-start items-center"
          >
            <input
              onChange={handleInputChange}
              type="text"
              className="mx-auto w-60 md:w-2xl md:text-center h-10 bg-white outline-none top-0 rounded-l-xl"
            />
            <div className="bg-black w-[43px] h-[41.5px] flex items-center justify-center rounded-r-xl cursor-pointer hover:bg-black/70 transition-all duration-300">
              <IoIosArrowForward className="text-lg text-white hover:animate-ping" />
            </div>
          </form>

          <div className="bg-white flex flex-col md:flex-row items-center justify-center mt-10 *:py-4 *:px-10 *:text-center rounded-xl p-8">
            <div className=" w-70 md:max-w-50">
              <p className="text-xs uppercase text-gray-500 font-medium">
                Ip Address
              </p>
              <h2>{ipAddressData?.ip}</h2>
              <hr className="border border-gray-500/20 " />
            </div>
            <div className="w-70 md:max-w-50">
              <p className="text-xs uppercase text-gray-500 font-medium">
                Location
              </p>
              <h2>
                {ipAddressData
                  ? ipAddressData.location.region +
                    ", " +
                    ipAddressData?.location.country
                  : "Location"}
              </h2>
              <hr className="border border-gray-500/20 " />
            </div>
            <div className="w-70 md:max-w-50">
              <p className="text-xs uppercase text-gray-500 font-medium">
                TimeZone
              </p>
              <h2>{ipAddressData?.location.timezone || "timezone"}</h2>
              <hr className="border border-gray-500/20 " />
            </div>
            <div className="w-70 md:max-w-50">
              <p className="text-xs uppercase text-gray-500 font-medium">ISP</p>
              <h2>GilRevv Ltd.</h2>
              {/* {ipAddressData?.isp || "GilRevv"} */}
              <hr className="border border-gray-500/20" />
            </div>
          </div>
        </div>
      </div>

      {ipAddressData && (
        <SimpleMap
          latitude={ipAddressData.location.lat}
          longitude={ipAddressData.location.lng}
          zoom={13}
        />
      )}
    </main>
  );
};

export default App;
