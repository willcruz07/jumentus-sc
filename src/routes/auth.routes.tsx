import { Navigate, Route, Routes } from 'react-router';

import { ChangeSignIn } from '@/screens/auth/ChangeSignIn';
import { SignIn } from '@/screens/auth/SignIn';

export function AuthRoutes() {
  return (
    <Routes>
      <Route index path="/sign-in" element={<SignIn />} />
      <Route index path="/change-sign-in" element={<ChangeSignIn />} />
      <Route path="*" element={<Navigate to="/change-sign-in" />} />
    </Routes>
  );
}
