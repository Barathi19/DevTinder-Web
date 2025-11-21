import { useSelector } from "react-redux";
import { EditProfile } from "../../components/EditProfile";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    user && (
      <div className="w-full flex justify-center">
        <EditProfile data={user} />
      </div>
    )
  );
};

export default Profile;
