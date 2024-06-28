'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { MainContainer } from '@/components/MainContainer';
import { Spacing } from '@/components/Spacing';

import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';
import { useFormik } from 'formik';

export default function Home() {
  const { push: navigate } = useRouter();

  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => handleSignIn(),
  });

  const handleSignIn = useCallback(() => {
    signIn({
      email: 'jumentusfc@gmail.com',
      password: 'jumentus@123456',
    }).then(() => navigate(ROUTES.AUTHENTICATED.HOME));
  }, [signIn, navigate]);

  return (
    <MainContainer>
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
        <Spacing size="XS" direction="X" />
        <Button variant="solid" onClick={handleSignIn} text="Entrar" />
        <Button
          variant="outlined"
          onClick={handleSignIn}
          text="Acessar sem login"
        />
      </form>
    </MainContainer>
  );
}
