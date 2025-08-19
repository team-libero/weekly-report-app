import {
  VStack,
  Input,
  Textarea,
  FormLabel,
  Flex,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { InfoIcon } from 'lucide-react';

export const WorkContentSection = ({ formData, onChange, errors }) => {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <FormLabel fontWeight="bold">作業内容</FormLabel>
        <Textarea
          name="workContent"
          value={formData.workContent}
          onChange={onChange}
          height="24"
          isInvalid={!!errors?.workContent}
        />
        {errors?.workContent && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {errors.workContent}
          </Text>
        )}
      </Box>

      <Flex gap={4} wrap="wrap" justifyContent="flex-start">
        <Flex alignItems="center" gap={2} minW="200px">
          <FormLabel fontWeight="bold" mb={0} whiteSpace="nowrap">
            難易度
          </FormLabel>
          <Input
            name="difficulty"
            onChange={onChange}
            w="100px"
            value={formData.difficulty}
            isInvalid={!!errors?.difficulty}
          />
          {errors?.difficulty && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {errors.difficulty}
            </Text>
          )}
        </Flex>

        <Flex alignItems="center" gap={2} minW="200px">
          <FormLabel fontWeight="bold" mb={0} whiteSpace="nowrap">
            スケジュール感
          </FormLabel>
          <Input
            name="schedule"
            onChange={onChange}
            w="100px"
            value={formData.schedule}
            isInvalid={!!errors?.schedule}
          />
          {errors?.schedule && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {errors.schedule}
            </Text>
          )}
        </Flex>
      </Flex>

      <Flex alignItems="center" gap={1} color="red.500" mb={2}>
        <FormLabel mb={0}>※難易度について </FormLabel>
        <Popover>
          <PopoverTrigger>
            <InfoIcon
              style={{ height: '16px', width: '16px', cursor: 'pointer' }}
            />
          </PopoverTrigger>
          <PopoverContent w="500px">
            <PopoverBody>
              <VStack align="stretch" spacing={2} color="black">
                <Text>
                  「一人前のエンジニアが通常求められるレベル」を、難易度：100と定めています。
                </Text>
                <UnorderedList spacing={1} pl={4}>
                  <ListItem>
                    200以上：初めての言語での開発
                    サーバ構築などのインフラ系の作業
                  </ListItem>
                  <ListItem>
                    150：開発環境の構築を主体的に行っている
                    各工程でのレビュアー作業 WBSの管理やプロジェクトの進捗管理
                    顧客折衝しながらの要件定義書作成
                  </ListItem>
                  <ListItem>
                    130：先行開発作業 業務知識が多く求められる基本設計書作成
                    他チームとの調整作業
                  </ListItem>
                  <ListItem>
                    110：自チームの進捗管理 システムテストでの障害調査作業
                  </ListItem>
                  <ListItem>
                    100：設計書の作成、修正 開発作業 結合テスト仕様書作成、修正
                  </ListItem>
                  <ListItem>
                    70：単体テスト仕様書の作成、修正 単体テストでの障害調査作業
                  </ListItem>
                  <ListItem>
                    50：テスト実施（打鍵者） 開発チュートリアル作業
                  </ListItem>
                  <ListItem>
                    30以下：ログ収集や監視業務などの運用作業
                    エビデンス整理やドキュメント類の整備作業
                    キッティング等の事務系作業
                  </ListItem>
                </UnorderedList>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Box>
        <FormLabel fontWeight="bold">
          失敗したこと、指摘を受けた点（指摘した人も明記のこと）
        </FormLabel>
        <Textarea
          name="failure"
          value={formData.failure}
          onChange={onChange}
          height="24"
          isInvalid={!!errors?.failure}
        />
        {errors?.failure && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {errors.failure}
          </Text>
        )}
      </Box>

      <Box>
        <FormLabel fontWeight="bold">
          所感（現場に対する苦情や困っていることや伝達事項なども記入）
        </FormLabel>
        <Textarea
          name="impression"
          value={formData.impression}
          onChange={onChange}
          height="24"
          isInvalid={!!errors?.impression}
        />
        {errors?.impression && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {errors.impression}
          </Text>
        )}
      </Box>

      <Box>
        <FormLabel fontWeight="bold">現場で従事しているACT社員の状況</FormLabel>
        <Textarea
          name="otherEmployees"
          value={formData.otherEmployees}
          onChange={onChange}
          height="24"
          isInvalid={!!errors?.otherEmployees}
        />
        {errors?.otherEmployees && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {errors.otherEmployees}
          </Text>
        )}
      </Box>
    </VStack>
  );
};
