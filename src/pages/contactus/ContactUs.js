import React, { useState } from "react";
import { useEffect } from "react";
import AccountRepository from "../../repositories/AccountRepository";
import PopupUtility from "../../utils/popup-utility";

const ContactUs = () => {
  const [valid, setValid] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    complaint: "",
  });
  const [contact, setContact] = useState({
    whatsapp: "-",
    email: "-",
    address: "-",
  });
  const [once, setOnce] = useState(false);

  const validation = (data, once) => {
    if (!once) {
      getContact();
      setOnce(true);
    } else {
      if (
        data.name !== "" &&
        data.email !== "" &&
        data.address !== "" &&
        data.complaint !== ""
      ) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  };

  const getContact = async () => {
    let response = await AccountRepository.contactUs();
    let res = { ...contact };
    if (!response.error) {
      res.whatsapp = response.data.data.phoneNumber;
      res.email = response.data.data.email;
      res.address = response.data.data.address;
      setContact(res);
    } else {
      setContact(res);
    }
  };

  const handleChange = (e, data) => {
    const { name, value } = e.target;
    const newDetail = { ...data, [name]: value };
    setData(newDetail);
  };

  const handleSubmit = async (data) => {
    let response = await AccountRepository.submitComplaint(data);
    if (!response.error) {
      PopupUtility.success("Your complaint has been sent");
      setData({
        name: "",
        email: "",
        address: "",
        complaint: "",
      });
    }
  };

  useEffect(() => {
    validation(data, once);
  }, [data]);
  return (
    <>
      <div className="flex flex-col h-screen bg-white">
        <div className="flex bg-green-primary drop-shadow-md py-2.5 md:py-3.5 z-[50] items-center text-center">
          <div className="w-full">
            <div className="font-bold text-white text-[26px] md:text-[32px]">
              TANAM EMAS
            </div>
          </div>
        </div>
        <div className="p-5 lg:p-10">
          <h2 className="text-green-primary font-bold mb-4">Contact Us</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-14 lg:gap-14">
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-red-500 font-bold text-lg">*</label>{" "}
                <label className="text-lg text-black">Name</label>
                <input
                  value={data.name}
                  type="text"
                  name="name"
                  onChange={(e) => {
                    handleChange(e, data);
                  }}
                  placeholder="Enter your name"
                  className="px-3 py-2 bg-white border shadow-sm placeholder:text-slate-400 w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-red-500 font-bold text-lg">*</label>{" "}
                <label className="text-lg text-black">Email</label>
                <input
                  value={data.email}
                  type="text"
                  name="email"
                  onChange={(e) => {
                    handleChange(e, data);
                  }}
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-white border shadow-sm placeholder:text-slate-400 w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-red-500 font-bold text-lg">*</label>{" "}
                <label className="text-lg text-black">Address</label>
                <input
                  value={data.address}
                  type="text"
                  name="address"
                  onChange={(e) => {
                    handleChange(e, data);
                  }}
                  placeholder="Enter your address"
                  className="px-3 py-2 bg-white border shadow-sm placeholder:text-slate-400 w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-red-500 font-bold text-lg">*</label>{" "}
                <label className="text-lg text-black">
                  Complaint Description
                </label>
                <textarea
                  value={data.complaint}
                  type="text"
                  name="complaint"
                  onChange={(e) => {
                    handleChange(e, data);
                  }}
                  placeholder="Enter your address"
                  className="px-3 py-2 bg-white border shadow-sm placeholder:text-slate-400 w-full border-slate-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="bg-white font-semibold space-y-2.5 border border-gray-500 p-3 rounded-lg sm:w-full md:w-3/4 lg:w-3/4">
                <div>
                  <label>Email :</label>{" "}
                  <label className=" break-all">{contact.email}</label>
                </div>
                <div>
                  <label>Phone Number :</label>{" "}
                  <label>{contact.whatsapp}</label>
                </div>
                <div>
                  <label>Address:</label>{" "}
                  <label className=" break-all">{contact.address}</label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`px-4 py-2 mt-4 uppercase rounded-lg font-semibold text-md tracking-wider bg-gold-secondary text-white ${
              !valid ? "hover:bg-gray-primary hover:text-green-quaternary" : ""
            } `}
            disabled={valid}
            onClick={() => {
              handleSubmit(data);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
