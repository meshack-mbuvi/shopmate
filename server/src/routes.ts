import { UserController } from './controllers/userController';
export const Routes = [
  {
    method: 'get',
    route: '/api/user',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/user/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/signup',
    controller: UserController,
    action: 'save',
  },
];
