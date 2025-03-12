import { useContext, useEffect, useState } from 'react';
import { useWeeklyReport } from '../../hooks/useWeeklyReport';
import { UserContext } from '../contexts/UserContext';
import { Button } from 'reactstrap';
import {
  Card,
  CardBody,
  Box,
  Flex,
  Text,
  Input,
  FormLabel,
  Grid,
  VStack,
  Select,
  List,
  ListItem,
  Textarea,
} from '@chakra-ui/react';
import { WorkStatusSectionPage } from '../reportedit/WorkStatusSection';
import { WorkContentSection } from '../reportedit/WorkContentSection';
import { useLocation, useSearchParams } from 'react-router-dom';

export const ReportEditPage = () => {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('reportId');

  const { employeeId, employeeName } = useContext(UserContext);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [salesEmployees, setSalesEmployees] = useState([]);
  const {
    handleCopy,
    handleChange,
    handleSubmit,
    handleClear,
    formData,
    setFormData,
    isSubmitting,
  } = useWeeklyReport(employeeId);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        const resLeaders = await fetch(
          `${process.env.REACT_APP_API_ROOT}/employee/leaders`
        );
        const resSales = await fetch(
          `${process.env.REACT_APP_API_ROOT}/employee/sales`
        );
        const leaderData = await resLeaders.json();
        const salesData = await resSales.json();

        setTeamLeaders(leaderData);
        setSalesEmployees(salesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    getItems();
  }, []);

  return (
    <div className="container mx-auto pl-16 pr-16 pb-8">
      {/* TOP */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-4 ml-auto mt-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleCopy}
            disabled={isSubmitting}
          >
            前回の内容をコピー
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleClear}
            disabled={isSubmitting}
          >
            クリア
          </Button>
        </div>
      </div>

      <Card mb={8}>
        <CardBody pt={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            期間
          </Text>
          <Flex alignItems="center" gap={4}>
            <Flex alignItems="center" gap={2}>
              <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0}>
                開始日
              </FormLabel>
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                width="40"
              />
            </Flex>
            <Text fontSize="lg">～</Text>
            <Flex alignItems="center" gap={2}>
              <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0}>
                終了日
              </FormLabel>
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                width="40"
              />
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <Card mb={8}>
        <CardBody pt={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            現場基本情報
          </Text>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">氏名</FormLabel>
              <Box p={2}>{employeeName ? employeeName : ''}</Box>
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">所属チームLD名</FormLabel>
              <Select
                name="selectedTeamLeader"
                value={formData.selectedTeamLeader}
                onChange={handleChange}
              >
                <option value="">選択してください</option>
                {teamLeaders.map((leader) => (
                  <option key={leader.emp_id} value={leader.emp_id}>
                    {`${leader.emp_lname + ' ' + leader.emp_fname} (${
                      leader.team_name
                    })`}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">自社担当営業</FormLabel>
              <Select
                name="selectedSalesEmployee"
                value={formData.selectedSalesEmployee}
                onChange={handleChange}
              >
                <option value="">選択してください</option>
                {salesEmployees.map((sales) => (
                  <option key={sales.emp_id} value={sales.emp_id}>
                    {`${sales.emp_lname + ' ' + sales.emp_fname}`}
                  </option>
                ))}
              </Select>
            </VStack>
          </Grid>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={4}
            mt={4}
          >
            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">ユーザー会社名</FormLabel>
              <Input
                name="userCompanyName"
                value={formData.userCompanyName}
                onChange={handleChange}
                placeholder=""
              />
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">元請会社名</FormLabel>
              <Input
                name="primeContractorName"
                value={formData.primeContractorName}
                onChange={handleChange}
                placeholder=""
              />
            </VStack>
          </Grid>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={4}
            mt={4}
          >
            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">現場住所</FormLabel>
              <Input
                name="onsiteAddress"
                value={formData.onsiteAddress}
                onChange={handleChange}
                placeholder="東京都新宿区新宿1-11-5 不二越ビル4F"
              />
            </VStack>
          </Grid>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={4}
            mt={4}
          >
            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">定時</FormLabel>
              <Input
                name="fixedTime"
                value={formData.fixedTime}
                onChange={handleChange}
                placeholder="HH:MM～HH:MM ※金曜日はHH:MM～HH:MMの定時退社日"
              />
            </VStack>
          </Grid>
        </CardBody>
      </Card>

      <Card mb={8}>
        <CardBody pt={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            営業に関する情報
          </Text>

          <List mb={4} ml={4} spacing={1} fontSize="sm">
            <ListItem>・PJやチームの今後の展開（増員や減員など）</ListItem>
            <ListItem>・自分自身の延長や途中切り上げなどの情報</ListItem>
            <ListItem>・他のACT社員の評判</ListItem>
            <ListItem>・誰からの情報かできるだけ記入してください</ListItem>
          </List>

          <VStack spacing={4} align="stretch">
            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">
                情報源（上位会社 ・ 協力会社 ・ ACT社員 ・ その他）
              </FormLabel>
              <Input
                name="sourceOfSalesInfo"
                value={formData.sourceOfSalesInfo}
                onChange={handleChange}
                placeholder=""
              />
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">
                情報収集手段（直接問合せ ・ 先輩社員から ・ 全体周知 ・
                小耳に挟んだ ・ その他）
              </FormLabel>
              <Input
                name="howToCollectSalesInfo"
                value={formData.howToCollectSalesInfo}
                onChange={handleChange}
                placeholder=""
              />
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">営業に関する情報</FormLabel>
              <Textarea
                name="salesInfo"
                value={formData.salesInfo}
                onChange={handleChange}
                placeholder=""
                height="24"
                maxLength={500}
              />
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      <Card>
        <CardBody pt={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            業務内容
          </Text>
          <VStack spacing={6} align="stretch">
            <WorkStatusSectionPage
              formData={formData}
              onChange={handleChange}
            />
            <WorkContentSection formData={formData} onChange={handleChange} />
          </VStack>
        </CardBody>
      </Card>

      <Flex justify="center" mt={6}>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 px-32 py-8"
          onClick={handleSubmit}
          isDisabled={isSubmitting}
        >
          {isSubmitting ? (
            <Text>送信中...</Text>
          ) : (
            <Text>{isEdit ? '編集' : '登録'}</Text>
          )}
        </Button>
      </Flex>
    </div>
  );
};
