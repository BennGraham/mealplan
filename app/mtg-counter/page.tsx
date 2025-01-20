"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Player {
  id: number;
  life: number;
  color: string;
}

export default function MTGCounter() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, life: 40, color: "bg-red-100" },
    { id: 2, life: 40, color: "bg-blue-100" },
    { id: 3, life: 40, color: "bg-green-100" },
    { id: 4, life: 40, color: "bg-yellow-100" },
  ]);

  const updateLife = (id: number, change: number) => {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id ? { ...player, life: player.life + change } : player
      )
    );
  };

  const resetGame = () => {
    setPlayers((current) => current.map((player) => ({ ...player, life: 40 })));
  };

  return (
    <main className="h-[calc(100vh-3.5rem)] w-full relative">
      <Button
        onClick={resetGame}
        variant="outline"
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
      >
        Reset Game
      </Button>
      <div className="h-full grid grid-cols-2 grid-rows-2">
        {players.map((player) => (
          <Card
            key={player.id}
            className={`${player.color} rounded-none border-none h-full relative overflow-hidden`}
          >
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
