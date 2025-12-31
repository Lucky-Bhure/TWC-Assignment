import { useEffect, useState } from "react";
import styles from "../Auth/Auth.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({
    name: "",
    mobile: "",
  });
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleChange = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name] : event.target.value
    }))
  }

  const fetchUserDetails = async (token) => {
    return await axios.get(`${API}/api/auth/getUserDetails`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetchUserDetails(accessToken);
        setUser(res.data);
      } catch (error) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          try {
            console.log("Access Token Expxired");
            const refreshRes = await axios.get(
              `${API}/api/auth/refresh`,
              {
                withCredentials: true,
              }
            );
            const newAccessToken = refreshRes.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            const retryRes = await fetchUserDetails(newAccessToken);
            setUser(retryRes.data);
          } catch (error) {
            console.log("Refresh token expired:",error);

            localStorage.clear();
            navigate("/login");
          }
        }
      }
    };

    fetchUser();
  }, [navigate, update]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };


  const handleSubmit = async () => {
    try {
      await axios.post(
        `${API}/api/auth/updateUser`,
        {
          id: user._id,
          email: user.email,
          name: data.name,
          mobile: data.mobile,
          password: user.password
        }
      );

      setUpdate((prev) => !prev);

    } catch (error) {
      console.error("Logout failed:", error);
      alert("Update failed. Please try again.");
    }
  }

  if (!user) return <p>Loading user info...</p>;

  return (
    <>
      <Header />
      <div className={styles.authContainer}>
        <div className={styles.authForm}>
          <h2 className={styles.authTitle}>User Details</h2>
          <p>
            <strong>Name:</strong> {update ? <input name="name" value={data.name} onChange={handleChange}/> : user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {update ? <input name="mobile" value={data.mobile} onChange={handleChange}/> : user.mobile}
          </p>

          {update ? (
            <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
          ) : (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          )}
        </div>
        <button
          className={styles.updateBtn}
          onClick={() => setUpdate((prev) => !prev)}
        >
          Update
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
