import { useEffect, useState } from 'react';

// import { Download } from 'lucide-react';

// interface IProps {
//   containerStyle?: string;
// }

export function InstallButton() {
  const [, setDeferredPrompt] = useState<any>(null);
  const [, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // Função para verificar se o app está em modo standalone
    const checkStandalone = (): boolean => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    };

    setIsStandalone(checkStandalone());

    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);

  // const handleInstallClick = () => {
  //   if (deferredPrompt) {
  //     deferredPrompt.prompt();
  //     deferredPrompt.userChoice.then((choiceResult: any) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('Usuário aceitou instalar o PWA - WILL');
  //       } else {
  //         console.log('Usuário recusou instalar o PWA - WILL');
  //       }
  //       setDeferredPrompt(null);
  //     });
  //   }
  // };

  return null;

  // return (
  //   !isStandalone &&
  //   deferredPrompt && (
  //     <ButtonIcon
  //       variant="outlined"
  //       text="Baixar o app"
  //       onClick={handleInstallClick}
  //       containerStyle={containerStyle}
  //       icon={<Download />}
  //     />
  //   )
  // );
}
