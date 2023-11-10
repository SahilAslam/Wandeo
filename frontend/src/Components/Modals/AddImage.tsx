import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slice/userSlice";
import axiosInstance from "../../Axios/Axios";

interface CreateEventProps {
  closeModal: () => void;
  visible: boolean;
}

const AddImage: React.FC<CreateEventProps> = ({ visible, closeModal }) => {
  const [cloudnaryUrl, setCloudnaryUrl] = useState("");
  const [image, setImage] = useState("");

  const user = useSelector(selectUser);
  const id = user?.user?._id;
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
        formData.append("upload_preset", "qeulrdc5");
        formData.append("cloud_name", "dkba47utw");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkba47utw/image/upload",
          formData
        );

        console.log(response.data, "llllll");
        setCloudnaryUrl(response.data.public_id);
      } else {
        return toast.error("no images please upload");
      }
    } catch (error) {
      console.error("Error while uploading the image:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleImageUpload();

    if (!cloudnaryUrl) {
      toast.error("Error while uploading the image");
      return;
    }

    axiosInstance
      .post(`/addImage/${id}`, {
        image: cloudnaryUrl,
      })
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.message);
          closeModal();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      {visible && (
        <div
          className="px-4 flex justify-center items-center fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm"
          id="wrapper"
        >
          <div className="flex flex-col rounded-lg bg-white h-auto w-auto">
            <div className="px-4 py-5 border-b rounded-t-lg bg-slate-200 flex flex-row">
              <h1 className="uppercase w-full text-lg">Upload image</h1>
              <button
                className=" text-ascent-1 cursor-pointer text-slate-500"
                onClick={closeModal}
              >
                <IoMdClose size={26} className="" />
              </button>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                
              <div className="py-4 px-6 flex justify-center items-center">
                <div className="flex flex-col">
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
                          border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] mb-1"
                  />
                  <div className="flex justify-start">
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Event"
                      className="w-[150px] h-[150px] rounded"
                    />
                  )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center px-6">
              <button
                type="submit"
                className="inline-flex w-full  mt-2 justify-center rounded bg-green-600 hover:bg-green-500 px-8 py-2 mb-8 text-lg font-medium text-white outline-none"
              >
                Upload
              </button>
              </div>
              
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddImage;
