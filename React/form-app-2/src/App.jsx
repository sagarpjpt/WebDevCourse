import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "India",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    comments: false,
    candidates: false,
    offers: false,
    pushNotifications: "",
  });

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log('finally printing the value of form data:');
    console.log(formData)
  }

  return (
    <div className="w-full h-full px-2">
      <form action="" onSubmit={submitHandler} 
        className="lg:w-[90%] lg:max-w-1/2 mx-auto bg-white shadow-2xl p-8"
      >
        <label htmlFor="firstName" className="font-bold">First Name: </label>
        <br />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Shivam"
          value={formData.firstName}
          onChange={changeHandler}
          className="mt-2 p-2 w-full rounded-md outline-blue-400 border-2 border-blue-300"
        />

        <br />
        <br />

        <label htmlFor="lastName" className="font-bold">Last Name: </label>
        <br />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Prajapati"
          value={formData.lastName}
          onChange={changeHandler}
          className="mt-2 p-2 w-full rounded-md outline-blue-400 border-2 border-blue-300"
        />

        <br />
        <br />

        <label htmlFor="email" className="font-bold">Email Address</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="sagarpjpt99@gmail.com"
          value={formData.email}
          onChange={changeHandler}
          className="mt-2 p-2 w-full rounded-md outline-blue-400 border-2 border-blue-300"
        />

        <br />
        <br />

        <label htmlFor="country" className="font-bold">Country</label>
        <br />
        <select
          name="country"
          id="country"
          value={formData.country}
          onChange={changeHandler}
          className="mt-2 p-2 w-full rounded-md outline-blue-400 border-2 border-blue-300"
        >
          <option>India</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>

        <br />
        <br />

        <label htmlFor="streetAddress" className="font-bold">Street Address</label>
        <br />
        <input
          type="text"
          name="streetAddress"
          id="streetAddress"
          placeholder="B-25c"
          value={formData.streetAddress}
          onChange={changeHandler}
          className="mt-2 p-2 w-full rounded-md outline-blue-400 border-2 border-blue-300"
        />

        <br />
        <br />

        <label htmlFor="city" className="font-bold">City</label>
        <br />
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Kanpur"
          value={formData.city}
          onChange={changeHandler}
          className="mt-2 p-2 w-full rounded-md outline-blue-400 border-2 border-blue-300"
        />

        <br />
        <br />

        <label htmlFor="state" className="font-bold">State / Province</label>
        <br />
        <input
          type="text"
          name="state"
          id="state"
          placeholder="Uttar Pradesh"
          value={formData.state}
          onChange={changeHandler}
          className="mt-2 p-2 w-full rounded-md outline-blue-400 border-2 border-blue-300"
        />

        <br />
        <br />

        <label htmlFor="postalCode" className="font-bold">ZIP / Postal code</label>
        <br />
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          placeholder="713381"
          value={formData.postalCode}
          onChange={changeHandler}
          className="mt-2 p-2 w-full rounded-md outline-blue-400 border-2 border-blue-300"
        />

        <br />
        <br />

        <fieldset>
          <legend className="font-bold">By Email</legend>

          <div className="flex mt-3 gap-x-3 items-baseline">
            <input
              type="checkbox"
              name="comments"
              id="comments"
              checked={formData.comments}
              onChange={changeHandler}
            />

            <div>
              <label htmlFor="comments">Comments</label>
              <p className="opacity-60">Get notified when someones posts a comment on a posting.</p>
            </div>
          </div>

          <div className="flex mt-2 gap-x-3 items-baseline">
            <input
              type="checkbox"
              name="candidates"
              id="candidates"
              checked={formData.candidates}
              onChange={changeHandler}
            />

            <div>
              <label htmlFor="candidates">Candidates</label>
              <p className="opacity-60">Get notified when a candidate applies for a job.</p>
            </div>
          </div>

          <div className="flex mt-2 gap-x-3 items-baseline">
            <input
              type="checkbox"
              name="offers"
              id="offers"
              checked={formData.offers}
              onChange={changeHandler}
            />

            <div>
              <label htmlFor="offers">Offers</label>
              <p className="opacity-60">Get notified when a candidate accepts or rejects an offer.</p>
            </div>
          </div>
        </fieldset>

        <br />

        <fieldset>
          <legend className="font-bold">Push Notifications</legend>
          <p className="opacity-60">These are delivered via SMS to your mobile phone</p>

          <input
            type="radio"
            id="pushEverything"
            name="pushNotifcations"
            value="EveryThing"
            onChange={changeHandler}
            className="mt-5"
          />
          <label htmlFor="pushEverything" className="ml-2">Everything</label>

          <br />

          <input
            type="radio"
            id="pushEmail"
            name="pushNotifcations"
            value="Same as Email"
            onChange={changeHandler}
            className="mt-3"
          />
          <label htmlFor="pushEmail" className="ml-2">Same as Email</label>

          <br />

          <input
            type="radio"
            id="pushNothing"
            name="pushNotifcations"
            value="No Push Notifications"
            onChange={changeHandler}
            className="mt-3"
          />
          <label htmlFor="pushNothing" className="ml-2">No Push Notifications</label>
        </fieldset>

        <div className="w-full text-center">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md mt-5 font-bold w-fit">Save</button>
        </div>

      </form>
    </div>
  );
}

export default App;
