import { Router } from 'express';

import { CreateUrlController } from '@modules/urls/useCases/createUrl/CreateUrlController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const urlRoutes = Router();

const createUrlController = new CreateUrlController();

urlRoutes.post('/urls', ensureAuthenticated, createUrlController.handle);

export { urlRoutes };
