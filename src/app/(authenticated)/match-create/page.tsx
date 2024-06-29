/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { MainContainer } from '@/components/MainContainer';
import { ModalLoading } from '@/components/ModalLoading';
import { TextArea } from '@/components/TextArea';

import { useNavigation } from '@/hook/useNavigation';
import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';
import { useMatches } from '@/store/useMatches';
import { IPlayersList, ITeams } from '@/store/useMatches/types';
import { usePlayers } from '@/store/usePlayers';
import dayjs from 'dayjs';

import { ConfirmMatchCreate } from './components/ConfirmMatchCreate';
import { ContainerPlayer } from './components/ContainerPlayer';
import { ContainerTeams } from './components/ContainerTeams';

const baseTeam: ITeams = {
  team_1: [],
  team_2: [],
  team_3: [],
};

export default function MatchCreate() {
  const { startListenerAllPlayers, allPlayers } = usePlayers();
  const { createMatch, loading } = useMatches();
  const { navigateTo } = useNavigation();
  const { currentUser } = useAuth();

  const [playerList, setPlayerList] = useState('');
  const [playersSelected, setPlayersSelected] = useState<IPlayersList>();
  const [dateSelected, setDateSelected] = useState<Date>();
  const [teams, setTeams] = useState<ITeams>();
  const [modalConfirmCreate, setModalConfirmCreate] = useState(false);

  useEffect(() => {
    const unsubscribe = startListenerAllPlayers();

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const parseTextToObj = (
  //   text: string
  // ): { players: string[]; goalKeepers: string[]; date?: Date } => {
  //   const lines: string[] = text.split('\n');
  //   const players: string[] = [];
  //   const goalKeepers: string[] = [];

  //   let inPlayersSection: boolean = false;
  //   let inGoalKeepersSection: boolean = false;
  //   let date = undefined;

  //   lines.forEach((line: string) => {
  //     if (line.includes('📅')) {
  //       const dateMatch = line.match(/📆\s*(\d{2}\/\d{2})\s*📅/);
  //       if (dateMatch) {
  //         const rawDate: string = dateMatch[1];
  //         const baseDate = `${rawDate}/${dayjs().year()}`.split('/');

  //         date = new Date(
  //           Number(baseDate[2]),
  //           Number(baseDate[1]) - 1,
  //           Number(baseDate[0])
  //         );
  //       }
  //     }
  //     // Process players section
  //     if (line.includes('MENSALISTAS')) {
  //       inPlayersSection = true;
  //       inGoalKeepersSection = false;
  //     }

  //     if (inPlayersSection && line.match(/^\d+/)) {
  //       const nameMatch = line.match(/-\s*(.+?)\s*(✅|🔁|🔃|❓|🔂)/);
  //       if (nameMatch) {
  //         let name: string = nameMatch[1].trim();
  //         // Handle special cases for replacements
  //         if (nameMatch[2] === '🔁' || nameMatch[2] === '🔃') {
  //           const replacementMatch = line.match(/(🔁|🔃)\s*(\S+)/);
  //           if (replacementMatch) {
  //             name = replacementMatch[2].trim();
  //           }
  //         } else if (nameMatch[2] === '🔂') {
  //           // Keeping original name for 🔂
  //         }
  //         players.push(name);
  //       }
  //     }

  //     // End players section if another section starts
  //     if (line.includes('LEGENDA DOS MENSALISTAS:')) {
  //       inPlayersSection = false;
  //     }

  //     // Process goalKeepers section
  //     if (line.includes('GOLEIROS')) {
  //       inGoalKeepersSection = true;
  //     }

  //     if (inGoalKeepersSection && line.match(/^\d+/)) {
  //       const nameMatch = line.match(/-\s*(.+)/);
  //       if (nameMatch) {
  //         const name: string = nameMatch[1].trim();
  //         goalKeepers.push(name);
  //       }
  //     }
  //     // End goalKeepers section if another section starts
  //     if (line.includes('LISTA DE ESPERA')) {
  //       inGoalKeepersSection = false;
  //     }
  //   });

  //   return {
  //     players,
  //     goalKeepers,
  //     date,
  //   };
  // };

  const parseTextToObj = (
    text: string
  ): { players: string[]; goalKeepers: string[]; date?: Date } => {
    const lines: string[] = text.split('\n');
    const players: string[] = [];
    const goalKeepers: string[] = [];

    let inPlayersSection: boolean = false;
    let inGoalKeepersSection: boolean = false;
    let date = undefined;

    lines.forEach((line: string) => {
      if (line.includes('📅')) {
        const dateMatch = line.match(/📆\s*(\d{2}\/\d{2})\s*📅/);
        if (dateMatch) {
          const rawDate: string = dateMatch[1];
          const baseDate = `${rawDate}/${dayjs().year()}`.split('/');

          date = new Date(
            Number(baseDate[2]),
            Number(baseDate[1]) - 1,
            Number(baseDate[0])
          );
        }
      }
      // Process players section
      if (line.includes('MENSALISTAS')) {
        inPlayersSection = true;
        inGoalKeepersSection = false;
      }

      if (inPlayersSection && line.match(/^\d+/)) {
        const nameMatch = line.match(/-\s*(.+?)\s*(✅|🔁|🔃|❓|🔂)/);
        if (nameMatch) {
          let name: string = nameMatch[1].trim();
          // Handle special cases for replacements
          if (nameMatch[2] === '🔁' || nameMatch[2] === '🔃') {
            const replacementMatch = line.match(/(🔁|🔃)\s*(.+)/);
            if (replacementMatch) {
              name = replacementMatch[2].trim();
            }
          } else if (nameMatch[2] === '🔂') {
            // Keeping original name for 🔂
          }
          players.push(name);
        }
      }

      // End players section if another section starts
      if (line.includes('LEGENDA DOS MENSALISTAS:')) {
        inPlayersSection = false;
      }

      // Process goalKeepers section
      if (line.includes('GOLEIROS')) {
        inGoalKeepersSection = true;
      }

      if (inGoalKeepersSection && line.match(/^\d+/)) {
        const nameMatch = line.match(/-\s*(.+)/);
        if (nameMatch) {
          const name: string = nameMatch[1].trim();
          goalKeepers.push(name);
        }
      }
      // End goalKeepers section if another section starts
      if (line.includes('LISTA DE ESPERA')) {
        inGoalKeepersSection = false;
      }
    });

    return {
      players,
      goalKeepers,
      date,
    };
  };

  const divideTeams = (playersList: Array<string>): ITeams => {
    const teams = {
      team_1: [],
      team_2: [],
      team_3: [],
    };

    const copyArray = [...playersList];

    while (copyArray.length > 0) {
      for (let i = 1; i <= 3 && copyArray.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * copyArray.length);
        (teams as any)[`team_${i}`].push(copyArray[randomIndex]);
        copyArray.splice(randomIndex, 1);
      }
    }

    if (playersSelected && playersSelected?.goalKeepers?.length > 2) {
      const shuffleArray = (array: Array<string>) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const shuffledGoalkeepers = shuffleArray([
        ...playersSelected.goalKeepers,
      ]);

      Object.keys(teams).forEach((teamKey, index) => {
        (teams as any)[teamKey].push(shuffledGoalkeepers[index]);
      });
    }

    return teams;
  };

  const handleCreatePlayersList = () => {
    const parsed = parseTextToObj(playerList);
    setDateSelected(parsed.date);
    setPlayersSelected({
      goalKeepers: parsed.goalKeepers,
      players: parsed.players,
    });
  };

  const handleCustomTeam = (player: string, keyTeam: keyof ITeams) => {
    if (!teams) {
      return setTeams({
        ...baseTeam,
        [keyTeam]: [player],
      });
    }

    setTeams((pS) => {
      if (!pS) {
        return undefined;
      }

      const updatedTeams = (Object.keys(pS) as Array<keyof ITeams>).reduce(
        (acc, teamKey) => {
          if (teamKey === keyTeam) {
            acc[teamKey] = pS[teamKey];
          } else {
            acc[teamKey] = pS[teamKey].filter((p) => p !== player);
          }
          return acc;
        },
        {} as ITeams
      );

      updatedTeams[keyTeam] = [...updatedTeams[keyTeam], player];

      return {
        ...pS,
        ...updatedTeams,
      };
    });
  };

  const handleConfirmMatchCreate = () => {
    if (teams && playersSelected) {
      createMatch({
        teams: teams,
        players: playersSelected,
        date: dayjs(dateSelected).toDate(),
      }).then(() => {
        navigateTo(ROUTES.AUTHENTICATED.HOME);
      });
    }
  };

  if (currentUser?.email?.includes('guest')) {
    return (
      <MainContainer>
        <Header canGoBack />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Header canGoBack />

      <TextArea
        value={playerList}
        onChange={setPlayerList}
        containerStyle="mt-4"
      />

      <Button
        containerStyle="mt-4"
        variant="solid"
        onClick={handleCreatePlayersList}
        text="Listar jogadores"
      />

      {playersSelected && (
        <>
          <div>
            <h1 className="text-md mb-2 mt-8 font-sans text-gray-300">
              {'Jogadores'}
            </h1>
            <div className="flex flex-col gap-3">
              {playersSelected?.players?.map((player) => (
                <ContainerPlayer
                  onClick={(value) =>
                    handleCustomTeam(player, value as keyof ITeams)
                  }
                  key={player}
                  name={player}
                  teams={teams}
                  fullName={player}
                />
              ))}
            </div>

            <h1 className="text-md mb-2 mt-8 font-sans text-gray-300">
              {'Goleiros'}
            </h1>
            <div className="flex flex-col gap-3">
              {playersSelected?.goalKeepers?.map((player) => (
                <ContainerPlayer
                  onClick={(value) =>
                    handleCustomTeam(player, value as keyof ITeams)
                  }
                  goalKeeperOk={playersSelected?.goalKeepers?.length > 2}
                  key={player}
                  name={player}
                  teams={teams}
                  fullName={player}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {playersSelected?.players && (
        <>
          <Button
            containerStyle="mt-10"
            variant="outlined"
            onClick={() =>
              playersSelected?.players &&
              setTeams(divideTeams(playersSelected?.players))
            }
            text="Gerar times automaticamente"
          />

          <Button
            containerStyle="mt-3"
            variant="text"
            onClick={() => setTeams(undefined)}
            text="Limpar times"
          />
        </>
      )}

      {teams && (
        <>
          {Object.keys(teams).map((teamKey, index) => (
            <ContainerTeams key={index} name={`Time - ${index + 1}`}>
              {(teams as any)[teamKey].map((player: string) => {
                const foundPlayer = allPlayers.find((p) => {
                  return (
                    p.fullName.trim().toLocaleLowerCase() ===
                    player.trim().toLowerCase()
                  );
                });

                const name = foundPlayer ? foundPlayer.name : player;

                return (
                  <ContainerPlayer
                    flexCol
                    key={player}
                    name={name}
                    fullName={player}
                  />
                );
              })}
            </ContainerTeams>
          ))}
        </>
      )}

      {teams && (
        <>
          <h3 className="mt-3 font-sans font-light text-gray-400">{`Partida marcada para: ${dayjs(dateSelected).format('DD/MM/YYYY')}`}</h3>
          <Button
            containerStyle="mt-8"
            variant="solid"
            onClick={() => setModalConfirmCreate(true)}
            text="Criar partida"
          />
        </>
      )}

      <ConfirmMatchCreate
        isVisible={modalConfirmCreate}
        onCancel={() => setModalConfirmCreate(false)}
        onConfirm={handleConfirmMatchCreate}
      />

      <ModalLoading isVisible={loading.createMatch} />
    </MainContainer>
  );
}
