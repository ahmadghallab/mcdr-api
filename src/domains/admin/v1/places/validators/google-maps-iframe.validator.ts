import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsGoogleMapsIframeUrlConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (typeof value !== 'string') return false;
    const pattern = /^https:\/\/www\.google\.com\/maps\/embed\?pb=.+$/;
    return pattern.test(value);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'iframeUrl must be a valid Google Maps embed link.';
  }
}

export function IsGoogleMapsIframeUrl(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isGoogleMapsIframeUrl',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsGoogleMapsIframeUrlConstraint,
    });
  };
}
