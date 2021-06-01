import { ErrorNames } from './errorNames';
import Errors from './errors';

class CustomError {
  constructor({ name, message }: { name: ErrorNames; message?: string }) {
    const customError = new Error();
    customError.name = name;
    customError.message = message || Errors[name].message;

    return customError;
  }
}

export default CustomError;
