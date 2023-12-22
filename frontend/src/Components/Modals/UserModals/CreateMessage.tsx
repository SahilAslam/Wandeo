import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../../Axios/Axios";
import { toast } from "react-toastify";

interface DeclineRequestProps {
  visible: boolean;
  closeModal: () => void;
  id: any;
}

const CreateMessage: React.FC<DeclineRequestProps> = ({
  visible,
  closeModal,
  id,
}) => {
    const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    try {
      e.preventDefault();

      const res = await axiosInstance.post(`/createmessage/${id}`, {
        message: message,
      });
      if (res.data) {
        closeModal
        setTimeout(() => {
            toast.success("Successfully saved your message")
        }, 0)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {visible && (
        <div
          className="px-4 flex justify-center pt-40 fixed z-50 top-0 left-0 inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm w-full"
          id="wrapper"
        >
          <div className="rounded-lg bg-white h-fit w-full sm:max-w-sm">
            <div className="flex justify-between items-center px-5 py-4 rounded-t-lg bg-slate-100">
              <p className="font-semibold text-slate-700">Message</p>
              <IoMdClose className="text-xl" onClick={closeModal} />
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="px-5 py-5 flex flex-col ">
                <label className="pb-1">Message *</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  className="px-2 py-0.5 border rounded h-32"
                  placeholder="Write a message"
                ></textarea>
              </div>
              <div className="flex gap-2 justify-end px-5 py-4 bg-slate-100 rounded-b-lg">
                <button
                  onClick={closeModal}
                  className="bg-slate-400 rounded px-4 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-link-color text-white rounded px-6 py-1"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateMessage;
