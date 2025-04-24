
import React from 'react';

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children;

export const motion = {
  div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>{children}</div>
  ),
};
