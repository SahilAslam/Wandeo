import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/User/Navbar/Navbar";
import Checkbox from "../../../Components/User/Checkbox/Checkbox";
import axiosInstance from "../../../Axios/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CreateReference = () => {
  const [userDetails, setUserDetails] = useState({});
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [err, setErr] = useState("")

  const [recommendYes, setRecommendYes] = useState("");
  const [recommendNo, setRecommendNo] = useState("");
  const [reference, setReference] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/profile/${id}`)
      .then((res) => {
        if (res.data.user) {
          console.log(res.data.user);

          setUserDetails(res.data.user);
        } else {
          console.error("Invalid data received from the API:", res.data.user);
        }
      })
      .catch((error) => console.log(error, "user profile error"));
  }, [id]);

  const handleChangeOne = () => {
    setCheckedOne((prevCheckedOne) => {
      if (prevCheckedOne) setRecommendYes("");
      else setRecommendYes("Recommend");
      return !prevCheckedOne;
    });
  };
  const handleChangeTwo = () => {
    setCheckedTwo((prevCheckedTwo) => {
      if (prevCheckedTwo) setRecommendNo("");
      else setRecommendNo("Not Recommend");
      return !prevCheckedTwo;
    });
  };

  const handleSubmit = async (targettedUserId: string) => {
    const createData = {
        recommendYes: recommendYes,
        recommendNo: recommendNo,
        referenceMessage: reference
    }

    if(reference === "") {
        setErr("Required this field")
    }
    
    const response = await axiosInstance.post(
      `/addReference/${targettedUserId}`, createData
    );

    if (response.data) {
      setTimeout(() => {
        toast.success(response.data.message);
      }, 0);
      navigate(`/DiffProfile/${targettedUserId}`);
    } else {
      toast.error("failed to save your reference!");
      console.log("data not found");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="px-3 sm:px-4 py-3 flex justify-center">
        <div className="bg-white w-[950px] shadow">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(userDetails?._id);
            }}
          >
            <div className="p-5 border-b">
              <h1 className="uppercase text-green-700 font-bold">
                WRITE A REFERENCE FOR {userDetails?.name}
              </h1>
            </div>
            <div className="p-5">
              <div className="pb-5 flex flex-col">
                <p className="pb-2">Would you recommend {userDetails?.name}?</p>
                <Checkbox
                  label="Yes, I'd recommend"
                  onChange={handleChangeOne}
                  value={checkedOne}
                />
                <Checkbox
                  label="No, I wouldn't recommend"
                  onChange={handleChangeTwo}
                  value={checkedTwo}
                />
              </div>
              <div>
                <p className="pb-3 text-slate-800">
                  Your reference will appear on {userDetails?.name}'s profile,
                  so be sure that you're only sharing words you're comfortable
                  saying publicly.{" "}
                  <span className="font-semibold">
                    Once you submit a reference, you can't edit or delete it
                  </span>
                </p>
                <textarea
                  rows="5"
                  className={`${err === "Required this field" && "border-2 border-red-500"} w-full border rounded px-2 py-1`}
                  placeholder={`Write your experience about ${userDetails?.name}?`}
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                ></textarea>
                <p className="text-red-500">{err}</p>
              </div>
            </div>
            <div className="px-5 py-5 flex justify-end bg-gradient-to-b from-slate-50 to-slate-200 border-t border-slate-300">
              <button
                type="submit"
                className="bg-link-color delay-75 hover:bg-link-dark text-white font-semibold px-6 py-1.5 rounded"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateReference;
