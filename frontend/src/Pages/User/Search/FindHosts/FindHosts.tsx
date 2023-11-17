import React from "react";
import SignupNavbar from "../../../../Components/User/Navbar/Navbar";
import "./FindHosts.css"
import { RiDoubleQuotesL } from "react-icons/ri";
import { ImUsers } from "react-icons/im";
import { FaGlobeAmericas } from "react-icons/fa";
import { TbHomeCheck } from "react-icons/tb";
import { ImUser } from "react-icons/im";

const FindHosts = () => {
  return (
    <>
      <SignupNavbar />
      <div className="px-4 py-2 flex xl:justify-center flex-col gap-2 md:flex-row">
        <div className="order-2 md:order-1 w-full xl:w-auto flex flex-col gap-2">
          <div className="bg-white shadow-lg w-auto">
            <div className="px-5 py-2 w-auto">
              <h1 className="text-slate-700 font-semibold">Hosts</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 px-5 pt-5 w-auto">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-2/3">
                <div className="flex flex-col sm:w-1/2 lg:w-1/2 xl:w-[230px]">
                  <label
                    htmlFor="arive"
                    className="uppercase pb-1 text-gray-400"
                  >
                    Arrive
                  </label>
                  <input
                    type="date"
                    className="px-2 py-1 w-full  h-9 rounded border"
                  />
                </div>
                <div className="flex flex-col sm:w-1/2 lg:w-1/2 xl:w-[230px]">
                  <label
                    htmlFor="depart"
                    className="uppercase pb-1 text-gray-400"
                  >
                    Depart
                  </label>
                  <input
                    type="date"
                    className="px-2 py-1 w-full h-9 rounded border placeholder-shown:text-gray-400"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-1/3 xl:w-[230px]">
                <label
                  htmlFor="travelers"
                  className="uppercase pb-1 text-gray-400"
                >
                  No. of Travelers
                </label>
                <input
                  type="number"
                  defaultValue="Any"
                  className="px-2 py-1 w-full h-9 rounded border"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end px-5 pt-8 pb-5">
              <button className="bg-gray-400 text-white font-semibold px-2 py-1.5 rounded">
                Clear Filters
              </button>
              <button className="bg-sky-600 text-white font-semibold px-4 py-1.5 rounded">
                Search
              </button>
            </div>
            <div className="bg-gray-100 px-5 py-2.5">
              <p className="text-gray-400 font-base">
                63,213 hosts in{" "}
                <span className="text-sky-600 cursor-pointer hover:text-green-800 hover:font-medium">
                  Kerala
                </span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className=" p-2 bg-white shadow-lg w-auto xl:w-[375px]">
              <div className="card-details pb-2 flex flex-row ">
                <div className="image">
                  <img
                    src=""
                    alt="profile img"
                    className="w-[150px] h-[150px] border"
                  />
                </div>
                <div className="px-4 text-slate-700">
                  <h1 className=" ">Mohammed Sharuk</h1>
                  <p className="text-gray-400 text-xs pb-1.5">
                    replies within a day
                  </p>
                  <div className="flex pb-2">
                    <RiDoubleQuotesL className="mr-1 mt-0.5 text-lg" />
                    <p className="text-sm">
                      References: <span className="font-semibold">18</span>
                    </p>
                  </div>
                  <div className="flex pb-2">
                    <ImUsers className="mr-1 mt-0.5" />
                    <p className="text-sm ">
                      Friends: <span className="font-semibold">24</span>
                    </p>
                  </div>
                  <div className="w-auto flex">
                    <FaGlobeAmericas className="mr-1 mt-0.5" />
                    <p className="text-sm pb-2 ">
                      Speaks{" "}
                      <span className="font-semibold pl-1">
                        English,Malayalam
                      </span>
                    </p>
                  </div>
                  <div className="flex">
                    <TbHomeCheck className="mr-1 mt-0.5" />
                    <p className="text-sm ">Accepting Guests</p>
                  </div>
                </div>
              </div>
              <div className="w-auto flex">
                <ImUser className="text-8xl w-16 h-5 mt-0.5 mr-1" />
                <p className="">
                  I am Mohammed Sharuk living in a village doing painting job not
                  yet married l'm a travel enthusiast not full time traveller.
                  Explore new places, and enjoy different cuisines. make good
                  friendships around the world
                </p>
              </div>
            </div>
            <div className=" p-2 bg-white shadow-lg w-auto xl:w-[375px]">
              <div className="card-details pb-2 flex flex-row ">
                <div className="image">
                  <img
                    src=""
                    alt="profile img"
                    className="w-[150px] h-[150px] border"
                  />
                </div>
                <div className="px-4 text-slate-700">
                  <h1 className=" ">Mohammed Sharuk</h1>
                  <p className="text-gray-400 text-xs pb-1.5">
                    replies within a day
                  </p>
                  <div className="flex pb-2">
                    <RiDoubleQuotesL className="mr-1 mt-0.5 text-lg" />
                    <p className="text-sm">
                      References: <span className="font-semibold">18</span>
                    </p>
                  </div>
                  <div className="flex pb-2">
                    <ImUsers className="mr-1 mt-0.5" />
                    <p className="text-sm ">
                      Friends: <span className="font-semibold">24</span>
                    </p>
                  </div>
                  <div className="flex">
                    <FaGlobeAmericas className="mr-1 mt-0.5" />
                    <p className="text-sm pb-2">
                      Speaks{" "}
                      <span className="font-semibold pl-1">
                        English,Malayalam
                      </span>
                    </p>
                  </div>
                  <div className="flex">
                    <TbHomeCheck className="mr-1 mt-0.5" />
                    <p className="text-sm ">Accepting Guests</p>
                  </div>
                </div>
              </div>
              <div className="w-auto flex">
                <ImUser className="text-8xl w-16 h-5 mt-0.5 mr-1" />
                <p className="">
                  I am muralikrishnan living in a village doing painting job not
                  yet married l'm a travel enthusiast not full time traveller.
                  Explore new places, and enjoy different cuisines. make good
                  friendships around the world
                </p>
              </div>
            </div>
            <div className="p-2 bg-white shadow-lg w-auto xl:w-[375px]">
              <div className="card-details pb-2 flex flex-row ">
                <div className="image">
                  <img
                    src=""
                    alt="profile img"
                    className="w-[150px] h-[150px] border"
                  />
                </div>
                <div className="px-4 text-slate-700">
                  <h1 className=" ">Mohammed Sharuk</h1>
                  <p className="text-gray-400 text-xs pb-1.5">
                    replies within a day
                  </p>
                  <div className="flex pb-2">
                    <RiDoubleQuotesL className="mr-1 mt-0.5 text-lg" />
                    <p className="text-sm">
                      References: <span className="font-semibold">18</span>
                    </p>
                  </div>
                  <div className="flex pb-2">
                    <ImUsers className="mr-1 mt-0.5" />
                    <p className="text-sm ">
                      Friends: <span className="font-semibold">24</span>
                    </p>
                  </div>
                  <div className="flex">
                    <FaGlobeAmericas className="mr-1 mt-0.5" />
                    <p className="text-sm pb-2">
                      Speaks{" "}
                      <span className="font-semibold pl-1">
                        English,Malayalam
                      </span>
                    </p>
                  </div>
                  <div className="flex">
                    <TbHomeCheck className="mr-1 mt-0.5" />
                    <p className="text-sm ">Accepting Guests</p>
                  </div>
                </div>
              </div>
              <div className="w-auto flex">
                <ImUser className="text-8xl w-16 h-5 mt-0.5 mr-1" />
                <p className="">
                  I am muralikrishnan living in a village doing painting job not
                  yet married l'm a travel enthusiast not full time traveller.
                  Explore new places, and enjoy different cuisines. make good
                  friendships around the world
                </p>
              </div>
            </div>
            <div className=" p-2 bg-white shadow-lg w-auto xl:w-[375px]">
              <div className="card-details pb-2 flex flex-row ">
                <div className="image">
                  <img
                    src=""
                    alt="profile img"
                    className="w-[150px] h-[150px] border"
                  />
                </div>
                <div className=" px-4 text-slate-700">
                  <h1 className=" ">Mohammed Sharuk</h1>
                  <p className="text-gray-400 text-xs pb-1.5">
                    replies within a day
                  </p>
                  <div className="flex pb-2">
                    <RiDoubleQuotesL className="mr-1 mt-0.5 text-lg" />
                    <p className="text-sm">
                      References: <span className="font-semibold">18</span>
                    </p>
                  </div>
                  <div className="flex pb-2">
                    <ImUsers className="mr-1 mt-0.5" />
                    <p className="text-sm ">
                      Friends: <span className="font-semibold">24</span>
                    </p>
                  </div>
                  <div className="flex">
                    <FaGlobeAmericas className="mr-1 mt-0.5" />
                    <p className="text-sm pb-2">
                      Speaks{" "}
                      <span className="font-semibold pl-1">
                        English,Malayalam
                      </span>
                    </p>
                  </div>
                  <div className="flex">
                    <TbHomeCheck className="mr-1 mt-0.5" />
                    <p className="text-sm ">Accepting Guests</p>
                  </div>
                </div>
              </div>
              <div className="w-auto flex">
                <ImUser className="text-8xl w-16 h-5 mt-0.5 mr-1" />
                <p className="">
                  I am muralikrishnan living in a village doing painting job not
                  yet married l'm a travel enthusiast not full time traveller.
                  Explore new places, and enjoy different cuisines. make good
                  friendships around the world
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 flex flex-col gap-2">
          <div className="w-full md:w-[310px] bg-white shadow-lg">
            <h1 className="uppercase px-4 py-2 text-sm text-green-800 font-bold">
              also near kochi:
            </h1>
            <div className="px-4 py-2 ">
              <h1 className="">Events in Kochi</h1>
              <h1>Advice from Kochi Locals</h1>
            </div>
          </div>
          <div className="w-full md:w-[310px] text-center px-5 pt-6 pb-10 bg-gradient-to-r from-slate-200 to-slate-300 shadow-lg">          
            <h1 className="text-xl">
              Enter your travel dates to filter out busy hosts
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindHosts;
