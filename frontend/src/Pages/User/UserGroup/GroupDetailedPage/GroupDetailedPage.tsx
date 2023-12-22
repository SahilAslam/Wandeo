import React, { useEffect, useState } from "react";
import Navbar from "../../../../Components/User/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../Axios/Axios";
import MembersCard from "../../../../Components/User/Group/MembersCard";
import { FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../Redux/Slice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import CreateDiscussion from "../../../../Components/Modals/UserModals/CreateDiscussion";
import DeleteGroupModal from "../../../../Components/Modals/UserModals/DeleteGroupModal";
import LeaveGroup from "../../../../Components/Modals/UserModals/LeaveGroup";

const GroupDetailedPage: React.FC = () => {
  const [groupData, setGroupData] = useState<any>("");
  const [updateUI, setUpdateUI] = useState<boolean>(false);
  const [discussionModal, setDiscussionModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false)
  const [LeaveModal, setLeaveModal] = useState<boolean>(false);

  const { id } = useParams();

  const user = useSelector(selectUser) as any;
  const userId = user?.id ? user?.id : user?.user?._id;

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL || ""

  const openModal = () => {
    setDiscussionModal(true);
  };

  const closeModal = () => {
    setDiscussionModal(false);
  };

  const openDeleteGroupModal = () => {
    setModal(true);
  }

  const closeDeleteModal = () => {
    setModal(false);
  }

  const openLeaveModal = () => {
    setLeaveModal(true);
  }

  const closeLeaveModal = () => {
    setLeaveModal(false);
  }

  const getGroupDetails = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.get(`/groupDetailedPage/${id}`);
      const groupDetails = response.data?.group;
      console.log(response.data?.group);

      setGroupData(groupDetails);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getGroupDetails();
  }, [updateUI, id]);

  const userIsMember = () => {
    return groupData.members?.some((member: any) => member._id === userId);
  };

  const isCreaterUser = () => {
    return groupData.createdBy === userId;
  };

  const handleJoin = async (groupId: string) => {
    try {
      const response = await axiosInstance.patch(`/joinGroup/${groupId}`);

      if (response.data.message) {
        console.log("Joined Successfully: ", response.data);
        setUpdateUI((prev) => !prev);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  const leaveGroup = async (groupId: string) => {
    try {
      const response = await axiosInstance.patch(`/leaveGroup/${groupId}`);

      if (response.data.message) {
        console.log("leaved Group:", response.data.message);
        setUpdateUI((prev) => !prev);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error while leaving the group:", error);
    }
  };

  const deleteGroup = async (groupId: string) => {
    try {
      await axiosInstance.delete(`/deleteGroup/${groupId}`);

      setTimeout(() => {
        toast.success("Group Deleted")
      }, 0)
      navigate('/groups')
  
    } catch (error) {
      console.error("Error while leaving the group:", error);
    }
  }

  const timeAgo = (date: string) => {
    const currentDate = new Date();
    const createdDate = new Date(date);
    const difference = currentDate.getTime() - createdDate.getTime();
    const seconds = Math.floor(difference / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return `${interval} year${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval > 1 ? "s" : ""} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;
    }
    return `${Math.floor(seconds)} second${
      Math.floor(seconds) !== 1 ? "s" : ""
    } ago`;
  };

  const handleClick = (groupId: string) => {
    navigate(`/discussionPage/${groupId}`);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="w-full p-4 xl:px-52">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="">
            <MembersCard groupData={groupData} />
          </div>
          <div className="flex flex-col gap-4 xl:w-[660px]">
            <div className="px-4 py-4 bg-white shadow-lg">
              <div className="flex flex-row gap-4">
                <img
                  src={`${BASE_URL}/${groupData?.image}`}
                  alt="img"
                  className="w-[80px] h-[80px] rounded"
                />
                <h1 className="text-4xl text-slate-800 font-semibold">
                  {groupData?.name}
                </h1>
              </div>
              <div className="pt-8 pb-5">
                <p>{groupData?.description}</p>
              </div>
              {isCreaterUser() ? (
                <div className="flex justify-end">
                  <button
                      onClick={openDeleteGroupModal}
                      className="border border-sky-700 rounded text-sky-700 px-3 py-1.5 transition duration-500 hover:transition hover:duration-300 hover:bg-sky-700 hover:text-white "
                    >
                      Delete Group
                    </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  {userIsMember() ? (
                    <button
                      onClick={openLeaveModal}
                      className="border border-sky-700 rounded text-sky-700 px-3 py-1.5 transition duration-500 hover:transition hover:duration-300 hover:bg-sky-700 hover:text-white "
                    >
                      Leave Group
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoin(groupData?._id)}
                      className="border border-sky-700 rounded text-sky-700 px-3 py-1.5 transition duration-500 hover:transition hover:duration-300 hover:bg-sky-700 hover:text-white "
                    >
                      Join Group
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white w-full shadow-lg">
              <div className="px-4 py-4 flex">
                <div className="flex">
                  <FaComments className="text-gray-700 text-2xl mt-1 mr-1.5" />
                  <h1 className="text-gray-700 text-2xl">Discussions</h1>
                </div>
                <div className="flex justify-end w-full">
                  {userIsMember() ? (
                    <button
                      onClick={openModal}
                      className="bg-sky-700 hover:bg-sky-600 text-white font-semibold px-3 py-1.5 rounded"
                    >
                      New Topic
                    </button>
                  ) : (
                    <p>Join this group to start a new discussion.</p>
                  )}
                </div>
              </div>
              {groupData.discussions?.length > 0 ? (
                groupData.discussions.map((discussion: any) => (
                  <div className="px-4 py-4 flex justify-between ">
                    <div className="flex gap-4">
                      
                      {discussion?.userId?.profileImage ? (
                        <img
                          src={`${discussion?.userId.profileImage}`}
                          alt="img"
                          className="border rounded-full w-8 h-8"
                        />
                      ) : (
                        <img
                          src={`/profile-picture-placeholder.png`}
                          alt=""
                          className="w-8 h-8 object-cover rounded-full opacity-100"
                        />
                      )}
                      <div className="flex flex-col">
                        <p
                          onClick={() => handleClick(discussion?._id)}
                          className="text-slate-800 font-medium hover:underline cursor-pointer"
                        >
                          {discussion.title}
                        </p>
                        <div className="flex">
                          <FaComments className="text-gray-400 text-xs mt-0.5 mr-1" />
                          <p className="text-gray-400 text-xs font-medium">
                            {discussion.replies ? discussion.replies.length : 0}{" "}
                            replies
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <p>{timeAgo(discussion.createdAt)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-5 py-3 bg-slate-100 text-center">
                  No Discussions yet!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateDiscussion
        visible={discussionModal}
        closeModal={closeModal}
        setUpdateUI={setUpdateUI}
      />
      <DeleteGroupModal visible={modal} closeModal={closeDeleteModal} deleteGroup={() => deleteGroup(groupData?._id)} />
      <LeaveGroup visible={LeaveModal} closeModal={closeLeaveModal} LeaveGroup={() => leaveGroup(groupData?._id)} />
    </>
  );
};

export default GroupDetailedPage;
