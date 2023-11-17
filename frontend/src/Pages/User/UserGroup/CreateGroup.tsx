import React, { ChangeEvent, useState } from "react";
import SignupNavbar from "../../../Components/User/Navbar/Navbar";
import axiosInstance from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Slice/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [cloudnaryUrl, setCloudnaryUrl] = useState("");

  const user = useSelector(selectUser);
  const id = user?.id ? user?.id : user?.user?._id;
  const navigate = useNavigate();

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET || ""
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME || ""
  const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL || ""

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if(e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      if(image) {
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("cloud_name", CLOUD_NAME);
        const response = await axios.post(
          UPLOAD_URL,
          formData
        );
        console.log(response.data, "//data//");
        setCloudnaryUrl(response.data.public_id);
      } else {
        return toast.error("no images please upload");
      }
    } catch (error) {
      console.error("Error while uploading the image:", error);
    }
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    await handleImageUpload();

    if (!cloudnaryUrl) {
      toast.error("Error while uploading the image");
      return;
    }

    const createData = {
      name: name,
      description: description,
      location: location,
      image: cloudnaryUrl,
    };

    axiosInstance
      .post(`/createGroup/${id}`, createData)
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
          navigate("/groups");
          setTimeout(() => {
            toast.success(response.data.message);
          }, 0);
        }
      })
      .catch((error: any) => {
        console.error("Error creating group:", error);
      });
  };
  return (
    <>
      <SignupNavbar />
      <ToastContainer />
      <div className="p-4 md:px-10 lg:px-32">
        <div className="flex flex-col px-4 md:w-[830px] bg-white shadow-md">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="border-b">
              <h1 className="text-slate-800 text-xl font-semibold py-4">
                Create Group
              </h1>
            </div>
            <div className="border-b flex flex-col md:flex-row py-4">
              <label
                htmlFor="name"
                className="w-80 font-semibold text-slate-800"
              >
                Title
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="border-b flex flex-col md:flex-row py-4">
              <label
                htmlFor="description"
                className="w-80 font-semibold text-slate-800"
              >
                Description
              </label>
              <textarea
                name="description"
                id=""
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-2 py-1 w-full"
                placeholder="Describe your group..."
              ></textarea>
            </div>
            <div className="border-b flex flex-col md:flex-row py-4">
              <label
                htmlFor="location"
                className="w-80 font-semibold text-slate-800"
              >
                Location (Optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="border-b flex flex-col md:flex-row py-4">
              <label
                htmlFor="image"
                className="w-80 font-semibold text-slate-800"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleChange}
                className="py-1 w-full"
              />
            </div>
            <div className="py-5">
              <button
                type="submit"
                className="px-2 py-1.5 text-white bg-sky-700 hover:bg-sky-600 rounded"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
