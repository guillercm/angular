import { GenericObject } from "@core/interfaces/generic-object/generic-object.interface";

interface Field {
  name: string;
  args: GenericObject;
}

interface DatabaseError {
  feature:    string;
  context:    string;
  field:     Field;
  error_type: string;
}

export interface DatabaseErrorResponse {
  code:          string;
  databaseError: DatabaseError;
}


