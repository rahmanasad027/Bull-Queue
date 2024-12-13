import {
  Controller,
  Post,
  UseInterceptors,
  HttpStatus,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
} from '@nestjs/common';
import { ResponseDto } from 'src/global/dtos/response.dto';
import { FileManagementService } from './file.management.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@Controller('files')
@ApiTags('files')
export class FileManagementController {
  constructor(private readonly fileService: FileManagementService) {}

  @Post('file-management-upload')
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 550 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType:
              /^(application\/vnd\.ms-excel|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|text\/csv|text\/plain)$/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    console.log('all files in controller: ', files);

    await Promise.all(
      files.map((file) => this.fileService.uploadFileForUser(file)),
    );

    // await this.fileService.uploadFileForUser(file);

    return new ResponseDto(
      {},
      HttpStatus.CREATED,
      'Files have been successfully queued for processing.',
    );
  }
}
