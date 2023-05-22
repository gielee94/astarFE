import { useMsal } from '@azure/msal-react';

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleSignOut = () => {
    instance.logout();
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};