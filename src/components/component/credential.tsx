import React, { useState } from 'react';

interface CredentialProps {
  setLogin: (value: string) => void;
  setPassword: (value: string) => void;
}

const Credential: React.FC<CredentialProps> = ({ setLogin, setPassword }) => {
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordTouched(true); // User has interacted with password input field
    setPassword(e.target.value);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  return (
    <>
      <p>
        <label>Login:
          <input type="text" onChange={handleLoginChange} />
        </label>
      </p>
      <p>
        <label>Password:
          <input type="password" onChange={handlePasswordChange} />
        </label>
      </p>
    </>
  );
};

export default Credential;
