import { useState } from "react";
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
import Input from './Input.jsx';
import { useInput } from '../hooks/useInput.js';

export default function Login() {
    const {
      value: emailValue,
      handleInputChange: handleEmailChange,
      handleInputBlur: handleEmailBlur,
      hasError: emailHasError,
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));
    const {
      value: passwordValue,
      handleInputChange: handlePasswordChange,
      handleInputBlur: handlePasswordBlur,
      hasError: passwordHasError,
    } = useInput('', (value) => hasMinLength(value, 6));
  // const [enteredEmail, setEnteredMail] = useState(''); 
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [enteredValues, setEnteredValues] = useState({
  //   email: '',
  //   password: ''
  // })

  // const [didEdit, setDidEdit] = useState({
  //   email: false,
  //   password: false
  // })

  // const isInvalidEmail = didEdit.email && !enteredValues.email.includes('@');
  // const isInvalidPassword = didEdit.password && enteredValues.password.trim().length < 6;

  // function handleInputBlur(identifier){
  //   setDidEdit(prev => ({
  //       ...prev,
  //       [identifier]: true
  //   }))
  // }


  // function handleInputChange(identifier, value) {
  //   setEnteredValues((prevs) => ({
  //     ...prevs,
  //     [identifier]: value
  //   }))

  //   setDidEdit(prev => ({
  //       ...prev,
  //       [identifier]: false
  //   }))
  // }

  // function handleEmailChange(event) {
  //   setEnteredMail(event.target.value)
  // }
 
  function handleSubmit(event) {
    console.log("🚀 ~ handleSubmit ~ event:", event)
    event.preventDefault();
    console.log("🚀 ~ handleSubmit ~ passwordHasError:", passwordHasError)
    console.log("🚀 ~ handleSubmit ~ emailHasError:", emailHasError)

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input label="email"
         id="email" 
         type="email"
         name="email"
         onBlur={handleEmailBlur}
          onChange={handleEmailChange}
         value={emailValue}
         error={emailHasError && 'error email adress'}/>
      
      <Input label="Password"
            id="password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            value={passwordValue}
            error={passwordHasError && 'error password!'}
          />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
