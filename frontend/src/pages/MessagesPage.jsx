import React, { useEffect } from "react";
import { ProfileHead } from "../components/Profile";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { listUserNotifications } from "../redux/actions/userActions";
import NotificationCard from "../components/NotificationCard";

const MessagesPage = () => {
  const dispatch = useDispatch();

  const {notifications} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(listUserNotifications())
  }, [dispatch])

  return (
    <React.Fragment>
      <Navbar />
      <div className='w-full bg-white my-12 flex flex-cols items-center justify-center'>
        <section className='w-full md:w-4/5 px-4 md:px-12 py-4 border flex flex-col'>
          <h1 className='text-2xl font-semibold mt-1 mb-3'>Notifications</h1>
          <ProfileHead />
          <div className='w-full mt-10'>
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default MessagesPage;
