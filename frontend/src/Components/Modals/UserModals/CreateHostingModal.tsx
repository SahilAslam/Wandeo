import React, { useRef, useState } from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import axiosInstance from "../../../Axios/Axios";
import { toast } from "react-toastify";


interface HostingModalProps {
  visible: boolean;
  closeModal: () => void;
  id: any;
}

const CreateHostingModal: React.FC<HostingModalProps> = ({
  visible,
  closeModal,
  id,
}) => {
  const [MenuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [noOfTravelers, setNoOfTravelers] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // const user = useSelector(selectUser);
  // const userId = user?.id ? user?.id : user?.user?._id;

  // const navigate = useNavigate();

  const UlRef = useRef(null); // Specify the correct type for ulRef
  // const MenuRef = useRef<HTMLLIElement | null>(null); // Specify the correct type for menuRef

  const Menus = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const today = new Date().toISOString().split("T")[0];

  const handleArrivalDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArrivalDate = e.target.value;
    setArrivalDate(newArrivalDate);
  };

  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDepartureDate = e.target.value;
    setDepartureDate(newDepartureDate);

    // Check if the end date is less than the start date
    if (newDepartureDate < arrivalDate) {
      setError("Departure cannot be before the arrival");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    if (
      arrivalDate === "" ||
      departureDate === "" ||
      noOfTravelers === "" ||
      message === ""
    ) {
      setError("Required all fields");
      return;
    }

    if (departureDate < arrivalDate) {
      setError("Departure cannot be before the arrival");
      return;
    }

    const createData = {
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      noOfTravelers: noOfTravelers,
      message: message,
    };

    const response = await axiosInstance.post(
      `/requestauser/${id}`,
      createData
    );

    if (response.data) {
      console.log(response.data.message);
      closeModal();
      setTimeout(() => {
          toast.success("Message sent successfully.");
      }, 0);
    } else {
      toast.error("failed to save your preferences!");
      console.log("data not found");
    }
  };

  return (
    <>
      {visible && (
        <div
          className="px-4 flex justify-center items-center fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm w-full"
          id="wrapper"
        >
          <div className="bg-white shadow-lg w-full md:max-w-lg h-fit">
            <div className="px-4 py-4 bg-slate-200">
              <h1 className="text-slate-800 font-semibold text-lg">
                REQUEST TO HOST
              </h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="px-8 flex flex-col">
                <p className="py-5">
                  Post your trip details so that you can be discovered by local
                  hosts, event organizers, or other travelers
                </p>
                {error === "Required all fields" && (
                  <div className=" pb-5">
                    <p className="bg-red-200 flex justify-center items-center text-[#3E1214] font-semibold py-4">
                      <HiOutlineExclamation className="mr-1 text-xl" />
                      {error}
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-8 pb-1">
                  <div className="flex flex-col w-3/4 sm:w-1/2">
                    <label className="text-slate-800 font-semibold mb-1">
                      Arrival Date *
                    </label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={handleArrivalDateChange}
                      min={today}
                      className={`border rounded px-2 py-1 `}
                    />
                  </div>
                  <div className="flex flex-col w-3/4 sm:w-1/2">
                    <label className="text-slate-800 font-semibold mb-1">
                      Departure Date *
                    </label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={handleDepartureDateChange}
                      min={today}
                      className={`border rounded px-2 py-1 ${
                        error === "Departure cannot be before the arrival" &&
                        "border-red-500 border-2"
                      } `}
                    />
                  </div>
                </div>
                <div className="pb-5">
                  <p className="text-red-500">
                    {error === "Departure cannot be before the arrival" &&
                      error}
                  </p>
                </div>
                <div className="flex flex-col pb-5">
                  <label className="text-slate-800 font-semibold mb-1">
                    No of Travelers *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      onClick={() => setMenuOpen(!MenuOpen)}
                      ref={UlRef}
                      value={noOfTravelers ? noOfTravelers : selectedMenu}
                      className={`block w-24 rounded border py-1 px-2 mt-2 md:mt-0 text-gray-900 shadow-sm sm:text-sm sm:leading-6 cursor-pointer `}
                    />
                    {MenuOpen && (
                      <div className="bg-white w-24 text-sm shadow-xl -left-1 border rounded-md absolute ml-1 cursor-pointer z-50">
                        <ul>
                          {Menus.map((menu: string | number, index) => (
                            <li
                              key={index}
                              className="px-2 cursor-pointer hover:bg-blue-100"
                              onClick={() => {
                                setSelectedMenu(String(menu));
                                setNoOfTravelers(String(menu));
                                setMenuOpen(false);
                              }}
                            >
                              {<span>{menu}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col pb-5">
                  <label className="text-slate-800 font-semibold mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell about your visiting purpose and interests. So that hosts can easily connect with you."
                    className={`border rounded px-2 py-1 `}
                  ></textarea>
                </div>
              </div>
              <div className="px-8 py-3 flex justify-end gap-2 bg-slate-200">
                <button
                  className="px-4 bg-slate-400 rounded py-1.5 text-white"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 bg-green-600 hover:bg-green-700 delay-75 hover:delay-75 rounded py-1.5 text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateHostingModal;
