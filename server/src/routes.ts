import controllers from "./controllers";

const { UserController, DepartmentController, CategoryController, ShoppingCartController } = controllers;

export const Routes = [
  {
    method: "get",
    route: "/api/user",
    controller: UserController,
    action: "all"
  },
  {
    method: "get",
    route: "/api/user/:id",
    controller: UserController,
    action: "one"
  },
  {
    method: "post",
    route: "/api/signup",
    controller: UserController,
    action: "save"
  },
  {
    method: "post",
    route: "/api/departments",
    controller: DepartmentController,
    action: "save"
  },
  {
    method: "get",
    route: "/api/departments",
    controller: DepartmentController,
    action: "all"
  },
  ,
  {
    method: "get",
    route: "/api/departments/:id",
    controller: DepartmentController,
    action: "one"
  },
  {
    method: "put",
    route: "/api/departments/:id",
    controller: DepartmentController,
    action: "update"
  },
  {
    method: "delete",
    route: "/api/departments/:id",
    controller: DepartmentController,
    action: "delete"
  },
  {
    method: "post",
    route: "/api/categories",
    controller: CategoryController,
    action: "save"
  },
  {
    method: "get",
    route: "/api/categories",
    controller: CategoryController,
    action: "all"
  },
  {
    method: "get",
    route: "/api/categories/:id",
    controller: CategoryController,
    action: "one"
  },
  {
    method: "put",
    route: "/api/categories/:id",
    controller: CategoryController,
    action: "update"
  },
  {
    method: "post",
    route: "/api/shoppingcart",
    controller: ShoppingCartController,
    action: "save"
  }
];
