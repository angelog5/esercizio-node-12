import { Request, Response } from "express";

type Planet = {
  id: number;
  name: string;
};

let planets: Planet[] = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

export const getAll = (req: Request, res: Response) => {
  res.json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === id);
  if (planet) {
    res.json(planet);
  } else {
    res.status(404).send("Planet not found");
  }
};

export const create = (req: Request, res: Response) => {
  const newPlanet: Planet = { id: planets.length + 1, ...req.body };
  planets = [...planets, newPlanet];
  res.status(201).json(newPlanet);
};

export const updateById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  planets = planets.map((p) => (p.id === id ? { ...p, ...req.body } : p));
  const updatedPlanet = planets.find((p) => p.id === id);
  if (updatedPlanet) {
    res.json(updatedPlanet);
  } else {
    res.status(404).send("Planet not found");
  }
};

export const deleteById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const planetExists = planets.some((p) => p.id === id);
  planets = planets.filter((p) => p.id !== id);
  if (planetExists) {
    res.status(204).send();
  } else {
    res.status(404).send("Planet not found");
  }
};
