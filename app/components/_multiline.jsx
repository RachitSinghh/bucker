import React from 'react';

// Render a string that may contain "\n" line breaks as text with <br/> between
// segments (used by CMS banner headlines that originally had a <br /> in markup).
export function renderMultiline(text) {
  if (!text) return null;
  const parts = String(text).split('\n');
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part.trim()}
      {i < parts.length - 1 && <br />}
    </React.Fragment>
  ));
}
