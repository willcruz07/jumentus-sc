import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { MainContainer } from '@/components/MainContainer';
import { useAuth } from '@/store/useAuth';

export function AddAdmins() {
  const emailsAdmins = useAuth((state) => state.emailsAdmins);
  const startListenerAdmins = useAuth((state) => state.startListenerAdmins);
  const setEmailsAdmins = useAuth((state) => state.setEmailsAdmins);

  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = startListenerAdmins();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUser = async () => {
    setEmailsAdmins(Array.from(new Set([...emailsAdmins, email])));
    setEmail('');
  };

  const handleRemoveUser = async (user: string) => {
    setEmailsAdmins(emailsAdmins.filter((admin) => admin != user));
  };

  return (
    <MainContainer>
      <Header canGoBack />

      <div className="mt-8 w-full max-w-prose self-center">
        <div className="flex items-end gap-4">
          <Input
            className="w-full text-slate-200"
            type="email"
            value={email}
            id="email"
            onChange={(s) => setEmail(s.target.value)}
            label="Email user:"
          />

          <Button onClick={handleAddUser} label="Add" className="h-10 w-20" />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {emailsAdmins.map((user) => (
            <div
              key={user}
              className="flex justify-between rounded-lg border border-gray-700 bg-gray-900 p-4"
            >
              <span className="text-slate-200">{user}</span>
              <Trash2 onClick={() => handleRemoveUser(user)} className="text-red-400" />
            </div>
          ))}
        </div>
      </div>
    </MainContainer>
  );
}
