// src/validation/reportSchema.js
import { z } from 'zod';

// Define the validation schema for the form
export const reportSchema = z.object({
  // 期間
  startDate: z.string().min(1, { message: '開始日を入力してください' }),
  endDate: z.string().min(1, { message: '終了日を入力してください' }),

  // 現場基本情報
  selectedTeamLeader: z
    .string()
    .min(1, { message: 'チームLDを選択してください' }),
  selectedSalesEmployee: z
    .string()
    .min(1, { message: '担当営業を選択してください' }),
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
  salesInfo: z.string().max(500, { message: '最大500文字までです' }),

  // 業務状況
  averageOvertime: z.string().optional(),
  minimumWorkTime: z.string().optional(),
  reachability: z.string().optional(),
  progress: z.string().optional(),
  condition: z.string().optional(),
  relationship: z.string().optional(),
  failure: z.string().optional(),
  impression: z.string().optional(),
  difficulty: z.string().optional(),
  schedule: z.string().optional(),
  otherEmployees: z.string().optional(),

  // 業務内容
  workContent: z
    .string()
    .min(1, { message: '業務内容を入力してください' })
    .max(1000, { message: '業務内容は1000文字以内で入力してください' }),
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
