import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  readonly policyData = {
    title: {
      information_collect: '1. Information We Collect',
      information: '2. How We Use Information',
      data_storage_security: '3. Data Storage & Security',
      data_retention: '4. Data Retention',
      privacy: '5. Children\'s Privacy',
      rights: '6. Your Rights',
      services: '7. Third-Party Services',
      policy: '8. Changes to This Policy',
      contact: '9. Contact Us'
    },
    content: {
      information_collect: 'a. Personal Info: name, email, medication info, device info.\n' +
        'b. Usage Data: app interactions, feature usage, errors and diagnostics.\n' +
        'c. Health Data: medication names, dosages, intake schedules, reminders times.',
      information: 'We use data to provide app features, send reminders and relevant notifications, improve services and performance, respond to support requests or updates and communicate with you. We do **not** sell your data or use it for third-party advertising.',
      data_storage_security: 'Data is encrypted. We take steps to protect your information but cannot guarantee complete security.',
      data_retention: 'We retain your data while your account is active. You may request deletion anytime.',
      privacy: 'MediMeet is intended for users aged 18 and over. We do not knowingly collect data from minors.',
      rights: 'Depending on your location, you may request access, correction, deletion, or restriction of your data.',
      services: 'We may use third-party tools for analytics. These services **do not** access your health data. Each provider has its own privacy policy.',
      policy: 'We may update this policy from time to time. If significant changes are made, we will notify you via the app.',
      contact: 'Email: medimeet.ai@gmail.com\nCompany: MediMeet'
    }
  };
}
