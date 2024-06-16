import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error) {
            throw new BadRequestException('Validation failed');
        }
    }
}
import { z } from 'zod';

export const createCatSchema = z
    .object({
        name: z.string(),
        age: z.number(),
        breed: z.string(),
    })
    .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;