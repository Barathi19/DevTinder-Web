import { useDispatch } from "react-redux";
import apiInstance from "../api/instance";
import { API_CONSTANT, DUMMY_IMG_URL } from "../constant";
import { removeFeeds } from "../store/slices/feed";

const ProfileCard = ({ data, disableAction }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    try {
      await apiInstance.post(`${API_CONSTANT.sendRequest}/${status}/${id}`);
      dispatch(removeFeeds(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={data.photoUrl || DUMMY_IMG_URL} alt="user photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {data.firstName} {data.lastName}
        </h2>
        <p>
          {data.age} {data.gender}
        </p>
        <p>{data.about}</p>
        <div className="card-actions justify-center">
          <button
            disabled={disableAction}
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", data._id)}
          >
            Ignore
          </button>
          <button
            disabled={disableAction}
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", data._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
