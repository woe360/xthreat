export const securityAwareness = [
    {
      id: 1,
      type: 'phishing',
      title: 'Phishing Simulation Game',
      description: 'Identify if the received emails are phishing attempts or legitimate messages.',
      scenarios: [
        {
          emailSubject: 'Your Account Has Been Compromised!',
          emailBody: 'Dear User, we have detected suspicious activity on your account. Please click the link below to secure your account immediately.',
          options: [
            'Check the sender’s email address',
            'Click the link to secure your account',
            'Report the email as phishing',
          ],
          correctOption: 0,
          feedback: 'Always verify the sender’s email address. Do not click on suspicious links.',
          multimedia: {
            video: 'https://example.com/phishing-video1',
          },
        },
        {
          emailSubject: 'Congratulations! You have won a prize!',
          emailBody: 'Dear User, you have won a $1000 gift card. Click the link below to claim your prize.',
          options: [
            'Click the link to claim your prize',
            'Ignore the email',
            'Report the email as phishing',
          ],
          correctOption: 2,
          feedback: 'If it sounds too good to be true, it probably is. Report such emails as phishing.',
          multimedia: {
            video: 'https://example.com/phishing-video2',
          },
        },
      ],
    },
    {
      id: 2,
      type: 'escapeRoom',
      title: 'Escape Room Challenge',
      description: 'Solve puzzles related to security scenarios to escape the room.',
      puzzles: [
        {
          puzzle: 'Create a strong password for your new account.',
          options: [
            'Password123',
            'P@ssw0rd!',
            'MySecurePass!2024',
          ],
          correctOption: 2,
          feedback: 'A strong password should be long, include special characters, and avoid common patterns.',
          multimedia: {
            audio: 'https://example.com/password-audio1',
          },
        },
        {
          puzzle: 'Identify the safe website URL.',
          options: [
            'http://secure-website.com',
            'https://secure-website.com',
            'http://securewebsite.com',
          ],
          correctOption: 1,
          feedback: 'Always look for "https" in the URL for secure websites.',
          multimedia: {
            audio: 'https://example.com/url-audio1',
          },
        },
      ],
    },
    {
      id: 3,
      type: 'rolePlaying',
      title: 'Role-Playing Scenarios',
      description: 'Role-play different security roles to understand various perspectives and responsibilities.',
      scenarios: [
        {
          role: 'IT Manager',
          scenario: 'You receive a report of unusual network activity. What do you do?',
          options: [
            'Ignore the report',
            'Investigate the activity immediately',
            'Inform the team and monitor the situation',
          ],
          correctOption: 1,
          feedback: 'As an IT Manager, you should investigate unusual activities immediately to prevent potential breaches.',
          multimedia: {
            video: 'https://example.com/it-manager-video1',
          },
        },
        {
          role: 'Employee',
          scenario: 'A stranger asks for your password to fix a computer issue. What do you do?',
          options: [
            'Give them the password',
            'Refuse and report the incident',
            'Ignore the stranger',
          ],
          correctOption: 1,
          feedback: 'Never share your password. Always report suspicious requests.',
          multimedia: {
            video: 'https://example.com/employee-video1',
          },
        },
      ],
    },
    {
      id: 4,
      type: 'threatDetection',
      title: 'Threat Detection Simulation',
      description: 'Monitor and identify potential security threats in a simulated network environment.',
      tasks: [
        {
          task: 'Analyze the log for suspicious activity.',
          logData: [
            'User1 logged in from IP 192.168.1.10',
            'Failed login attempt from IP 192.168.1.20',
            'User1 logged out',
          ],
          options: [
            'Ignore the log',
            'Investigate the failed login attempt',
            'Block the IP address 192.168.1.20',
          ],
          correctOption: 1,
          feedback: 'Failed login attempts can indicate a potential attack. Investigate immediately.',
          multimedia: {
            video: 'https://example.com/log-analysis-video1',
          },
        },
        {
          task: 'Monitor network traffic for anomalies.',
          trafficData: [
            'Normal traffic from IP 192.168.1.5',
            'High traffic from IP 192.168.1.25',
            'Normal traffic from IP 192.168.1.5',
          ],
          options: [
            'Ignore the traffic',
            'Investigate the high traffic from IP 192.168.1.25',
            'Block IP address 192.168.1.25',
          ],
          correctOption: 1,
          feedback: 'High traffic can indicate a data exfiltration attempt. Investigate further.',
          multimedia: {
            video: 'https://example.com/network-monitoring-video1',
          },
        },
      ],
    },
    {
      id: 5,
      type: 'passwordStrength',
      title: 'Password Strength Tester',
      description: 'Test the strength of your passwords and receive suggestions for improvement.',
      instructions: 'Enter your password to test its strength:',
      feedback: [
        {
          condition: 'tooShort',
          message: 'Your password is too short. Make sure it is at least 12 characters long.',
        },
        {
          condition: 'noSpecialCharacters',
          message: 'Include special characters to make your password stronger.',
        },
        {
          condition: 'tooCommon',
          message: 'Avoid common words and patterns.',
        },
      ],
      multimedia: {
        video: 'https://example.com/password-strength-video1',
      },
    },
    {
      id: 6,
      type: 'socialEngineering',
      title: 'Social Engineering Simulation',
      description: 'Recognize and respond to social engineering attacks in various scenarios.',
      scenarios: [
        {
          scenario: 'A caller claims to be from IT support and asks for your login credentials.',
          options: [
            'Give the credentials',
            'Hang up and report the call',
            'Ask for more details',
          ],
          correctOption: 1,
          feedback: 'Never share your login credentials. Report such calls to your IT department.',
          multimedia: {
            audio: 'https://example.com/social-engineering-audio1',
          },
        },
        {
          scenario: 'Someone in the office asks to borrow your access card to enter a restricted area.',
          options: [
            'Lend them the card',
            'Refuse and report the incident',
            'Ask for a reason',
          ],
          correctOption: 1,
          feedback: 'Never lend your access card. Report suspicious requests.',
          multimedia: {
            audio: 'https://example.com/social-engineering-audio2',
          },
        },
      ],
    },
    {
      id: 7,
      type: 'dataPrivacy',
      title: 'Data Privacy Challenge',
      description: 'Manage a set of personal data, making decisions on sharing and protecting it.',
      tasks: [
        {
          task: 'Decide whether to share your birthdate on social media.',
          options: [
            'Share publicly',
            'Share with friends only',
            'Do not share',
          ],
          correctOption: 2,
          feedback: 'Avoid sharing personal information publicly to protect your privacy.',
          multimedia: {
            video: 'https://example.com/data-privacy-video1',
          },
        },
        {
          task: 'Choose a secure way to store your passwords.',
          options: [
            'Write them down in a notebook',
            'Use a password manager',
            'Store them in a text file on your computer',
          ],
          correctOption: 1,
          feedback: 'Using a password manager is the most secure way to store your passwords.',
          multimedia: {
            video: 'https://example.com/data-privacy-video2',
          },
        },
      ],
    },
    {
      id: 8,
      type: 'virtualWorkshop',
      title: 'Virtual Workshops with Interactive Demos',
      description: 'Participate in virtual workshops that combine live instruction with interactive demonstrations.',
      workshops: [
        {
          topic: 'Setting Up Secure Systems',
          details: 'Learn how to set up secure systems in a hands-on workshop.',
          date: '2024-08-15',
          multimedia: {
            video: 'https://example.com/workshop-video1',
          },
        },
        {
          topic: 'Identifying Vulnerabilities',
          details: 'Understand how to identify and address vulnerabilities in your systems.',
          date: '2024-08-22',
          multimedia: {
            video: 'https://example.com/workshop-video2',
          },
        },
      ],
    },
  ];
  
  export default securityAwareness;
  