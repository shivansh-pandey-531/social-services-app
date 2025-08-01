import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import Select from 'react-select';
import bhim from '../../../assets/logos/bhim.svg';
import paytm from '../../../assets/logos/paytm.svg';
import phonepe from '../../../assets/logos/phonepe.svg';
import amazonpay from '../../../assets/logos/amazonpay.svg';
import gpay from '../../../assets/logos/gpay.svg';

const upiApps = [
  { label: 'Google Pay', value: 'gpay', icon: gpay },
  { label: 'PhonePe', value: 'phonepe', icon: phonepe },
  { label: 'Paytm', value: 'paytm', icon: paytm },
  { label: 'Amazon Pay', value: 'amazonpay', icon: amazonpay },
  { label: 'BHIM', value: 'bhim', icon: bhim },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '48px',
    borderColor: '#C5C5C5',
    boxShadow: state.isFocused ? '0 0 0 2px #60A5FA' : provided.boxShadow,
    fontSize: '1rem',
    paddingLeft: '2.5rem',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center', // fix for vertical centering
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#6B7280',
    fontSize: '1.125rem',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center', // fix for vertical centering
    gap: '0.5rem',
    height: '100%',
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.125rem',
    backgroundColor: state.isFocused ? '#E0F2FE' : '#fff',
    color: '#374151',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 100,
  }),
};




const UpiModal = ({ onProceed, onClose }) => {

  const [selectedUpiApp, setSelectedUpiApp] = useState(null);
  const [upiId, setUpiId] = useState('');

  // Disable proceed if either field is empty
  const isProceedDisabled = !selectedUpiApp || !upiId.trim();


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(134,198,234,0.45)] bg-opacity-30 z-50 font-inter">
      <div
        className="relative rounded-xl shadow-lg flex flex-col items-center border border-white/30 px-6 py-4"
        style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.57)',
          width: '45vw',
          height: '80vh',
          maxWidth: '900px',
          maxHeight: '700px',
          justifyContent: 'flex-start',
          paddingTop: 60
        }}
      >
        <button
          className="rounded-full flex justify-center items-center border-none absolute top-4 right-4 text-blue-300 hover:text-black cursor-pointer transition-colors"
          onClick={onClose}
        >
          <IoClose size={22} />
        </button>

        <h1 className="text-2xl self-start font-semibold mb-8 text-slate-800 mt-5">Set up UPI payment</h1>

        <div className="flex items-center justify-start space-x-3 mb-20 w-full">
          {[bhim, paytm, phonepe, amazonpay, gpay].map((src, idx) => (
            <div key={idx} className="bg-white p-2 rounded-lg shadow-sm flex justify-center items-center">
              <img src={src} alt="upi" className="h-6 object-contain" />
            </div>
          ))}
        </div>

        <div className="space-y-6 w-full flex flex-col items-center">
          {/* UPI App Selector */}
          <div className="relative w-[70%]">
            {/* Magnifying glass icon */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <Select
              classNamePrefix="upi-select"
              styles={customStyles}
              options={upiApps}
              value={upiApps.find(app => app.value === selectedUpiApp)}
              onChange={option => setSelectedUpiApp(option?.value || '')}
              placeholder="Select your UPI app"
              isSearchable={false}
              menuPlacement='auto'
              components={{
                Option: ({ innerProps, isFocused, data }) => (
                  <div
                    {...innerProps}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${isFocused ? 'bg-blue-100' : ''}`}
                  >
                    <img src={data.icon} alt={data.label} className="h-7 w-7 object-contain" />
                    <span>{data.label}</span>
                  </div>
                ),
              }}
            />
          </div>

          {/* UPI ID Input */}
          <input
            required
            type="text"
            placeholder="UPI ID"
            style={{ borderColor: '#C5C5C5' }}
            className="w-[70%] bg-white text-base border-solid border rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>

        {/* Proceed Button */}
        <button
          className={`w-[30%] bg-[#56A9D9] border-none text-lg text-white font-bold py-2 mx-auto my-20 self-center rounded-md shadow-md transition-colors
            ${isProceedDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-500 cursor-pointer'}
          `}
          onClick={onProceed}
          disabled={isProceedDisabled}
        >
          Proceed
        </button>

        {/* <style>{`
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}</style> */}
      </div>
    </div>
  );
};


export default UpiModal;