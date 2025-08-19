import { VStack, Flex, Input, FormLabel, Text, Select } from '@chakra-ui/react';
import { StatusSelect } from './StatusSelect';

export const WorkStatusSectionPage = ({ formData, onChange, errors }) => {
  return (
    <VStack spacing={6} align="stretch">
      <Flex alignItems="center" gap={4} wrap="wrap">
        <Flex alignItems="center" gap={2}>
          <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0}>
            平均残業時間
          </FormLabel>
          <Input
            name="averageOvertime"
            value={formData.averageOvertime}
            onChange={onChange}
            width="24"
            isInvalid={!!errors?.averageOvertime}
          />
          <Text>時間</Text>
          {errors?.averageOvertime && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {errors.averageOvertime}
            </Text>
          )}
        </Flex>

        <Flex alignItems="center" gap={2}>
          <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0}>
            最低稼働時間
          </FormLabel>
          <Input
            name="minimumWorkTime"
            value={formData.minimumWorkTime}
            onChange={onChange}
            width="24"
            isInvalid={!!errors?.minimumWorkTime}
          />
          <Text>時間</Text>
          {errors?.minimumWorkTime && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {errors.minimumWorkTime}
            </Text>
          )}
        </Flex>

        <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0} mr={0}>
          最低稼働時間到達可否
        </FormLabel>
        <Select
          name="reachability"
          value={formData.reachability}
          onChange={onChange}
          w="150px"
          isInvalid={!!errors?.reachability}
        >
          <option value="">-</option>
          <option value="1">到達できる</option>
          <option value="2">到達できない</option>
        </Select>
        {errors?.reachability && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {errors.reachability}
          </Text>
        )}
      </Flex>

      <Flex alignItems="center" gap={8} wrap="wrap">
        <StatusSelect
          label="進捗状況"
          name="progress"
          value={formData.progress}
          onChange={onChange}
          isInvalid={!!errors?.progress}
        />
        <StatusSelect
          label="体調"
          name="condition"
          value={formData.condition}
          onChange={onChange}
          isInvalid={!!errors?.condition}
        />
        <StatusSelect
          label="現場の上位会社メンバーとの人間関係"
          name="relationship"
          value={formData.relationship}
          onChange={onChange}
          isInvalid={!!errors?.relationship}
        />
      </Flex>
    </VStack>
  );
};
