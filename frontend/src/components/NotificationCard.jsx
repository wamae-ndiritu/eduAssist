const NotificationCard = ({ notification }) => {
  const { created_at, is_read, message, sender, title } = notification;

  return (
    <div
      className={`p-4 mb-4 rounded-lg ${
        is_read ? "bg-gray-100" : "bg-blue-100"
      }`}
    >
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-lg font-bold'>{title || "Notification"}</h2>
        <span className='text-sm text-gray-500'>
          {new Date(created_at).toLocaleString()}
        </span>
      </div>
      <p className='text-gray-700'>{message}</p>
      {sender && (
        <p className='mt-2 text-gray-500 text-sm'>Sent by: {sender.username}</p>
      )}
    </div>
  );
};

export default NotificationCard;
