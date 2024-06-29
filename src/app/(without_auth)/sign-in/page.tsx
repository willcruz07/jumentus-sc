'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { InstallButton } from '@/components/InstallButton';
import { MainContainer } from '@/components/MainContainer';
import { ModalLoading } from '@/components/ModalLoading';
import { Spacing } from '@/components/Spacing';

import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';
import { useFormik } from 'formik';

export default function Home() {
  const { push: navigate } = useRouter();

  const { signIn, loading, errors } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (data) => handleSignIn(data.email, data.password),
  });

  const handleSignIn = useCallback(
    (email: string, password: string) => {
      signIn({
        email: email,
        password: password,
      }).then(() => navigate(ROUTES.AUTHENTICATED.HOME));
    },
    [signIn, navigate]
  );

  const handleSignInGuest = useCallback(() => {
    signIn({
      email: 'guest@jumentussc.com',
      password: 'Juve@2024',
    }).then(() => navigate(ROUTES.AUTHENTICATED.HOME));
  }, [navigate, signIn]);

  return (
    <MainContainer>
      <div>
        <InstallButton containerStyle="mt-8" />
      </div>

      <Image
        className="self-center"
        width={500}
        height={500}
        src={'/img/logo.png'}
        alt="Logo"
      />
      <form action="" className="flex w-full flex-col gap-4">
        <Input
          label="Email:"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
        />
        <Input
          label="Senha:"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
        />
        {errors.signIn && (
          <h1 className="text-sm text-red-300">{errors.signIn}</h1>
        )}
        <Spacing size="XS" direction="X" />
        <Button
          variant="solid"
          onClick={() => formik.handleSubmit()}
          text="Entrar"
        />
        <Button
          variant="outlined"
          onClick={handleSignInGuest}
          text="Acessar sem login"
        />
      </form>

      <ModalLoading isVisible={loading.signIn} />
    </MainContainer>
  );
}
