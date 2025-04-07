import { useRef, useState } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const [emailIsInvalid, setEmailIsInvalid] = useState();


  function handleSubmit(event) {
    console.log("🚀 ~ handleSubmit ~ event:", event)
    event.preventDefault();
    console.log('sumbit')
    const enteredEmail = email.current.value;
    console.log("🚀 ~ handleSubmit ~ enteredEmail:", enteredEmail)
    const enteredPassword = password.current.value;
    console.log("🚀 ~ handleSubmit ~ enteredPassword:", enteredPassword)

    const isEmailInvalid = !enteredEmail.includes('@');
    setEmailIsInvalid(isEmailInvalid => isEmailInvalid )

  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email}/>
          <div className="control-error">
                {emailIsInvalid && <p>error email adress</p>}
            </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
