import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface IProps {
  navigateTo(route: string): void;
  goBack(): void;
}

export function useNavigation(): IProps {
  const { back, push } = useRouter();

  const handleNavigate = useCallback(
    (route: string) => {
      push(route);
    },
    [push]
  );

  const handleGoBack = useCallback(() => {
    back();
  }, [back]);

  return {
    navigateTo: handleNavigate,
    goBack: handleGoBack,
  };
}
