import React, { useMemo } from 'react';

function objToCSSVars(namespace, theme, cssString = '', parentKey = '') {
  return Object.entries(theme).reduce((_cssString, [key, value]) => {
    const casedKey = !parentKey ? key : key[0].toUpperCase() + key.substr(1);
    const joinedKey = `${parentKey ? parentKey : `--${namespace}-${parentKey}`}${casedKey}`;
    if (typeof value === 'string' || typeof value === 'number') {
      _cssString += `${joinedKey}: ${value}; `;
    } else if (typeof value === 'object' && value.constructor === Object) {
      _cssString = objToCSSVars(namespace, value, _cssString, joinedKey);
    }
    return _cssString;
  }, cssString);
}

export function useJsToCss(namespace, theme) {
  return useMemo(() => `:root {${objToCSSVars(namespace, theme)}`, [namespace, theme]);
}

function CSSTheme({ namespace, theme, children }) {
  const themeStyle = useJsToCss(namespace, theme);

  return (
    <>
      <style>{themeStyle}</style>
      {children}
    </>
  );
}

export default CSSTheme;
