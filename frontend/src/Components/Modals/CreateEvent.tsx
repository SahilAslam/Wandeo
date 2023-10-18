import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../Axios/Axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slice/userSlice";

interface CreateEventProps {
  closeModal: () => void;
  visible: boolean;
}

const CreateEvent: React.FC<CreateEventProps> = ({ visible, closeModal }) => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendeesLimit, setAttendeesLimit] = useState("");
  const [description, setDescription] = useState("");

  const user =  useSelector(selectUser)
  const id = user?.user?._id
  console.log(id)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    axiosInstance.post(`/createEvent/${id}`, {
      eventName: eventName,
      location: location,
      startDate: startDate,
      endDate: endDate,
      attendeesLimit: attendeesLimit,
      description: description,
    })
    .then((res) => {   
      if(res.data.message) {
        console.log(res.data.message);
        closeModal();       
      }   
    })
    .catch((err) => console.log(err))
  }

  return (
    <>
      {visible && (
        <div
          className="fixed z-50 top-0 left-0 inset-0 overflow-y-auto"
          id="wrapper"
        >
          <div className="flex items-center justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm">
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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
                            onChange={(e) => setStartDate(e.target.value)}
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
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full bg-secondary rounded border 
                        border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                          />
                        </div>
                      </div>
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
                        onChange={(e) => setAttendeesLimit(e.target.value)}
                        className="w-full bg-secondary rounded border 
                        border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label
                        className="text-ascent-2 text-base mb-1"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        value={description}
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-secondary rounded border 
                        border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666]"
                      />
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
      )}
    </>
  );
};

export default CreateEvent;
