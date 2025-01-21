"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommanderDamage } from "@/components/commander-damage";

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
    <main className="h-[calc(100vh-3.5rem)] w-full relative">
      <Button
        onClick={resetGame}
        variant="outline"
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[99]"
      >
        Reset Game
      </Button>
      <div className="h-full grid grid-cols-2 grid-rows-2">
        {players.map((player) => (
          <Card
            key={player.id}
            className={`${player.color} rounded-none border-none h-full relative overflow-hidden`}
          >
            <div className="absolute top-10 left-4 flex flex-col gap-2 z-20">
              {player.cmd.map((cmd) => {
                const commanderColor =
                  players.find((p) => p.id === cmd.id)?.color || player.color;

                return (
                  <CommanderDamage
                    key={cmd.id}
                    fromPlayer={cmd.id}
                    toPlayer={player.id}
                    damage={cmd.damage}
                    color={commanderColor}
                    onDamageChange={updateCommanderDamage}
                  />
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
            <CardContent className="flex flex-col items-center justify-center h-full p-6 relative">
              <h2 className="text-xl font-semibold mb-4">Player {player.id}</h2>
              <div className="text-6xl sm:text-[8rem] font-bold mb-4">
                {player.life}
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateLife(player.id, -1);
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateLife(player.id, 1);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
