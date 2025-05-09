// src/validation/reportSchema.js
import { z } from 'zod';

// Define the validation schema for the form
export const reportSchema = z.object({
  // 期間
  startDate: z.string().min(1, { message: '開始日を入力してください' }),
  endDate: z.string().min(1, { message: '終了日を入力してください' }),

  // 現場基本情報
  selectedTeamLeader: z.string().min(1, { message: '選択してください' }),
  selectedSalesEmployee: z.string().min(1, { message: '選択してください' }),
  userCompanyName: z
    .string()
    .min(1, { message: 'ユーザー会社名を入力してください' }),
  primeContractorName: z
    .string()
    .min(1, { message: '元請会社名を入力してください' }),
  onsiteAddress: z.string().min(1, { message: '現場住所を入力してください' }),
  fixedTime: z.string().min(1, { message: '定時を入力してください' }),

  // 営業に関する情報
  sourceOfSalesInfo: z.string().min(1, { message: '情報源を入力してください' }),
  howToCollectSalesInfo: z
    .string()
    .min(1, { message: '情報収集手段を入力してください' }),
  salesInfo: z
    .string()
    .min(1, { message: '営業に関する情報を入力してください' }),

  // 業務状況
  averageOvertime: z
    .string()
    .min(1, { message: '平均残業時間を入力してください' }),
  minimumWorkTime: z
    .string()
    .min(1, { message: '最低稼働時間を入力してください' }),
  reachability: z.string().min(1, { message: '選択してください' }),
  progress: z.string().min(1, { message: '選択してください' }),
  condition: z.string().min(1, { message: '選択してください' }),
  relationship: z.string().min(1, { message: '選択してください' }),
  failure: z.string().min(1, { message: '失敗したことを入力してください' }),
  impression: z.string().min(1, { message: '所感を入力してください' }),
  difficulty: z.string().min(1, { message: '難易度を入力してください' }),
  schedule: z.string().min(1, { message: 'スケジュール感を入力してください' }),
  otherEmployees: z
    .string()
    .min(1, { message: '他社員の状況を入力してください' }),

  // 業務内容
  workContent: z.string().min(1, { message: '業務内容を入力してください' }),
});

export const validateReportForm = (formData) => {
  const result = reportSchema.safeParse(formData);

  if (!result.success) {
    const formattedErrors = {};
    result.error.errors.forEach((error) => {
      if (error.path) {
        formattedErrors[error.path[0]] = error.message;
      }
    });

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate < startDate) {
        formattedErrors.endDate = '終了日は開始日以降の日付を指定してください';
      }
    }

    return { success: false, errors: formattedErrors };
  }

  if (formData.startDate && formData.endDate) {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate < startDate) {
      return {
        success: false,
        errors: {
          endDate: '終了日は開始日以降の日付を指定してください',
        },
      };
    }
  }

  return { success: true, data: result.data };
};
