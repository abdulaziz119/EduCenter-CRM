// import { getReasonPhrase, StatusCodes } from 'http-status-codes';
// import { getPaginationResponse } from '../utils/pagination.builder';
//
// export class ResponseHelper {
//   static pagination<T>(data: T[], page: number, limit: number, count: number) {
//     return ResponseHelper.success(
//       ResponseHelper.paginationObject<T>(data, page, limit, count),
//       StatusCodes.OK,
//     );
//   }
//
//   static paginationObject<T>(
//     data: T[],
//     page: number,
//     limit: number,
//     count: number,
//   ) {
//     return getPaginationResponse<T>(data, page, limit, count);
//   }
//
//   static success(data: any = null, statusCode: StatusCodes = StatusCodes.OK) {
//     return ResponseHelper.successObject(data, statusCode);
//   }
//
//   static error(
//     message: string = '',
//     statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
//     details: object = {},
//   ) {
//     return ResponseHelper.errorObject(message, statusCode, details);
//   }
//
//   static validation(
//     data: any,
//     statusCode: StatusCodes = StatusCodes.UNPROCESSABLE_ENTITY,
//   ) {
//     return ResponseHelper.error(data, statusCode);
//   }
//
//   static successObject(
//     data: any = null,
//     statusCode: StatusCodes = StatusCodes.OK,
//   ) {
//     return {
//       statusCode: statusCode,
//       statusDescription: getReasonPhrase(statusCode),
//       data: data,
//     };
//   }
//
//   static errorObject(
//     message: string = '',
//     statusCode: StatusCodes = StatusCodes.OK,
//     details: object = {},
//   ) {
//     return {
//       statusCode: statusCode,
//       statusDescription: getReasonPhrase(statusCode),
//       message: message,
//       details: details,
//     };
//   }
// }
