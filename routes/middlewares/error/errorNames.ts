type Not_User = 'Not_User';
type Not_Found = 'Not_Found';
type Database_Error = 'Database_Error';
type Wrong_Request = 'Wrong_Request';
type Wrong_FileExtension = 'Wrong_FileExtension';
type Limit_File_Size = 'Limit_File_Size';
type Wrong_Data = 'Wrong_Data';
type Unhandled_Error = 'Unhandled_Error';
type Exist_User = 'Exist_User';
type Token_Expired = 'Token_Expired';
type Forbidden = 'Forbidden';
type Exist_Data = 'Exist_Data';
type Not_Found_Board = 'Not_Found_Board';
type Not_Found_Comment = 'Not_Found_Comment';

export type ErrorNames =
  | Not_User
  | Not_Found
  | Database_Error
  | Wrong_Request
  | Wrong_FileExtension
  | Limit_File_Size
  | Wrong_Data
  | Unhandled_Error
  | Exist_User
  | Token_Expired
  | Forbidden
  | Exist_Data
  | Not_Found_Board
  | Not_Found_Comment;
