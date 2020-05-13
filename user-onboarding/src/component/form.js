import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  //take name of each of our form from the <input name="name"
  name: yup.string().required("Name is required"),
  //does it validate if I enter name beginning number
  email: yup.string().email("email must be valid").required("Cant't be empty"),

  password: yup
    .string()
    //.password("valid password plz")
    .required("Cant't be empty"),

  terms: yup.boolean().oneOf([true], "Please agree to terms of use"),
}); //expression for yup completes

const Form = () => {
  // state defining and assinging  an object :Destructuring
  const [dataState, setDataState] = useState({
    name: "",
    email: "",
    password: "",
    terms: "false",
  });

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    motivation: "",
    position: "",
    terms: "",
  });

  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    console.log("input changed");
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDataState({ ...dataState, [e.target.name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("form submitted!!!!");
    axios
      .post("https://reqres.in/api/users", dataState)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-wrapper">
      <h1>Form goes down here</h1>
      <form onSubmit={submitForm}>
        <label className="dklabel" htmlFor="name">
          Name:
          <input
            className="dktext"
            type="text"
            name="name"
            value={dataState.name} //default value will be the text entered val
            placeholder="Enter Name"
            onChange={inputChange}
          />
        </label>
        {/* label and text for email */}
        <label className="dklabel" htmlFor="email">
          Email:
          <input
            className="dktext"
            type="text"
            name="email"
            value={dataState.email}
            placeholder="someone@something.com"
            onChange={inputChange}
          />
          {errorState.email.length > 0 ? (
            <p className="error">{errorState.email}</p>
          ) : null}
        </label>
        {/* label and password for password */}
        <label className="dklabel" htmlFor="password">
          Password:
          <input
            className="dktext"
            type="password"
            name="password"
            value={dataState.name}
            placeholder="Encrypted"
            onChange={inputChange}
          />
        </label>
        {/* label and content for checkbox */}
        <label className="dklabel" htmlFor="checked">
          Terms of Service:
          <input
            className="dktext"
            type="checkbox"
            name="terms"
            value={dataState.terms}
            onChange={inputChange}
          />
        </label>
        {/* Button and Submit */}
        <button type="button">Submit</button>
      </form>
    </div>
  );
};
export default Form;
