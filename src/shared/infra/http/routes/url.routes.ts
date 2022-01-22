import { Router } from 'express';

import { CreateUrlController } from '@modules/urls/useCases/createUrl/CreateUrlController';
import { RedirectUrlController } from '@modules/urls/useCases/redirectUrl/RedirectUrlController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const urlRoutes = Router();

const createUrlController = new CreateUrlController();
const redirectUrlController = new RedirectUrlController();

urlRoutes.post('/urls', ensureAuthenticated, createUrlController.handle);
urlRoutes.get('/:name', redirectUrlController.handle);

export { urlRoutes };
