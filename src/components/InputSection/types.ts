import { ErrorKeys, IErrors, IFormData } from "../../interface";

export type InputSectionProps = {
  name: ErrorKeys;
  title: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: IFormData;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors: IErrors;
};
