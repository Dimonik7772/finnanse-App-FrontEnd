import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: ReactNode;
};

export default function ToasterProvider({ children }: Props) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "#6bcb77",
              color: "white",
              transition: "all 1.5s ease-out",
            },
          },
          error: {
            style: {
              background: "#ff2727",
              color: "white",
              transition: "all 1.5s ease-out",
            },
          },
        }}
      />
    </>
  );
}
