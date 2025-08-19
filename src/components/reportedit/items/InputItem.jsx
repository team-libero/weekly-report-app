import { Input } from '@chakra-ui/react';

export const InputItem = (props) => {
  <Input
    name={props.userCompanyName}
    value={props.formData.userCompanyName}
    onChange={props.handleChange}
    placeholder={props.placeholder}
    isInvalid={!!props?.error}
  />;
};
