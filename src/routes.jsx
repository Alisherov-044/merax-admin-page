import { CategoriesPage } from "./pages/Categories";
import { ProductsPage } from "./pages/Products";

export const routes = {
  public: [],
  private: [
    {
      path: "/categories",
      element: <CategoriesPage />,
    },
    {
      path: "/products",
      element: <ProductsPage />,
    },
  ],
};
