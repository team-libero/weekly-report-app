import { Flex, FormLabel, Select, Text } from '@chakra-ui/react';

export const StatusSelect = ({ label, name, value, onChange, isInvalid }) => {
  return (
    <Flex alignItems="center" gap={2}>
      <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0}>
        {label}
      </FormLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        width="32"
        isInvalid
      >
        <option value="">-</option>
        <option value="1">良い</option>
        <option value="2">普通</option>
        <option value="3">悪い</option>
      </Select>
      {isInvalid && (
        <Text color="red.500" fontSize="sm" mt={1}>
          選択してください
        </Text>
      )}
    </Flex>
  );
};
