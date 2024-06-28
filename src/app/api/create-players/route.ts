import { FIREBASE } from '@/paths';
import firebaseAdmin from '@/service/firebase/configServer';

import { playersList } from './playersList';

export async function POST() {
  try {
    const dbFirestore = firebaseAdmin.firestore();

    await Promise.all(
      playersList.map(async ({ fullName, shortName }) => {
        const id = fullName.toLowerCase().replace(' ', '_');
        const docRef = dbFirestore
          .collection(FIREBASE.COLLECTIONS.PLAYERS)
          .doc(id);

        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
          await docRef.set({
            fullName: fullName,
            name: shortName,
            matches: 0,
            goals: 0,
            assists: 0,
            tackles: 0,
            saves: 0,
          });
          console.log(`Documento ${id} Adicionado`);
        } else {
          console.log(`Documento ${id} já existe`);
        }
      })
    );

    return Response.json({ status: 'ok' });
  } catch (error) {
    console.log(error, 'API create');
  }
}
