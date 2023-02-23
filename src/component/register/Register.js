import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Validate } from "../../utils/Validate";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    profilePic: "https://api.dicebear.com/5.x/avataaars/svg",
    name: "",
    username: "",
    email: "",
    tel: "",
    password: "",
    joinedDate: `${new Date().getMonth() + 1}-2023`,
    posts: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("persistFormData")) || {
      profilePic: "https://api.dicebear.com/5.x/avataaars/svg",
      name: "",
      username: "",
      email: "",
      tel: "",
      password: "",
      joinedDate: `${new Date().getMonth() + 1}-2023`,
      posts: [],
    }
  );

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value || "" });
    setFormData({ ...formValues, [e.target.name]: e.target.value || "" });
  };
  useEffect(() => {
    localStorage.setItem("persistFormData", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    let FormData = JSON.parse(localStorage.getItem("persistFormData")) || [];
    setFormValues(FormData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(Validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let userList =
        JSON.parse(localStorage.getItem("registeredUserList")) || [];
      userList.push(formValues);
      localStorage.setItem("registeredUserList", JSON.stringify(userList));
      navigate("../login/Login");
    }
  }, [formErrors, isSubmit, formValues, navigate]);
  return (
    <div className="register">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div style={{ color: "green" }}>Registered successfully</div>
      ) : null}
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className="registerInput"
          type="text"
          name="name"
          placeholder="Enter your name..."
          value={formValues.name}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.name}</p>
        <label htmlFor="username">Username</label>
        <input
          className="registerInput"
          type="text"
          name="username"
          placeholder="Enter your username..."
          value={formValues.username}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.username}</p>
        <label htmlFor="email">Email</label>
        <input
          className="registerInput"
          type="text"
          name="email"
          placeholder="Enter your email..."
          value={formValues.email}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.email}</p>
        <label htmlFor="tel">Phone</label>
        <input
          className="registerInput"
          type="tel"
          name="tel"
          placeholder="987-654-3210"
          value={formValues.tel}
          pattern="[0-9]{10}"
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.tel}</p>
        <label htmlFor="password">Password</label>
        <input
          className="registerInput"
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={formValues.password}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.password}</p>
        <button className="registerButton">Register</button>
      </form>
      <Link className="link" to="/Login">
        <button className="registerLoginButton">Login</button>
      </Link>
    </div>
  );
}

export default Register;
