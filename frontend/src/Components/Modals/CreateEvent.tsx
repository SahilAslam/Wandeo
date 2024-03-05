import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../Axios/Axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slice/userSlice";
import axios from "axios";
import { ModalProps } from "../../Interfaces/ModalInterface";

const CreateEvent: React.FC<ModalProps> = ({ visible, closeModal, updateUI }) => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendeesLimit, setAttendeesLimit] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET || ""
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME || ""
  const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL || ""

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      (scrollContainerRef.current as HTMLElement).classList.add("hide-scrollbar");
    }
  }, []);

  const user = useSelector(selectUser) as any;
  const id = user?.id ? user?.id : user?.user?._id;
  console.log(id);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("cloud_name", CLOUD_NAME);
        const response = await axios.post(
          UPLOAD_URL,
          formData
        );
        return response.data.public_id;
      } else {
        toast.error("no images please upload");
        return null;
      }
    } catch (error) {
      console.error("Error while uploading the image:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(error) {
      toast.error(error);
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("End date must be greater than the start date");
      return;
    }

    if(eventName == "" || location == "" || startDate == "" || endDate == "" || attendeesLimit == "" || description == "") {
      toast.error("Required all fields");
      return;
    }

    const uploadedUrl = await handleImageUpload();

    if (!uploadedUrl) {
      toast.error("Error while uploading the image");
      return;
    }

    axiosInstance
      .post(`/createEvent/${id}`, {
        eventName: eventName,
        location: location,
        startDate: startDate,
        endDate: endDate,
        attendeesLimit: attendeesLimit,
        image: uploadedUrl,
        description: description,
      })
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.message);
          updateUI((prev: boolean) => ! prev)
          closeModal();
        }
      })
      .catch((err) => console.log(err));
  };

  const today = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newStartDate = e.currentTarget.value;
    setStartDate(newStartDate);

    // Check if the end date is less than the start date
    if (endDate < newStartDate) {
      setError('End date cannot be before the start date');
    } else {
      setError('');
    }
  };

  const handleEndDateChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newEndDate = e.currentTarget.value;
    setEndDate(newEndDate);
  
    // Check if the end date is less than the start date
    if (newEndDate < startDate) {
      setError('End date cannot be before the start date');
    } else {
      setError('');
    }
  };


  return (
    <>
      <ToastContainer />
      {visible && (
        <div className="modal-content" ref={scrollContainerRef}>
          <div
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none", // Hide the scrollbar in Firefox
              msOverflowStyle: "none", // Hide the scrollbar in IE/Edge
            }}
            className="fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm"
            id="wrapper"
          >
            <div className="flex items-center justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
              <div className="inset-0 transition-opacity">
                <div className="absolute inset-0">
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                  <div
                    className="inline-block align-bottom bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="flex justify-between px-6 py-5 bg-blue-100">
                      <label
                        htmlFor="name"
                        className="font-medium text-xl text-ascent-1 text-left text-slate-500"
                      >
                        Create an Event
                      </label>
                      <button
                        className="text-ascent-1 cursor-pointer text-slate-500"
                        onClick={closeModal}
                      >
                        <IoMdClose size={26} />
                      </button>
                    </div>
                    <form
                      encType="multipart/form-data"
                      className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col gap-1 mt-5">
                        <label
                          className="text-ascent-2 text-base mb-1"
                          htmlFor="name"
                        >
                          Event Name
                        </label>
                        <input
                          type="text"
                          value={eventName}
                          name="eventName"
                          onChange={(e) => setEventName(e.target.value)}
                          className="w-full bg-secondary rounded border 
                          border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                        />
                        <label
                          className="text-ascent-2 text-base mb-1"
                          htmlFor="location"
                        >
                          Where
                        </label>
                        <input
                          type="text"
                          value={location}
                          name="location"
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-secondary rounded border 
                          border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                        />
                      </div>
                      <div className="">
                        <h4 className="text-base">When</h4>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div className="grid grid-cols-1 gap-1">
                            <label
                              className="text-ascent-2 text-sm mb-1"
                              htmlFor="startDate"
                            >
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={startDate}
                              name="startDate"
                              onChange={handleStartDateChange}
                              min={today}
                              className="w-full bg-secondary rounded border 
                          border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            <label
                              className="text-ascent-2 text-sm mb-1"
                              htmlFor="endDate"
                            >
                              End Date
                            </label>
                            <input
                              type="date"
                              value={endDate}
                              name="where"
                              onChange={handleEndDateChange}
                              min={today}
                              className="w-full bg-secondary rounded border 
                          border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                            />
                          </div>
                        </div>
                        {error && error == 'End date cannot be before the start date' && <p className="text-red-500">{error}</p>}
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        <label
                          className="text-ascent-2 text-base mb-1"
                          htmlFor="attandeesLimit"
                        >
                          Limit Attendees
                        </label>
                        <input
                          type="number"
                          value={attendeesLimit}
                          name="attandeesLimit"
                          onChange={(e) => {
                            const inputValue: any = e.target.value 
                            if (inputValue < 0) {
                              setError("Please enter a non-negative number.");
                            } else {
                              setError("");
                              setAttendeesLimit(e.target.value);
                            }
                          }}
                          className="w-full bg-secondary rounded border 
                          border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                        />
                        {error && error == "Please enter a non-negative number." && <p className="text-red-500">{error}</p>}
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        <label
                          className="text-ascent-2 text-base mb-1"
                          htmlFor="image"
                        >
                          Image
                        </label>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleChange}
                          className="w-full bg-secondary rounded border 
                          border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                        />
                        {image && (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Event"
                            style={{ height: "100px", width: "100px" }}
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        <label
                          className="text-ascent-2 text-base mb-1"
                          htmlFor="description"
                        >
                          Description
                        </label>

                        <textarea
                          name=""
                          id=""
                          rows={6}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full bg-secondary rounded border 
                            border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666]"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex mt-2 justify-center rounded-md bg-green-600 hover:bg-green-500 px-8 py-2 mb-8 text-lg font-medium text-white outline-none"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEvent;
