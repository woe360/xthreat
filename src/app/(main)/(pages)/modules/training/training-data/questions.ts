// export const questions = [
//     {
//       question: "What is phishing?",
//       options: [
//         "A type of cyber attack",
//         "A type of fish",
//         "A type of software",
//         "A programming language"
//       ],
//       answer: 0,
//       userStory: "You receive an email that looks like it's from your bank, asking you to click on a link to verify your account details."
//     },
//     {
//       question: "What should you do if you receive a suspicious email?",
//       options: [
//         "Click on the link",
//         "Reply to the email",
//         "Report the email to IT",
//         "Ignore the email"
//       ],
//       answer: 2,
//       userStory: "You suspect the email you received might be a phishing attempt. Your company's policy is to report suspicious emails to the IT department."
//     },
//     {
//       question: "What does 'SSL' stand for?",
//       options: [
//         "Secure Socket Layer",
//         "Simple Security Layer",
//         "Secure Service Layer",
//         "Simple Socket Layer"
//       ],
//       answer: 0,
//       userStory: "You are checking if a website is secure before entering sensitive information. Look for 'SSL' in the URL."
//     },
//     {
//       question: "Which of these is a strong password?",
//       options: [
//         "password123",
//         "12345678",
//         "P@ssw0rd!",
//         "qwerty"
//       ],
//       answer: 2,
//       userStory: "You are setting up a new password for your online account. Choose a strong password to enhance security."
//     },
//     {
//       question: "What is two-factor authentication (2FA)?",
//       options: [
//         "A method to secure your account by requiring two forms of identification",
//         "A type of encryption algorithm",
//         "A way to speed up your computer",
//         "A type of firewall"
//       ],
//       answer: 0,
//       userStory: "You want to add an extra layer of security to your account. Enable two-factor authentication to protect your login."
//     },
//     {
//       question: "What is malware?",
//       options: [
//         "Malicious software designed to damage or disrupt systems",
//         "A type of hardware",
//         "A security protocol",
//         "A type of network cable"
//       ],
//       answer: 0,
//       userStory: "Your computer is running slowly and displaying strange behavior. It might be infected with malware."
//     },
//     {
//       question: "What does 'VPN' stand for?",
//       options: [
//         "Virtual Private Network",
//         "Variable Protection Network",
//         "Verified Personal Network",
//         "Virtual Public Network"
//       ],
//       answer: 0,
//       userStory: "You are working remotely and need to access your company's internal network securely. Use a VPN for encrypted connections."
//     },
//     {
//       question: "What is a firewall?",
//       options: [
//         "A network security system that monitors and controls incoming and outgoing traffic",
//         "A type of antivirus software",
//         "A physical barrier to prevent fires",
//         "A network cable"
//       ],
//       answer: 0,
//       userStory: "You are setting up security for your home network. Configure a firewall to monitor and control internet traffic."
//     },
//     {
//       question: "What is social engineering?",
//       options: [
//         "Manipulating individuals into divulging confidential information",
//         "A type of encryption method",
//         "A security update for software",
//         "A network security protocol"
//       ],
//       answer: 0,
//       userStory: "A caller asks you for your password, claiming to be from your bank. This could be an attempt at social engineering."
//     },
//     {
//       question: "What is ransomware?",
//       options: [
//         "Malware that encrypts files and demands a ransom to unlock them",
//         "A type of antivirus program",
//         "A network security device",
//         "A hardware component"
//       ],
//       answer: 0,
//       userStory: "Your files are encrypted and a message demands payment for decryption. This is likely a ransomware attack."
//     },
//     {
//       question: "What is a DDoS attack?",
//       options: [
//         "Distributed Denial of Service attack",
//         "Data Denial of Service attack",
//         "Direct Denial of Service attack",
//         "Digital Denial of Service attack"
//       ],
//       answer: 0,
//       userStory: "Your website is overwhelmed by a flood of traffic, making it inaccessible. This could be a DDoS attack."
//     },
//     {
//       question: "What does 'phishing' typically involve?",
//       options: [
//         "Deceptive emails to steal sensitive information",
//         "A method to encrypt files",
//         "A type of software update",
//         "A hardware security device"
//       ],
//       answer: 0,
//       userStory: "You receive an email asking for your credit card information. This is an example of phishing."
//     },
//     {
//       question: "What is an IP address?",
//       options: [
//         "A unique identifier for a device on a network",
//         "A type of encryption key",
//         "A software application",
//         "A network security measure"
//       ],
//       answer: 0,
//       userStory: "You need to configure network settings for your device. An IP address is essential for network identification."
//     },
//     {
//       question: "What is encryption?",
//       options: [
//         "The process of converting data into a code to prevent unauthorized access",
//         "A method of deleting files",
//         "A type of software bug",
//         "A network configuration setting"
//       ],
//       answer: 0,
//       userStory: "You are sending sensitive information over email. Use encryption to ensure that only the intended recipient can read it."
//     },
//     {
//       question: "What is a VPN used for?",
//       options: [
//         "Creating a secure, encrypted connection over a less secure network",
//         "Improving computer performance",
//         "Deleting unnecessary files",
//         "Updating software automatically"
//       ],
//       answer: 0,
//       userStory: "You are connecting to a public Wi-Fi network. Use a VPN to secure your internet connection and protect your data."
//     },
//     {
//       question: "What is a zero-day vulnerability?",
//       options: [
//         "A security flaw that is exploited before it is known or patched",
//         "A type of firewall",
//         "A network monitoring tool",
//         "A type of malware"
//       ],
//       answer: 0,
//       userStory: "A newly discovered security flaw is being exploited by attackers. This is known as a zero-day vulnerability."
//     },
//     {
//       question: "What should you do if you suspect your account has been compromised?",
//       options: [
//         "Change your password immediately and notify support",
//         "Ignore it and hope it goes away",
//         "Share the issue with your friends",
//         "Continue using the account as usual"
//       ],
//       answer: 0,
//       userStory: "You notice unusual activity in your account. Change your password immediately and report the issue to support."
//     },
//     {
//       question: "What is a security patch?",
//       options: [
//         "A software update designed to fix vulnerabilities",
//         "A type of antivirus software",
//         "A hardware upgrade",
//         "A network security protocol"
//       ],
//       answer: 0,
//       userStory: "A new security update is available for your software. Install the patch to fix vulnerabilities and improve security."
//     },
//     {
//       question: "What is the purpose of an antivirus program?",
//       options: [
//         "To detect and remove malicious software from your computer",
//         "To improve internet speed",
//         "To manage network connections",
//         "To back up files"
//       ],
//       answer: 0,
//       userStory: "Your computer is running a scan to detect and remove viruses. This is the primary function of an antivirus program."
//     },
//     {
//       question: "What is a digital certificate?",
//       options: [
//         "A digital form of identification used to establish secure connections",
//         "A type of hardware encryption device",
//         "A network configuration setting",
//         "A software application"
//       ],
//       answer: 0,
//       userStory: "You are visiting a secure website. A digital certificate verifies the authenticity of the website and establishes a secure connection."
//     },
//     {
//       question: "What is a brute-force attack?",
//       options: [
//         "An attack that tries all possible passwords until it finds the right one",
//         "A type of physical security breach",
//         "A method of encrypting data",
//         "A technique to improve network speed"
//       ],
//       answer: 0,
//       userStory: "An attacker is trying to access your account by trying multiple passwords. This is an example of a brute-force attack."
//     },
//     {
//       question: "What does GDPR stand for?",
//       options: [
//         "General Data Protection Regulation",
//         "General Data Privacy Regulation",
//         "Global Data Protection Regulation",
//         "General Data Provision Regulation"
//       ],
//       answer: 0,
//       userStory: "Your company needs to comply with data protection regulations. GDPR stands for General Data Protection Regulation."
//     },
//     {
//       question: "What is a vulnerability assessment?",
//       options: [
//         "The process of identifying and analyzing security weaknesses in a system",
//         "A type of software update",
//         "A network optimization technique",
//         "A method of data encryption"
//       ],
//       answer: 0,
//       userStory: "You are performing an assessment to identify potential security weaknesses in your system. This is called a vulnerability assessment."
//     },
//     {
//       question: "What is a security token?",
//       options: [
//         "A physical or digital device used to authenticate a user's identity",
//         "A type of antivirus software",
//         "A network security protocol",
//         "A method of encrypting data"
//       ],
//       answer: 0,
//       userStory: "You need to log in to a secure system. Use a security token to authenticate your identity and gain access."
//     }
//   ];
  
// src/data/questions.ts






//DORA GENERAL QUESTIONS




// export const questions = [
//   {
//     question: "What does DORA stand for?",
//     options: [
//       "Digital Operational Resilience Act",
//       "Data Online Resilience Act",
//       "Digital Operational Resource Act",
//       "Data Operational Resilience Act"
//     ],
//     answer: 0,
//     userStory: "You are reviewing regulatory requirements for your company's cybersecurity policy and come across DORA."
//   },
//   {
//     question: "What is the main goal of DORA?",
//     options: [
//       "To ensure the financial sector in the EU is resilient to operational disruptions",
//       "To improve internet speeds across Europe",
//       "To regulate data privacy standards",
//       "To enforce physical security in data centers"
//     ],
//     answer: 0,
//     userStory: "Your company needs to comply with regulations that aim to enhance operational resilience in the financial sector."
//   },
//   {
//     question: "Which of the following sectors does DORA primarily target?",
//     options: [
//       "Financial sector",
//       "Healthcare sector",
//       "Retail sector",
//       "Education sector"
//     ],
//     answer: 0,
//     userStory: "As a financial institution, you need to understand which regulations specifically apply to your sector."
//   },
//   {
//     question: "What is an ICT risk under DORA?",
//     options: [
//       "Risks related to Information and Communication Technology systems",
//       "Risks related to physical security",
//       "Risks related to employee training",
//       "Risks related to financial investments"
//     ],
//     answer: 0,
//     userStory: "You are conducting a risk assessment and need to categorize ICT risks according to DORA standards."
//   },
//   {
//     question: "What should be included in an ICT risk management framework under DORA?",
//     options: [
//       "Identification, protection, detection, response, and recovery processes",
//       "Only identification and protection processes",
//       "Only detection and response processes",
//       "Only response and recovery processes"
//     ],
//     answer: 0,
//     userStory: "You are developing an ICT risk management framework and need to ensure it complies with DORA requirements."
//   },
//   {
//     question: "How often should financial entities conduct a business impact analysis under DORA?",
//     options: [
//       "Regularly, at least annually",
//       "Every five years",
//       "Every two years",
//       "Only once"
//     ],
//     answer: 0,
//     userStory: "Your company is scheduling its annual reviews and needs to include a business impact analysis to meet DORA standards."
//   },
//   {
//     question: "What is the purpose of penetration testing under DORA?",
//     options: [
//       "To identify and address vulnerabilities in ICT systems",
//       "To measure employee productivity",
//       "To improve software performance",
//       "To manage financial resources"
//     ],
//     answer: 0,
//     userStory: "As part of your compliance efforts, you are organizing penetration tests to ensure the security of your ICT systems."
//   },
//   {
//     question: "What role does incident reporting play in DORA compliance?",
//     options: [
//       "Ensures timely communication of significant ICT-related incidents to authorities",
//       "Improves the design of the office layout",
//       "Enhances the quality of customer service",
//       "Increases the efficiency of financial audits"
//     ],
//     answer: 0,
//     userStory: "Your company experiences a significant ICT incident and needs to report it according to DORA guidelines."
//   },
//   {
//     question: "Which entities are required to comply with DORA?",
//     options: [
//       "Financial institutions, including banks, investment firms, and insurance companies",
//       "All companies operating in the EU",
//       "Only large multinational corporations",
//       "Only government agencies"
//     ],
//     answer: 0,
//     userStory: "Your financial institution is determining whether it needs to comply with DORA."
//   },
//   {
//     question: "What is the purpose of third-party risk management under DORA?",
//     options: [
//       "To manage risks arising from outsourcing ICT services to external providers",
//       "To oversee employee performance",
//       "To regulate customer interactions",
//       "To control physical access to data centers"
//     ],
//     answer: 0,
//     userStory: "Your company relies on third-party service providers for ICT services and needs to manage associated risks."
//   }
// ];


// DORA SPECIALISED QUESTIONS



// src/data/questions.ts

export const questions = [
  {
    question: "What should you do if you suspect an operational disruption affecting ICT systems?",
    options: [
      "Report the issue to the IT department immediately",
      "Wait to see if the issue resolves itself",
      "Continue working without taking action",
      "Inform your colleagues to avoid using the system"
    ],
    answer: 0,
    userStory: "You notice unusual behavior in the financial transaction processing system, indicating a potential disruption."
  },
  {
    question: "How often should your team conduct a business impact analysis according to DORA?",
    options: [
      "At least once a year",
      "Once every five years",
      "Only when an issue arises",
      "Every six months"
    ],
    answer: 0,
    userStory: "Your team is scheduling its annual activities and needs to plan for the next business impact analysis."
  },
  {
    question: "What is the first step to take when identifying ICT risks?",
    options: [
      "Identify and document all potential threats",
      "Immediately start implementing mitigation strategies",
      "Report all activities to management",
      "Only focus on external threats"
    ],
    answer: 0,
    userStory: "As part of your compliance role, you are tasked with creating a comprehensive ICT risk management framework."
  },
  {
    question: "When performing a penetration test, what is the primary goal?",
    options: [
      "Identify vulnerabilities in the ICT systems",
      "Improve software performance",
      "Enhance user interface design",
      "Reduce system costs"
    ],
    answer: 0,
    userStory: "Your company schedules a penetration test to ensure the robustness of its ICT defenses."
  },
  {
    question: "If a significant ICT incident occurs, how should it be handled according to DORA?",
    options: [
      "Report it to the competent authorities immediately",
      "Try to resolve it internally without reporting",
      "Wait until the monthly review meeting",
      "Inform only the senior management"
    ],
    answer: 0,
    userStory: "Your team experiences a critical system failure affecting financial transactions. You need to follow DORA protocols."
  },
  {
    question: "What is an effective way to manage third-party ICT risks?",
    options: [
      "Conduct regular audits and assessments of third-party providers",
      "Assume all third-party services are secure",
      "Only rely on third-party certifications",
      "Avoid using third-party services entirely"
    ],
    answer: 0,
    userStory: "Your company outsources several ICT services and needs to ensure compliance with DORA standards."
  },
  {
    question: "Why is continuous monitoring of ICT systems important?",
    options: [
      "To detect and respond to incidents in real-time",
      "To reduce employee workload",
      "To enhance the user experience",
      "To comply with general workplace policies"
    ],
    answer: 0,
    userStory: "As part of your role, you set up continuous monitoring to detect any potential operational disruptions promptly."
  },
  {
    question: "What should be included in an incident response plan under DORA?",
    options: [
      "Identification, containment, eradication, recovery, and lessons learned",
      "Only recovery strategies",
      "Employee contact information",
      "Daily operational tasks"
    ],
    answer: 0,
    userStory: "Your team is developing an incident response plan to handle potential ICT incidents efficiently."
  },
  {
    question: "How should critical financial data be handled to ensure compliance?",
    options: [
      "Encrypt the data and ensure secure backup solutions",
      "Store it in an unsecured location",
      "Share it openly among all employees",
      "Rely on external storage services without any checks"
    ],
    answer: 0,
    userStory: "You are responsible for ensuring the security of sensitive financial data processed by your company."
  },
  {
    question: "What is the role of regular training and awareness programs?",
    options: [
      "Ensure employees are aware of the latest security protocols and compliance requirements",
      "Only to fulfill regulatory documentation",
      "Improve social interactions among staff",
      "Reduce the workload of the IT department"
    ],
    answer: 0,
    userStory: "Your company schedules quarterly training sessions to keep employees informed about DORA compliance and ICT security."
  }
];
