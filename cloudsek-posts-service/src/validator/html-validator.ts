import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

function isValidHTML(html: string): boolean {
  const tagStack: string[] = [];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const selfClosingTags = ['br'];
  

  let match;
  while ((match = tagRegex.exec(html)) !== null) {
    const [fullTag, tagName] = match;
    const isClosingTag = fullTag.startsWith('</');
    const lowerTagName = tagName.toLowerCase();

    if (!isClosingTag && !selfClosingTags.includes(lowerTagName)) {
      tagStack.push(lowerTagName);
    } else if (isClosingTag) {
      if (tagStack.length === 0 || tagStack.pop() !== lowerTagName) {
        return false;
      }
    }
  }
  if (tagStack.length !== 0) {
    return false;
  }

  const attrRegex = /\s+([a-z-]+)(?:=(?:"([^"]*)"|'([^']*)'|(\S+)))?/gi;
  const htmlWithoutTags = html.replace(tagRegex, '');
  if (attrRegex.test(htmlWithoutTags)) {
    return false; 
  }

  return true;
}

export function IsValidHTML(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidHTML',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && isValidHTML(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be valid HTML`;
        },
      },
    });
  };
}