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
    setPlayers((current) => current.map((player) => ({ ...player, life: 20 })));
  };

  return (
    <main className="container mx-auto py-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">MTG Life Counter</h1>
          <Button onClick={resetGame} variant="outline">
            Reset Game
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {players.map((player) => (
            <Card key={player.id} className={`${player.color}`}>
              <CardContent className="p-6 text-center">
                <h2 className="text-xl font-semibold mb-4">
                  Player {player.id}
                </h2>
                <div className="text-6xl font-bold mb-4">{player.life}</div>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateLife(player.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateLife(player.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
