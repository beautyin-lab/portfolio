'use client';

import type { SiteConfig } from '@portfolio/data';

interface MenuPageContentProps {
  config: SiteConfig;
}

export function MenuPageContent({ config }: MenuPageContentProps) {
  const menuBoard = config.features?.menuBoard;

  // Handle case where categories is missing or empty
  if (!menuBoard) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500">메뉴 정보가 없습니다.</p>
      </div>
    );
  }

  // Normalize categories: could be string[] or {name, items}[]
  const rawCategories = menuBoard.categories as unknown;
  const isObjectCategories =
    Array.isArray(rawCategories) &&
    rawCategories.length > 0 &&
    typeof rawCategories[0] === 'object' &&
    rawCategories[0] !== null &&
    'items' in rawCategories[0];

  // Also show services from the main config as menu items if object categories not available
  const serviceItems = config.services?.items ?? [];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">메뉴</h1>
        <p className="mt-2 text-gray-600">{config.name}의 메뉴를 확인해 보세요.</p>

        <div className="mt-10 space-y-10">
          {isObjectCategories ? (
            // Structured categories with items
            (rawCategories as Array<{ name: string; items: Array<{ name: string; price: string; description?: string }> }>).map((cat, ci) => (
              <div key={ci}>
                <h2 className="border-b border-gray-200 pb-2 text-lg font-bold text-gray-900">
                  {cat.name}
                </h2>
                <div className="mt-4 space-y-3">
                  {cat.items.map((item, ii) => (
                    <div
                      key={ii}
                      className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        {item.description && (
                          <div className="mt-0.5 text-xs text-gray-500">{item.description}</div>
                        )}
                      </div>
                      <div className="ml-4 flex-shrink-0 text-sm font-semibold text-gray-700">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : serviceItems.length > 0 ? (
            // Fallback: show services as menu items
            <div>
              <h2 className="border-b border-gray-200 pb-2 text-lg font-bold text-gray-900">
                {config.services?.title || '메뉴'}
              </h2>
              <div className="mt-4 space-y-3">
                {serviceItems.map((item, ii) => (
                  <div
                    key={ii}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      {item.description && (
                        <div className="mt-0.5 text-xs text-gray-500 line-clamp-2">{item.description}</div>
                      )}
                    </div>
                    {item.price && (
                      <div className="ml-4 flex-shrink-0 text-sm font-semibold text-gray-700">
                        {item.price}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // String categories list
            <div>
              <h2 className="border-b border-gray-200 pb-2 text-lg font-bold text-gray-900">메뉴 카테고리</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(rawCategories as string[]).map((cat, i) => (
                  <div key={i} className="rounded-lg border border-gray-100 bg-white px-4 py-3 text-center font-medium text-gray-900">
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          데모 사이트입니다. 실제 메뉴 및 가격과 다를 수 있습니다.
        </p>
      </div>
    </div>
  );
}
