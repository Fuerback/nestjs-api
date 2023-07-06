import { BadRequestException, PipeTransform } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        'OPEN',
        'IN_PROGRESS',
        'DONE',
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}