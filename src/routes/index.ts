import { Router } from 'express';

const routes = Router();

routes.post('/users', (request, response) => {
  const {email, name} = request.body

  const users = {
    email,
    name
  }

  return response.json(users)
});

export default routes;
