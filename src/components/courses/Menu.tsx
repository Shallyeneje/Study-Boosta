import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CoursesDispatch, CoursesState } from "./coursesStore";
import {
  setDepartment,
  setFaculty,
  setLevel,
  setLoading,
  setSelectedContent,
} from "./menuSlice";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";

import {
  computerEngineering300,
  computerEngineering500,
  facultyOptions,
  departmentOptions,
  levelOptions,
  engineering200,
  engineering100,
} from "@/app/constants";

const dataMap: Record<number, typeof computerEngineering300> = {
  100: engineering100,
  200: engineering200,
  300: computerEngineering300,
  500: computerEngineering500,
};

interface Video {
  link: string;
  name: string;
}

interface MenuProps {
  searchQuery: string;
}

const Menu: React.FC<MenuProps> = ({ searchQuery }) => {
  const dispatch: CoursesDispatch = useDispatch();
  const { level, selectedContent, loading } = useSelector(
    (state: CoursesState) => state.menu
  );

  const [facultyOpen, setFacultyOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [tempFaculty, setTempFaculty] = useState("Engineering");
  const [tempDepartment, setTempDepartment] = useState("Computer Engineering");
  const [tempLevel, setTempLevel] = useState(300);

  useEffect(() => {
    if (!selectedContent) {
      dispatch(setFaculty(tempFaculty));
      dispatch(setDepartment(tempDepartment));
      dispatch(setLevel(tempLevel));
      dispatch(setSelectedContent(computerEngineering300[0]));
    }
  }, [dispatch, selectedContent, tempDepartment, tempFaculty, tempLevel]);

  const handleLoad = () => {
    dispatch(setLoading(true));
    dispatch(setFaculty(tempFaculty));
    dispatch(setDepartment(tempDepartment));
    dispatch(setLevel(tempLevel));

    setTimeout(() => {
      const selectedData = dataMap[tempLevel] || null;
      if (selectedData) {
        dispatch(setSelectedContent(selectedData[0]));
      } else {
        dispatch(setSelectedContent(null));
      }
      dispatch(setLoading(false));
    }, 500);
  };

  // const handleTitleClick = (title: string) => {
  //   if (loading || !selectedContent) return;

  //   const currentData = dataMap[level] || [];
  //   const content = currentData.find((item) => item.title === title);
  //   if (content) {
  //     dispatch(setSelectedContent(content));
  //   }
  // };

  const handleVideoToggle = (index: number) => {
    setSelectedVideos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderDropdown = <T extends string | number>(
    title: string,
    options: T[],
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selected: T,
    setSelected: React.Dispatch<React.SetStateAction<T>>
  ) => (
    <div className="relative sm:w-52 w-full">
      <div
        className="flex justify-between items-center h-9 px-2 rounded-lg bg-[#F1F5FF] cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <p>{selected || title}</p>
        <MdKeyboardArrowDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const currentData = dataMap[level] || [];
  const handleSearch = useCallback(() => {
    const allData = Object.values(dataMap).flat();
    const matchedContent = allData.find((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedContent) {
      const matchedLevel = Object.entries(dataMap).find(([, items]) =>
        items.includes(matchedContent)
      )?.[0];

      if (matchedLevel) {
        dispatch(setLevel(parseInt(matchedLevel)));
        dispatch(setSelectedContent(matchedContent));
      }
    }
  }, [dispatch, searchQuery]); // Memoize handleSearch

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery, handleSearch]);

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col sm:flex-row sm:gap-6 gap-3 justify-center text-[13px] mt-7 w-full">
        {renderDropdown(
          "Select Faculty",
          facultyOptions,
          facultyOpen,
          setFacultyOpen,
          tempFaculty,
          setTempFaculty
        )}
        {renderDropdown(
          "Select Department",
          departmentOptions,
          departmentOpen,
          setDepartmentOpen,
          tempDepartment,
          setTempDepartment
        )}
        {renderDropdown(
          "Select Level",
          levelOptions,
          levelOpen,
          setLevelOpen,
          tempLevel,
          setTempLevel
        )}
        <button
          className="h-9 px-6 bg-[#051F9C] text-white rounded-lg"
          onClick={handleLoad}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load"}
        </button>
      </section>

      <section className=" max-w-5xl mt-6">
        {currentData.length > 0 ? (
          <div className="flex sm:flex-row flex-col gap-8 mb-5 p-4 w-screen sm:w-full bg-gray-100 border rounded-lg shadow-md">
            <div className="">
              <h3 className="font-semibold text-lg text-[#051F9C] mb-3">Titles</h3>
              <div className="flex flex-1 sm:flex-col overflow-x-auto flex-row gap-4">
                {currentData.map((item) => (
                  <button
                    key={item.title}
                    className={`text-left p-2 w-full rounded-lg whitespace-nowrap ${
                      selectedContent?.title === item.title
                        ? "bg-[#051F9C] text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      dispatch(setSelectedContent(item));
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {selectedContent && (
              <>
                <div className="flex-[2]">
                  <h3 className="font-semibold text-lg text-[#051F9C]">
                    Summary
                  </h3>
                  <ul className="mt-3">
                    {selectedContent.summary.map(
                      (summary: string, index: number) => (
                        <li key={index} className="text-gray-700">
                          {summary}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="flex-[3]">
                  <h3 className="font-semibold text-lg text-[#051F9C]">
                    Videos
                  </h3>
                  <div className="mt-3 space-y-4">
                    {selectedContent.videos.map(
                      (video: Video, index: number) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div
                            className="flex items-start cursor-pointer"
                            onClick={() => handleVideoToggle(index)}
                          >
                            <AiOutlineCheck
                              className={`text-lg mr-3 transition-colors ${
                                selectedVideos.includes(index)
                                  ? "text-green-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <p className="text-sm text-gray-700 font-medium">
                              {video.name}
                            </p>
                          </div>
                          {selectedVideos.includes(index) && (
                            <iframe
                              src={video.link}
                              title={video.name}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full rounded-lg mt-3 h-64"
                            ></iframe>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-4">
            No content available for the selected options.
          </p>
        )}
      </section>
    </div>
  );
};

export default Menu;
