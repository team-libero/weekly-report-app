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

export const useWeeklyReport = (
  employeeId,
  isEdit = false,
  reportId = null
) => {
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
        `${process.env.REACT_APP_API_ROOT}/reports/reportRegister/copy?employeeId=${employeeId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch previous report');
      }

      const data = await response.json();

      if (data) {
        setFormData({
          ...formData,
          selectedTeamLeader: data.leader_emp_id || '',
          selectedSalesEmployee: data.sales_emp_id || '',
          userCompanyName: data.user_company_name || '',
          primeContractorName: data.prime_contractor_name || '',
          onsiteAddress: data.onsite_address || '',
          fixedTime: data.fixed_time || '',
          sourceOfSalesInfo: data.source_of_sales_info || '',
          howToCollectSalesInfo: data.how_to_collect_sales_info || '',
          salesInfo: data.sales_info || '',
          averageOvertime: data.avg_overtime || '',
          workContent: data.work_content || '',
          minimumWorkTime: data.minimun_work_time || '',
          reachability: data.reachability || '',
          progress: data.progress || '',
          condition: data.physical_condition || '',
          relationship: data.relationship || '',
          failure: data.failure_pointed_out || '',
          impression: data.impression || '',
          difficulty: data.difficulty_level || '',
          schedule: data.sence_of_schedule || '',
          otherEmployees: data.situation_of_other_employees || '',
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
      // isEditの状態に応じてメソッドとURLを切り替え
      const method = isEdit ? 'PUT' : 'POST';
      // 修正: クエリパラメータを正しく構築
      const apiUrl = isEdit
        ? `${process.env.REACT_APP_API_ROOT}/reports/reportRegister?reportId=${reportId}`
        : `${process.env.REACT_APP_API_ROOT}/reports/reportRegister`;

      const requestBody = {
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
        averageOverTime: formData.averageOvertime, // 修正: バックエンドに合わせてキー名を変更
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
      };

      // 編集の場合はreportIdも含める（念のため）
      if (isEdit) {
        requestBody.reportId = reportId;
      }

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEdit ? 'update' : 'submit'} report`);
      }

      // レスポンスから週報情報を取得
      const responseData = await response.json();

      // 編集の場合は既存のreportIdを使用、新規登録の場合はレスポンスから取得
      const targetReportId = isEdit
        ? reportId
        : responseData[0]?.weekly_report_id;

      // 週報詳細ページに遷移
      navigate(`/reportdetail?reportId=${targetReportId}`);
    } catch (error) {
      console.error(`Failed to ${isEdit ? 'update' : 'submit'} report:`, error);
      alert(`週報の${isEdit ? '更新' : '送信'}に失敗しました。`);
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
