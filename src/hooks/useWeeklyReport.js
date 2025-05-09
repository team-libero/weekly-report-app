// src/hooks/useWeeklyReport.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateReportForm } from '../validation/reportSchema';

// Initial form state
const initialFormState = {
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
  failure: '',
  impression: '',
  difficulty: '',
  schedule: '',
  otherEmployees: '',
  workContent: '',
};

export const useWeeklyReport = (employeeId) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Copy from previous report
  const handleCopy = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT}/reports/previousReport/${employeeId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch previous report');
      }

      const data = await response.json();

      if (data) {
        setFormData({
          ...formData,
          selectedTeamLeader: data.leaderEmployeeId || '',
          selectedSalesEmployee: data.salesEmployeeId || '',
          userCompanyName: data.userCompanyName || '',
          primeContractorName: data.primeContractorName || '',
          onsiteAddress: data.onsiteAddress || '',
          fixedTime: data.fixedTime || '',
          sourceOfSalesInfo: data.sourceOfSalesInfo || '',
          howToCollectSalesInfo: data.howToCollectSalesInfo || '',
          salesInfo: data.salesInfo || '',
          averageOvertime: data.averageOvertime || '',
          workContent: data.workContent || '',
          minimumWorkTime: data.minimumWorkTime || '',
          reachability: data.reachability || '',
          progress: data.progress || '',
          condition: data.physicalCondition || '',
          relationship: data.relationship || '',
          failure: data.failurePointedOut || '',
          impression: data.impression || '',
          difficulty: data.difficultyLevel || '',
          schedule: data.senseOfSchedule || '',
          otherEmployees: data.situationOfOtherEmployees || '',
        });
      } else {
        alert('前回の週報は見つかりませんでした。');
      }
    } catch (error) {
      console.error('Failed to copy previous report:', error);
      alert('前回の週報のコピーに失敗しました。');
    }
  };

  const handleClear = () => {
    if (window.confirm('入力内容をクリアしますか？')) {
      setFormData(initialFormState);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    const validationResult = validateReportForm(formData);

    if (!validationResult.success) {
      setErrors(validationResult.errors);

      const firstErrorField = Object.keys(validationResult.errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = `${process.env.REACT_APP_API_ROOT}/reports`;
      const method = 'POST';

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          periodStartDate: formData.startDate,
          periodEndDate: formData.endDate,
          leaderEmployeeId: formData.selectedTeamLeader,
          salesEmployeeId: formData.selectedSalesEmployee,
          userCompanyName: formData.userCompanyName,
          primeContractorName: formData.primeContractorName,
          onsiteAddress: formData.onsiteAddress,
          fixedTime: formData.fixedTime,
          sourceOfSalesInfo: formData.sourceOfSalesInfo,
          howToCollectSalesInfo: formData.howToCollectSalesInfo,
          salesInfo: formData.salesInfo,
          averageOvertime: formData.averageOvertime,
          workContent: formData.workContent,
          minimumWorkTime: formData.minimumWorkTime,
          reachability: formData.reachability,
          progress: formData.progress,
          physicalCondition: formData.condition,
          relationship: formData.relationship,
          failurePointedOut: formData.failure,
          impression: formData.impression,
          difficultyLevel: formData.difficulty,
          senseOfSchedule: formData.schedule,
          situationOfOtherEmployees: formData.otherEmployees,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      navigate('/report/complete');
    } catch (error) {
      console.error('Failed to submit report:', error);
      alert('週報の送信に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    handleChange,
    handleCopy,
    handleClear,
    handleSubmit,
  };
};
