import React, { useMemo } from 'react';

const toDashed = v => v.replace(/[A-Z]/g, m => '-' + m.toLowerCase());

export function objToCSSVars(namespace, theme, cssString = '', parentKey = '') {
  return Object.entries(theme).reduce((s, [k, v]) => {
    const joinedKey = `${parentKey ? parentKey : `--${namespace}${parentKey}`}-${toDashed(k)}`;
    if (typeof v === 'string') {
      s += `${joinedKey}: ${v}; `;
    } else if (typeof v === 'object' && v.constructor === Object) {
      s = objToCSSVars(namespace, v, s, joinedKey);
    }
    return s;
  }, cssString);
}

function CSSTheme({ namespace, theme, children }) {
  const cssString = useMemo(() => `:root {${objToCSSVars(namespace, theme)}`, [namespace, theme]);
  return (
    <>
      <style type="text/css">{cssString}</style>
      {children}
    </>
  );
}

export default CSSTheme;
