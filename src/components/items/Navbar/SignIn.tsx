import { useMsal } from '@azure/msal-react';

export const SigninButton = () => {
    const { instance } = useMsal();

    const handleSignIn = () => {
        instance.loginPopup({
            scopes: ['openid', 'profile', 'User.Read', 'https://management.azure.com/user_impersonation']
        });
    }
    return (
        <button color='blue' onClick={handleSignIn}>signin</button>
    )
}