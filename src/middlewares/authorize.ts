import {logger} from '../utils/logger';
import {newError} from '../utils/error';

export const authorize = (roles: string[]) => {
  return (req, res, next) => {
    const {_id, role} = req['data'];
    if (!roles.includes(role)) {
      // res.status(403).send('forbidden');
      logger.error(`Error while authorizing User`);
      throw newError(403, 'UNAUTHORIZE');
      return;
    }
    next();
  };
};
