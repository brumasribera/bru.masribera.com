import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project, CartItem } from "./types";
import { classNames } from "./utils";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function ProjectDetail({ project, onBack, onAddToCart }: ProjectDetailProps) {
  const [cellSize] = useState(10);
  const [selected, setSelected] = useState(new Set<number>());
  const grid = useMemo(() => ({ rows: 10, cols: 10, cells: 100 }), []);

  const price = project.pricePerM2;
  const totalM2 = selected.size * cellSize;
  const totalPrice = totalM2 * price;

  const toggle = (i: number) => {
    setSelected((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <Button size="sm" variant="outline" onClick={onBack}>Back</Button>
        <CardTitle>{project.name}</CardTitle>
        <Badge>{project.country}</Badge>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <img src={project.image} className="absolute inset-0 w-full h-full object-cover" alt="project" />
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)` }}>
            {Array.from({ length: grid.cells }, (_, i) => (
              <div key={i} onClick={() => toggle(i)} className={classNames("border border-emerald-400/50", selected.has(i) ? "bg-gradient-to-br from-sky-400/70 via-pink-400/70 to-lime-400/70" : "")}/>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-xl font-bold">{totalM2} m² · ${totalPrice.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setSelected(new Set())}>Clear</Button>
        <Button onClick={() => onAddToCart({ project, m2: totalM2, amount: totalPrice })} disabled={totalM2===0}>Add</Button>
      </CardFooter>
    </Card>
  );
}
