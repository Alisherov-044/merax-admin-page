import { CategoriesPage } from "./pages/Categories";

export const routes = {
    public: [],
    private: [
        {
            path: "/categories",
            element: <CategoriesPage />,
        },
    ],
};
