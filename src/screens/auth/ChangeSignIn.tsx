import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Logo from '@/assets/logo.png';
import { Button } from '@/components/Button';
import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';

export function ChangeSignIn() {
  const navigate = useNavigate();
  const redirectApp = useAuth((state) => state.redirectApp);
  const signInWithGoogle = useAuth((state) => state.signInWithGoogle);

  useEffect(() => {
    redirectApp(navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-dvh w-dvw flex-col items-center bg-slate-950">
      <form className="flex w-full max-w-prose flex-col items-center gap-6 p-4" action="">
        <img className="w-72" src={Logo} alt="Logo Jumentus" />
        <Button onClick={() => navigate(ROUTES.WITHOUT_AUTH.SIGN_IN)} label="Entrar" />
        <Button
          className="w-full"
          variant="secondary"
          type="button"
          lefIcon={<img className="w-8" src="/google.svg" />}
          onClick={signInWithGoogle}
          label="Entrar com o google"
        />
      </form>
    </div>
  );
}
