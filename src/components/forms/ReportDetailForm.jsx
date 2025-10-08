import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useState, useContext, useEffect } from 'react';
import { IoReturnDownBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const InfoGroup = ({ title, content }) => (
  <Flex
    direction="column"
    mb={3}
    backgroundColor="blue.100"
    px={2}
    borderRadius="8px"
  >
    <Text fontWeight="bold" mb={1}>
      ■{title}
    </Text>
    <Text ml={4}>{content}</Text>
  </Flex>
);

const styledButtonStyles = {
  backgroundColor: '#2b6cb0',
  color: 'white',
  padding: '12px 24px',
  marginRight: '4px',
  _hover: {
    backgroundColor: '#2c5282',
  },
};

const styledEditButtonStyles = {
  backgroundColor: '#d69e2e',
  color: 'white',
  padding: '12px 24px',
  marginRight: '4px',
  _hover: {
    backgroundColor: '#b7791f',
  },
};

const ReportDetailForm = (e) => {
  const [searchParams] = useSearchParams();
  const [reportId, setReportId] = useState(searchParams.get('reportId'));
  const [item, setItem] = useState(null);

  const navigate = useNavigate();
  const { employeeId, role, department_id } = useContext(UserContext);
  const [editButtonIsVisible, setEditButtonIsVisible] = useState(false);
  const [previewReportId, setPreviewReportId] = useState(-1);
  const [nextReportId, setNextReportId] = useState(-1);

  const onClickReturn = () => {
    navigate(-1);
  };

  const onClickEdit = (e) => {
    navigate(`/reportedit?reportId=${reportId}`);
  };

  const onClickPreviewReport = (e) => {
    setItem(null);
    setReportId(previewReportId);
    navigate(`/reportdetail?reportId=${previewReportId}`);
  };

  const onClickNextReport = (e) => {
    setItem(null);
    setReportId(nextReportId);
    navigate(`/reportdetail?reportId=${nextReportId}`);
  };

  // useEffectで副作用を管理
  useEffect(() => {
    if (!reportId) return;

    fetch(
      `${process.env.REACT_APP_API_ROOT}/reports/reportDetail?reportId=${reportId}`
    )
      .then((response) => response.json())
      .then((items) => {
        // 取得データがある場合（データなしの場合dataExistsはfalseで返却され、データありの場合dataExistsは返却されない。）
        if (items.dataExists == null) {
          const reportData = items;

          // 権限チェック：本人、チームリーダー、総務、AMG、MGRのいずれかであるかチェックする
          const canView =
            employeeId === reportData.emp_id ||
            employeeId === reportData.leader_emp_id ||
            department_id === '1' ||
            role === '4' ||
            role === '5';

          if (!canView) {
            navigate('/error');
            return;
          }

          if (items.previewReportId == null) {
            setPreviewReportId(-1);
          } else {
            setPreviewReportId(items.previewReportId);
          }

          if (items.nextReportId == null) {
            setNextReportId(-1);
          } else {
            setNextReportId(items.nextReportId);
          }

          setItem(reportData);
          setEditButtonIsVisible(employeeId === reportData.emp_id);
        } else {
          navigate('/notfound');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('週報の取得に失敗しました');
      });
  }, [reportId, employeeId, navigate, role, department_id]);

  // データ読み込み中の表示
  if (!item) {
    return <Box p={4}>読み込み中...</Box>;
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Button
          bg="gray.300"
          _hover={{ bg: 'gray.400' }}
          onClick={onClickReturn}
        >
          <IoReturnDownBack />
        </Button>
        <Flex space-x-4>
          <Button sx={styledButtonStyles} isDisabled={previewReportId === -1} onClick={onClickPreviewReport}>先週</Button>
          <Button sx={styledButtonStyles} isDisabled={nextReportId === -1} onClick={onClickNextReport}>翌週</Button> 

          {editButtonIsVisible && (
            <Button sx={styledEditButtonStyles} onClick={onClickEdit}>
              編集
            </Button>
          )}
        </Flex>
      </Flex>
      <Box p={4} bg="gray.200" borderRadius="md">
        <Heading size="md" mb={4}>
          現場基本情報
        </Heading>

        <InfoGroup
          title="氏名"
          content={`${item.emp_lname}　${item.emp_fname}`}
        />
        <InfoGroup
          title="所属チームLD名"
          content={`${item.leader_emp_lname}　${item.leader_emp_fname}`}
        />
        <InfoGroup
          title="自社担当営業"
          content={`${item.sales_emp_lname}　${item.sales_emp_fname}`}
        />
        <InfoGroup title="ユーザ会社名" content={item.user_company_name} />
        <InfoGroup title="元請会社名" content={item.prime_contractor_name} />
        <InfoGroup title="現場住所" content={item.onsite_address} />
        <InfoGroup title="定時" content={item.fixed_time} />
      </Box>

      <Box p={4} bg="gray.200" borderRadius="md">
        <Heading size="md" mb={4}>
          期間
        </Heading>
        <InfoGroup
          title="期間"
          content={`開始日　${item.period_start_date}　～　終了日　${item.period_end_date}`}
        />
      </Box>

      <Box p={4} bg="gray.200" borderRadius="md">
        <Heading size="md" mb={4}>
          営業に関する情報
        </Heading>

        <InfoGroup title="情報源" content={item.source_of_sales_info} />
        <InfoGroup
          title="情報収集手段"
          content={item.how_to_collect_sales_info}
        />
        <InfoGroup title="営業に関する情報" content={item.sales_info} />
      </Box>
      <Box p={4} bg="gray.200" borderRadius="md">
        <Heading size="md" mb={4}>
          業務内容
        </Heading>
        <InfoGroup title="平均残業時間" content={item.avg_overtime} />
        <InfoGroup title="作業内容" content={item.work_content} />
        <InfoGroup
          title="最低稼働時間"
          content={`${item.minimun_work_time}時間　${
            item.reachability === '1' ? '達成できる' : '達成できない'
          }`}
        />
        <InfoGroup
          title="進捗状況"
          content={`${
            item.progress === '1'
              ? '良い'
              : item.progress === '2'
              ? '普通'
              : '悪い'
          }`}
        />
        <InfoGroup
          title="体調"
          content={`${
            item.physical_condition === '1'
              ? '良い'
              : item.physical_condition === '2'
              ? '普通'
              : '悪い'
          }`}
        />
        <InfoGroup
          title="現場LDや上位会社メンバーとの人間関係"
          content={`${
            item.relationship === '1'
              ? '良い'
              : item.relationship === '2'
              ? '普通'
              : '悪い'
          }`}
        />
        <InfoGroup title="難易度" content={item.difficulty_level} />
        <InfoGroup title="スケジュール感" content={item.sence_of_schedule} />
        <InfoGroup
          title="失敗したこと、指摘を受けた点"
          content={item.failure_pointed_out}
        />
        <InfoGroup title="所感" content={item.impression} />
        <InfoGroup
          title="現場で稼働しているACT社員の状況"
          content={item.situation_of_other_employees}
        />
      </Box>
    </>
  );
};

export default ReportDetailForm;
