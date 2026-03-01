import { useEffect, useEffectEvent } from "react";

export default function useDocumentEvent<T extends keyof DocumentEventMap>(
  event: T, 
  callback: (e: DocumentEventMap[T]) => void, 
  options: EventListenerOptions & { attached: boolean }
) {
  const handleEvent = useEffectEvent(callback);

  useEffect(() => {
    if (!options.attached) return;

    document.addEventListener(event, handleEvent, options);
    return () => document.removeEventListener(event, handleEvent, options);
  }, [event, options]);
}