import { useState } from "react";

function App() {
  /* its inefficient way soln - 1

  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");


  console.log(firstName) // print current value as outside of async function chnge
  console.log(lastName);

  function changeFirstNameHandler(event) {
    // console.log('printing first name : ')
    // console.log(event.target); prints the input tag to console
    // console.log(event.target.value)
    setFirstName(event.target.value); // it is async function so it is scheduled
    // console.log(firstName) // print till last inputted val
  }

  function changeLastNameHandler(event) {
    // console.log('printing last name : ')
    // console.log(event.target);
    // console.log(event.target.value)
    setLastName(event.target.value)
  }

*/

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
    isVisible: true,
    mode: "",
    favCar: "",
  });

  console.log(formData);

  // function changeHandler(event) {

  //   setFormData( prevFormData => ({
  //     ...prevFormData,
  //     [event.target.name]: event.target.value
  //   }))

  // }

  function changeHandler(event) {
    const { name, value, checked, type } = event.target; //event target return whole input tag

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault(); // predefined fn prevented
    // because we want to just print on console the data on console
    console.log('finally printing the entire form data..... :--');
    console.log(formData);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="first name"
          // onChange={changeFirstNameHandler}
          onChange={changeHandler}
          name="firstName"
          value={formData.firstName}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="last name"
          // onChange={changeLastNameHandler}
          onChange={changeHandler}
          name="lastName"
          value={formData.lastName}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="email"
          // onChange={changeEmailHandler}
          onChange={changeHandler}
          name="email"
          value={formData.name}
        />

        <br />
        <br />

        <textarea
          placeholder="enter you comments"
          onChange={changeHandler}
          name="comments"
          value={formData.comments}
        />

        <br />
        <br />

        <input
          type="checkbox"
          onChange={changeHandler}
          name="isVisible"
          id="isVisible"
          checked={formData.isVisible} // handles inti value checkbox
        />
        <label htmlFor="isVisible">Am I Visible ?</label>

        <br />
        <br />

        <fieldset>
          <legend>Mode: </legend>

          <input
            type="radio"
            onChange={changeHandler}
            name="mode"
            id="Online-Mode"
            value="Online-Mode" // handles inti value checkbox
            checked={formData.mode === "Online-Mode"} //agr formdata mein mode ki value ye hai toh ye input check karna padega
          />
          <label htmlFor="Online-Mode">Online Mode</label>

          <input
            type="radio"
            onChange={changeHandler}
            name="mode" //name should be same of all radio button in the form so that only one can be selected at once
            id="Offline-Mode"
            value="Offline-Mode" // handles inti value checkbox
            checked={formData.mode === "Offline-Mode"}
          />
          <label htmlFor="Offline-Mode">Offline Mode</label>
        </fieldset>

        <br />
        <br />

        <select
          onChange={changeHandler}
          name="favCar"
          id="favCar"
          value={formData.favCar}
        >
          <option value="scorpio">Scarpio</option>
          <option value="fartuner">Fartuner</option>
          <option value="tharr">Tharr</option>
          <option value="defender">Defender</option>
        </select>
        <label htmlFor="favCar"> Tell me yr fav Car</label>

        <br />
        <br />

        {/* submmiting the form */}
        <button>Submit</button>
        {/* jab button pe click karta hun toh form ke liye onSubmit type ka
        event triggered hota hai */}

        {/* or  */}

        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
}

export default App;
