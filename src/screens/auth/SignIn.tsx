import { useState } from 'react';
import { useNavigate } from 'react-router';

import Logo from '@/assets/logo.png';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';

export function SignIn() {
  const navigate = useNavigate();
  const signIn = useAuth((state) => state.signIn);
  const loading = useAuth((state) => state.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signIn({
      email: email,
      password: password,
    }).then(() => {
      return navigate(ROUTES.AUTHENTICATED.HOME);
    });
  };

  const handleSignInGuest = () => {
    signIn({
      email: 'guest@jumentussc.com',
      password: 'Juve@2024',
    }).then(() => {
      console.log('home');
      return navigate(ROUTES.AUTHENTICATED.HOME);
    });
  };

  return (
    <div className="flex h-dvh w-dvw flex-col items-center bg-slate-950">
      <form className="flex w-full max-w-prose flex-col items-center gap-4 p-4" action="">
        <img className="w-80" src={Logo} alt="Logo Jumentus" />
        <Header hideLogo canGoBack />
        <Input
          disabled={loading.signIn}
          id="email"
          label="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          disabled={loading.signIn}
          id="password"
          type="password"
          label="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button isLoading={loading.signIn} className="mt-4" onClick={handleSignIn} label="Entrar" />
        <Button
          disabled={loading.signIn}
          className="w-full"
          variant="secondary"
          onClick={handleSignInGuest}
          label="Entrar sem login"
        />
      </form>
    </div>
  );
}
