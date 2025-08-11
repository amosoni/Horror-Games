"use client";

import '../i18n/config';
import React from 'react';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 