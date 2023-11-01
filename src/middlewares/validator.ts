import {body} from 'express-validator';

export const validatePassword = () => {
  return [
    body('password')
      .exists()
      .withMessage('password missing')
      .custom((value, {req}) => {
        const bodyKeys = Object.keys(req.body);
        const check = bodyKeys.length === 1;
        if (!check) {
          throw 'Only password field is allowed to update';
        }
        return true;
      })
  ];
};

export const validateNotPassword = () => {
  return [
    body('password').not().exists().withMessage('You cant update password'),
    body('role').not().exists().withMessage('You cant update role')
  ];
};

export const validateLogin = () => {
  return [
    body('password').exists().withMessage('password missing'),
    body('email').exists().withMessage('email missing')
  ];
};
