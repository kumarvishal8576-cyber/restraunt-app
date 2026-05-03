import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      alert("Signed in successfully 🎉");

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <br></br> <br></br>

      <form onSubmit={handleSubmit} className="login-form">
        
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>

      </form>
    </div>
  );
};

export default Login;