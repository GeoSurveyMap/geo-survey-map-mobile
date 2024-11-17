const hexToRgb = (hex: string) => {
  const hexNumber = parseInt(hex.replace('#', ''), 16);
  return {
    r: (hexNumber >> 16) & 255,
    g: (hexNumber >> 8) & 255,
    b: hexNumber & 255,
  };
};

export const hexToAlpha = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
