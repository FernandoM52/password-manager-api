import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({
    example: 'My card from XXX',
    description: 'A title for user card'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '1234567890123456',
    description: 'User card number'
  })
  @IsNotEmpty()
  @IsNumberString()
  @Validate(IsCardNumber)
  number: string;

  @ApiProperty({
    example: 'Bank XYZ',
    description: 'User card issuer'
  })
  @IsNotEmpty()
  @IsString()
  issuer: string;

  @ApiProperty({
    example: '123',
    description: 'User card CVV'
  })
  @IsNotEmpty()
  @IsNumberString()
  @Validate(IsCvvCard)
  code: string;

  @ApiProperty({
    example: '12/23',
    description: 'User card expiration date'
  })
  @IsNotEmpty()
  @IsString()
  @Validate(IsCardExpiration)
  expiration: string;

  @ApiProperty({
    example: '1234',
    description: 'User card password'
  })
  @IsNotEmpty()
  @IsNumberString()
  password: string;

  @ApiProperty({
    example: 'true',
    description: "True if the user's card is virtual and false otherwise",
    examples: [true, false]
  })
  @IsNotEmpty()
  @IsBoolean()
  virtual: boolean;

  @ApiProperty({
    example: 'CREDIT',
    description: 'User type card',
    examples: ['CREDIT', 'DEBIT', 'BOTH']
  })
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type
}
