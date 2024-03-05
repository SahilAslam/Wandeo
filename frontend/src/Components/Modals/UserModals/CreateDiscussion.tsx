import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../Axios/Axios";
import { toast } from "react-toastify";
import { ModalProps } from "../../../Interfaces/ModalInterface";

const CreateDiscussion: React.FC<ModalProps> = ({
  visible,
  closeModal,
  setUpdateUI,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    // eslint-disable-next-line no-useless-catch

    e.preventDefault();

    const createDiscussion = {
      title: title,
      content: content,
    };

    await axiosInstance
      .post(`/createDiscussion/${id}`, createDiscussion)
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
          setUpdateUI((prevState: any) => !prevState)
          closeModal();
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error creating discussion:", error);
        throw error;
      });
  };

  return (
    <div>
      {visible && (
        <div
          className="px-4 flex justify-center items-center fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm"
          id="wrapper"
        >
          <div className="flex flex-col rounded-lg bg-white h-auto w-full sm:max-w-sm">
            <form onSubmit={handleSubmit}>
              <div className="px-4 py-5 border-b rounded-t-lg bg-slate-200 flex flex-row">
                <h1 className="uppercase w-full text-lg text-slate-600 font-semibold">
                  new topic
                </h1>
                <button
                  className=" text-ascent-1 cursor-pointer text-slate-500"
                  onClick={closeModal}
                >
                  <IoMdClose
                    size={26}
                    className="text-slate-500 hover:border"
                  />
                </button>
              </div>
              <div className="p-5">
                <div className="flex flex-col pb-3">
                  <label
                    htmlFor="Title"
                    className="text-slate-800 text-lg font-semibold"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-slate-300 hover:border-sky-700 rounded py-1 px-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="text"
                    className="text-slate-800 text-lg font-semibold"
                  >
                    Text
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    cols={45}
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border border-slate-300 hover:border-sky-700 rounded px-2 py-2"
                  ></textarea>
                </div>
              </div>
              <div className="px-4 py-5 border-t flex flex-row gap-2">
                <button
                  type="submit"
                  className="bg-sky-700 hover:bg-sky-600 hover:transition hover:duration-300 duration-500 text-white text-lg font-semibold rounded px-8 py-1.5"
                >
                  Post
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-400 text-white text-lg font-semibold rounded px-6 py-1.5 hover:bg-gray-300 hover:transition hover:duration-300 duration-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDiscussion;
