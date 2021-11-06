export class iUser {
  uid: string;
  fullName: string;
  email: string;
  timestamp: number;
  city: string;
  country: string;
  dob: string;
  gender: string;
  profileUrl: string;
  isTeacher: boolean;
  isStudents: boolean;
  isVerified: boolean;
  documents: iDocuments;
}

export class iDocuments {
  identityCheck: string;
  degree: string;
  others: string;
}
