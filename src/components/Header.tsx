import clsx from 'clsx';
import { ArrowBigLeftDash, DoorOpen } from 'lucide-react';
import { useNavigate } from 'react-router';

import Logo from '@/assets/logo.png';
import { useAuth } from '@/store/useAuth';

import { Button } from './Button';

interface IProps {
  canGoBack?: boolean;
  hideLogo?: boolean;
}

export function Header({ canGoBack, hideLogo }: IProps) {
  const navigate = useNavigate();
  const signOut = useAuth((state) => state.signOut);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={clsx('flex min-h-full w-full max-w-prose items-center', {
          'justify-end': hideLogo,
          'justify-between': !hideLogo,
        })}
      >
        {!hideLogo && <img src={Logo} className="w-32" alt="Logo" />}
        <Button
          label={canGoBack ? 'Voltar' : 'Sair'}
          lefIcon={canGoBack ? <ArrowBigLeftDash /> : <DoorOpen />}
          onClick={() => (canGoBack ? navigate(-1) : handleSignOut())}
          variant="secondary"
        />
      </div>
    </div>
  );
}
