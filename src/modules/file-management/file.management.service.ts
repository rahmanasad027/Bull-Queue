import { Injectable } from '@nestjs/common';
// import { StorageHelperService } from 'src/global/helper-services/storage.helper.service';
// import { UserFilesHelperService } from 'src/global/helper-services/files.helper.service';
// import { FetchUserHelperService } from 'src/global/modules/fetchUserModule/fetch.user.by.uuid.from.request.service';
import { RequestContextService } from 'src/global/helper-services/request.context.service';

@Injectable()
export class FileManagementService {
  constructor(
    // private readonly storageHelperService: StorageHelperService,
    // private readonly userFilesHelperService: UserFilesHelperService,
    // private readonly fetchUserHelperService: FetchUserHelperService,
    private readonly requestContextService: RequestContextService,
  ) {}

  async uploadFileForUser(file: Express.Multer.File) {
    const user = this.requestContextService.getUser();

    console.log('user in request is: ', user);

    console.log('file in here is: ', file);

    // const originalFileName = file.originalname;
    // const fileSize = file.size;

    // const s3Key = `${getPath(`${user.id}-${user.firstName}`)}/${filename(originalFileName)}`;

    // const fileUrl = await this.storageHelperService.uploadFile(file, s3Key);

    // const savedFile = await this.userFilesHelperService.saveFileData(
    //   fileUrl,
    //   originalFileName,
    //   user.id,
    //   fileSize,
    //   s3Key,
    //   user.email,
    // );

    // return file;
  }
}
