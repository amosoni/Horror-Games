"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalList(storageKey: string) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const persist = useCallback((next: string[]) => {
    setItems(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  }, [storageKey]);

  const has = useCallback((id: string) => items.includes(id), [items]);

  const add = useCallback((id: string) => {
    if (items.includes(id)) return;
    persist([...items, id]);
  }, [items, persist]);

  const remove = useCallback((id: string) => {
    if (!items.includes(id)) return;
    persist(items.filter(x => x !== id));
  }, [items, persist]);

  const toggle = useCallback((id: string) => {
    if (items.includes(id)) remove(id); else add(id);
  }, [items, add, remove]);

  return { items, has, add, remove, toggle };
} 