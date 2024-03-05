import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slice/userSlice";
import axiosInstance from "../../Axios/Axios";
import { HiOutlineExclamation } from "react-icons/hi";
// import { ModalProps } from "../../Interfaces/ModalInterface";

interface ModalProps {
  visible: boolean;
  closeModal: () => void;
  setUpdateUI: (data: any) => void;
}

const AddImage: React.FC<ModalProps> = ({
  visible,
  closeModal,
  setUpdateUI,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [err, setErr] = useState("");

  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET || "";
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME || "";
  const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL || "";

  const user = useSelector(selectUser) as any;
  const id = user?.id ? user?.id : user?.user?._id;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];

      if (allowedFormats.includes(selectedFile.type)) {
        setImage(selectedFile);
        setErr("")
      } else {
        setErr("Only image formats (JPEG, PNG, GIF) are allowed");
      }
    }
  }

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("cloud_name", CLOUD_NAME);
        const response = await axios.post(UPLOAD_URL, formData);

        setUpdateUI((prev: boolean) => !prev);

        return response.data.secure_url;

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

    if(err) {
      toast.error(err);
      return;
    }

    const uploadedUrl = await handleImageUpload();

    if (!uploadedUrl) {
      toast.error("Error while uploading the image");
      return;
    }

    axiosInstance
      .post(`/addImage/${id}`, {
        image: uploadedUrl,
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
          className="px-4 flex justify-center items-center fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm w-full"
          id="wrapper"
        >
          <div className="flex flex-col rounded-lg bg-white h-auto w-full sm:w-auto">
            <div className="px-4 py-5 border-b rounded-t-lg bg-slate-200 flex justify-between">
              <h1 className="uppercase text-lg">Upload image</h1>
              <button
                className="text-ascent-1 cursor-pointer text-slate-500"
                onClick={closeModal}
              >
                <IoMdClose size={26} className="" />
              </button>
            </div>
            {err && (
              <div className=" pt-5">
                <p className="bg-red-200 flex justify-center items-center text-[#3E1214] font-semibold py-4 px-2">
                  <HiOutlineExclamation className="mr-1 text-xl" />
                  {err}
                </p>
              </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={`px-6 flex justify-center items-center ${err ? "py-2" : "py-5" }`}>
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
                    className="w-full sm:w-auto bg-secondary rounded border 
                          border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] mb-5"
                  />
                  {!err && (
                    <div className="flex justify-start">
                      {image && (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Event"
                          className="w-[150px] h-[150px] rounded"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded bg-green-600 hover:bg-green-500 sm:px-8 py-2 mb-8 text-lg font-medium text-white outline-none"
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
