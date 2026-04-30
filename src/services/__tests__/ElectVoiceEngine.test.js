import { describe, it, expect, vi } from 'vitest';
import { ElectVoiceEngine } from '../ElectVoiceEngine';

describe('ElectVoiceEngine', () => {
  it('should trigger local eligibility logic for keyword match', async () => {
    const response = await ElectVoiceEngine.processInput('eligibility');
    expect(response.ui_action).toBe('checklist');
    expect(response.text).toContain('Indian Citizen');
  });

  it('should trigger local timeline logic for keyword match', async () => {
    const response = await ElectVoiceEngine.processInput('when is election?');
    expect(response.ui_action).toBe('timeline');
    expect(response.text).toContain('official election calendar');
  });

  it('should return a fallback response if genAI is not available', async () => {
    const response = await ElectVoiceEngine.processInput('random question', []);
    expect(response.text).toBeDefined();
    expect(response.ui_action).toBe('plain');
  });
});
