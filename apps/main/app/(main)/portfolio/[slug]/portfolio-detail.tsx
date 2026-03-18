'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@portfolio/ui/animations/components/scroll-reveal';
import type { SiteConfig } from '@portfolio/data';

const CATEGORY_LABELS: Record<string, string> = {
  medical: '의료',
  legal: '법률',
  pension: '펜션/숙박',
  wellness: '웰니스',
  fitness: '헬스장/피트니스',
  'pet-kids': '펫/키즈',
  beauty: '뷰티',
  cafe: '카페/베이커리',
  realty: '부동산',
  wedding: '웨딩',
  'study-cafe': '스터디카페',
  interior: '인테리어',
  flower: '꽃집/플라워',
  education: '학원/교육',
  restaurant: '식당/맛집',
};

const ARCHETYPE_LABELS: Record<string, string> = {
  'AT-01': 'Editorial Magazine',
  'AT-02': 'Immersive Showcase',
  'AT-03': 'Professional Trust',
  'AT-04': 'Dynamic Energy',
  'AT-05': 'Soft & Organic',
  'AT-06': 'Playful Interactive',
  'AT-07': 'Minimal Gallery',
  'AT-08': 'Warm Storytelling',
  'AT-09': 'Data-Driven Dashboard',
  'AT-10': 'Bold Contrast',
};

interface PortfolioDetailProps {
  site: SiteConfig;
  prevSite: { slug: string; name: string } | null;
  nextSite: { slug: string; name: string } | null;
}

export function PortfolioDetail({
  site,
  prevSite,
  nextSite,
}: PortfolioDetailProps) {
  const categoryLabel = CATEGORY_LABELS[site.category] ?? site.category;
  const archetypeLabel =
    ARCHETYPE_LABELS[site.archetype] ?? site.archetype;
  const demoUrl = `/demo/${site.category}/${site.slug}`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link
              href="/portfolio"
              className="hover:text-gray-900 transition-colors"
            >
              포트폴리오
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{categoryLabel}</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">{site.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full">
          <img
            src={site.hero.images[0]}
            alt={site.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
            <ScrollReveal preset="fade-up">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm mb-3">
                {categoryLabel}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {site.name}
              </h1>
              {site.hero.subtitle && (
                <p className="mt-2 max-w-2xl text-lg text-white/80">
                  {site.hero.subtitle}
                </p>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content: Two columns */}
      <section className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: Description (3/5) */}
            <div className="lg:col-span-3">
              <ScrollReveal preset="fade-up">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  프로젝트 소개
                </h2>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  {site.about.description}
                </p>
              </ScrollReveal>

              {/* Highlights */}
              {site.about.highlights && site.about.highlights.length > 0 && (
                <ScrollReveal preset="fade-up">
                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {site.about.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-100 bg-gray-50 p-5"
                      >
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {h.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {h.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Right: Info sidebar (2/5) */}
            <div className="lg:col-span-2">
              <ScrollReveal preset="fade-up">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    프로젝트 정보
                  </h3>

                  <dl className="space-y-4">
                    <div className="flex justify-between border-b border-gray-200 pb-3">
                      <dt className="text-sm text-gray-500">카테고리</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {categoryLabel}
                      </dd>
                    </div>
                    {site.projectMeta?.duration && (
                      <div className="flex justify-between border-b border-gray-200 pb-3">
                        <dt className="text-sm text-gray-500">제작 기간</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          {site.projectMeta.duration}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-gray-200 pb-3">
                      <dt className="text-sm text-gray-500">디자인 컨셉</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {site.archetype} {archetypeLabel}
                      </dd>
                    </div>
                  </dl>

                  {/* Scope */}
                  {site.projectMeta?.scope &&
                    site.projectMeta.scope.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                          제작 범위
                        </h4>
                        <ul className="space-y-2">
                          {site.projectMeta.scope.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* CTA */}
                  <Link
                    href={demoUrl}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    데모 사이트 보기
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      {site.services.items.length > 0 && (
        <section className="bg-gray-50 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal preset="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
                주요 기능
              </h2>
            </ScrollReveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.services.items.map((item, i) => (
                <ScrollReveal
                  key={i}
                  preset="fade-up"
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="rounded-xl border border-gray-200 bg-white p-6 h-full transition-shadow hover:shadow-md">
                    {item.image && (
                      <div className="mb-4 overflow-hidden rounded-lg aspect-[4/3]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                    {item.price && (
                      <p className="mt-3 text-sm font-semibold text-blue-600">
                        {item.price}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {site.gallery.images.length > 0 && (
        <section className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal preset="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
                갤러리
              </h2>
            </ScrollReveal>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              {site.gallery.images.map((img, i) => (
                <ScrollReveal
                  key={i}
                  preset="fade-up"
                  transition={{ delay: i * 0.03 }}
                >
                  <div className="overflow-hidden rounded-xl aspect-[4/3]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Tags */}
      {site.projectMeta?.techTags &&
        site.projectMeta.techTags.length > 0 && (
          <section className="bg-gray-50 py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal preset="fade-up">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                  사용 기술
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {site.projectMeta.techTags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

      {/* Prev / Next Navigation */}
      <section className="bg-white border-t border-gray-200 py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch justify-between gap-4">
            {prevSite ? (
              <Link
                href={`/portfolio/${prevSite.slug}`}
                className="group flex flex-1 items-center gap-3 rounded-xl border border-gray-200 p-4 sm:p-6 transition-all hover:border-blue-200 hover:shadow-md"
              >
                <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">
                    이전 프로젝트
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {prevSite.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextSite ? (
              <Link
                href={`/portfolio/${nextSite.slug}`}
                className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-gray-200 p-4 sm:p-6 transition-all hover:border-blue-200 hover:shadow-md text-right"
              >
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">
                    다음 프로젝트
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {nextSite.name}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
