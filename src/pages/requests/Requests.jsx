import { useCallback, useEffect } from "react";
import apiInstance from "../../api/instance";
import { API_CONSTANT, DUMMY_IMG_URL } from "../../constant";
import { addRequests, removeRequest } from "../../store/slices/request";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const connectionRequestList = useSelector((state) => state.request);
  const dispatch = useDispatch();

  const fetchConnectionRequestList = useCallback(async () => {
    try {
      const response = await apiInstance.get(API_CONSTANT.requestsRecieved);
      dispatch(addRequests(response.data.data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const handleConnectionRequest = async (status, id) => {
    try {
      await apiInstance.post(`${API_CONSTANT.reviewRequest}/${status}/${id}`);
      dispatch(removeRequest(id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnectionRequestList();
  }, [fetchConnectionRequestList]);

  if (!connectionRequestList?.length)
    return (
      <h2 className="mt-3 mx-auto text-lg font-semibold">No request found</h2>
    );

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h2 className="inline-block my-3 text-xl font-semibold">
        Connection Requests
      </h2>
      {connectionRequestList.map((connection) => (
        <div
          key={connection._id}
          className="flex items-center justify-between bg-base-300 min-w-xl p-4 gap-4 rounded-lg"
        >
          <div className="h-20 w-20">
            <img
              alt="photo"
              className="h-full w-full object-cover rounded-full"
              src={connection.fromUserId.photoUrl || DUMMY_IMG_URL}
            />
          </div>
          <div className="flex-1">
            <b>
              {connection.fromUserId.firstName} {connection.fromUserId.lastName}
            </b>
            {connection.fromUserId.age && connection.fromUserId.gender && (
              <p>
                {connection.fromUserId.age}, {connection.fromUserId.gender}
              </p>
            )}
            {connection.fromUserId.about && (
              <p>{connection.fromUserId.about}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="btn btn-primary"
              onClick={() =>
                handleConnectionRequest("accepted", connection._id)
              }
            >
              Accept
            </button>
            <button
              className="btn btn-secondary"
              onClick={() =>
                handleConnectionRequest("rejected", connection._id)
              }
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
