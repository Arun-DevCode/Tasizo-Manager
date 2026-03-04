import React from "react";

export default function Navbar() {
  const [profile, setProfile] = useState({
    name: "Guest User",
    email: "support@gmail.com",
    role: "Guest",
  });
  const [error, setError] = useState();

  // To Get User Profile info
  useEffect(() => {
    getUserProfile()
      .then((user) => setProfile(user))
      .catch((err) => setError(err));
  }, []);

  return <div></div>;
}
