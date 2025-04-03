import { Navigate, Route, Routes } from 'react-router';

import { Home } from '@/screens/app/Home';
import { MatchCreate } from '@/screens/app/MatchCreate';
import { MatchDetails } from '@/screens/app/MatchDetails';
import { Players } from '@/screens/app/Players';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/players" element={<Players />} />
      <Route path="/match-create" element={<MatchCreate />} />
      <Route path="/match-details" element={<MatchDetails />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
