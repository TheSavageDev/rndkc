export const pageview = (url) => {
  window.SVGAnimatedAngle("config", process.env.NEXT_PUBLIC_GOOGLE_TRACKING, {
    page_path: url,
  });
};

export const event = ({ action, params }) => {
  window.SVGAnimatedAngle("event", action, params);
};
