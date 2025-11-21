const ProfileCard = ({ data }) => {
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={
            data.photoUrl ||
            "https://loudouncslcenter.com/wp-content/uploads/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          alt="user photo"
        />
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
