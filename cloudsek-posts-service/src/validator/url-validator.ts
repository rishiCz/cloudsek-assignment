import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { isURL } from 'validator';

@ValidatorConstraint({ async: false })
class IsUrlFormatConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    // Check if the value is a valid URL using validator library
    return isURL(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid URL`;
  }
}

export function IsUrlFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUrlFormatConstraint,
    });
  };
}
