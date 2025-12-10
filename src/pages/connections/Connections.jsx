import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiInstance from "../../api/instance";
import { API_CONSTANT, DUMMY_IMG_URL, ROUTE_CONSTANT } from "../../constant";
import { addConnections } from "../../store/slices/connection";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const navigate = useNavigate();
  const connectionList = useSelector((state) => state.connection);
  const dispatch = useDispatch();

  const fetchConnectionList = useCallback(async () => {
    try {
      const response = await apiInstance.get(API_CONSTANT.getConnections);
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchConnectionList();
  }, [fetchConnectionList]);

  if (!connectionList?.length)
    return (
      <h2 className="mt-3 mx-auto text-lg font-semibold">
        No connection found
      </h2>
    );

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h2 className="inline-block my-3 text-xl font-semibold">Connections</h2>
      {connectionList.map((connection) => (
        <div
          key={connection._id}
          className="flex items-center bg-base-300 min-w-xl p-4 gap-4 rounded-lg"
        >
          <div className="h-20 w-20">
            <img
              alt="photo"
              className="h-full w-full object-cover rounded-full"
              src={connection.photoUrl || DUMMY_IMG_URL}
            />
          </div>
          <div className="flex-1 mx-4">
            <b>
              {connection.firstName} {connection.lastName}
            </b>
            {connection.age && connection.gender && (
              <p>
                {connection.age}, {connection.gender}
              </p>
            )}
            {connection.about && <p>{connection.about}</p>}
          </div>
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(ROUTE_CONSTANT.chat.replace(":id", connection._id))
            }
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default Connections;
