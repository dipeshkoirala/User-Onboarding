import React from "react";

import "./App.css";
import Form from "./component/form";

function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;

/*
## STEP 1 - Create Your Advanced Form

We want to create a form to onboard a new user 
to our system. We need _at least_ the following pieces
 of information about our new user:

- [ ] Name
- [ ] Email
- [ ] Password
- [ ] Terms of Service (checkbox)
- [ ] A Submit button to send our form data to the server.

|--component
    |--form->name,email,password,termsof service(checkbox), a button
*/
