import { Type } from "@prisma/client";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: "cardNumber", async: true })
export class IsCardNumber implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    if (!value) return false
    return value.length === 16;
  }

  defaultMessage() {
    return 'Card number must have 16 digits';
  }
}

@ValidatorConstraint({ name: "cardCvv", async: false })
export class IsCvvCard implements ValidatorConstraintInterface {
  validate(value: string) {
    return value.length === 3;
  }

  defaultMessage() {
    return 'CVV must have 3 digits';
  }
}

@ValidatorConstraint({ name: "cardExpiration", async: false })
export class IsCardExpiration implements ValidatorConstraintInterface {
  validate(value: string) {
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return dateRegex.test(value);
  }

  defaultMessage() {
    return 'Expiration date must have in format MM/YY';
  }
}

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumberString()
  @Validate(IsCardNumber)
  number: string;

  @IsNotEmpty()
  @IsString()
  issuer: string;

  @IsNotEmpty()
  @IsNumberString()
  @Validate(IsCvvCard)
  code: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsCardExpiration)
  expiration: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  virtual: boolean;

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type
}
