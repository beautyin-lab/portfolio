'use client';

import * as React from 'react';
import { Star, Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '../primitives/carousel';
import { Card, CardContent } from '../primitives/card';

export interface Testimonial {
  id?: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
  content: string;
}

export interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200',
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialSlider({
  testimonials,
  autoplay = true,
  autoplayInterval = 4000,
  className,
}: TestimonialSliderProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <Carousel
        opts={{ loop: true }}
        autoplay={autoplay}
        autoplayInterval={autoplayInterval}
      >
        <CarouselContent>
          {testimonials.map((testimonial, i) => (
            <CarouselItem
              key={testimonial.id ?? i}
              className="basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <Quote className="h-8 w-8 text-blue-200" />
                  {testimonial.rating !== undefined && (
                    <StarRating rating={testimonial.rating} />
                  )}
                  <p className="flex-1 text-sm leading-relaxed text-gray-600">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-blue-100 text-sm font-bold text-blue-600">
                          {testimonial.name.slice(0, 1)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                      {testimonial.role && (
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-2 hidden sm:block">
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </div>
        <CarouselDots className="mt-4" />
      </Carousel>
    </div>
  );
}
