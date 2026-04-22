import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  // useEffect to update localStorage when the state changes
  useEffect(() => {
    try {
      const val = JSON.stringify(storedValue);
      window.localStorage.setItem(key, val);
      // Notifie les autres instances du hook dans le même onglet
      window.dispatchEvent(new CustomEvent('local-storage-sync', { detail: { key, value: storedValue } }));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedValue]);

  // Écoute les changements depuis d'autres onglets (storage) ou le même onglet (custom event)
  useEffect(() => {
    const handleSync = (e) => {
      if (e.key === key || (e.detail && e.detail.key === key)) {
        try {
          const rawValue = e.type === 'storage' ? e.newValue : JSON.stringify(e.detail.value);
          if (rawValue === null) return;
          const newValue = JSON.parse(rawValue);
          // Évite les boucles infinies en vérifiant si la valeur est différente
          setStoredValue(prev => JSON.stringify(prev) === JSON.stringify(newValue) ? prev : newValue);
        } catch (error) {
          console.error("Error parsing storage change:", error);
        }
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('local-storage-sync', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('local-storage-sync', handleSync);
    };
  }, [key]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;