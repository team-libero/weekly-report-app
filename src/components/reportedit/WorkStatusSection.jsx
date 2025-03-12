import { VStack, Flex, Input, FormLabel, Text, Select } from '@chakra-ui/react';
import { StatusSelect } from './StatusSelect';

export const WorkStatusSectionPage = ({ formData, onChange }) => {
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
          />
          <Text>時間</Text>
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
          />
          <Text>時間</Text>
        </Flex>

        <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0} mr={0}>
          最低稼働時間到達可否
        </FormLabel>
        <Select
          name="reachability"
          value={formData.reachability}
          onChange={onChange}
          w="150px"
        >
          <option value="">-</option>
          <option value="1">到達できる</option>
          <option value="2">到達できない</option>
        </Select>
      </Flex>

      <Flex alignItems="center" gap={8} wrap="wrap">
        <StatusSelect
          label="進捗状況"
          name="progress"
          value={formData.progress}
          onChange={onChange}
        />
        <StatusSelect
          label="体調"
          name="condition"
          value={formData.condition}
          onChange={onChange}
        />
        <StatusSelect
          label="現場の上位会社メンバーとの人間関係"
          name="relationship"
          value={formData.relationship}
          onChange={onChange}
        />
      </Flex>
    </VStack>
  );
};
