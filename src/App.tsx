import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./redux/store";
import { HomePage } from "./pages/home";
import { ShoppingCart } from "./pages/shoppingcart";
import { ErrorBoundary } from "./components/errorboundry";
import { Notfound } from "./pages/not-found";
import { MainLayout } from "./layout/MainLayout";
import { Order } from "./pages/Order";
import { SearchProvider } from "./context/SearchContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorBoundary />,
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to="/products" replace /> },
        { path: "products", element: <HomePage /> },
        { path: "shoppingcart", element: <ShoppingCart /> },
        { path: "order", element: <Order /> },
        { path: "/404", element: <Notfound /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <ReduxProvider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
