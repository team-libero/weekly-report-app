import { Flex, FormLabel, Select } from '@chakra-ui/react';

export const StatusSelect = ({ label, name, value, onChange }) => {
  return (
    <Flex alignItems="center" gap={2}>
      <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0}>
        {label}
      </FormLabel>
      <Select name={name} value={value} onChange={onChange} width="32">
        <option value="">-</option>
        <option value="1">良い</option>
        <option value="2">普通</option>
        <option value="3">悪い</option>
      </Select>
    </Flex>
  );
};
