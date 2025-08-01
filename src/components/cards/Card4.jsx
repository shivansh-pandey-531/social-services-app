import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card4_Vector28 from "../../assets/Card4_Vector28.png";
import Card4_Vector29 from "../../assets/Card4_Vector29.png";
import { FaChevronRight } from "react-icons/fa";
import dummyData from "../../static/dummyData_Leads";
import { useUser } from '../../UserContext';
import AccessLockedModal from "../modals/AccessLockedModal";


const Card4 = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobsApplied = dummyData.filter(lead => lead.status === "Applied").length;

  const handleCardClick = () => {
    if (user.membershipActive) {
      // Redirect to MyJobs.jsx with filter set to "Applied"
      navigate("/my-jobs", { state: { filter: "Applied" } });
    } else {
      // Open the AccessLockedModal
      setIsModalOpen(true);
    }
  };


  return (
    <>
      <div onClick={handleCardClick} className="relative hidden xl:block bg-[#A966EC] w-60 rounded-2xl h-40 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
        <p className="relative font-medium text-xl pl-2 text-white/90 z-30 pt-4">Applied Jobs</p>
        <p className="relative font-semibold text-white text-4xl z-30 pt-12 pl-5">
          {
            user.membershipActive?
              <>
                {jobsApplied}
              </>
              :
              <>
                N/A
              </>
          }
        </p>
        <img src={Card4_Vector28}  className="absolute z-10 right-0 bottom-0" alt="card4-vector-28" />
        <img src={Card4_Vector29} className="absolute z-10 right-0 bottom-0" alt="card4-vector-29" />
        <FaChevronRight strokeWidth={3} size={25} color="rgba(255,255,255,0.84)" className="hidden lg:block absolute right-3 bottom-3 z-20" />
      </div>


      {/* Access Locked Modal */}
      <AccessLockedModal
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        heading="Jobs Access Locked"
        subheading="Subscribe to view completed and applied jobs." 
      />
    </>
  )
}


export default Card4;