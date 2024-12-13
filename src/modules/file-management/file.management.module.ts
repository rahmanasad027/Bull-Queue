import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileManagementController } from './file.management.controller';
import { CustomLogger } from 'src/global/utils/custom.logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/models/file.entity';
import { User } from 'src/models/user.entity';
import { QueueJobEnum } from 'src/global/enums/queue.job.enum';
import { BullModule } from '@nestjs/bull';
import { FileManagementService } from './file.management.service';
import { RequestContextService } from 'src/global/helper-services/request.context.service';
// import { FileManagementService } from './file.management.service';
// import { UserFilesHelperService } from 'src/global/helper-services/files.helper.service';
// import { StorageHelperService } from 'src/global/helper-services/storage.helper.service';
// import { UserHelperService } from 'src/global/helper-services/user.helper.service';
// import { FetchUserModule } from 'src/global/modules/fetchUserModule/fetch.user.by.uuid.from.request.module';
// import { FileUploadProcessor } from './queue-management/file.upload.processor';
// import { BullBoardModule } from '@bull-board/nestjs';
// import { BullAdapter } from '@bull-board/api/bullAdapter';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    TypeOrmModule.forFeature([File]),
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: QueueJobEnum.FILE_UPLOAD,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      settings: {
        lockDuration: 1800000,
        stalledInterval: 2500000,
      },
    }),
    // BullBoardModule.forFeature({
    //   name: QueueJobEnum.FILE_UPLOAD,
    //   adapter: BullAdapter,
    // }),
    // FetchUserModule,
  ],
  controllers: [FileManagementController],
  providers: [
    FileManagementService,
    // UserFilesHelperService,
    // StorageHelperService,
    // UserHelperService,
    CustomLogger,
    // FileUploadProcessor,
    RequestContextService,
  ],
})
export class FileManagementModule {}
