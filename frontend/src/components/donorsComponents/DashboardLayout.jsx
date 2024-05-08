const Sidebar = ({ children }) => {
  return (
    <div className='bg-gray-800 text-white h-screen px-8 fixed left-0 top-0 overflow-y-auto'>
      {children}
    </div>
  );
};

const TopHeader = () => {
  return (
    <div className='flex justify-between items-center px-4 py-2'>
      <div>Logo</div>
      <div className='flex justify-end items-center px-4 py-2'>
        <div>User Profile</div>
        <div>Notifications</div>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
      </Sidebar>
      <div className='flex-1 bg-yellow-500 overflow-y-auto'>
        <TopHeader />
        <div className='px-16'>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
