'use client';

import { useState } from 'react';
import { saveSchedule } from '@/lib/api';
import type { DaySchedule } from '@/types';

export function useSchedule() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveSchedule = async (schedules: DaySchedule[]) => {
    setIsSaving(true);
    setError(null);

    try {
      await saveSchedule(schedules);
      return true;
    } catch (err) {
      setError('일정 저장에 실패했습니다. 다시 시도해주세요.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleSaveSchedule,
    isSaving,
    error,
  };
}


