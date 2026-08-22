"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalPoros = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalPoros) {
  const router = useRouter();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "auto";
    };
  }, [router]);

  return createPortal(
    <div role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div>{children}</div>
    </div>,
    document.body,
  );
}
