const STORAGE_KEY = 'customPropFirms';

export function saveCustomPropFirm(firmName: string): void {
  try {
    const existing = getCustomPropFirms();
    if (!existing.includes(firmName)) {
      const updated = [...existing, firmName];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (error) {
    console.error('Failed to save custom prop firm:', error);
  }
}

export function getCustomPropFirms(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to get custom prop firms:', error);
    return [];
  }
}

export function clearCustomPropFirms(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear custom prop firms:', error);
  }
}

export function isDuplicateFirm(firmName: string, existingFirms: string[]): boolean {
  const normalized = firmName.trim().toLowerCase();
  return existingFirms.some(firm => firm.trim().toLowerCase() === normalized);
}
