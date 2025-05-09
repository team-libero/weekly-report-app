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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEmployeeData } from '../../hooks/useEmployeeData';

export const ReportEditPage = () => {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('reportId');

  const { employeeId, emp_lname, emp_fname } = useContext(UserContext);
  const {
    handleCopy,
    handleChange,
    handleSubmit,
    handleClear,
    formData,
    setFormData,
    isSubmitting,
    errors,
  } = useWeeklyReport(employeeId);
  const [isEdit, setIsEdit] = useState(false);
  const { teamLeaders, salesEmployees } = useEmployeeData();
  const navigate = useNavigate();
  const employeeName = emp_lname + ' ' + emp_fname;

  useEffect(() => {
    // ログイン確認
    if (!employeeId) {
      console.log('Required params missing:', { employeeId });
      navigate('/error');
      return;
    }

    const fetchData = async () => {
      // レポートIDがパラメータに存在する場合、該当の週報データ情報をフォームの初期値に設定
      if (reportId) {
        // 登録・編集 判定用フラグ
        setIsEdit(true);
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_ROOT}/reports/reportDetail/${reportId}`
          );
          const data = await response.json();

          // 所有者チェック
          if (data.employeeId !== employeeId) {
            console.error('アクセス権限がありません');
            navigate('/error');
            return;
          }

          setFormData({
            startDate: data.periodStartDate,
            endDate: data.periodEndDate,
            selectedTeamLeader: data.leaderEmployeeId,
            selectedSalesEmployee: data.salesEmployeeId,
            userCompanyName: data.userCompanyName,
            primeContractorName: data.primeContractorName,
            onsiteAddress: data.onsiteAddress,
            fixedTime: data.fixedTime,
            sourceOfSalesInfo: data.sourceOfSalesInfo,
            howToCollectSalesInfo: data.howToCollectSalesInfo,
            salesInfo: data.salesInfo,
            averageOvertime: data.averageOvertime,
            workContent: data.workContent,
            minimumWorkTime: data.minimumWorkTime,
            reachability: data.reachability,
            progress: data.progress,
            condition: data.physicalCondition,
            relationship: data.relationship,
            failure: data.failurePointedOut,
            impression: data.impression,
            difficulty: data.difficultyLevel,
            schedule: data.senseOfSchedule,
            otherEmployees: data.situationOfOtherEmployees,
          });
        } catch (error) {
          console.error('Failed to fetch report data:', error);
        }
      }
    };
    fetchData();
  }, [reportId]);

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
              <Box>
                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  width="40"
                  isInvalid={!!errors?.startDate}
                />
                {errors?.startDate && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.startDate}
                  </Text>
                )}
              </Box>
            </Flex>
            <Text fontSize="lg">～</Text>
            <Flex alignItems="center" gap={2}>
              <FormLabel fontWeight="bold" whiteSpace="nowrap" mb={0}>
                終了日
              </FormLabel>
              <Box>
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  width="40"
                  isInvalid={!!errors?.endDate}
                />
                {errors?.endDate && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.endDate}
                  </Text>
                )}
              </Box>
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
              <Box>
                <Select
                  name="selectedTeamLeader"
                  value={formData.selectedTeamLeader}
                  onChange={handleChange}
                  isInvalid={!!errors?.selectedTeamLeader}
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
                {errors?.selectedTeamLeader && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.selectedTeamLeader}
                  </Text>
                )}
              </Box>
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">自社担当営業</FormLabel>
              <Box>
                <Select
                  name="selectedSalesEmployee"
                  value={formData.selectedSalesEmployee}
                  onChange={handleChange}
                  isInvalid={!!errors?.selectedSalesEmployee}
                >
                  <option value="">選択してください</option>
                  {salesEmployees.map((sales) => (
                    <option key={sales.emp_id} value={sales.emp_id}>
                      {`${sales.emp_lname + ' ' + sales.emp_fname}`}
                    </option>
                  ))}
                </Select>
                {errors?.selectedSalesEmployee && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.selectedSalesEmployee}
                  </Text>
                )}
              </Box>
            </VStack>
          </Grid>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={4}
            mt={4}
          >
            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">ユーザー会社名</FormLabel>
              <Box>
                <Input
                  name="userCompanyName"
                  value={formData.userCompanyName}
                  onChange={handleChange}
                  placeholder=""
                  isInvalid={!!errors?.userCompanyName}
                />
                {errors?.userCompanyName && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.userCompanyName}
                  </Text>
                )}
              </Box>
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">元請会社名</FormLabel>
              <Box>
                <Input
                  name="primeContractorName"
                  value={formData.primeContractorName}
                  onChange={handleChange}
                  placeholder=""
                  isInvalid={!!errors?.primeContractorName}
                />
                {errors?.primeContractorName && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.primeContractorName}
                  </Text>
                )}
              </Box>
            </VStack>
          </Grid>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={4}
            mt={4}
          >
            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">現場住所</FormLabel>
              <Box>
                <Input
                  name="onsiteAddress"
                  value={formData.onsiteAddress}
                  onChange={handleChange}
                  placeholder="東京都新宿区新宿1-11-5 不二越ビル4F"
                  isInvalid={!!errors?.onsiteAddress}
                />
                {errors?.onsiteAddress && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.onsiteAddress}
                  </Text>
                )}
              </Box>
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
                isInvalid={!!errors?.fixedTime}
              />
              {errors?.fixedTime && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.fixedTime}
                </Text>
              )}
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
              <Box>
                <Input
                  name="sourceOfSalesInfo"
                  value={formData.sourceOfSalesInfo}
                  onChange={handleChange}
                  placeholder=""
                  isInvalid={!!errors?.sourceOfSalesInfo}
                />
                {errors?.sourceOfSalesInfo && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.sourceOfSalesInfo}
                  </Text>
                )}
              </Box>
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">
                情報収集手段（直接問合せ ・ 先輩社員から ・ 全体周知 ・
                小耳に挟んだ ・ その他）
              </FormLabel>
              <Box>
                <Input
                  name="howToCollectSalesInfo"
                  value={formData.howToCollectSalesInfo}
                  onChange={handleChange}
                  placeholder=""
                  isInvalid={!!errors?.howToCollectSalesInfo}
                />
                {errors?.howToCollectSalesInfo && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.howToCollectSalesInfo}
                  </Text>
                )}
              </Box>
            </VStack>

            <VStack align="stretch" spacing={2}>
              <FormLabel fontWeight="bold">営業に関する情報</FormLabel>
              <Box>
                <Textarea
                  name="salesInfo"
                  value={formData.salesInfo}
                  onChange={handleChange}
                  placeholder=""
                  height="24"
                  maxLength={500}
                  isInvalid={!!errors?.salesInfo}
                />
                {errors?.salesInfo && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.salesInfo}
                  </Text>
                )}
              </Box>
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
              errors={errors}
            />
            <WorkContentSection
              formData={formData}
              onChange={handleChange}
              errors={errors}
            />
          </VStack>
        </CardBody>
      </Card>

      <Flex justify="center" mt={6}>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 px-32 py-6"
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
