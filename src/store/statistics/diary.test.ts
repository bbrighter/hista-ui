import { describe, expect, it } from 'vitest';

import { api } from '../../api/generatedApi';
import { respToRawDiary } from './diary';

describe('RawDiary', () => {
    it('respToRawDiary', () => {
        const resp: api.DiaryResp = {
            diaries: [{
                content: 'Content',
                date: '2024-12-05T02:00:00+02:00',
                type: 'Food',
                severity: 'raw',
                category: 'Category',
            }],
        }
        const diary = respToRawDiary(resp)
        expect(diary).toHaveLength(1)
        expect(diary[0].What).toBe('Content')
        expect(diary[0].Type).toBe('Essen')
        expect(diary[0].Severity).toBe('Roh')
        expect(diary[0].Category).toBe('Category')
    })
})