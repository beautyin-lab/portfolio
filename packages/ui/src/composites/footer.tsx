'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterProps {
  logo?: React.ReactNode;
  sections?: FooterSection[];
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  socialLinks?: SocialLink[];
  copyright?: string;
  className?: string;
}

export function Footer({
  logo,
  sections = [],
  contactInfo,
  socialLinks = [],
  copyright,
  className,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn('bg-gray-900 text-gray-300', className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + Description */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              {logo ?? (
                <span className="text-xl font-bold text-white">Logo</span>
              )}
            </div>
            {contactInfo && (
              <div className="flex flex-col gap-2 text-sm">
                {contactInfo.phone && (
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="transition-colors hover:text-white"
                  >
                    {contactInfo.phone}
                  </a>
                )}
                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {contactInfo.email}
                  </a>
                )}
                {contactInfo.address && (
                  <p>{contactInfo.address}</p>
                )}
                {contactInfo.hours && (
                  <p className="text-gray-400">{contactInfo.hours}</p>
                )}
              </div>
            )}
            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          {copyright ?? `© ${year} All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
