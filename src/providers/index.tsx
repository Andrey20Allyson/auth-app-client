import { PropsWithChildren } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../react-query";
import { BrowserRouter } from "react-router-dom";

export function AppProvider(props: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {props.children}
      </BrowserRouter>
    </QueryClientProvider>
  );
}