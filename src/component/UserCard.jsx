/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <div>
            {age}, {gender}
          </div>
          <div className="flex">
            {skills.map((skill) => (
              <p className="badge badge-outline" key={skill}>
                {skill}
              </p>
            ))}
          </div>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
