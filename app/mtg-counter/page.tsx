"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown } from "lucide-react";

interface CmdDmg {
  id: number;
  damage: number;
}

interface Player {
  id: number;
  life: number;
  cmd: CmdDmg[];
  color: string;
}

export default function MTGCounter() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      life: 40,
      cmd: [
        {
          id: 1,
          damage: 0,
        },
        {
          id: 2,
          damage: 0,
        },
        {
          id: 3,
          damage: 0,
        },
        {
          id: 4,
          damage: 0,
        },
      ],
      color: "bg-blue-400",
    },
    {
      id: 2,
      life: 40,
      cmd: [
        {
          id: 1,
          damage: 0,
        },
        {
          id: 2,
          damage: 0,
        },
        {
          id: 3,
          damage: 0,
        },
        {
          id: 4,
          damage: 0,
        },
      ],
      color: "bg-lime-400",
    },
    {
      id: 3,
      life: 40,
      cmd: [
        {
          id: 1,
          damage: 0,
        },
        {
          id: 2,
          damage: 0,
        },
        {
          id: 3,
          damage: 0,
        },
        {
          id: 4,
          damage: 0,
        },
      ],
      color: "bg-red-400",
    },
    {
      id: 4,
      life: 40,
      cmd: [
        {
          id: 1,
          damage: 0,
        },
        {
          id: 2,
          damage: 0,
        },
        {
          id: 3,
          damage: 0,
        },
        {
          id: 4,
          damage: 0,
        },
      ],
      color: "bg-orange-400",
    },
  ]);

  const updateLife = (id: number, change: number) => {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id ? { ...player, life: player.life + change } : player
      )
    );
  };

  const resetGame = () => {
    setPlayers((current) =>
      current.map((player) => ({
        ...player,
        life: 40,
        cmd: player.cmd.map((cmd) => ({ ...cmd, damage: 0 })),
      }))
    );
  };

  const updateCommanderDamage = (
    fromPlayer: number,
    toPlayer: number,
    change: number
  ) => {
    setPlayers((current) =>
      current.map((player) => {
        if (player.id === toPlayer) {
          const updatedCmd = player.cmd.map((cmd) =>
            cmd.id === fromPlayer
              ? { ...cmd, damage: Math.max(0, cmd.damage + change) }
              : cmd
          );
          return { ...player, cmd: updatedCmd };
        }
        return player;
      })
    );
  };

  return (
    <main className="h-[calc(100vh-3.5rem)] landscape:h-[calc(100vh-1.5rem)] w-full relative">
      <Button
        onClick={resetGame}
        variant="outline"
        className="absolute -top-10 landscape:-top-6 left-1/2 -translate-x-1/2 z-[99] text-xs landscape:max-h-5 sm:max-h-10"
      >
        Reset
      </Button>
      <div className="h-full grid grid-cols-2 grid-rows-2">
        {players.map((player) => (
          <Card
            key={player.id}
            className={`${player.color} rounded-none border-none h-full relative overflow-hidden`}
          >
            <div className="absolute top-1 left-1 right-1 z-20 grid grid-cols-2 gap-1 landscape:grid-cols-4">
              {player.cmd.map((cmd) => {
                const commanderColor =
                  players.find((p) => p.id === cmd.id)?.color || player.color;

                return (
                  <div
                    key={cmd.id}
                    className={`flex items-center justify-between ${commanderColor} p-0.5 rounded-md border border-slate-900`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        updateCommanderDamage(cmd.id, player.id, -1)
                      }
                      className="p-1 hover:bg-black/10 rounded text-base landscape:text-xs"
                    >
                      -
                    </button>
                    <div className="flex items-center gap-0.5">
                      <Crown className="h-4 w-4 landscape:h-3 landscape:w-3" />
                      <span
                        className={`font-bold text-base landscape:text-xs ${
                          cmd.damage >= 21 ? "text-red-600" : ""
                        }`}
                      >
                        {cmd.damage}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        updateCommanderDamage(cmd.id, player.id, 1)
                      }
                      className="p-1 hover:bg-black/10 rounded text-base landscape:text-xs"
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              className="absolute left-0 top-0 w-1/2 h-full cursor-pointer hover:bg-red-800/5 active:bg-red-800/25 transition-colors z-[10]"
              onClick={() => updateLife(player.id, -1)}
            />
            <div
              className="absolute right-0 top-0 w-1/2 h-full cursor-pointer hover:bg-green-800/5 active:bg-green-800/25 transition-colors z-[10]"
              onClick={() => updateLife(player.id, 1)}
            />

            <CardContent className="flex flex-col items-center justify-center h-full p-2 landscape:pt-10 relative">
              <div className="text-7xl landscape:text-[6rem] font-bold landscape:mb-1">
                {player.life}
              </div>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-base landscape:text-xs font-semibold landscape:mb-1">
                Player {player.id}
              </span>
              <div className="flex justify-center gap-2 landscape:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateLife(player.id, -1);
                  }}
                >
                  <Minus className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateLife(player.id, 1);
                  }}
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
