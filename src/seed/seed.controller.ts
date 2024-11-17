// src/seed/seed.controller.ts

import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @Post()
    async seedDatabase() {
        await this.seedService.seedDatabase();
        return { message: 'Database seeded successfully' };
    }
}