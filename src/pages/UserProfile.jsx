import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { User as UserIcon, Lock as LockIcon, FileText, User } from 'lucide-react';
import { MdCardMembership } from "react-icons/md";
import { FaToolbox } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { motion } from 'framer-motion';
import LockIconMui from '@mui/icons-material/Lock';
import { useUser } from '../UserContext';


const sidebarOptions = [
  { label: 'My Profile', icon: <UserIcon size={20} />, route: '/my-profile' },
  { label: 'Security', icon: <LockIcon size={20} />, route: '/my-profile/security-options' },
  { label: 'Work Details', icon: <FaToolbox size={20} />, route: '/my-profile/work-details', isPremium: true },
  { label: 'Documents', icon: <FileText size={20} />, route: '/my-profile/documents-verification' },
  { label: "Membership", icon: <MdCardMembership size={20} />, route: '/my-profile/membership' },
  { label: 'Support', icon: <BiSupport size={20} />, route: '/my-profile/account-support' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};



const UserProfile = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <motion.div
     className="relative flex flex-col gap-6 px-4 pt-3 pb-5 w-full min-h-screen"
     variants={containerVariants}
     initial='hidden'
     animate='visible' 
    >
      {/* Header */}
      <motion.div
       className="flex shadow-md hover:shadow-lg gap-3 sm:gap-5 items-center border-solid border border-gray-400 bg-white rounded-2xl px-4 sm:px-6 py-3 sm:py-4 mb-2"
       variants={itemVariants}
      >
        <div className="flex justify-center items-center p-2 sm:p-3 rounded-xl bg-blue-400 shadow-md">
          <UserIcon size={28} className="sm:w-[34px] sm:h-[34px]" color="white" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 style={{fontFamily: 'Manrope'}} className="text-xl sm:text-2xl font-normal text-black/75">User Profile</h2>
          <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-gray-700/60 mt-1">
            View all user profile details
          </p>
        </div>
      </motion.div>

      {/* Compact Mobile Menu - Visible on screens < md */}
      <motion.div 
        className="md:hidden w-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-2 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center gap-2">
          {sidebarOptions.map((opt, index) => (
            <motion.div
              key={opt.label}
              className={`relative flex flex-col items-center min-w-[60px] gap-1 py-2 px-1 rounded-xl cursor-pointer transition-all duration-200
                ${
                  (opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) ||
                  location.pathname === opt.route
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-transparent text-gray-600 hover:bg-white hover:text-blue-600'
                }
              `}
              onClick={() => navigate(opt.route)}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`p-1.5 rounded-lg ${
                (opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) ||
                location.pathname === opt.route
                  ? 'bg-white/20'
                  : 'bg-blue-100'
              }`}>
                <span className={`text-sm ${
                  (opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) ||
                  location.pathname === opt.route
                    ? 'text-white'
                    : 'text-blue-500'
                }`}>
                  {opt.icon}
                </span>
              </div>
              <span className="text-[10px] font-medium text-center leading-tight whitespace-nowrap">
                {opt.label === 'Work Details' ? 'Work' : opt.label === 'Documents' ? 'Docs' : opt.label}
              </span>
              {/* {((opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) ||
                location.pathname === opt.route) && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full border border-white"></div>
              )} */}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content: Two Columns */}
      <motion.div 
        className="flex flex-row gap-4 w-full min-h-screen"
        variants={itemVariants}
      >
        {/* Left Sidebar --> Fixed - Hidden on mobile */}
        <motion.div 
          className="hidden md:flex md:w-[20%] lg:w-[15%] bg-white border-solid border rounded-2xl border-gray-400 flex-col"
          variants={itemVariants}
        >
          <div className="flex flex-col gap-4 px-2.5 brder-solid py-6">
            {sidebarOptions.map(opt => (
              <motion.div
                key={opt.label}
                className={`flex md:flex-col md:justify-center xl:flex-row xl:justify-start items-center py-3 px-4 rounded-lg cursor-pointer transition-colors
                  ${
                    (opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) ||
                    location.pathname === opt.route
                      ? 'bg-blue-50 text-blue-700 border-solid border font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
                onClick={() => navigate(opt.route)}
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.03 }}
              >
                <span className='hidden md:block'>
                  {opt.icon}
                </span>
                <span className="flex flex-col items-center text-center xl:flex-row xl:ml-2.5 gap-1">
                  {opt.label}
                  {/* Lock Icon for Premium Options */}
                  {opt.isPremium  &&  !user.membershipActive  &&  <LockIconMui sx={{ fontSize: 18, color: '#F59E0B' }} />}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Right Dynamic Content */}
        <motion.div 
          className="w-full md:w-[80%] lg:w-[85%] bg-white rounded-2xl border-solid border border-gray-400"
          variants={itemVariants}
        >
          <div className="p-0 bg-white rounded-2xl h-full">
            {/* Nested route content */}
            <Outlet />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


export default UserProfile;