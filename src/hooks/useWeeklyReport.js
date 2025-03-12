import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useWeeklyReport = (employeeId) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    selectedTeamLeader: '',
    selectedSalesEmployee: '',
    userCompanyName: '',
    primeContractorName: '',
    onsiteAddress: '',
    fixedTime: '',
    sourceOfSalesInfo: '',
    howToCollectSalesInfo: '',
    salesInfo: '',
    averageOvertime: '',
    minimumWorkTime: '',
    reachability: '',
    progress: '',
    condition: '',
    relationship: '',
    workContent: '',
    difficulty: '',
    schedule: '',
    failure: '',
    impression: '',
    otherEmployees: '',
  });
  const handleCopy = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT}/report/copy/${employeeId}`
      );

      if (!response.ok) throw new Error('Failed to fetch copy');

      const latestReport = await response.json();

      if (!latestReport) {
        alert('前回の週報データが見つかりませんでした。');
        return;
      }

      setFormData({
        ...formData,
        selectedTeamLeader: latestReport.leaderEmployeeId || '',
        selectedSalesEmployee: latestReport.salesEmployeeId || '',
        userCompanyName: latestReport.userCompanyName || '',
        primeContractorName: latestReport.primeContractorName || '',
        onsiteAddress: latestReport.onsiteAddress || '',
        fixedTime: latestReport.fixedTime || '',
        sourceOfSalesInfo: latestReport.sourceOfSalesInfo || '',
        howToCollectSalesInfo: latestReport.howToCollectSalesInfo || '',
        salesInfo: latestReport.salesInfo || '',
        averageOvertime: latestReport.averageOvertime || '',
        minimumWorkTime: latestReport.minimumWorkTime || '',
        reachability: latestReport.reachability || '',
        progress: latestReport.progress || '',
        condition: latestReport.physicalCondition || '',
        relationship: latestReport.relationship || '',
        workContent: latestReport.workContent || '',
        difficulty: latestReport.difficultyLevel || '',
        schedule: latestReport.senseOfSchedule || '',
        failure: latestReport.failurePointedOut || '',
        impression: latestReport.impression || '',
        otherEmployees: latestReport.situationOfOtherEmployees || '',
      });
    } catch (error) {
      console.error('Error fetching latest report', error);
      alert('前回の内容の取得に失敗しました。');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      startDate: '',
      endDate: '',
      selectedTeamLeader: '',
      selectedSalesEmployee: '',
      userCompanyName: '',
      primeContractorName: '',
      onsiteAddress: '',
      fixedTime: '',
      sourceOfSalesInfo: '',
      howToCollectSalesInfo: '',
      salesInfo: '',
      averageOvertime: '',
      minimumWorkTime: '',
      reachability: '',
      progress: '',
      condition: '',
      relationship: '',
      workContent: '',
      difficulty: '',
      schedule: '',
      failure: '',
      impression: '',
      otherEmployees: '',
    });
  };

  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('reportId');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const url = reportId
        ? `${process.env.REACT_APP_API_ROOT}/report/update/${reportId}`
        : `${process.env.REACT_APP_API_ROOT}/report/register`;
      console.log(url);

      const response = await fetch(url, {
        method: reportId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: employeeId,
          leaderEmployeeId: formData.selectedTeamLeader,
          salesEmployeeId: formData.selectedSalesEmployee,
          userCompanyName: formData.userCompanyName,
          primeContractorName: formData.primeContractorName,
          onsiteAddress: formData.onsiteAddress,
          fixedTime: formData.fixedTime,
          periodStartDate: formData.startDate,
          periodEndDate: formData.endDate,
          sourceOfSalesInfo: formData.sourceOfSalesInfo,
          howToCollectSalesInfo: formData.howToCollectSalesInfo,
          salesInfo: formData.salesInfo,
          averageOverTime: formData.averageOvertime,
          workContent: formData.workContent,
          difficultyLevel: formData.difficulty,
          senseOfSchedule: formData.schedule,
          minimumWorkTime: formData.minimumWorkTime,
          reachability: formData.reachability,
          progress: formData.progress,
          physicalCondition: formData.condition,
          relationship: formData.relationship,
          failurePointedOut: formData.failure,
          impression: formData.impression,
          situationOfOtherEmployees: formData.otherEmployees,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to create weekly report');
      }

      alert('週報を登録しました。');
    } catch (error) {
      console.error('Error creating weekly report', error);
      alert('週報の登録に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleClear,
    handleCopy,
    handleChange,
    handleSubmit,
    setFormData,
  };
};
