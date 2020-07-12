import { Router } from 'express';
import getInfo from '../controllers/info.controller';
import { register, login, validateCredentials } from '../controllers/auth.controller';

const router = Router();

router.route('/')
    .get(getInfo);

router.route('/singin')
    .post(login);

router.route('/singup')
    .post(register);

export { validateCredentials }
export default router;