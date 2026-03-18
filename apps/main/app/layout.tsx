import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "웹사이트 제작 전문 에이전시 | 맞춤형 홈페이지 제작",
    template: "%s | 웹사이트 제작 에이전시",
  },
  description:
    "합리적인 가격으로 프리미엄 퀄리티의 맞춤형 웹사이트를 제작합니다. 랜딩페이지, 기업 홈페이지, 쇼핑몰, 예약 사이트까지.",
  keywords: [
    "웹사이트 제작",
    "홈페이지 제작",
    "랜딩페이지",
    "반응형 웹사이트",
    "쇼핑몰 제작",
    "웹 에이전시",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
