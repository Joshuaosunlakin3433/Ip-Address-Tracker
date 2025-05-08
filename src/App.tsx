import { IoIosArrowForward } from "react-icons/io";
import React, { useState } from "react";
import { SimpleMap } from "./components/SimpleMap";
import Image from "/pattern-bg-desktop.png"


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
        src={Image}
        alt="background-image"
        className="w-full h-80 md:h-60 object-cover"
      />
      <div>
        <div className="absolute top-0 mt-10 mx-auto w-full flex flex-col justify-center items-center">
          <h1 className="text-white text-lg md:text-2xl text center pt-5 mb-5 font-bold">
            IP Address Tracker
          </h1>
          <form
            onSubmit={fetchingIpAddress}
            className="flex flex-start items-center"
          >
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Search for any IP address or domain"
              className="font-primary placeholder:text-xs placeholder:text-gray-500 md:placeholder:text-sm placeholder:font-light p-5 py-6 md:py-5 mx-auto w-60 md:w-sm h-10 bg-white outline-none top-0 rounded-l-xl"
            />
            <div onClick={fetchingIpAddress} className="bg-black w-[43px] h-[48px] md:h-[41.3px] flex items-center justify-center rounded-r-xl cursor-pointer hover:bg-black/70 transition-all duration-300">
              <IoIosArrowForward className="text-lg text-white hover:animate-ping" />
            </div>
          </form>

          <div className="bg-white shadow-lg flex flex-col md:flex-row items-center justify-center py-5 px-6 md:px-0 mt-6 *:text-center md:*:text-start md:*:pl-4 rounded-xl font-primary">
            <div className=" w-70 md:h-20 md:max-h-20 md:max-w-50 mb-5">
              <h3 className="text-xs tracking-widest uppercase text-gray-500/80 font-bold font-mono pb-1">
                Ip<span className="font-primary"> </span>Address
              </h3>
              <p className="font-bold font-primary text-[hsl(218,23%,16%)] text-xl">{ipAddressData?.ip || "IP Address"}</p>
              
            </div>
            <div className="w-70 md:h-20 md:max-h-20 md:max-w-50 md:border-l border-gray-500/30 mb-5">
              <h3 className="text-xs uppercase text-gray-500/80 font-semibold font-mono tracking-widest pb-1">
                Location
              </h3>
              <p className="font-bold text-[hsl(218,23%,16%)] text-xl">
                {ipAddressData
                  ? ipAddressData.location.region +
                    ", " +
                    ipAddressData?.location.country
                  : "Location"}
              </p>
              
            </div>
            <div className="w-70 md:h-20 md:max-h-20 md:max-w-50 md:border-l border-gray-500/30 mb-5">
              <h3 className="text-xs uppercase text-gray-500/80 font-semibold pb-1 font-mono">
                TimeZone
              </h3>
              <p className="font-bold text-xl text-[hsl(218,23%,16%)]">{ipAddressData? `UTC ${ipAddressData?.location.timezone}`: "Timezone"}</p>
              
            </div>
            <div className="w-70 md:h-20 md:max-h-20 md:max-w-50 md:border-l border-gray-500/30 mb-5">
              <h3 className="text-xs uppercase text-gray-500/80 font-semibold pb-1 font-mono">ISP</h3>
              {/* <h2>GilRevv Ltd.</h2> */}
              <p className="font-bold text-xl text-[hsl(218,23%,16%)]">{ipAddressData?.isp || "GilRevv Ltd."}</p>
              
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
