import { useCallback, useEffect } from "react";
import apiInstance from "../../api/instance";
import { API_CONSTANT } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../../components/ProfileCard";
import { addFeeds } from "../../store/slices/feed";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feed);

  console.log(feedData, "{");

  const fetchFeeds = useCallback(async () => {
    try {
      const response = await apiInstance.get(API_CONSTANT.feed);
      dispatch(addFeeds(response.data.data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  return feedData?.length ? (
    <div className="w-full flex items-center justify-center">
      <ProfileCard data={feedData[0]} />
    </div>
  ) : (
    <div>
      <h3>No feeds.</h3>
    </div>
  );
};

export default Feed;
