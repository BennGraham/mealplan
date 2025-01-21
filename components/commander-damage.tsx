"use client";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommanderDamageProps {
  fromPlayer: number;
  toPlayer: number;
  damage: number;
  color: string; // Add color prop
  onDamageChange: (
    fromPlayer: number,
    toPlayer: number,
    change: number
  ) => void;
}

export function CommanderDamage({
  fromPlayer,
  toPlayer,
  damage,
  color,
  onDamageChange,
}: CommanderDamageProps) {
  return (
    <div
      className={`flex items-center gap-1 z-20 ${color} p-1 rounded-lg border border-slate-950 text-slate-950`}
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDamageChange(fromPlayer, toPlayer, -1)}
        className="h-6 w-6 p-0"
      >
        -
      </Button>
      <div className="flex items-center gap-1">
        <Crown className="h-4 w-4" />
        <span
          className={`text-sm font-bold ${damage >= 21 ? "text-red-600" : ""}`}
        >
          {damage}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDamageChange(fromPlayer, toPlayer, 1)}
        className="h-6 w-6 p-0"
      >
        +
      </Button>
    </div>
  );
}
