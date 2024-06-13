import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  setCategory,
  setSearchSuggestion,
} from "../utils/appSlice";
import { useState } from "react";
import { SEARCH_SUGGESTIONS_API } from "../constant/youtube";
import axios from "axios";
import { FaUser } from "react-icons/fa";
const Navbar = () => {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const dispatch = useDispatch();
  const { searchSuggestion } = useSelector((store) => store.app);

  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };

  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };

  const showSuggestion = async () => {
    try {
      const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
      dispatch(setSearchSuggestion(res?.data[1]));
    } catch (error) {
      console.log(error);
    }
  };

  const openSuggestion = () => {
    setSuggestion(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showSuggestion();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-black text-white">
      <div className="flex w-[96%] py-3 justify-between items-center">
        <div className="flex items-center ">
          <GiHamburgerMenu
            onClick={toggleHandler}
            size="24px"
            className="cursor-pointer"
          />
          <img
            className="px-4"
            width={"125px"}
            src="https://9to5mac.com/wp-content/uploads/sites/6/2017/08/youtube_logo_dark.jpg?quality=82&strip=all"
            alt="yt_logo"
          />
        </div>
        <div className="flex w-[40%] items-center">
          <div className="flex w-[100%] ">
            <input
              value={input}
              onFocus={openSuggestion}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 border border-gray-400 rounded-l-full outline-none bg-black"
            />
            <button
              onClick={searchVideo}
              className="py-2 border border-gray-400 rounded-r-full px-4"
            >
              <CiSearch size="24px" />
            </button>
          </div>
          {suggestion && searchSuggestion.length !== 0 && (
            <div className="absolute top-3 z-50 w-[30%] py-5 bg-black shadow-lg mt-12 rounded-lg border border-gray-200">
              <ul>
                {searchSuggestion.map((text, idx) => {
                  return (
                    <div className="flex items-center px-4 hover:bg-gray-100">
                      <CiSearch size="24px" />
                      <li className="px-2 py-1 cursor-pointer text-md font-medium">
                        {text}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="flex w-[10%] justify-between items-center">
          <IoIosNotificationsOutline size={"24px"} className="cursor-pointer" />
          <CiVideoOn size={"24px"} className="cursor-pointer " />
          <div className="border border-blue-500   text-right cursor-pointer flex flex-wrap p-2 active:bg-gray-800">
            <FaUser size={"15px"} className="text-blue-500 mt-1" />
            <h1 className="text-sm underline text-blue-500">SignIn</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
