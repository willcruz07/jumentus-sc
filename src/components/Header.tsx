import Image from 'next/image';
import { useCallback } from 'react';

import { useNavigation } from '@/hook/useNavigation';
import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';
import { ArrowBigLeftDash, DoorOpen } from 'lucide-react';

import { Button } from './Button';
import { InstallButton } from './InstallButton';

interface IProps {
  canGoBack?: boolean;
}

export function Header({ canGoBack }: IProps) {
  const { signOut } = useAuth();
  const { goBack, navigateTo } = useNavigation();

  const handleSignOut = useCallback(() => {
    signOut().then(() => {
      navigateTo(ROUTES.WITHOUT_AUTH.SIGN_IN);
    });
  }, [signOut, navigateTo]);

  return (
    <div className="flex min-h-full w-full flex-col">
      <div className="flex min-h-full w-full items-center justify-between">
        <Image width={128} height={128} src={'/img/logo.png'} alt="Logo" />
        <Button
          label={canGoBack ? 'Voltar' : 'Sair'}
          lefIcon={canGoBack ? <ArrowBigLeftDash /> : <DoorOpen />}
          onClick={() => (canGoBack ? goBack() : handleSignOut())}
          variant="secondary"
        />
      </div>
      <div className="my-4">
        <InstallButton />
      </div>
    </div>
  );
}
