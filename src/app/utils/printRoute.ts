// src/app/utils/printRoutes.ts
import { Router } from "express";

type Row = { method: string; path: string };

export const printRoutes = (router: Router, prefix = ""): Row[] => {
  const rows: Row[] = [];

  (router as any).stack.forEach((layer: any) => {
    if (layer.route) {
      Object.keys(layer.route.methods).forEach((method) => {
        rows.push({
          method: method.toUpperCase(),
          path: prefix + layer.route.path,
        });
      });
    } else if (layer.handle?.stack) {
      rows.push(...printRoutes(layer.handle, prefix + "/*"));
    }
  });

  return rows;
};