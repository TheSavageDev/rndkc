export const useEventTracking = (
  eventType: string,
  eventMeta?: {
    [key: string]: any;
  }
) => {
  window.gtag("event", eventType, eventMeta);
};
