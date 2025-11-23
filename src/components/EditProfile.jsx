import { useState } from "react";
import apiInstance from "../api/instance";
import { API_CONSTANT } from "../constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/user";
import ProfileCard from "./ProfileCard";

export const EditProfile = ({ data }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender || "",
    age: data.age || "",
    photoUrl: data.photoUrl || "",
    about: data.about || "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setProfile((pre) => ({ ...pre, [name]: value }));
  };

  const handlUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await apiInstance.patch(
        API_CONSTANT.updateProfile,
        profile
      );
      dispatch(addUser(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-6 items-center">
      <form onSubmit={handlUpdateProfile} className="h-full">
        <fieldset className="fieldset h-full flex flex-col bg-base-300 border-base-300 rounded-box w-96 border p-4 justify-center">
          <legend className="fieldset-legend text-xl font-bold">
            Edit Profile
          </legend>
          <label className="label">First Name</label>
          <input
            className="input w-full"
            placeholder="first name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
          <label className="label">Last Name</label>
          <input
            className="input w-full"
            name="lastName"
            placeholder="last Name"
            value={profile.lastName}
            onChange={handleChange}
          />
          <label className="label">Age</label>
          <input
            className="input w-full"
            name="age"
            placeholder="age"
            value={profile.age}
            onChange={handleChange}
          />
          <label className="label">Gender</label>
          <select
            name="gender"
            defaultValue="Select the gender"
            value={data.gender}
            onChange={handleChange}
            className="select w-full"
          >
            <option disabled={true}>Select the gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label className="label">Photo URL</label>
          <input
            className="input w-full"
            name="photoUrl"
            placeholder="photo URL"
            value={profile.photoUrl}
            onChange={handleChange}
          />
          <label className="label">About</label>
          <input
            className="input w-full"
            placeholder="about"
            name="about"
            value={profile.about}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-neutral mt-4">
            Save
          </button>
        </fieldset>
      </form>
      <ProfileCard data={profile} disableAction={true} />
    </div>
  );
};
