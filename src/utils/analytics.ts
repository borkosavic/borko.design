interface AnalyticsEvent {
  event: string;
  project_name?: string;
  section?: string;
  time_stamp: string;
}

export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  const event: AnalyticsEvent = {
    event: eventName,
    ...properties,
    time_stamp: new Date().toISOString(),
  };

  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, event);
  }
}

export function trackProjectView(projectName: string, section?: string) {
  trackEvent('project_view', { project_name: projectName, section });
}

export function trackFormInteraction(action: 'start' | 'complete' | 'error') {
  trackEvent('form_interaction', { action });
}